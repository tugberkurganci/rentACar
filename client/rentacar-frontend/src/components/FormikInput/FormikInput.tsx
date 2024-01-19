import React from "react";
import { Field, ErrorMessage } from "formik";

type FormikInputProps = {
  label: string;
  name: string;
  type?: string;
};

const FormikInput: React.FC<FormikInputProps> = ({ label, name, type }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field type={type} id={name} name={name} className="form-control" />
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  );
};

export default FormikInput;
