import { apiSlice } from '../auth/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    updateUser: builder.mutation({
      query: (credentials) => ({
        url: '/api/user/updateMe',
        method: 'PATCH',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useUpdateUserMutation } =
  authApiSlice;
