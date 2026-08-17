# Frontend — Loka Studio

Landing page + form kontak + autentikasi sederhana, dibangun dengan **React (Vite)**.
Tema visual: putih & abu-abu, tipografi Space Grotesk (judul), Inter (isi), JetBrains Mono (label/data).

## Fitur Halaman

| Halaman      | Path          | Keterangan                                              |
|--------------|---------------|-----------------------------------------------------------|
| Landing      | `/`           | Hero, layanan, tentang, form kontak (publik)              |
| Login        | `/login`      | Masuk dengan email & password                              |
| Register     | `/register`   | Daftar akun baru                                            |
| Dashboard    | `/dashboard`  | (Login diperlukan) melihat daftar pesan kontak yang masuk |

## Struktur Folder

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx     # state login (token & user) via localStorage
│   ├── lib/
│   │   └── api.js              # wrapper fetch ke backend
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               # semua styling (tema putih & abu-abu)
├── index.html
├── .env.example
└── package.json
```

## 1. Konfigurasi Environment

Salin `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Isi dengan alamat backend kamu:

```
VITE_API_URL=http://localhost:4000/api
```

> Jika backend sudah dideploy (misalnya ke Railway/Render), ganti nilai ini dengan URL produksinya,
> contoh: `VITE_API_URL=https://nama-backend.up.railway.app/api`

## 2. Instalasi & Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

**Penting:** pastikan backend sudah berjalan (lihat README di folder backend) sebelum
mencoba form kontak, login, atau register — karena semua fitur tersebut memanggil API backend.

## 3. Build untuk Produksi

```bash
npm run build
```

Hasil build ada di folder `dist/`, siap di-deploy ke layanan static hosting seperti
Vercel, Netlify, atau Cloudflare Pages.

## Catatan Desain

- Palet warna sengaja dibatasi ke putih & abu-abu (lihat variabel CSS di `src/index.css`),
  dengan warna merah/hijau minimal hanya dipakai untuk pesan error/sukses pada form.
- Kartu "Status Studio" di hero adalah elemen ciri khas halaman ini — dibuat menyerupai
  panel status ringkas, bukan gradient generik.
- Semua teks di aplikasi menggunakan Bahasa Indonesia.
