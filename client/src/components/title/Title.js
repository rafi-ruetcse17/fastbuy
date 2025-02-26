"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import styles from "./Title.module.css";
import { appRouteList } from "@/lib/utils/PageRouteUtils";
import { useEffect } from "react";

export default function Title() {
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("product")) || {};
    const titleValue = storedData.title;
    if (titleValue) {
      setValue("title", titleValue);
    }
  }, []);

  const onSubmit = (data) => {
    sessionStorage.setItem("product", JSON.stringify({ title: data.title }));
    router.push(appRouteList.category);
  };

  return (
    <div className={styles["container"]}>
      <h2 className={styles["heading"]}>Select a title for your product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <input
          type="text"
          {...register("title", { required: true })}
          className={styles["input"]}
          placeholder="Enter product title"
        />
        <button type="submit" className={styles["button"]}>
          Next
        </button>
      </form>
    </div>
  );
}
