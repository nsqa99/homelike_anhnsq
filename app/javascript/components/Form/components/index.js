import React, { useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
import { FormFeedback, Input, Label } from "reactstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = ({ label, imageValidator, ...props }) => {
  const [field, meta] = useField(props);
  const [errorDisplay, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(!!(meta.touched && meta.error));
  }, [meta]);

  useEffect(() => {
    if (imageValidator) {
      setDisplay(imageValidator.invalid);
    }
  }, [imageValidator]);

  return (
    <>
      <Label htmlFor={props.id || props.name} className="mt-2">
        {label}
      </Label>
      <Input invalid={errorDisplay} value={field.defaultValue} {...field} {...props} />

      {errorDisplay ? (
        <FormFeedback>{imageValidator?.message || meta.error}</FormFeedback>
      ) : null}
    </>
  );
};

const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [errorDisplay, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(!!(meta.touched && meta.error));
  }, [meta]);

  return (
    <div>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <Select {...field} {...props} />

      {errorDisplay ? <FormFeedback>{meta.error}</FormFeedback> : null}
    </div>
  );
};

const CustomDatePicker = ({ ...props }) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
      onChangeRaw={(e) => {
        setFieldTouched(field.name, true, true);
      }}
    />
  );
};

export { CustomInput, CustomSelect, CustomDatePicker };
