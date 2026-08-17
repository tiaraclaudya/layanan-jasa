import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

function formatDate(iso) {
  return new Date(iso).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// Ubah nomor lokal (mis. 08123456789) menjadi format internasional untuk wa.me (mis. 628123456789)
function toWhatsAppNumber(phone) {
  const digits = (phone || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("62")) return digits;
  return digits;
}

function waLink(contact) {
  const number = toWhatsAppNumber(contact.phone);
  if (!number) return null;
  const text = `Halo ${contact.name}, terima kasih sudah menghubungi Loka Studio. Terkait pesan Anda: "${contact.message}"`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export default function Dashboard() {
  const { token, user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [status, setStatus] = useState({ state: "loading", message: "" });

  useEffect(() => {
    api
      .listContacts(token)
      .then((data) => {
        setContacts(data.contacts);
        setStatus({ state: "idle", message: "" });
      })
      .catch((err) => setStatus({ state: "error", message: err.message }));
  }, [token]);

  return (
    <main className="dashboard">
      <div className="container">
        <div className="dashboard__header">
          <div>
            <p className="eyebrow">Dasbor</p>
            <h1>Pesan masuk</h1>
            <p className="dashboard__sub">
              Masuk sebagai <strong>{user?.email}</strong>
            </p>
          </div>
          <span className="pill">{contacts.length} pesan</span>
        </div>

        {status.state === "loading" && <p className="page-loading">Memuat pesan...</p>}
        {status.state === "error" && <p className="form-note form-note--error">{status.message}</p>}

        {status.state === "idle" && contacts.length === 0 && (
          <div className="empty-state">
            <p>Belum ada pesan masuk.</p>
            <p className="empty-state__sub">Pesan dari form kontak di halaman utama akan muncul di sini.</p>
          </div>
        )}

        {status.state === "idle" && contacts.length > 0 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Pesan</th>
                  <th>Waktu</th>
                  <th>WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => {
                  const link = waLink(c);
                  return (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td className="table-message">{c.message}</td>
                      <td className="mono">{formatDate(c.created_at)}</td>
                      <td>
                        {link ? (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--wa"
                          >
                            Chat WA
                          </a>
                        ) : (
                          <span className="table-message">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
