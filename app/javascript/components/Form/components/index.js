import React, { useEffect, useState } from "react";
import { useField } from "formik";
import { FormFeedback, Input, Label } from "reactstrap";
import Select from "react-select";

const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [errorDisplay, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(meta.touched && meta.error);
  }, [meta]);

  return (
    <>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <Input invalid={errorDisplay} {...field} {...props} />

      {errorDisplay ? <FormFeedback>{meta.error}</FormFeedback> : null}
    </>
  );
};

const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [errorDisplay, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(meta.touched && meta.error);
  }, [meta]);

  return (
    <div>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <Select {...field} {...props} />

      {errorDisplay ? <FormFeedback>{meta.error}</FormFeedback> : null}
    </div>
  );
};

export { CustomTextInput, CustomSelect };
