"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import styles from "./Description.module.css";
import { appRouteList } from "@/lib/utils/PageRouteUtils";
import { useEffect } from "react";

export default function Description() {
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("product")) || {};
    const descriptionValue = storedData.description;
    if (descriptionValue) {
      setValue("description", descriptionValue);
    }
  }, []);

  const onSubmit = (data) => {
    const storedData = JSON.parse(sessionStorage.getItem("product")) || {};
    storedData.description = data.description;
    sessionStorage.setItem("product", JSON.stringify(storedData));
    router.push(appRouteList.price);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles["container"]}>
      <h2 className={styles["heading"]}>
        Enter a description for your product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <textarea
          {...register("description", { required: true })}
          className={styles["textarea"]}
          placeholder="Enter product description"
          rows="4"
        />
        <div className={styles["button-container"]}>
          <button className={styles["button"]} onClick={handleBack}>
            Back
          </button>
          <button type="submit" className={styles["button"]}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
