"use client";

import { useSession } from "@/hooks/useSession";
import styles from "./User.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "../common/loader/Loader";
import { appRouteList } from "@/lib/utils/PageRouteUtils";
import SingleProductCard from "../single-product-card/SingleProductCard";
import { Button } from "../common/button/Button";

const User = () => {
  const { loading, session } = useSession();
  const [pageLoader, setPageLoader] = useState(true);
  const router = useRouter();

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
      </div>
      <Button onClick={() => router.push(appRouteList.title)}>
        Add product
      </Button>
      <SingleProductCard />
    </div>
  );
};

export default User;
