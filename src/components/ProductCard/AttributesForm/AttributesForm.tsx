import React, { type FC } from 'react';
import Select, { type SingleValue } from 'react-select';
import type { AttributeOptionsSet } from '../../../types/componentTypes';
import { useSearchParams } from 'react-router-dom';

interface AttributesFormProps {
  attributeOptions: AttributeOptionsSet;
  variantIndex: number;
  chosenOptions: Record<string, string> | undefined;
}

const AttributesForm: FC<AttributesFormProps> = (props) => {
  const [, setSearchParams] = useSearchParams();
  const { attributeOptions, variantIndex, chosenOptions } = props;

  const getOptions = (
    attributeName: string,
  ): { value: string; label: string }[] => {
    return attributeOptions[attributeName]
      ? attributeOptions[attributeName].map((value) => {
          return { value, label: value };
        })
      : [];
  };

  const getDefaultValueIndex = (
    attributeName: string,
    options: { value: string; label: string }[],
  ): number => {
    if (
      variantIndex === 0 ||
      !chosenOptions ||
      Object.keys(chosenOptions || {}).length !==
        Object.keys(attributeOptions).length
    ) {
      return 0;
    }

    const index = options
      .map((obj) => {
        return obj.value;
      })
      .indexOf(chosenOptions[attributeName]);

    return index === -1 ? 0 : index;
  };

  const changeHandler = (
    attributeName: string,
    newValue: SingleValue<{ value: string; label: string }>,
  ) => {
    if ('attributesForm' in document.forms && newValue) {
      const newParams = new URLSearchParams();
      const form = document.forms.attributesForm as HTMLFormElement;
      const elements = form.elements;

      Object.keys(attributeOptions).forEach((name) => {
        if (name !== attributeName) {
          const element = elements.namedItem(name);
          const value =
            element && 'value' in element ? element.value : undefined;

          if (value) {
            newParams.append(name, value);
          }
        } else {
          newParams.append(attributeName, newValue.value);
        }
      });

      setSearchParams(newParams);
    }
  };

  if (Object.keys(attributeOptions).length === 0) return <></>;

  return (
    <form id={'attributesForm'}>
      {Object.keys(attributeOptions).length &&
        Object.keys(attributeOptions).map((attributeName) => {
          const options = getOptions(attributeName);
          const defaultValueIndex = getDefaultValueIndex(
            attributeName,
            options,
          );

          return (
            <label
              key={attributeName}
              className='flex flex-col text-start font-f-open-sans'
            >
              <span className='w-full my-3 text-blue-950'>
                {attributeName} : {options[defaultValueIndex].value}
              </span>
              <Select
                options={options}
                defaultValue={options[defaultValueIndex]}
                onChange={(newValue) => {
                  changeHandler(attributeName, newValue);
                }}
                name={attributeName}
                className='max-w-60%'
              />
            </label>
          );
        })}
    </form>
  );
};

export default AttributesForm;
