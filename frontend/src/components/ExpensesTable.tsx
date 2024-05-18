import { useQuery } from "@tanstack/react-query";
import { getAllExpensesQueryOptions, getUserQueryOptions } from "~/utils/api";
import Icons from "~/components/Icons";

export default function ExpensesTable() {
  const { data: user } = useQuery(getUserQueryOptions);
  const { data: expenses } = useQuery(getAllExpensesQueryOptions(user));

  if (!expenses) {
    return null;
  }

  const sortedExpenses = expenses.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="mt-8 overflow-auto rounded-md border border-gray-7 shadow">
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
          {sortedExpenses.map((expense) => (
            <tr key={expense.userID} className="w-full border-b border-gray-7">
              <td className="p-2 text-left align-middle">{expense.title}</td>
              <td className="p-2 text-left align-middle">
                {new Date(expense.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="p-2 text-left align-middle">${expense.amount}</td>
              <td className="p-2 text-center align-middle">
                <button className="rounded-md p-2 hover:bg-gray-4">
                  <Icons.Trash className="size-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
