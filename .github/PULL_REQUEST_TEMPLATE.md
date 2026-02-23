## Checklist Submission Prototype

### Struktur Folder
- [ ] Folder proyek dibuat langsung di root repo (bukan di dalam subfolder lain)
- [ ] Nama folder menggunakan slug (huruf kecil, tanda hubung, tanpa spasi)
- [ ] Nama folder bukan salah satu dari: `script`, `asset`, `assets`, `.github`, `dist`, `public`

### File Wajib
- [ ] File `project.json` ada di dalam folder proyek
- [ ] Field `category` terisi (`Web App` / `Mobile` / `Dashboard` / `AI`)
- [ ] Field `status` terisi (`COMPLETED` / `IN DEVELOPMENT` / `LIVE DEMO`)
- [ ] Field `added_at` terisi format `YYYY-MM-DD`

### Thumbnail
- [ ] File `card.png` ada di dalam folder proyek
- [ ] Ukuran: 1200 x 630 px (rasio 16:9)
- [ ] Ukuran file: <= 500 KB

---

## Metadata Proyek

**Nama Proyek (opsional, jika kosong pakai nama folder):** <!-- isi -->

**Kategori:** <!-- Web App / Mobile / Dashboard / AI -->

**Status:** <!-- COMPLETED / IN DEVELOPMENT / LIVE DEMO -->

**Deskripsi Singkat (opsional):** <!-- satu-dua kalimat (<= 150 karakter) -->

**Tech:** <!-- contoh: javascript, tailwindcss, laravel -->

**Demo URL:** <!-- kosongkan jika belum ada -->

**Repo URL:** <!-- kosongkan jika belum ada -->

**Tanggal (YYYY-MM-DD):** <!-- contoh: 2026-02-23 -->

---

## Contoh `project.json`
```json
{
  "name": "Nama Proyek Kamu",
  "description": "Deskripsi singkat satu-dua kalimat.",
  "icon": "rocket",
  "category": "Web App",
  "status": "COMPLETED",
  "tech": ["javascript", "tailwindcss"],
  "demo_url": null,
  "repo_url": null,
  "added_at": "2026-02-23"
}
```
