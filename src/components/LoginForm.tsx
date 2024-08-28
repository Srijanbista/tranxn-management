// LoginForm.js
import { Form, Formik } from "formik";
import * as yup from "yup";

import { FormikInputField } from "./FormikInputField";
import { useEffect, useState } from "react";
import { Login } from "../services/Login.service";

// Validation schema for the login form
const LoginFormSchema = yup.object().shape({
  login_id: yup.string().email().required("Required"),
  login_password: yup.string().required("Required"),
});

export interface LoginValues {
  login_id: string;
  login_password: string;
}

const LoginForm = () => {
  const [publicIp, setPublicIp] = useState<string>("");
  const initialValues = {
    login_id: "",
    login_password: "",
  };

  // Handles form submission
  const handleFormSubmit = async (values: LoginValues) => {
    await Login({ ...values, ...{ ip_address: publicIp } });
  };

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setPublicIp(data.ip))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="border flex flex-col items-center justify-center py-10 px-5 bg-white rounded-md shadow-lg max-w-md w-full mx-auto sm:w-3/4 lg:w-1/2">
      <h1 className="text-slate-800 font-semibold mb-4 text-4xl text-center">
        Transaction Management
      </h1>
      <span className="text-lg mb-10 text-center">Sign In to explore</span>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => {
          handleFormSubmit(values).then((data) => {
            console.log(data);
          });
        }}
        validationSchema={LoginFormSchema}
      >
        {(formikProps) => (
          <Form className="flex flex-col gap-y-6 w-full">
            <FormikInputField
              name="login_id"
              type="email"
              placeholder="Email"
              formikProps={formikProps}
            />
            <FormikInputField
              name="login_password"
              type="password"
              placeholder="Password"
              formikProps={formikProps}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg my-8 transition duration-150 ease-in-out transform hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-700 active:scale-95"
            >
              Log In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
