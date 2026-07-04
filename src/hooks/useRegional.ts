import { useQuery } from '@tanstack/react-query';
import districtsJson from '../../data/districts.json';
import provincesJson from '../../data/provinces.json';
import regenciesJson from '../../data/regencies.json';
import villagesJson from '../../data/villages.json';
import type { DistrictOption, ProvinceOption, RegencyOption, VillageOption } from '../types/regional';

const provinces = provincesJson as ProvinceOption[];
const regencies = regenciesJson as RegencyOption[];
const districts = districtsJson as DistrictOption[];
const villages = villagesJson as VillageOption[];

export function useProvinces() {
  return useQuery({
    queryKey: ['regional', 'provinces'],
    queryFn: () => provinces,
    staleTime: 24 * 60 * 60 * 1000,
  });
}

export function useRegencies(provinceCode: string) {
  return useQuery({
    queryKey: ['regional', 'regencies', provinceCode],
    queryFn: () => regencies.filter((regency) => regency.province_code === provinceCode),
    enabled: provinceCode.length === 2,
    staleTime: 24 * 60 * 60 * 1000,
  });
}

export function useDistricts(regencyCode: string) {
  return useQuery({
    queryKey: ['regional', 'districts', regencyCode],
    queryFn: () => districts.filter((district) => district.regency_code === regencyCode),
    enabled: regencyCode.length === 4,
    staleTime: 24 * 60 * 60 * 1000,
  });
}

export function useVillages(districtCode: string) {
  return useQuery({
    queryKey: ['regional', 'villages', districtCode],
    queryFn: () => villages.filter((village) => village.district_code === districtCode),
    enabled: districtCode.length === 6,
    staleTime: 24 * 60 * 60 * 1000,
  });
}

export function useBirthRegencies() {
  return useQuery({
    queryKey: ['regional', 'birth-regencies'],
    queryFn: () => regencies,
    staleTime: 24 * 60 * 60 * 1000,
  });
}
