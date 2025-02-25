"use client";

import { useSession } from "@/hooks/useSession";
import { Loader } from "./common/loader/Loader";
import { useRouter } from "next/navigation";
import { appRouteList } from "@/lib/utils/PageRouteUtils";
import User from "./user/User";
import { useEffect, useState } from "react";

export default function HomePage() {
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

  return <User />;
}
