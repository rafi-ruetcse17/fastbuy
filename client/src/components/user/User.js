"use client";

import { useSession } from "@/hooks/useSession";
import styles from "./User.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "../common/loader/Loader";
import { appRouteList } from "@/lib/utils/PageRouteUtils";
import SingleProductCard from "../single-product-card/SingleProductCard";
import { Button } from "../common/button/Button";
import { useQuery } from "@apollo/client";
import { GET_USER_PRODUCTS } from "@/lib/gql/mutations";
import client from "@/lib/gql/apolloClient";

const User = () => {
  const { loading, session } = useSession();
  const [pageLoader, setPageLoader] = useState(true);
  const router = useRouter();
  const { data } = useQuery(GET_USER_PRODUCTS, {
    client,
  });

  useEffect(() => {
    if (!loading && !session) {
      router.push(appRouteList.login);
    }

    if (!loading && session) {
      setPageLoader(false);
    }
  }, [loading, session]);

  if (loading || pageLoader) return <Loader />;

  return (
    <div>
      <div className={styles["wrapper"]}>
        <h3>MY PRODUCTS</h3>
        <Button
          className={styles["button"]}
          onClick={() => router.push(appRouteList.title)}
        >
          Add product
        </Button>
        <div className={styles["product-list"]}>
          {data?.getUserProducts?.length > 0 ? (
            data.getUserProducts.map((product) => (
              <SingleProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
