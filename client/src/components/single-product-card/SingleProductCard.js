import { getDateTimeFromUnixFormat } from "@/lib/utils/CommonUtils";
import styles from "./SingleProductCard.module.css";
import { FaTrash } from "react-icons/fa";

const SingleProductCard = ({ product }) => {
  return (
    <div className={styles["card"]}>
      <div className={styles["cardContent"]}>
        <h2>{product?.title}</h2>
        <p className={styles["categories"]}>
          Categories: <span>{product?.category}</span>
        </p>
        <p className={styles["price"]}>
          Price: <strong>${product?.purchasePrice}</strong> | Rent:{" "}
          <strong>
            ${product?.rentPrice} {product?.rentPeriod}
          </strong>
        </p>
        <p className={styles["description"]}>{product?.description}</p>
        <div className={styles["footer"]}>
          <span className={styles["date"]}>
            Date posted: {getDateTimeFromUnixFormat(product?.createdAt)}
          </span>
        </div>
      </div>
      <div className={styles["deleteIcon"]}>
        <FaTrash />
      </div>
    </div>
  );
};

export default SingleProductCard;
