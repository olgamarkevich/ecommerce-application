import React from 'react';
import type { FC } from 'react';

import style from './SignUpInput.module.css';
import type { UseFormReturn } from 'react-hook-form';
import type { FormData } from 'pages/signUp/SignUp';

interface InputProps {
  fieldI: keyof FormData;
  label: string;
  register: UseFormReturn<FormData>['register'];
  invalid: boolean;
  errorText?: string;
}

const SignUpInput: FC<InputProps> = ({
  fieldI,
  label,
  register,
  invalid,
  errorText,
}) => {
  return (
    <div className={style.form_line}>
      <label className='label'>{label}</label>
      <input {...register(fieldI)} className='input' aria-invalid={invalid} />
      <p>{errorText}</p>
    </div>
  );
};

export default SignUpInput;
