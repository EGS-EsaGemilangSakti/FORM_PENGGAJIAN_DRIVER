export const PLACEMENTS = [
  'DRIVER JNT TGR',
  'DRIVER JNT PKU',
  'DRIVER JNT BTN',
  'DRIVER JNT JRT SUNTER',
  'DRIVER CARGO SUKABUMI',
  'DRIVER CARGO BANDUNG',
  'DRIVER VIP',
  'DRIVER FASTRANS',
  'DRIVER CARGO CIANJUR',
  'DRIVER APL JURUMUDI',
  'DRIVER APL SEMARANG',
  'DRIVER APL BANDUNG',
] as const;

export const EMPLOYMENT_STATUSES = ['FREELANCE', 'REGULER'] as const;
export const POSITIONS = ['DRIVER SIM B1/B2 UMUM'] as const;
export const OWNERSHIP_STATUSES = ['PRIBADI', 'ORANG LAIN'] as const;
export const GENDERS = ['Laki-laki', 'Perempuan'] as const;
export const MARITAL_STATUSES = ['Menikah', 'Belum Menikah', 'Cerai Hidup', 'Cerai Mati'] as const;
export const RELIGIONS = ['Islam', 'Kristen', 'Protestan', 'Hindu', 'Buddha', 'Khonghucu'] as const;
export const PTKP_OPTIONS = [
  { value: 'tk0', label: 'Belum memiliki anak' },
  { value: 'k1', label: 'Kawin memiliki anak 1' },
  { value: 'k2', label: 'Kawin memiliki anak 2' },
  { value: 'k3', label: 'Kawin memiliki anak 3' },
  { value: 'tk1', label: 'Cerai memiliki anak 1' },
  { value: 'tk2', label: 'Cerai memiliki anak 2' },
  { value: 'tk3', label: 'Cerai memiliki anak 3' },
] as const;
