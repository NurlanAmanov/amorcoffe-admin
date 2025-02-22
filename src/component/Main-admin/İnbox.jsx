import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';

function Inbox() {
  const [emails, setEmails] = useState([]); // E-mail-ləri saxlamaq üçün state

  // Google login uğurlu olduqda çağırılacaq
  const handleLoginSuccess = async (response) => {
    const token = response.tokenId;
    const messages = await fetchEmails(token); // E-mail-ləri çək
    setEmails(messages); // E-mail-ləri state-ə qoy
  };

  // Gmail API-dan e-mail-ləri çəkmək üçün funksiya
  const fetchEmails = async (token) => {
    const headers = new Headers({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });

    const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages', { headers });
    const data = await response.json();
    console.log(data);
    return data.messages || []; // Əgər mesajlar varsa onları qaytar, yoxdursa boş array qaytar
  };

  // Google login xəta verərsə bu funksiya çağırılacaq
  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
  };

  return (
    <div>
      <h1>Inbox</h1>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        cookiePolicy={'single_host_origin'}
        scope="https://www.googleapis.com/auth/gmail.readonly"
      />
      {emails.length > 0 ? (
        <ul>
          {emails.map(email => (
            <li key={email.id}>{email.snippet}</li> // Hər bir email üçün HTML elementi yarat
          ))}
        </ul>
      ) : (
        <p>No emails to display.</p>
      )}
    </div>
  );
}

export default Inbox;
