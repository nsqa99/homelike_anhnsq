import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const CustomForm = ({ fields }) => {
  return (
    <Formik
      initialValues={{
        ...fields.initValues,
      }}
      validationSchema={Yup.object({
        ...fields.validations,
      })}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>{children}</Form>
    </Formik>
  );
};

export default CustomForm;
