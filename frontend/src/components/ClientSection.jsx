import React, { useEffect, useState } from "react";
import { api } from "../services/api.js";
import ClientCard from "./ClientCard.jsx";

const ClientSection = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    api
      .get("/api/clients")
      .then((res) => setClients(res.data))
      .catch((err) => {
        console.error(err);
        setClients([
          {
            _id: "c1",
            name: "Rayhan Smith",
            designation: "Buyer | Toronto",
            description: "Loved how simple and effective the process was.",
            imageUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
          },
          {
            _id: "c2",
            name: "Shilpa Kayak",
            designation: "Seller | Austin",
            description: "Clear communication and steady follow-through.",
            imageUrl:
              "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
          },
          {
            _id: "c3",
            name: "John Lagoss",
            designation: "DPC Homes | Seattle",
            description: "Design ideas were practical and easy to apply.",
            imageUrl:
              "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
          },
          {
            _id: "c4",
            name: "Manny Freeman",
            designation: "Staging Designer | NYC",
            description: "Smooth collaboration, thoughtful updates.",
            imageUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
          },
          {
            _id: "c5",
            name: "Lucy",
            designation: "Buyer | Denver",
            description: "Felt supported and informed at every step.",
            imageUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
          },
        ]);
      });
  }, []);

  return (
    <section id="clients" className="section" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)", position: "relative" }}>
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="section-heading">
          <h2>Happy Clients</h2>
          <p className="muted">Honest words from people we’ve helped.</p>
        </div>
        <div className="grid" style={{ gap: "18px" }}>
          {clients.map((c, index) => (
            <ClientCard key={c._id} client={c} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientSection;

