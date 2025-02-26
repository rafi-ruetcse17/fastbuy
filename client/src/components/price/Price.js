"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import styles from "./Price.module.css";
import { appRouteList } from "@/lib/utils/PageRouteUtils";
import { rentalPeriods } from "@/lib/utils/CommonUtils";

const Price = () => {
  const router = useRouter();
  const [purchasePrice, setPurchasePrice] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("product")) || {};
    if (storedData.purchasePrice) setPurchasePrice(storedData.purchasePrice);
    if (storedData.rentPrice) setRentPrice(storedData.rentPrice);
    if (storedData.rentalPeriod) {
      setSelectedPeriod(
        rentalPeriods.find((period) => period.value === storedData.rentalPeriod)
      );
    }
  }, []);

  const handleNext = () => {
    const storedData = JSON.parse(sessionStorage.getItem("product")) || {};
    storedData.purchasePrice = purchasePrice;
    storedData.rentPrice = rentPrice;
    storedData.rentalPeriod = selectedPeriod?.value;
    sessionStorage.setItem("product", JSON.stringify(storedData));
    router.push(appRouteList.summary);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles["container"]}>
      <h2 className={styles["heading"]}>Select Price</h2>

      <input
        type="number"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
        className={styles["input"]}
        placeholder="Purchase price"
      />

      <h4>Rent</h4>

      <div className={styles["rent-container"]}>
        <input
          type="number"
          value={rentPrice}
          onChange={(e) => setRentPrice(e.target.value)}
          className={styles["rent-input"]}
          placeholder="Rent price"
        />
        <Select
          options={rentalPeriods}
          value={selectedPeriod}
          onChange={setSelectedPeriod}
          className={styles["dropdown"]}
          placeholder="Select period"
        />
      </div>

      <div className={styles["button-container"]}>
        <button className={styles["button"]} onClick={handleBack}>
          Back
        </button>
        <button
          className={styles["button"]}
          onClick={handleNext}
          disabled={!purchasePrice || !rentPrice || !selectedPeriod}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Price;
