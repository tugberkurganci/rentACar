import { Field } from 'formik';
import React from 'react';

type FormikSelectProps = {
  list: any[];
  name: string;
};

function FormikSelect({ list, name }: FormikSelectProps) {
  return (
    <Field as="select" className="form-select" name={name}>
        <option value={""}>{`${name} seçin` } </option>
      {list && list.map((item, index) => (
        <option key={index} value={item[name]}>
          {item[name]}
        </option>
      ))}
    </Field>
  );
}

export default FormikSelect;

