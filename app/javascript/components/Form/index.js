import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const CustomForm = ({
  children,
  fields: { initValues, validations },
  action,
  images,
}) => {
  /*---------- Example for fields props ---------------*/
  // const fields = {
  //   initValues: {
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //   },
  //   validations: {
  //     firstName: Yup.string()
  //       .max(15, "Must be 15 characters or less")
  //       .required("Required"),
  //     lastName: Yup.string()
  //       .max(20, "Must be 20 characters or less")
  //       .required("Required"),
  //     email: Yup.string().email("Invalid email address").required("Required"),
  //   },
  // };
  /*-----------------------------------------------------*/
  return (
    <Formik
      initialValues={{
        ...initValues,
      }}
      validationSchema={Yup.object({
        ...validations,
      })}
      onSubmit={(values) => {
        console.log(values);
        console.log(images);
      }}
    >
      <Form>{children}</Form>
    </Formik>
  );
};

export default CustomForm;
