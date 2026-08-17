import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      const data = await api.register(form);
      loginWithToken(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Daftar</p>
        <h1>Buat akun baru</h1>
        <p className="auth-card__sub">Daftar untuk bisa masuk dan melihat pesan kontak yang masuk.</p>

        <form onSubmit={handleSubmit}>
          <label>
            Nama
            <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Nama lengkap" />
          </label>
          <label>
            Email
            <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="nama@email.com" />
          </label>
          <label>
            Password
            <input type="password" name="password" required minLength={6} value={form.password} onChange={handleChange} placeholder="Minimal 6 karakter" />
          </label>

          <button type="submit" className="btn btn--dark btn--lg btn--block" disabled={status.state === "loading"}>
            {status.state === "loading" ? "Memproses..." : "Daftar"}
          </button>

          {status.state === "error" && <p className="form-note form-note--error">{status.message}</p>}
        </form>

        <p className="auth-card__footer">
          Sudah punya akun? <Link to="/login">Masuk di sini</Link>
        </p>
      </div>
    </main>
  );
}
