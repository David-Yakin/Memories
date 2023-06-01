import { apiSlice } from "../../../app/apiSlice";
import UserInterface from "../models/interfaces/UserInterface";

// קבוע זה יתווסף לשורת הכתובות על מנת
const USER_API = "/users";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `${USER_API}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: data => ({
        url: `${USER_API}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: userId => ({
        url: `${USER_API}/${userId}`,
        method: "DELETE",
      }),
    }),
    // builder.mutation נשתמש בו כאשר נרצה להעביר נתון או לשורת הכתובות ו/ או בגוף הבקשה
    editUser: builder.mutation({
      query: data => ({
        url: `${USER_API}`,
        method: "PUT",
        body: data,
      }),
    }),
    // builder.query<UserInterface, void> הפרמטר האחרון מסמן האם הבקשה צריכה לקבל בארגומנט משהו או לא
    // הפונקציה לא מחזירה פונקציה להפעלה מאוחרת אלא עם הקריאה לה היא מופעלת
    getUserProfile: builder.query<UserInterface, void>({
      query: () => `${USER_API}/profile`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useEditUserMutation,
  useGetUserProfileQuery,
  useDeleteUserMutation,
} = usersApiSlice;
