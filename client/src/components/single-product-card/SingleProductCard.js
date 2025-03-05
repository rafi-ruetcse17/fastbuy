import { getDateTimeFromUnixFormat } from "@/lib/utils/CommonUtils";
import styles from "./SingleProductCard.module.css";
import { FaTrash } from "react-icons/fa";
import { DELETE_PRODUCT, GET_USER_PRODUCTS } from "@/lib/gql/mutations";
import client from "@/lib/gql/apolloClient";
import { useMutation } from "@apollo/client";

const SingleProductCard = ({ product }) => {
  const [removeProduct, { loading, error, data }] = useMutation(
    DELETE_PRODUCT,
    {
      client,
    }
  );

  const handleDelete = async () => {
    alert("Are you sure want to delete the item?");
    try {
      await removeProduct({
        variables: { productId: product.id },
        refetchQueries: [{ query: GET_USER_PRODUCTS }],
      });
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Something went wrong:", err);
    }
  };
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
      <div className={styles["deleteIcon"]} onClick={handleDelete}>
        <FaTrash />
      </div>
    </div>
  );
};

export default SingleProductCard;
