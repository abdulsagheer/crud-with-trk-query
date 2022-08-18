import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "../model/contact.model";

export const contactsApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  endpoints: (builder) => ({
    data: builder.query<Contact[], void>({
      query: () => "/contacts",
    }),
  }),
});

export const { useDataQuery } = contactsApi;
