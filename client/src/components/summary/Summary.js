"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Summary.module.css";
import { appRouteList } from "@/lib/utils/PageRouteUtils";
import { useMutation } from "@apollo/client";
import client from "@/lib/gql/apolloClient";
import productStatus from "@/lib/enums/productStatus";
import { ADD_PRODUCT } from "@/lib/gql/mutations";
import { GET_USER_PRODUCTS } from "@/lib/gql/mutations";

const Summary = () => {
  const router = useRouter();
  const [productData, setProductData] = useState(null);
  const [submitProduct, { loading, error, data }] = useMutation(ADD_PRODUCT, {
    client,
  });

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("product"));
    if (storedData) {
      setProductData({
        ...storedData,
        purchasePrice: parseFloat(storedData.purchasePrice) || 0,
        rentPrice: parseFloat(storedData.rentPrice) || 0,
      });
    }
  }, []);

  const handleEdit = (route) => {
    router.push(route);
  };

  const handleSubmit = async () => {
    if (!productData) return;
    try {
      await submitProduct({
        variables: { ...productData, status: productStatus.AVAILABLE },
        refetchQueries: [{ query: GET_USER_PRODUCTS }],
      });
      sessionStorage.removeItem("product");
      alert("Product submitted successfully!");
      router.push(appRouteList.user);
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  if (!productData) {
    return <p className={styles["message"]}>No product data found.</p>;
  }

  const {
    title,
    description,
    category,
    purchasePrice,
    rentPrice,
    rentalPeriod,
  } = productData;
  const isComplete =
    title &&
    description &&
    category &&
    purchasePrice &&
    rentPrice &&
    rentalPeriod;

  return (
    <div className={styles["container"]}>
      <h2 className={styles["heading"]}>Product Summary</h2>
      <div className={styles["summary-box"]}>
        <p>
          <strong>Title:</strong> {title}
          <button onClick={() => handleEdit(appRouteList.title)}>Edit</button>
        </p>
        <p>
          <strong>Description:</strong> {description}
          <button onClick={() => handleEdit(appRouteList.description)}>
            Edit
          </button>
        </p>
        <p>
          <strong>Category:</strong> {category}
          <button onClick={() => handleEdit(appRouteList.category)}>
            Edit
          </button>
        </p>
        <p>
          <strong>Price:</strong> {purchasePrice}
          <button onClick={() => handleEdit(appRouteList.price)}>Edit</button>
        </p>
        <p>
          <strong>Rent Price:</strong> {rentPrice} ({rentalPeriod})
          <button onClick={() => handleEdit(appRouteList.price)}>Edit</button>
        </p>
      </div>

      <div className={styles["button-container"]}>
        <button className={styles["button"]} onClick={() => router.back()}>
          Back
        </button>
        <button
          className={styles["button-submit"]}
          onClick={handleSubmit}
          disabled={!isComplete}
        >
          {"Submit"}
        </button>
      </div>
    </div>
  );
};

export default Summary;
