import React from "react";
import { useField } from "formik";

export const TextField = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
      <input className={`input ${meta.touched && meta.error && 'input-wrong'}`} autoComplete="off" {...field} {...props}></input>
  );
};
