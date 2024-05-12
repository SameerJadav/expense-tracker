import { useQuery } from "@tanstack/react-query";
import type { Expense, User } from "~/types";
import Icons from "~/components/Icons";

export default function ExpensesTable() {
  const { data: user } = useQuery({
    queryKey: ["user-info"],
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

  const { data: expenses } = useQuery({
    queryKey: ["expenses", user, user?.userID],
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

  return (
    <div className="mt-4  w-full overflow-auto rounded-md border border-gray-7 shadow">
      <table className="w-full">
        <thead className="w-full">
          <tr className="w-full border-b border-gray-7">
            <th className="h-10 px-2 text-left align-middle font-medium">
              Title
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium">
              Date
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium">
              Amount
            </th>
            <th className="h-10 px-2 text-center align-middle font-medium">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {expenses
            ? expenses.map((expense) => (
                <tr
                  key={expense.userID}
                  className="w-full border-b border-gray-7"
                >
                  <td className="p-2 text-left align-middle">
                    {expense.title}
                  </td>
                  <td className="p-2 text-left align-middle">
                    {new Date(expense.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-2 text-left align-middle">
                    ${expense.amount}
                  </td>
                  <td className="p-2 text-center align-middle">
                    <button className="rounded-md p-2 hover:bg-gray-4">
                      <Icons.Trash className="size-5" />
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
