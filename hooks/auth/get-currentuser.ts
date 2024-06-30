"use client";
import { getCurrentUser } from "@/common/api/auth/auth.api";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getCurrentUser(),
  });
  return { data, isFetching, isLoading, refetch };
};
