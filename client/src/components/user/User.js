"use client";

import { useSession } from "@/hooks/useSession";
import { Button } from "../common/button/Button";
import styles from "./User.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "../common/loader/Loader";
import { appRouteList } from "@/lib/utils/PageRouteUtils";

const User = () => {
  const { removeSession, loading, session } = useSession();
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

  const handleLogout = () => {
    removeSession();
  };

  if (loading || pageLoader) return <Loader />;

  return (
    <div>
      <nav className={styles["nav"]}>
        <Button className={styles["logout-button"]} onClick={handleLogout}>
          LOGOUT
        </Button>
      </nav>
    </div>
  );
};

export default User;
