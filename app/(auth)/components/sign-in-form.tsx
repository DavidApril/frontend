"use client";

import { Button, Input } from "@/core/components";
import { ErrorMessage, Form, Formik } from "formik";
import { useContext } from "react";
import { authContext } from "@/core/context";
import clsx from "clsx";

import * as Yup from "yup";
import { FErrorMessage } from "@/core/components/ui/formik-error-message";

export const SignInForm = () => {
  const { sign_in, loading } = useContext(authContext);

  const initialValues = {
    email: "admin@example.com",
    password: "Abc123456@",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (credentials: typeof initialValues) =>
    sign_in(credentials);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleBlur, errors }) => (
        <Form className="flex flex-col gap-4">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            invalid={!!errors.email}
          />
          <FErrorMessage name="email" />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            invalid={!!errors.password}
          />
          <ErrorMessage name="password" />
          <Button
            type="submit"
            loading={loading}
            className={clsx(errors && "bg-red-500")}
          >
            Sign in
          </Button>
        </Form>
      )}
    </Formik>
  );
};
