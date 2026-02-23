# Cara Submit Prototype ke Spinotek for Business

Repositori ini memakai alur manual (mirip `spinotek-hima-ti-polhas`). Prototype yang di-merge ke `main` belum otomatis muncul sebagai card. Tim akan mendaftarkan proyek ke `projects.json` setelah PR disetujui.

---

## Langkah-Langkah Submission

### 1. Fork & Clone
```bash
git clone https://github.com/Spinotek-Organization/prototype-spinotek.git
cd prototype-spinotek
```

### 2. Buat folder proyek di root repo

Gunakan slug (huruf kecil, pisahkan dengan tanda hubung):
```
prototype-spinotek/
  nama-proyek-kamu/     <- buat folder di sini
    index.html          <- wajib
    card.png            <- disarankan
    (file lain)         <- bebas, source code, docs, dsb
```

Catatan:
- Jangan beri nama folder: `script`, `asset`, `assets`, `.github`, `dist`, `public`
- `index.html` wajib agar proyek bisa dibuka langsung dari folder
- `card.png` disarankan supaya thumbnail card tampil bagus

### 3. Siapkan card.png (disarankan)
- Ukuran: 1200 x 630 px (rasio 16:9)
- Format: PNG atau JPG (rename ke `card.png`)
- Maks ukuran file: 500 KB

### 4. Push & buat Pull Request
```bash
git add nama-proyek-kamu/
git commit -m "feat: add [Nama Proyek Kamu]"
git push origin main
```

Lalu buka PR ke branch `main`. Isi metadata proyek di deskripsi PR (lihat template PR).

---

## Cara Kerja Manual
Setelah PR di-merge:
1. Tim meninjau folder proyek.
2. Tim mendaftarkan proyek ke `projects.json`.
3. Landing page menampilkan card berdasarkan data di `projects.json`.

Tidak perlu edit `index.html`, `style.css`, atau file sistem lainnya.

---

## Review Process
| Tipe Contributor | Proses |
|-----------------|--------|
| Internal Spinotek | 1 approval -> merge |
| External / Klien | Review ketat oleh tim Spinotek |
