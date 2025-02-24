"use client";

import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import client from "@/lib/gql/apolloClient";

const LOGIN_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      email
      name
      id
      token
    }
  }
`;

const LoginForm = () => {
  const [error, setError] = useState();
  const router = useRouter();
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const [loginUser, { loading }] = useMutation(LOGIN_MUTATION, { client });

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const { data } = await loginUser({
        variables: { email, password },
      });

      if (data) {
        localStorage.setItem("token", data.loginUser.token);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = () => {
    router.push(`${pathname}?authState=signup`);
  };

  return (
    <div className={styles["modal"]}>
      <div className={styles["modal-content"]}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
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
            Log in
          </button>
          <div className={styles["or"]}>or</div>
        </form>
        <div className={styles["bottom"]}>
          <div className={styles["line"]}></div>
          <button className={styles["button"]} onClick={handleSignUp}>
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
