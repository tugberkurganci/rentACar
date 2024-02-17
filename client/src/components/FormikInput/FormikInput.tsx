import React from "react";
import { Field, ErrorMessage } from "formik";
import { number } from "yup";

type FormikInputProps = {
  label?: string;
  name: string;
  type?: string;
  value?: string | number | Date | null;
  onChange?: any;
};

const FormikInput: React.FC<FormikInputProps> = ({
  value,
  label,
  name,
  type,
  onChange,
}) => {
  return (
    <>
      {!onChange && (
        <div className="mb-3">
          <label htmlFor={name} className="form-label">
            {label}
          </label>
          <Field
            value={value}
            type={type}
            id={name}
            name={name}
            className="form-control"
          />
          <ErrorMessage name={name} component="div" className="text-danger" />
        </div>
      )}
      {onChange && (
        <div className="mb-3">
          <label htmlFor={name} className="form-label">
            {label}
          </label>
          <Field
            onChange={onChange}
            value={value}
            type={type}
            id={name}
            name={name}
            className="form-control"
          />
          <ErrorMessage name={name} component="div" className="text-danger" />
        </div>
      )}
    </>
  );
};

export default FormikInput;
