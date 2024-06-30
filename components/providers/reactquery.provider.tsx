"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * (60 * 1000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const ReactQueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
