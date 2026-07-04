import type { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import type { PayrollFormValues } from '../../types/payroll';
import { sanitizeUpperInput } from '../../utils/sanitize';
import { FieldShell, inputClass } from './FieldShell';

export function FullNameField({ register, setValue, error }: { register: UseFormRegister<PayrollFormValues>; setValue: UseFormSetValue<PayrollFormValues>; error?: string }) {
  return (
    <FieldShell label="Nama Lengkap" error={error}>
      <input
        className={inputClass}
        autoComplete="name"
        {...register('fullName')}
        onChange={(event) => setValue('fullName', sanitizeUpperInput(event.target.value), { shouldValidate: true })}
      />
    </FieldShell>
  );
}
