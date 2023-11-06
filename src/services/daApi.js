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
    getUsers: builder.query({
      query: () => "users.json",
    }),

    // Trae el usuario en la base de dato
    getClients: builder.query({
      query: () => "clients.json",
    }),

    // ENVIA LA IMAGEN A LA BD
    putImage: builder.mutation({
      query: (profileImage) => ({
        url: `image/${profileImage.id}.json`,
        method: "PUT",
        body: profileImage,
      }),
    }),

    // Crea el usuario en la base de dato
    putUser: builder.mutation({
      query: (user) => ({
        url: `users/${user.id}.json`,
        method: "PUT",
        body: user,
      }),
    }),
    // Crea el usuario en la base de dato
    putClient: builder.mutation({
      query: ({uid, client, clientData}) => ({
        url: `clients/${uid}/${client}.json`,
        method: "PUT",
        body: clientData,
      }),
    }),
    putProject: builder.mutation({
      query: ({uid, client, project}) => ({
        url: `clients/${uid}/${client}/projects.json`,
        method: "PUT",
        body: project,
      }),
    }),
    deleteClient: builder.mutation({
      query: (client) => ({
        url: `clients/${client.id}/${client.nombre}.json`,
        method: "DELETE",
      })
    })
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetImageQuery,
  useGetUsersQuery,
  useGetClientsQuery,
  usePutImageMutation,
  usePutUserMutation,
  usePutClientMutation,
  usePutProjectMutation,
  useDeleteClientMutation,
} = daApi;
