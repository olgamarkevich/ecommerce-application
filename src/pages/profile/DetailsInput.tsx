import React from 'react';
import type { FC } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import style from './Profile.module.css';
import type { FormData } from './Details';

interface InputProps {
  fieldId: keyof FormData;
  label: string;
  register: UseFormRegister<FormData>;
  editMode: boolean;
  errorText?: string;
  type: string;
}

const DetailsInput: FC<InputProps> = ({
  label,
  editMode,
  register,
  fieldId,
  errorText,
  type,
}) => {
  return (
    <div className={style.profile_line}>
      <div className={style.profile_line_l}>
        <div>{label}</div>
      </div>

      <div className={style.profile_line_r}>
        <input type={type} disabled={editMode} {...register(fieldId)} />
        {!editMode && <p>{errorText}</p>}
      </div>
    </div>
  );
};

export default DetailsInput;
