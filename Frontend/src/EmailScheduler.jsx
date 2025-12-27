import React, { useState } from 'react';
import { Mail, Paperclip, Send } from 'lucide-react';

export default function EmailScheduler() {
  const [emailTitle, setEmailTitle] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [sendDateTime, setSendDateTime] = useState('');
  const [targetEmails, setTargetEmails] = useState('');

  const handleScheduleEmail = () => {
    console.log('Email scheduled:', {
      emailTitle,
      emailSubject,
      sendDateTime,
      targetEmails
    });
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
            <h2 style={styles.nameText}>John Doe</h2>
            
            <p style={styles.description}>
              Schedule your emails and reach your audience at the perfect time. Manage your campaigns efficiently and track your success.
            </p>
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
              <input
                type="text"
                placeholder="Enter email subject"
                value={emailSubject}
                rows={3} 
                onChange={(e) => setEmailSubject(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* Send Date & Time */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Send Date & Time</label>
              <input
                type="date"
                placeholder="mm/dd/yyyy"
                value={sendDateTime}
                onChange={(e) => setSendDateTime(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* Target Emails */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Target Emails</label>
              <textarea
                placeholder="Enter email addresses (one per line)&#10;example1@email.com&#10;example2@email.com"
                value={targetEmails}
                onChange={(e) => setTargetEmails(e.target.value)}
                rows={3}
                style={styles.textarea}
              />
            </div>

            

            {/* Schedule Button */}
            <button onClick={handleScheduleEmail} style={styles.scheduleButton}>
              <Send size={18} />
              <span style={styles.buttonText}>Schedule Email</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#090088',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  card: {
    display: 'flex',
    maxWidth: '1200px',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '5 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    overflow: 'hidden'
  },
  leftPanel: {
    width: '40%',
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
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
    flexDirection: 'column'
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
  buttonText: {
    display: 'inline-block'
  }
};