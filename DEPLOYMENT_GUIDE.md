# Deployment Guide

## 1. Siapkan Google Spreadsheet

1. Buat spreadsheet baru.
2. Salin ID dari URL spreadsheet.
3. ID berada di antara `/d/` dan `/edit`.

## 2. Siapkan Google Drive

1. Gunakan folder utama Drive:
   `1j6ekZmnGRuXHWOwOlhdxI-GXNyxn9DTP`
2. Gunakan folder dokumen:
   - KTP: `1WPADF768tMItpMI8AnD7egbuahWi8gYh`
   - SIM: `1INjA847wVYT7UQSqbRbw9qsyPVhn1PV8`
   - Surat Kuasa: `1ne_SkRGK4wTezLTI31Zd72X6qfabsZCx`
   - Kartu Keluarga: `1Go22NaHARwp1QfiXGFgWkuCQO94Cfe61`
3. Folder `QR_CODES` akan dibuat otomatis di folder utama saat `setup()` berjalan.

## 3. Siapkan Apps Script

1. Buka `https://script.google.com`.
2. Buat project baru.
3. Buat file:
   - `Config.gs`
   - `Setup.gs`
   - `Code.gs`
4. Salin isi file dari folder `apps-script`.

## 4. Isi Script Properties

Masuk ke Project Settings, tambahkan:

```text
API_CO_ID_KEY=api_key_api_co_id
ROOT_FOLDER_ID=1j6ekZmnGRuXHWOwOlhdxI-GXNyxn9DTP
SPREADSHEET_ID=1GMKHOjPKkwGg_IMwOZNagRoH-6-2VNREY_XHMIGZJ3M
KTP_FOLDER_ID=1WPADF768tMItpMI8AnD7egbuahWi8gYh
SIM_FOLDER_ID=1INjA847wVYT7UQSqbRbw9qsyPVhn1PV8
SURAT_KUASA_FOLDER_ID=1ne_SkRGK4wTezLTI31Zd72X6qfabsZCx
KARTU_KELUARGA_FOLDER_ID=1Go22NaHARwp1QfiXGFgWkuCQO94Cfe61
ALLOWED_ORIGINS=http://localhost:5173,https://egs-esagemilangsakti.github.io
```

`API_CO_ID_KEY` diisi di Script Properties Google Apps Script. Jangan isi API key di React, `.env` frontend, atau hardcode di file `.gs`. Gunakan origin final GitHub Pages yang benar untuk production.

## 5. Jalankan Setup

1. Pilih fungsi `setup`.
2. Klik Run.
3. Berikan permission.
4. Pastikan sheet `Payroll Submissions` dan `Audit Log` berhasil dibuat.

## 6. Publish Web App

1. Klik Deploy.
2. Pilih New deployment.
3. Type: Web app.
4. Execute as: Me.
5. Who has access: Anyone.
6. Klik Deploy.
7. Salin Web App URL.

## 7. Konfigurasi Frontend

Buat `.env.local`:

```env
VITE_API_URL=https://script.google.com/macros/s/WEB_APP_DEPLOYMENT_ID/exec
```

## 8. Run dan Build

```bash
npm install
npm run dev
npm run build
```

## 9. Deploy GitHub Pages

1. Push source code ke GitHub pada branch `main`.
2. Di repository GitHub, buka Settings -> Pages.
3. Pada Build and deployment, pilih Source: GitHub Actions.
4. Workflow `.github/workflows/deploy-pages.yml` akan menjalankan `npm ci` dan `npm run build`.
5. Setelah deploy selesai, salin URL GitHub Pages, contoh `https://username.github.io/nama-repo`.
6. Masukkan origin GitHub Pages ke Script Properties `ALLOWED_ORIGINS`.

Contoh `ALLOWED_ORIGINS` setelah GitHub Pages aktif:

```text
http://localhost:5173,https://egs-esagemilangsakti.github.io
```

Jika GitHub Pages memakai path repository seperti `https://username.github.io/form-penggajian/`, origin yang dimasukkan tetap hanya:

```text
https://username.github.io
```

Setelah `ALLOWED_ORIGINS` diisi dengan origin GitHub Pages, deploy Apps Script sebagai Web App dan salin URL Web App ke variable GitHub repository.

Di GitHub repository, buka Settings -> Secrets and variables -> Actions -> Variables, lalu buat:

```text
VITE_API_URL=https://script.google.com/macros/s/WEB_APP_DEPLOYMENT_ID/exec
```
