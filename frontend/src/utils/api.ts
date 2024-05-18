import { queryOptions } from "@tanstack/react-query";
import { Expense, User } from "~/types";

export const getUserQueryKey = "user-info";
export const getAllExpensesQueryKey = "expenses";

export const getUserQueryOptions = queryOptions({
  queryKey: [getUserQueryKey],
  queryFn: async () => {
    try {
      const res = await fetch("/api/user");
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data: User = await res.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  },
});

export function getAllExpensesQueryOptions(user: User | undefined) {
  return queryOptions({
    queryKey: [getAllExpensesQueryKey, user, user?.userID],
    queryFn: async () => {
      if (!user || !user.userID) {
        throw new Error("User ID not find");
      }

      try {
        const res = await fetch(`/api/expenses/${user.userID}`);
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const data: Expense[] = await res.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });
}
