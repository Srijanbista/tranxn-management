// LoginForm.js
import { Form, Formik } from "formik";
import * as yup from "yup";

import { FormikInputField } from "./FormikInputField";
import { useEffect, useState } from "react";

// Validation schema for the login form
const LoginFormSchema = yup.object().shape({
  email: yup.string().email().required("Required"),
  password: yup.string().required("Required"),
});

interface LoginValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [publicIp, setPublicIp] = useState<string>("");
  const initialValues = {
    email: "",
    password: "",
    publicIp: publicIp,
  };

  // Handles form submission
  const handleFormSubmit = async (values: LoginValues) => {
    console.log(values);
  };

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setPublicIp(data.ip))
      .catch((error) => console.log(error));
  }, []);
  console.log("publicIp", publicIp);
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
          handleFormSubmit(values);
        }}
        validationSchema={LoginFormSchema}
      >
        {(formikProps) => (
          <Form className="flex flex-col gap-y-6 w-full">
            <FormikInputField
              name="email"
              type="email"
              placeholder="Email"
              formikProps={formikProps}
            />
            <FormikInputField
              name="password"
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
