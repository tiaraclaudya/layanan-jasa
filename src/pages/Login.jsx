import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      const data = await api.login(form);
      loginWithToken(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Masuk</p>
        <h1>Selamat datang kembali</h1>
        <p className="auth-card__sub">Masuk untuk melihat pesan yang masuk dari form kontak.</p>

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="nama@email.com" />
          </label>
          <label>
            Password
            <input type="password" name="password" required value={form.password} onChange={handleChange} placeholder="••••••••" />
          </label>

          <button type="submit" className="btn btn--dark btn--lg btn--block" disabled={status.state === "loading"}>
            {status.state === "loading" ? "Memproses..." : "Masuk"}
          </button>

          {status.state === "error" && <p className="form-note form-note--error">{status.message}</p>}
        </form>

        <p className="auth-card__footer">
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </p>
      </div>
    </main>
  );
}
