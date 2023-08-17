import React from 'react';
import type { FC } from 'react';

import style from './SignUpInput.module.css';
import type { UseFormRegister } from 'react-hook-form';
import type { FormData } from 'pages/signUp/SignUp';

interface InputProps {
  fieldId: keyof FormData;
  label: string;
  register: UseFormRegister<FormData>;
  invalid: boolean;
  errorText?: string;
}

const SignUpInput: FC<InputProps> = ({
  fieldId,
  label,
  register,
  invalid,
  errorText,
}) => {
  return (
    <div className={style.form_line}>
      <label className='label'>{label}</label>
      <input {...register(fieldId)} className='input' aria-invalid={invalid} />
      <p>{errorText}</p>
    </div>
  );
};

export default SignUpInput;
