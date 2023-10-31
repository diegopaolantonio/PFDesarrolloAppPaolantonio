import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { dbUrl } from "../firebase/database";

export const daApi = createApi({
  reducerPath: "daApi",
  baseQuery: fetchBaseQuery({
    baseUrl: dbUrl,
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "categories.json",
    }),

    getProducts: builder.query({
      query: () => "products.json",
    }),

    // ACCESO A LA IMAGEN EN LA BD
    getImage: builder.query({
      query: () => "image.json",
    }),

    // Trae el usuario en la base de dato
    getDb: builder.query({
      query: () => "users.json",
    }),

    // ENVIA LA IMAGEN A LA BD
    putImage: builder.mutation({
      query: (image) => ({
        url: "image.json",
        method: "PUT",
        body: image,
      }),
    }),

    // Crea el usuario en la base de dato
    putDb: builder.mutation({
      query: (user) => ({
        url: `users/${user.id}.json`,
        method: "PUT",
        body: user,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetImageQuery,
  useGetDbQuery,
  usePutImageMutation,
  usePutDbMutation,
} = daApi;
