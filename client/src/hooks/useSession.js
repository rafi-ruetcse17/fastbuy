"use client";
import { gql, useQuery } from "@apollo/client";
import client from "@/lib/gql/apolloClient";
import { useRouter } from "next/navigation";
import { appRouteList } from "@/lib/utils/PageRouteUtils";

export const useSession = () => {
  const router = useRouter();
  const GET_SESSION = gql`
    query Me {
      me {
        name
        email
      }
    }
  `;

  const { loading, error, data: session } = useQuery(GET_SESSION);

  const removeSession = () => {
    localStorage.removeItem("token");
    client.clearStore();
    router.replace(appRouteList.login);
  };

  return {
    loading,
    error,
    session,
    removeSession,
  };
};
