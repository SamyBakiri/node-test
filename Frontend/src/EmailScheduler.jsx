import React, { useState } from 'react';
import { Mail, Paperclip, Send } from 'lucide-react';

export default function EmailScheduler({onNavigateToSignUp}) {
  const [emailTitle, setEmailTitle] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [sendDateTime, setSendDateTime] = useState('');
  const [targetEmails, setTargetEmails] = useState('');
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
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
    const scheduledAtISO = sendDateTime ? new Date(sendDateTime).toISOString() : null;
    console.log("with date :", scheduledAtISO);

    try {
      const response = await fetch('http://localhost:3000/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          toEmail: JSON.stringify(toEmailArray),
          title: emailTitle,
          body: emailSubject,
          scheduledAt: scheduledAtISO
        })
      });

      const data = await response.json()

      if (response.ok) {
        alert("Email sent!")
      } else {
        setError(data.message || 'Email could not be sent')
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running.')
      console.error('EMAIL error:', err)
    } finally {
      setLoading(false)
    }
  };

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
                  type="date"
                  placeholder="mm/dd/yyyy"
                  value={sendDateTime}
                  onChange={(e) => setSendDateTime(e.target.value)}
                  style={styles.input}
                />
              </div>
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