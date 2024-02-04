import { Field } from "formik";
import React, { useEffect } from "react";

type FormikSelectProps = {
  label: string;
  list: any[];
  name: string;
};


function FormikSelect({ list, name, label }: FormikSelectProps) {

  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field as="select" className="form-select" name={name}  >
        <option value={""}>{`Seçiniz..`} </option>
        {list &&
          list.map((item, index) => (
            <option key={index} value={item[name]}>
              {item.name?item.name:item[name]}
            </option>
          ))}
      </Field>
    </div>
  );
}

export default FormikSelect;
