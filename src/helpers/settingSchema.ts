import * as yup from 'yup';

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

export const password = {
  password: yup
    .string()
    .required()
    .trim('password cannot include leading and trailing spaces')
    .matches(/^(?=.*[a-z])/, 'must Contain One Lowercase Character')
    .matches(/^(?=.*[A-Z])/, 'must Contain One Uppercase Character')
    .matches(/^(?=.*[0-9])/, 'must Contain One Number Character')
    .min(8),
};

export const firstname = {
  firstname: yup
    .string()
    .required()
    .matches(
      /^[a-zA-ZäöüßÄÖÜ\s-]+$/,
      'only alphabets are allowed for this field ',
    )
    .min(1),
};

export const lastname = {
  lastname: yup
    .string()
    .required()
    .matches(
      /^[a-zA-ZäöüßÄÖÜ\s-]+$/,
      'only alphabets are allowed for this field ',
    )
    .min(1),
};

export const dateOfBirth = {
  dateOfBirth: yup
    .date()
    .nullable()
    .typeError('date of birth is required')
    .max(
      new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000),
      'you must be at least 18 years',
    ),
};

export const street = {
  street: yup.string().required().min(1),
};

export const city = {
  city: yup
    .string()
    .required()
    .matches(
      /^[a-zA-ZäöüßÄÖÜ\s-]+$/,
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
      /^[a-zA-ZäöüßÄÖÜ\s-]*$/,
      'only alphabets are allowed for this field ',
    ),
};

export const streetBilling = {
  streetBilling: yup.string(),
};

export const countryBilling = {
  countryBilling: yup.string(),
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
    }),
};
