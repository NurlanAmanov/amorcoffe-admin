import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";

function Inbox() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("google_token") || null);
  const [composeMode, setComposeMode] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("INBOX");  // Default folder is INBOX
  const [emailData, setEmailData] = useState({ to: "", subject: "", message: "" });

  // Google ilə giriş funksiyası
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      localStorage.setItem("google_token", tokenResponse.access_token);
      setToken(tokenResponse.access_token);
      fetchEmails(tokenResponse.access_token, "INBOX");  // Default folder "INBOX"
    },
    onError: () => {
      toast.error("Giriş uğursuz oldu.");
    },
    scope: "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send",
  });

  // Avtomatik giriş
  useEffect(() => {
    if (token) {
      fetchEmails(token, selectedFolder);  // Fetch emails from the selected folder
    }
  }, [token, selectedFolder]);

  // Gmail API-dan mesajları çəkmək
  const fetchEmails = async (accessToken, label) => {
    try {
      const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      });

      const response = await fetch(
        `https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=10&labelIds=${label}`,
        { headers }
      );
      const data = await response.json();

      if (!data.messages) {
        setEmails([]);
        return;
      }

      const detailedMessages = await Promise.all(
        data.messages.map(async (message) => await fetchEmailDetails(accessToken, message.id))
      );

      setEmails(detailedMessages);
    } catch (error) {
      toast.error("Mesajları çəkmək mümkün olmadı.");
      setEmails([]);
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
      const subjectHeader = headersData.find((header) => header.name === "Subject");
      const fromHeader = headersData.find((header) => header.name === "From");

      return {
        id: messageId,
        subject: subjectHeader ? subjectHeader.value : "(Mövzu yoxdur)",
        from: fromHeader ? fromHeader.value : "(Naməlum göndərən)",
        body: data.snippet,
      };
    } catch (error) {
      toast.error("Mesaj detallarını yükləmək mümkün olmadı.");
      return {
        id: messageId,
        subject: "(Xəta baş verdi)",
        from: "(Naməlum göndərən)",
        body: "(Məzmun mövcud deyil)",
      };
    }
  };

  // E-mail göndərmək funksiyası
  const sendEmail = async () => {
    try {
      const emailContent = `To: ${emailData.to}\r\nSubject: ${emailData.subject}\r\n\r\n${emailData.message}`;
      const encodedMessage = btoa(emailContent).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

      const response = await fetch(
        "https://www.googleapis.com/gmail/v1/users/me/messages/send",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ raw: encodedMessage }),
        }
      );

      if (response.ok) {
        toast.success("Mesaj uğurla göndərildi!");
        setComposeMode(false);
        setSelectedFolder("SENT");
        fetchEmails(token, "SENT");
      } else {
        toast.error("Mesaj göndərmək mümkün olmadı.");
      }
    } catch (error) {
      toast.error("Xəta baş verdi.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ToastContainer />

      {/* Sidebar */}
      <div className="w-72 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-lg font-semibold text-blue-600 mb-4">Gmail Inbox</h2>
        {!token ? (
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={() => login()}>
            Google ilə Giriş
          </button>
        ) : (
          <button className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" onClick={() => { localStorage.removeItem("google_token"); setToken(null); }}>
            Çıxış Et
          </button>
        )}
        <button className="w-full bg-green-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-600 transition" onClick={() => setComposeMode(true)}>
          Yeni mesaj ✉️
        </button>
        <ul className="mt-6">
          <li className={`py-2 px-4 rounded-lg cursor-pointer ${selectedFolder === "INBOX" ? "bg-gray-200 text-gray-800 font-semibold" : "text-gray-600 hover:bg-gray-200"}`} onClick={() => setSelectedFolder("INBOX")}>📥 Gələnlər</li>
          <li className={`py-2 px-4 rounded-lg cursor-pointer ${selectedFolder === "SENT" ? "bg-gray-200 text-gray-800 font-semibold" : "text-gray-600 hover:bg-gray-200"}`} onClick={() => setSelectedFolder("SENT")}>📤 Göndərilənlər</li>
          <li className={`py-2 px-4 rounded-lg cursor-pointer ${selectedFolder === "SPAM" ? "bg-gray-200 text-gray-800 font-semibold" : "text-gray-600 hover:bg-gray-200"}`} onClick={() => setSelectedFolder("SPAM")}>🚨 Spam</li>
        </ul>
      </div>

      {/* Email List */}
      <div className="w-1/3 border-r border-gray-300 p-4 overflow-y-auto">
        {emails.length > 0 ? (
          emails.map((email) => (
            <div key={email.id} className="border-b p-3 cursor-pointer hover:bg-gray-100" onClick={() => setSelectedEmail(email)}>
              <strong className="block text-sm text-gray-700">{email.from}</strong>
              <p className="text-sm">{email.subject}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Bu qovluqda mesaj yoxdur.</p>
        )}
      </div>

      {/* Email Details & Compose Email */}
      <div className="flex-1 p-4">
        {composeMode ? (
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Yeni mesaj yaz ✉️</h2>
            <input type="email" placeholder="Kimə" className="w-full p-2 mb-2 border rounded-lg" value={emailData.to} onChange={(e) => setEmailData({ ...emailData, to: e.target.value })} />
            <input type="text" placeholder="Mövzu" className="w-full p-2 mb-2 border rounded-lg" value={emailData.subject} onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })} />
            <textarea placeholder="Mesaj" className="w-full p-2 mb-2 border rounded-lg" value={emailData.message} onChange={(e) => setEmailData({ ...emailData, message: e.target.value })} />
            <button onClick={sendEmail} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Göndər 🚀</button>
          </div>
        ) : selectedEmail ? (
          <div>
            <h2 className="text-xl font-semibold">{selectedEmail.subject}</h2>
            <h3 className="text-gray-600 mb-2">Kimdən: {selectedEmail.from}</h3>
            <p className="text-gray-800">{selectedEmail.body}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Mesajı seçin.</p>
        )}
      </div>
    </div>
  );
}

export default Inbox;
