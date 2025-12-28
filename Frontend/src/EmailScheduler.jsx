import React, { useRef, useState } from 'react';
import { Mail, Paperclip, Send } from 'lucide-react';

export default function EmailScheduler({onNavigateToSignUp}) {
  const [emailTitle, setEmailTitle] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [sendDateTime, setSendDateTime] = useState('');
  const [targetEmails, setTargetEmails] = useState('');
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [attachments, setAttachments] = useState([])
  const [attachmentPreviews, setAttachmentPreviews] = useState([])
  const [attachmentError, setAttachmentError] = useState('')
  const fileInputRef = useRef(null);
  const MAX_FILES = 5;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const username = useState('');

  const handleScheduleEmail = async (e) => {
    const token = localStorage.getItem('token');
    alert("SENDING EMAIL, TOKEN : " + token)
    console.log('Email scheduled:', {
      emailTitle,
      emailSubject,
      sendDateTime,
      targetEmails
    });
    setLoading(true)

    const toEmailArray = targetEmails
    .split('\n')
    .map(email => email.trim())
    .filter(email => email !== '');
    console.log("sending to emails : ", toEmailArray);
    // normalize and validate date/time input
    let scheduledAtISO = null;
    if (sendDateTime) {
      const d = new Date(sendDateTime);
      if (Number.isNaN(d.getTime())) {
        setError('Invalid send date/time');
        setLoading(false);
        return;
      }
      scheduledAtISO = d.toISOString();
    }
    console.log("with date :", scheduledAtISO);

    try {
      if (toEmailArray.length === 0) {
        setError('Please provide at least one recipient');
        setLoading(false);
        return;
      }

      let successCount = 0;
      let failCount = 0;

      // Send one request per recipient (backend expects a single email string)
      for (const recipient of toEmailArray) {
        const formData = new FormData();
        // backend expects `toEmail` to be a JSON-stringified array
        formData.append('toEmail', JSON.stringify([recipient]));
        formData.append('title', emailTitle);
        formData.append('body', emailSubject);
        if (scheduledAtISO) formData.append('scheduledAt', scheduledAtISO);
        attachments.forEach(file => formData.append('attachments', file));

        const response = await fetch('http://localhost:3000/api/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (response.ok) {
          successCount++;
        } else {
          failCount++;
          const data = await response.json().catch(() => ({}));
          console.error('Failed sending to', recipient, data);
        }
      }

      if (failCount === 0) {
        alert(`Emails queued successfully (${successCount} sent)`);
      } else {
        setError(`${successCount} succeeded, ${failCount} failed`);
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running.')
      console.error('EMAIL error:', err)
    } finally {
      setLoading(false)
    }
  };

  // generate previews for selected files
  const handleFiles = (e) => {
    setAttachmentError('');
    const newFiles = Array.from(e.target.files || []);

    // merge with existing, but do not exceed MAX_FILES
    let combined = [...attachments];
    for (const f of newFiles) {
      if (combined.length >= MAX_FILES) break;
      // skip duplicates (same name & size)
      if (!combined.some(x => x.name === f.name && x.size === f.size)) combined.push(f);
    }

    if (combined.length > MAX_FILES) {
      combined = combined.slice(0, MAX_FILES);
    }

    // validate sizes
    const oversized = combined.filter(f => f.size > MAX_FILE_SIZE);
    if (oversized.length > 0) {
      setAttachmentError(`File too large: ${oversized.map(f => f.name).join(', ')} (max ${formatFileSize(MAX_FILE_SIZE)})`);
      // remove oversized files
      combined = combined.filter(f => f.size <= MAX_FILE_SIZE);
    }

    setAttachments(combined);

    // build previews
    const readers = combined.map(file => new Promise((resolve) => {
      if (file.type && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => resolve({ name: file.name, size: file.size, url: reader.result, type: file.type });
        reader.readAsDataURL(file);
      } else {
        resolve({ name: file.name, size: file.size, url: null, type: file.type });
      }
    }));

    Promise.all(readers).then(previews => setAttachmentPreviews(previews));

    // reset file input so same file can be selected again if needed
    if (fileInputRef && fileInputRef.current) fileInputRef.current.value = null;
  };

  const removeAttachment = (index) => {
    const newFiles = attachments.slice();
    newFiles.splice(index, 1);
    setAttachments(newFiles);
    const newPreviews = attachmentPreviews.slice();
    newPreviews.splice(index, 1);
    setAttachmentPreviews(newPreviews);
    setAttachmentError('');
  };

  const formatFileSize = (bytes) => {
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${Math.round(bytes / 1024)} KB`;
  }

  const PDFIcon = ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#e11d48" />
      <path d="M7 8h6v1H7zM7 11h6v1H7zM7 14h4v1H7z" fill="#fff" />
      <text x="12" y="17" fontSize="8" fontWeight="700" textAnchor="middle" fill="#fff">PDF</text>
    </svg>
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Left Panel - Blue Section */}
        <div style={styles.leftPanel}>
          <div>
            <div style={styles.iconCircle}>
              <Mail size={32} />
            </div>
            
            <h1 style={styles.welcomeText}>Welcome back,</h1>
            <h2 style={styles.nameText}>{username}</h2>
            
            <p style={styles.description}>
              Schedule your emails and reach your audience at the perfect time. Manage your campaigns efficiently and track your success.
            </p>

            {/*sign out button */}
            <button onClick={onNavigateToSignUp} style={styles.signOutButton}>
              <Send size={18} />
              <span style={styles.buttonText}>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Right Panel - Form Section */}
        <div style={styles.rightPanel}>
          <h2 style={styles.formTitle}>Schedule Email</h2>
          
          <div style={styles.formContainer}>
            {/* Email Title */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Title</label>
              <input
                type="text"
                placeholder="Enter email title"
                value={emailTitle}
                onChange={(e) => setEmailTitle(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* Email Subject */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Subject</label>
              <textarea
                placeholder="Write your subject..."
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                rows={6}
                style={styles.textarea}
              />
            </div>

            {/* Send Date & Time */}
            <div style={styles.flexForm}>
              {/* Target Emails */}
              <div style = {styles.formGroup}>
                <label style={styles.label}>Target Emails</label>
                <textarea
                  placeholder="Enter email addresses (one per line)&#10;example1@email.com&#10;example2@email.com"
                  value={targetEmails}
                  onChange={(e) => setTargetEmails(e.target.value)}
                  rows={3}
                  style={styles.textarea}
                />
              </div>
              <div style = {styles.formGroup}>
                <label style={styles.label}>Send Date & Time</label>
                <input
                  type="datetime-local"
                  value={sendDateTime}
                  onChange={(e) => setSendDateTime(e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            

            {/* Attachments input */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Attachments</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}> 
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={(e) => handleFiles(e)}
                  style={{ cursor: 'pointer' }}
                  aria-label="Add attachments"
                />

                <div
                  role="status"
                  aria-live="polite"
                  style={{ padding: '8px 12px', background: '#2563eb', color: '#fff', borderRadius: 999, fontSize: 13, fontWeight: 700 }}
                  title={`${attachments.length} of ${MAX_FILES} files selected`}
                >
                  {attachments.length} / {MAX_FILES}
                </div>
              </div>

              {attachmentError && (
                <div style={{ marginTop: 8, color: '#b91c1c', fontSize: 13 }}>{attachmentError}</div>
              )}

              {attachmentPreviews.length > 0 && (
                <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                  {attachmentPreviews.map((p, i) => (
                    <div key={i} style={{ border: '1px solid #e5e7eb', padding: 8, borderRadius: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
                      <div style={{ width: 56, height: 56, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {p.url ? (
                          <img src={p.url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }} />
                        ) : (
                          (() => {
                            const ext = (p.name.split('.').pop() || '').toLowerCase();
                            if (ext === 'pdf') return <PDFIcon size={56} />;
                            return (
                              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6', borderRadius: 6, fontSize: 14, fontWeight: 700 }}>{ext}</div>
                            );
                          })()
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={p.name}>{p.name}</div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>{formatFileSize(p.size)}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                        <button onClick={() => removeAttachment(i)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 4 }}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Schedule Button */}
            <button onClick={handleScheduleEmail} style={styles.scheduleButton}>
              <Send size={18} />
              <span style={styles.buttonText}>Schedule Email</span>
            </button>
            {error && (
              <div style={{
                padding: '10px',
                backgroundColor: '#fee2e2',
                color: '#991b1b',
                borderRadius: '8px',
                marginBottom: '15px',
                fontSize: '14px'
              }}>
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#090088',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    width: '100vw',
    height: '100vh',
    boxSizing: 'border-box'
  },
  card: {
    display: 'flex',
    maxWidth: '1400px',
    width: '100%',
    height: '95%',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '5 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    overflow: 'auto',
  },
  leftPanel: {
    width: '40%',
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: '64px',
    height: '64px',
    backgroundColor: '#3b82f6',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '32px'
  },
  welcomeText: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '8px',
    margin: 0
  },
  nameText: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '24px',
    margin: 0,
    marginTop: '8px',
    marginBottom: '24px'
  },
  description: {
    color: '#bfdbfe',
    lineHeight: '1.6',
    margin: 0
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '32px'
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  statIcon: {
    width: '40px',
    height: '40px',
    backgroundColor: '#3b82f6',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  colorBox: {
    width: '24px',
    height: '24px',
    background: 'linear-gradient(135deg, #34d399 0%, #60a5fa 100%)',
    borderRadius: '4px'
  },
  statLabel: {
    fontSize: '14px',
    color: '#bfdbfe',
    marginBottom: '2px'
  },
  statValue: {
    fontSize: '20px',
    fontWeight: '600'
  },
  rightPanel: {
    width: '60%',
    padding: '32px'
  },
  formTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '24px',
    marginTop: 0
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px',
    display: 'block'
  },
  input: {
    width: '100%',
    padding: '10px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '10px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s',
    resize: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  uploadButton: {
    width: '100%',
    padding: '10px 16px',
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    backgroundColor: 'white',
    color: '#374151',
    fontWeight: '500',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s'
  },
  scheduleButton: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '8px',
    transition: 'all 0.2s'
  },
  signOutButton: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#03102cff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s'
  },
  buttonText: {
    display: 'inline-block'
  },
  flexForm: {
    display: 'flex',
    gap: '50px',
  },

};