import { useState } from "react";
import { api } from "../lib/api";

const SERVICES = [
  {
    tag: "Desain",
    title: "Desain antarmuka",
    desc: "Rancangan visual yang rapi dan mudah dipakai, disesuaikan dengan karakter bisnis kamu — bukan templat generik.",
  },
  {
    tag: "Pengembangan",
    title: "Pengembangan web",
    desc: "Website dan aplikasi web yang dibangun dengan kode yang bersih, cepat diakses, dan mudah dikembangkan lebih lanjut.",
  },
  {
    tag: "Dukungan",
    title: "Pendampingan pasca-rilis",
    desc: "Bantuan pemeliharaan, perbaikan, dan penyesuaian setelah website kamu diluncurkan ke publik.",
  },
];

const STATS = [
  { value: "6+", label: "tahun beroperasi" },
  { value: "40+", label: "proyek selesai" },
  { value: "<24 jam", label: "waktu respon rata-rata" },
];

export default function Landing() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      await api.sendContact(form);
      setStatus({ state: "success", message: "Pesan terkirim. Kami akan membalas melalui email dalam 1x24 jam." });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  }

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">Studio digital untuk bisnis kecil &amp; menengah</p>
            <h1>
              Website yang jelas,
              <br />
              tanpa basa-basi.
            </h1>
            <p className="hero__lead">
              Loka Studio membantu bisnis kecil dan menengah punya website yang cepat, rapi, dan enak dipakai —
              dari halaman depan sampai sistem di baliknya.
            </p>
            <div className="hero__actions">
              <a href="#kontak" className="btn btn--dark btn--lg">
                Mulai proyek
              </a>
              <a href="#layanan" className="btn btn--ghost btn--lg">
                Lihat layanan
              </a>
            </div>
          </div>

          <aside className="status-card" aria-label="Status penerimaan proyek">
            <div className="status-card__row status-card__row--header">
              <span>Status Studio</span>
              <span className="status-card__dot" aria-hidden="true" />
            </div>
            <div className="status-card__row">
              <span>Menerima proyek baru</span>
              <span className="status-card__value">Ya</span>
            </div>
            <div className="status-card__row">
              <span>Slot bulan ini</span>
              <span className="status-card__value">2 tersisa</span>
            </div>
            <div className="status-card__row">
              <span>Respon rata-rata</span>
              <span className="status-card__value">&lt; 24 jam</span>
            </div>
            <div className="status-card__row">
              <span>Mulai kerja sama</span>
              <span className="status-card__value">1–2 minggu</span>
            </div>
          </aside>
        </div>
      </section>

      {/* LAYANAN */}
      <section className="section" id="layanan">
        <div className="container">
          <p className="eyebrow">Layanan</p>
          <h2>Yang bisa kami kerjakan</h2>
          <div className="cards">
            {SERVICES.map((s) => (
              <article className="card" key={s.title}>
                <p className="card__tag">{s.tag}</p>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TENTANG */}
      <section className="section section--soft" id="tentang">
        <div className="container about">
          <div className="about__copy">
            <p className="eyebrow">Tentang</p>
            <h2>Studio kecil, kerja fokus</h2>
            <p>
              Kami tim kecil yang sengaja tidak mengambil banyak proyek sekaligus, supaya tiap website yang kami
              buat benar-benar diperhatikan detailnya — dari kecepatan muat halaman sampai kejelasan tulisan di
              tombol.
            </p>
            <p>
              Cocok untuk bisnis yang butuh website profesional tanpa proses yang berbelit, dengan komunikasi yang
              jelas dari awal sampai selesai.
            </p>
          </div>
          <dl className="stats">
            {STATS.map((s) => (
              <div className="stats__item" key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* KONTAK */}
      <section className="section" id="kontak">
        <div className="container contact">
          <div className="contact__info">
            <p className="eyebrow">Kontak</p>
            <h2>Ceritakan rencana kamu</h2>
            <p>
              Isi form di samping, atau kirim email langsung ke{" "}
              <a href="mailto:halo@lokastudio.id">halo@lokastudio.id</a>. Kami akan membalas dalam waktu 1x24 jam
              pada hari kerja.
            </p>
            <ul className="contact__list">
              <li>
                <span>Email</span>
                halo@lokastudio.id
              </li>
              <li>
                <span>Lokasi</span>
                Bekerja jarak jauh, melayani seluruh Indonesia
              </li>
              <li>
                <span>Jam kerja</span>
                Senin–Jumat, 09.00–17.00 WIB
              </li>
            </ul>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <label>
              Nama
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Nama lengkap"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="nama@email.com"
              />
            </label>
            <label>
              No. WhatsApp
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
              />
            </label>
            <label>
              Pesan
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Ceritakan singkat tentang proyek kamu..."
              />
            </label>

            <button type="submit" className="btn btn--dark btn--lg" disabled={status.state === "loading"}>
              {status.state === "loading" ? "Mengirim..." : "Kirim pesan"}
            </button>

            {status.state === "success" && <p className="form-note form-note--success">{status.message}</p>}
            {status.state === "error" && <p className="form-note form-note--error">{status.message}</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
