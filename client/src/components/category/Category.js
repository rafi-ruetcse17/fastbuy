"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import styles from "./Category.module.css";
import { appRouteList } from "@/lib/utils/PageRouteUtils";
import { productCategories } from "@/lib/utils/CommonUtils";

const Category = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("product")) || {};
    const categoryValue = storedData.category;

    if (categoryValue) {
      const defaultCategory = productCategories.find(
        (category) => category.label === categoryValue
      );
      setSelectedCategory(defaultCategory);
    }
  }, []);

  const handleNext = () => {
    const storedData = JSON.parse(sessionStorage.getItem("product")) || {};
    storedData.category = selectedCategory?.label;
    sessionStorage.setItem("product", JSON.stringify(storedData));
    router.push(appRouteList.description);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles["container"]}>
      <h2 className={styles["heading"]}>Select Category</h2>
      <Select
        options={productCategories}
        value={selectedCategory}
        onChange={handleChange}
        className={styles["dropdown"]}
        placeholder="Select a category"
      />

      <div className={styles["button-container"]}>
        <button className={styles["button"]} onClick={handleBack}>
          Back
        </button>
        <button
          className={styles["button"]}
          onClick={handleNext}
          disabled={!selectedCategory}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Category;
