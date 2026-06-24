const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();
const DEFAULT_ROOT_FOLDER_ID = '1j6ekZmnGRuXHWOwOlhdxI-GXNyxn9DTP';
const DEFAULT_SPREADSHEET_ID = '1GMKHOjPKkwGg_IMwOZNagRoH-6-2VNREY_XHMIGZJ3M';
const DEFAULT_KTP_FOLDER_ID = '1WPADF768tMItpMI8AnD7egbuahWi8gYh';
const DEFAULT_SIM_FOLDER_ID = '1INjA847wVYT7UQSqbRbw9qsyPVhn1PV8';
const DEFAULT_SURAT_KUASA_FOLDER_ID = '1ne_SkRGK4wTezLTI31Zd72X6qfabsZCx';
const DEFAULT_KARTU_KELUARGA_FOLDER_ID = '1Go22NaHARwp1QfiXGFgWkuCQO94Cfe61';
const ROOT_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('ROOT_FOLDER_ID') || DEFAULT_ROOT_FOLDER_ID;
const SPREADSHEET_ID = SCRIPT_PROPERTIES.getProperty('SPREADSHEET_ID') || DEFAULT_SPREADSHEET_ID;
const KTP_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('KTP_FOLDER_ID') || DEFAULT_KTP_FOLDER_ID;
const SIM_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('SIM_FOLDER_ID') || DEFAULT_SIM_FOLDER_ID;
const SURAT_KUASA_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('SURAT_KUASA_FOLDER_ID') || DEFAULT_SURAT_KUASA_FOLDER_ID;
const KARTU_KELUARGA_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('KARTU_KELUARGA_FOLDER_ID') || DEFAULT_KARTU_KELUARGA_FOLDER_ID;
const QR_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('QR_FOLDER_ID') || '';
const DEFAULT_ALLOWED_ORIGINS = 'http://localhost:5173,https://form.cargo.jawabarat.ptesagemilangsakti.com';
const ALLOWED_ORIGINS = (SCRIPT_PROPERTIES.getProperty('ALLOWED_ORIGINS') || DEFAULT_ALLOWED_ORIGINS).split(',').map(function (origin) {
  return origin.trim();
}).filter(String);
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = {
  ktp: ['application/pdf', 'image/jpeg', 'image/png'],
  sim: ['application/pdf', 'image/jpeg', 'image/png'],
  suratKuasa: ['application/pdf', 'image/jpeg', 'image/png'],
  kartuKeluarga: ['application/pdf', 'image/jpeg', 'image/png']
};
