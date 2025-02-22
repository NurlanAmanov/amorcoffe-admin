import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

function Inbox() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [token, setToken] = useState(null);

  // Google login funksiyası
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Login successful!", tokenResponse);
      setToken(tokenResponse.access_token);
      const messages = await fetchEmails(tokenResponse.access_token);
      setEmails(messages);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
    scope: "https://www.googleapis.com/auth/gmail.readonly",
  });

  // Gmail API-dan mesajları çəkmək
  const fetchEmails = async (accessToken) => {
    try {
      const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      });

      const response = await fetch(
        "https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=10",
        { headers }
      );
      const data = await response.json();

      if (!data.messages) {
        console.log("No messages found.");
        return [];
      }

      const detailedMessages = await Promise.all(
        data.messages.map(async (message) => {
          const emailDetails = await fetchEmailDetails(accessToken, message.id);
          return emailDetails;
        })
      );

      return detailedMessages;
    } catch (error) {
      console.error("Error fetching emails:", error);
      return [];
    }
  };

  // E-mail detalları
  const fetchEmailDetails = async (accessToken, messageId) => {
    try {
      const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      });

      const response = await fetch(
        `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
        { headers }
      );
      const data = await response.json();

      const headersData = data.payload.headers;
      const subjectHeader = headersData.find(
        (header) => header.name === "Subject"
      );
      const fromHeader = headersData.find((header) => header.name === "From");

      return {
        id: messageId,
        subject: subjectHeader ? subjectHeader.value : "(No Subject)",
        from: fromHeader ? fromHeader.value : "(Unknown Sender)",
        body: data.snippet, // Mesajın qısa versiyası
      };
    } catch (error) {
      console.error("Error fetching email details:", error);
      return {
        id: messageId,
        subject: "(Error loading message)",
        from: "(Unknown Sender)",
        body: "(No Content)",
      };
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4">
        <h2 className="text-lg font-semibold">Inbox</h2>
        <button
          className="w-full bg-blue-500 text-white px-4 py-2 mt-4 rounded"
          onClick={() => login()}
        >
          Login with Google
        </button>
      </div>

      {/* Email List */}
      <div className="w-1/3 border-r border-gray-300 p-4 overflow-y-auto">
        {emails.length > 0 ? (
          emails.map((email) => (
            <div
              key={email.id}
              className="border-b p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedEmail(email)}
            >
              <strong className="block text-sm text-gray-700">
                {email.from}
              </strong>
              <p className="text-sm">{email.subject}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No emails to display.</p>
        )}
      </div>

      {/* Email Details */}
      <div className="flex-1 p-4">
        {selectedEmail ? (
          <div>
            <h2 className="text-xl font-semibold">{selectedEmail.subject}</h2>
            <h3 className="text-gray-600 mb-2">From: {selectedEmail.from}</h3>
            <p className="text-gray-800">{selectedEmail.body}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Select an email to read its details.
          </p>
        )}
      </div>
    </div>
  );
}

export default Inbox;
