"use client";

import React, { useState } from "react";
import styles from "./SignupForm.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import client from "@/lib/gql/apolloClient";

const SIGNUP_MUTATION = gql`
  mutation SignupUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

const SignupForm = () => {
  const [error, setError] = useState();
  const router = useRouter();
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const [signupUser, { loading }] = useMutation(SIGNUP_MUTATION, { client });

  const onSubmit = async (data) => {
    try {
      const {name, email, password } = data;
      const response = await signupUser({
        variables: { name, email, password },
      });
      console.log("Signup successful:", response.data);
      router.push(`${pathname}?authState=login`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = () => {
    router.push(`${pathname}?authState=login`);
  };

  return (
    <div className={styles["modal"]}>
      <div className={styles["modal-content"]}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
          <input
            type="text"
            id="name"
            placeholder="Enter full name"
            className={styles["input"]}
            {...register("name", { required: "Name is required" })}
          />

          <input
            type="email"
            id="email"
            placeholder="Enter email"
            className={styles["input"]}
            {...register("email", { required: "Email is required" })}
          />

          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className={styles["input"]}
            {...register("password", { required: "Password is required" })}
          />
          {error && <div className={styles["error"]}>{error}</div>}

          <button
            type="submit"
            disabled={!isValid}
            className={styles[!isValid && "disabled"]}
          >
            Create account
          </button>
          <div className={styles["or"]}>or</div>
        </form>
        <div className={styles["bottom"]}>
          <div className={styles["line"]}></div>
          <button className={styles["button"]} onClick={handleSignUp}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
