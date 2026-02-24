# Prototype Spinotek for Business

Repositori ini menampung daftar prototype dan menampilkannya sebagai card di landing page. Kontributor menambahkan satu folder proyek di root repo, lalu sistem akan meng-generate `projects.json` secara otomatis saat PR di-merge ke `main`.

---

## Mulai dari Fork & Clone
1. Fork repo ini di GitHub.
2. Clone repo hasil fork:
```bash
git clone https://github.com/<username>/prototype-spinotek.git
cd prototype-spinotek
```
3. Pastikan kamu berada di branch `main`:
```bash
git status -sb
```

---

## Alur Singkat
1. Buat folder proyek di root repo.
2. Isi `project.json` dan siapkan `card.png`.
3. Commit dan push ke fork.
4. Buat Pull Request ke repo utama.
5. Setelah PR di-merge ke `main`, GitHub Actions akan otomatis meng-update `projects.json`.
6. Card muncul di landing page.

---

## Struktur Folder

```
prototype-spinotek/
  nama-proyek-kamu/
    project.json
    card.png
    (file lain: index.html, assets, dsb)
```

Catatan:
- Folder harus di **root repo**, bukan di subfolder lain.
- Nama folder gunakan slug (huruf kecil, tanda hubung, tanpa spasi).
- Jangan gunakan nama: `script`, `asset`, `assets`, `.github`, `dist`, `public`.

---

## Format `project.json`

Contoh:
```json
{
  "name": "Nama Proyek Kamu",
  "description": "Deskripsi singkat satu-dua kalimat.",
  "icon": "rocket",
  "category": "Web App",
  "status": "COMPLETED",
  "tech": ["javascript", "tailwindcss"],
  "demo_url": "https://demo.spinotek.com/nama-proyek",
  "repo_url": "https://github.com/username/repo",
  "added_at": "2026-02-23"
}
```

Field reference:
| Field | Wajib | Keterangan |
| --- | --- | --- |
| `name` | tidak | Jika kosong, sistem pakai nama folder |
| `description` | tidak | Maks 150 karakter (boleh kosong) |
| `icon` | tidak | Emoji atau URL gambar |
| `category` | ya | `Web App` / `Mobile` / `Dashboard` / `AI` |
| `status` | ya | `COMPLETED` / `IN DEVELOPMENT` / `LIVE DEMO` |
| `tech` | tidak | Slug teknologi |
| `demo_url` | tidak | Link demo |
| `repo_url` | tidak | Link repository |
| `added_at` | tidak | Format `YYYY-MM-DD` |

Tech slug yang didukung:
`html`, `css`, `javascript`, `typescript`, `tailwindcss`, `react`, `react-native`, `vuejs`, `laravel`, `firebase`, `flutter`, `dart`, `python`, `nodejs`, `mysql`, `postgresql`, `docker`

---

## Spesifikasi `card.png`
- Ukuran: **1200 x 630 px** (rasio 16:9)
- Format: PNG atau JPG (rename jadi `card.png`)
- Maks ukuran file: 500 KB

---

## Langkah Lengkap Submit Project
1. Fork repo ini.
2. Clone repo hasil fork:
```bash
git clone https://github.com/<username>/prototype-spinotek.git
cd prototype-spinotek
```
3. Buat folder proyek di root repo:
```
nama-proyek-kamu/
```
4. Tambahkan `project.json` dan `card.png` ke dalam folder tersebut.
5. Commit dan push ke fork:
```bash
git add nama-proyek-kamu/
git commit -m "feat: add [Nama Proyek Kamu]"
git push origin main
```
6. Buat Pull Request ke branch `main` di repo utama.
7. Setelah PR di-merge, sistem akan meng-generate `projects.json` otomatis dan card muncul.

---

## Cara Kerja Otomatis
Workflow `Generate projects.json` akan berjalan saat ada push ke `main` yang menyentuh:
- `*/project.json`
- `*/card.png`
- `script/generate-projects.js`

Workflow ini akan:
1. Scan semua folder di root yang punya `project.json`.
2. Menggabungkan data menjadi `projects.json`.
3. Commit hasilnya ke `main`.

---

## Local Preview
Untuk melihat card secara lokal:
1. Jalankan generator:
```bash
node script/generate-projects.js
```
2. Jalankan server lokal:
```bash
python -m http.server 8000
```
3. Buka:
```
http://localhost:8000
```

---

## Troubleshooting
- Card tidak muncul di hosting:
  - Pastikan `projects.json` bisa diakses langsung dari URL root hosting.
  - Pastikan GitHub Pages source = `main / root`.
  - Cek Console di browser untuk error `Failed to load projects.json`.

---

## Review Process
| Tipe Contributor | Proses |
| --- | --- |
| Internal Spinotek | 1 approval -> merge |
| External / Klien | Review ketat oleh tim Spinotek |
