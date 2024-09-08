import { useStorage } from "@/lib/manage-store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const baseQuery = fetchBaseQuery({
  baseUrl: "/",
  prepareHeaders: (headers) => {
    const { getAccessToken } = useStorage();
    const accessToken = getAccessToken();

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});
