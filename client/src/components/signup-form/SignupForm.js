"use client";

import React, { useEffect, useState } from "react";
import styles from "./SignupForm.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import client from "@/lib/gql/apolloClient";
import { appRouteList } from "@/lib/utils/PageRouteUtils";
import { useSession } from "@/hooks/useSession";
import { Loader } from "../common/loader/Loader";

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
  const [pageLoader, setPageLoader] = useState(true);
  const { session, loading: sessionLoading } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const [signupUser, { loading }] = useMutation(SIGNUP_MUTATION, { client });

  useEffect(() => {
    if (session) {
      router.replace(appRouteList.user);
    }
    if (!sessionLoading && !session) setPageLoader(false);
  }, [session, sessionLoading]);

  const onSubmit = async (data) => {
    try {
      const { name, email, password } = data;
      await signupUser({
        variables: { name, email, password },
      });
      router.push(appRouteList.login);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = () => {
    router.push(appRouteList.login);
  };

  if (pageLoader) return <Loader />;

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
            {loading && <span className={styles["loading"]}></span>}
          </button>
          <div className={styles["or"]}>or</div>
        </form>
        <div className={styles["bottom"]}>
          <div className={styles["line"]}></div>
          <button className={styles["button"]} onClick={handleLogin}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
