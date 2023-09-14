import * as yup from 'yup';
import dayjs from 'dayjs';

interface CountryZipData {
  countryName: string;
  countryCode: string;
  zipRegExp: RegExp;
}

export const countryZipItems: CountryZipData[] = [
  {
    countryName: 'United States',
    countryCode: 'US',
    zipRegExp: /^\d{5}(?:-?\d{4})?$/,
  },
  {
    countryName: 'Germany',
    countryCode: 'DE',
    zipRegExp: /^\d{5}$/,
  },
];

export const countryCodes = countryZipItems.map((item) => {
  return item.countryCode;
});

export const email = { email: yup.string().email().required() };

export const isBillingTheSame = { isBillingTheSame: yup.boolean() };

const passwordYup = yup
  .string()
  .required()
  .matches(/^\S.*\S$/, 'must not Contain leading or trailing whitespace')
  .matches(/^(?=.*[a-z])/, 'must Contain One Lowercase Character')
  .matches(/^(?=.*[A-Z])/, 'must Contain One Uppercase Character')
  .matches(/^(?=.*[0-9])/, 'must Contain One Number Character')
  .min(8);

export const password = {
  password: passwordYup,
};

export const newPassword = {
  newPassword: passwordYup,
};

export const confirmPassword = {
  confirmPassword: passwordYup.oneOf(
    [yup.ref('newPassword')],
    'Your new password and confirmation password do not match',
  ),
};

export const firstname = {
  firstname: yup
    .string()
    .required()
    .matches(
      /^[А-Яа-я-a-zA-ZäöüßÄÖÜ\s-]+$/,
      'only alphabets are allowed for this field ',
    )
    .min(1),
};

export const lastname = {
  lastname: yup
    .string()
    .required()
    .matches(
      /^[А-Яа-я-a-zA-ZäöüßÄÖÜ\s-]+$/,
      'only alphabets are allowed for this field ',
    )
    .min(1),
};

export const dateOfBirth = {
  dateOfBirth: yup
    .string()
    .required()
    .typeError('date of birth is required')
    .test('DOB', 'you must be at least 13 years', (value) => {
      return dayjs().diff(dayjs(value), 'years') >= 13;
    }),
};

export const street = {
  street: yup.string().required().min(1),
};

export const city = {
  city: yup
    .string()
    .required()
    .matches(
      /^[А-Яа-я-a-zA-ZäöüßÄÖÜ\s-]+$/,
      'only alphabets are allowed for this field ',
    )
    .min(1),
};

export const postalCode = {
  postalCode: yup
    .string()
    .when('country', ([country], schema) => {
      const zipRegExp =
        countryZipItems.find((item) => {
          return item.countryCode === country;
        })?.zipRegExp || new RegExp(/.*/);

      return schema.matches(zipRegExp, `invalid postalCode for ${country}`);
    })
    .required(),
};

export const country = {
  country: yup
    .string()
    .oneOf(countryCodes, 'country is a required field')
    .required()
    .min(1),
};

export const cityBilling = {
  cityBilling: yup
    .string()
    .matches(
      /^[А-Яа-я-a-zA-ZäöüßÄÖÜ\s-]*$/,
      'only alphabets are allowed for this field ',
    )
    .when('isBillingTheSame', (isBillingTheSame, schema) => {
      return isBillingTheSame[0] ? schema : schema.required();
    }),
};

export const streetBilling = {
  streetBilling: yup
    .string()
    .when('isBillingTheSame', (isBillingTheSame, schema) => {
      return isBillingTheSame[0] ? schema : schema.required();
    }),
};

export const countryBilling = {
  countryBilling: yup
    .string()
    .when('isBillingTheSame', (isBillingTheSame, schema) => {
      return isBillingTheSame[0]
        ? schema
        : schema.required().oneOf(countryCodes, 'country is a required field');
    }),
};

export const postalCodeBilling = {
  postalCodeBilling: yup
    .string()
    .when('countryBilling', ([countryBilling], schema) => {
      const zipRegExp =
        countryZipItems.find((item) => {
          return item.countryCode === countryBilling;
        })?.zipRegExp || new RegExp(/.*/);

      return schema.matches(
        zipRegExp,
        `invalid postalCode for ${countryBilling}`,
      );
    })
    .when('isBillingTheSame', (isBillingTheSame, schema) => {
      return isBillingTheSame[0] ? schema : schema.required();
    }),
};
