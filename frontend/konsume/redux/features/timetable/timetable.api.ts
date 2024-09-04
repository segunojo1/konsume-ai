import { api } from "../../api";

export const timetableApi = api.injectEndpoints({
  endpoints: () => ({
    // Define the endpoints for timetable here
  }),
});

// ! remove this after you exported the endpoints
// eslint-disable-next-line no-empty-pattern
export const {} = timetableApi;
