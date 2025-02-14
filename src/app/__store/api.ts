import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TEvent } from "../__types/index";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export const hackTheNorthApi = createApi({
  reducerPath: "hackTheNorthApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getEvents: builder.query<TEvent[], void>({
      query: () => "/events",
    }),
    getEvent: builder.query<TEvent, number>({
      query: (id) => `/events/${id}`,
    }),
  }),
});

export const { useGetEventsQuery, useGetEventQuery } = hackTheNorthApi;
export default hackTheNorthApi;
