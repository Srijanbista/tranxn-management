import { ErrorMessage, Field, FormikProps } from "formik";
import { HTMLProps } from "react";

export const FormikInputField = ({
  formikProps,
  name,
  placeholder,
  isDisabled = false,
  type = "text",
  className,
}: {
  formikProps: FormikProps<any>;
  name: string;
  placeholder: string;
  isDisabled?: boolean;
  type?: string;
  className?: HTMLProps<HTMLElement>["className"];
}) => {
  return (
    <div className={className}>
      <div className="relative">
        <Field
          type={type}
          as={type == "textarea" ? type : "input"}
          rows="2"
          name={name}
          disabled={isDisabled}
          placeholder=""
          id={placeholder}
          className="w-full px-2 peer rounded-md py-2 border border-neutral-300 focus-visible:outline-none focus-visible:border-primary-700"
          onBlur={(e: any) => {
            e.target.value = e.target.value.trim();
            formikProps?.setFieldValue(name, e.target.value.trim());
          }}
        />
        <label
          htmlFor={placeholder}
          className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary-700 peer-focus:dark:text-primary-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          {placeholder}
        </label>
      </div>
      <ErrorMessage name={name}>
        {(msg) => <span className="text-sm text-red-500">{msg}</span>}
      </ErrorMessage>
    </div>
  );
};
