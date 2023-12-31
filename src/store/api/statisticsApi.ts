import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'shared/consts/constants';
import {
  Staistics,
  TotalStaistics,
  setStatistics,
} from 'store/statistics/statisticsSlice';

export const statisticsApi = createApi({
  reducerPath: 'statisticsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${localStorage.getItem('token')}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStatistics: builder.mutation<Array<TotalStaistics>, void>({
      query() {
        return {
          url: 'api/v1/statistic/',
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setStatistics(data));
        } catch (error) {
          /* empty */
        }
      },
    }),
    postStatistics: builder.mutation<Staistics & { id: number }, Staistics>({
      query(arg) {
        return {
          url: `api/v1/statistic/`,
          method: 'POST',
          body: arg,
        };
      },
    }),
  }),
});

export const { useGetStatisticsMutation, usePostStatisticsMutation } =
  statisticsApi;
