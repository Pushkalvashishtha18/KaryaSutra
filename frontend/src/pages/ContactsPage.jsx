import React, { useEffect, useState } from "react";
import { authApi } from "../services/api.js";
import { useAuth } from "../state/AuthContext.jsx";

const ContactsPage = () => {
  const { token } = useAuth();
  const client = authApi(token);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    client
      .get("/api/contact?limit=20")
      .then((res) => setContacts(res.data.items || res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h2 style={{ margin: 0 }}>Contact submissions</h2>
      <div className="card" style={{ padding: "0" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c._id}>
                <td>{c.fullName}</td>
                <td>{c.email}</td>
                <td>{c.mobile}</td>
                <td>{c.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsPage;

