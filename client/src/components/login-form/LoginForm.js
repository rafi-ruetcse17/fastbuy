"use client";

import React, { useEffect, useState } from "react";
import styles from "./LoginForm.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import client from "@/lib/gql/apolloClient";
import { appRouteList } from "@/lib/utils/PageRouteUtils";
import { useSession } from "@/hooks/useSession";
import { Loader } from "../common/loader/Loader";

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
  const [pageLoader, setPageLoader] = useState(true);
  const { session, loading: sessionLoading } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const [loginUser, { loading }] = useMutation(LOGIN_MUTATION, { client });

  useEffect(() => {
    if (session) {
      router.replace(appRouteList.user);
    }
    if (!sessionLoading && !session) setPageLoader(false);
  }, [session, sessionLoading]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const { data } = await loginUser({
        variables: { email, password },
      });
      if (data) {
        localStorage.setItem("token", data.loginUser.token);
        router.push(appRouteList.user);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = () => {
    router.push(appRouteList.signup);
  };

  if (pageLoader) return <Loader />;

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
            {loading && <span className={styles["loading"]}></span>}
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
