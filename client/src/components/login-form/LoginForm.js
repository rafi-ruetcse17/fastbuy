"use client";

import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [error, setError] = useState();
  const router = useRouter();
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
