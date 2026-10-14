# Mischievous Love 💗

Mini-game Next.js App Router untuk menyemangati pasangan: kejar tombol yang kabur di seluruh layar, lalu buka pesan cinta kecil di akhir. Tanpa backend, database, API route, analytics, font/gambar eksternal, atau environment variable. Berjalan di mobile dan desktop.

## Prasyarat

- **Node.js 20.9.0 atau lebih baru** (direkomendasikan Node.js 22 LTS)
- npm, dan koneksi internet untuk **pertama kali** memasang dependency

## Jalankan di komputer

1. Extract ZIP sehingga folder `mischievous-love/` terbentuk.
2. Buka terminal pada folder project:

   ```bash
   cd mischievous-love
   npm install
   npm run dev
   ```

3. Buka [http://localhost:3000](http://localhost:3000).

## Script

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Menjalankan production build |
| `npm run lint` | ESLint (Next.js Core Web Vitals) |
| `npm test` | Node built-in test runner untuk fungsi murni |

## Deploy ke Vercel

1. Push folder project ke repository GitHub.
2. Import repository melalui dashboard Vercel, pilih framework **Next.js** jika tidak terdeteksi otomatis.
3. Root Directory = folder yang berisi `package.json`. Biarkan Build Command default (`next build`). File `vercel.json` memastikan instalasi memakai `npm install`.
4. **Tidak perlu** mengisi environment variable. Pilih **Deploy** dan bagikan URL HTTPS-nya.

## Ubah konten

- `lib/game.js`: **`PLAYER_NAME`** (nama yang muncul di ending, ganti sesukamu), `DIALOGS` (12 kalimat jahil), `ENDING_MESSAGE` (pesan terakhir), `MIN_CLICKS` / `MAX_CLICKS` (batas target). `generateTarget()` menggunakan rumus yang ditentukan spesifikasi: `Math.floor(Math.random() * 5) + 6`; jika ingin mengubah batas, sesuaikan rumus dan test.
- `components/SurpriseEnding.jsx`: tampilan layar ending.
- `components/LoveIllustration.jsx`: ilustrasi SVG internal.
- `app/globals.css`: warna pastel, layout, animasi, responsivitas.
- `app/page.js`: transisi layar, state, lock klik, timer fake catch.

## Desain teknis

- Target klik dibuat **satu kali per sesi** di `startSession()`, disimpan bersama progres dalam React state dan ref untuk guard sinkron.
- Setiap event `onClick` yang valid menambah progres **sekali**, lalu lock ref menolak event lain hingga tombol pindah. Touch hanya mengandalkan `click` standar (tidak ada handler touch yang menduplikasi hitungan).
- Fake catch setiap klik valid ke-3 yang **bukan** klik terakhir: input terkunci 650 ms, lalu tombol berpindah dan lock dilepas. Fake catch tidak menambah progres selain satu klik valid yang memicunya.
- Area permainan terpisah dari progress dan dialog. Posisi dihitung dari `clientWidth/clientHeight` area dan `offsetWidth/offsetHeight` tombol, dengan padding. `ResizeObserver` dan listener resize menangani rotasi/perubahan ukuran.
- Semua timer dibersihkan saat sesi baru, keluar menuju ending, serta saat unmount. Dialog tidak intercept klik (`pointer-events: none`) dan hilang otomatis.
- Animasi dimatikan dengan `prefers-reduced-motion: reduce`; kontrol dapat diakses via keyboard, dengan fokus terlihat.

## Acceptance checklist dan hasil pengujian

| Kriteria | Implementasi | Verifikasi |
| --- | --- | --- |
| Start Screen pastel + tombol Start | ✅ | Perlu uji browser |
| Nama wajib, whitespace ditolak, trim, max 30 | ✅ | Perlu uji browser |
| Target angka 6–10, sekali per sesi | ✅ | Unit test |
| Progres tepat satu per klik valid | ✅ Guard sinkron | Perlu uji interaksi browser |
| Tombol tidak keluar area, remeasure saat resize | ✅ | Unit test posisi; perlu uji browser |
| Fake catch non-terminal, tidak mengganti progres | ✅ | Unit test kebijakan; perlu uji browser |
| Dialog 12 variasi tanpa pengulangan berurutan | ✅ | Unit test |
| Menang hanya saat target, input dihentikan | ✅ | Perlu uji browser |
| Nama dan pesan exact pada ending | ✅ | Unit test pesan; perlu uji browser |
| Play Again buat target baru, reset state | ✅ | Perlu uji browser |
| Responsif, touch >=44px, no overflow | ✅ CSS | Perlu uji browser |
| Tanpa backend/database/network eksternal | ✅ | Pemeriksaan source |
| Production build | — | Jalankan `npm run build` pada mesin ber-internet |

> **Catatan lingkungan pembuatan:** pengujian fungsi murni dilakukan dengan Node.js; registry npm tidak dapat diakses dari sandbox pembuatan (`EAI_AGAIN`/`ENOTCACHED`), sehingga instalasi, build, dan ESLint **belum dapat diverifikasi**. Karena itu, `package-lock.json` yang disertakan adalah **lockfile awal (root dependencies saja)**, bukan lockfile transitive lengkap. `npm install` pada mesin dengan internet akan menyelesaikan dan memperbaruinya. Setelah itu commit lockfile hasil instalasi dan jalankan `npm run build` sebelum deploy; **jangan memakai `npm ci` sampai lockfile dilengkapi**.
