# Cara Submit Prototype ke Spinotek for Business

Repositori ini menggunakan sistem GitHub-as-CMS. Prototype yang di-merge ke `main` akan otomatis muncul sebagai card di landing page.

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
    project.json        <- wajib
    card.png            <- wajib
    (file lain)         <- bebas, source code, docs, dsb
```

Catatan:
- Jangan beri nama folder: `script`, `asset`, `assets`, `.github`, `dist`, `public`
- `project.json` wajib untuk metadata card
- `card.png` wajib agar thumbnail tampil konsisten

### 3. Siapkan project.json

```json
{
  "name": "Nama Proyek Kamu",
  "description": "Deskripsi singkat satu-dua kalimat.",
  "icon": "rocket",
  "category": "Web App",
  "status": "COMPLETED",
  "tech": ["javascript", "tailwindcss"],
  "demo_url": "https://link-demo-kamu.com",
  "repo_url": "https://github.com/username/repo",
  "added_at": "2026-02-23"
}
```

#### Field Reference
| Field | Tipe | Wajib | Keterangan |
|-------|------|-------|------------|
| `name` | string | tidak | Jika kosong, sistem akan pakai nama folder |
| `description` | string | tidak | Maks 150 karakter (boleh kosong) |
| `icon` | string | tidak | Icon teks atau emoji sederhana |
| `category` | string | ya | `Web App` / `Mobile` / `Dashboard` / `AI` |
| `status` | string | ya | `COMPLETED` / `IN DEVELOPMENT` / `LIVE DEMO` |
| `tech` | array | tidak | Slug teknologi (lihat daftar di bawah) |
| `demo_url` | string | tidak | URL demo langsung |
| `repo_url` | string | tidak | URL repositori proyek |
| `added_at` | string | tidak | Format `YYYY-MM-DD` |

#### Tech Slug yang Didukung
`javascript`, `typescript`, `tailwindcss`, `react`, `react-native`, `vuejs`, `laravel`, `firebase`, `flutter`, `dart`, `python`, `nodejs`, `mysql`, `postgresql`, `docker`

### 4. Siapkan card.png
- Ukuran: 1200 x 630 px (rasio 16:9)
- Format: PNG atau JPG (rename ke `card.png`)
- Maks ukuran file: 500 KB

### 5. Push & buat Pull Request
```bash
git add nama-proyek-kamu/
git commit -m "feat: add [Nama Proyek Kamu]"
git push origin main
```

Lalu buka PR ke branch `main`. Gunakan template PR yang tersedia.

---

## Cara Kerja Otomatis
Setelah PR di-merge:
1. GitHub Actions berjalan otomatis.
2. Sistem mencari folder root yang punya `project.json`.
3. `projects.json` dibuat ulang.
4. Landing page menampilkan card dari `projects.json`.

Tidak perlu edit `index.html`, `style.css`, atau file sistem lainnya.

---

## Review Process
| Tipe Contributor | Proses |
|-----------------|--------|
| Internal Spinotek | 1 approval -> merge |
| External / Klien | Review ketat oleh tim Spinotek |
