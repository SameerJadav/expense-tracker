import { useQuery } from "@tanstack/react-query";
import { getAllExpensesQueryOptions, getUserQueryOptions } from "~/utils/api";

export default function Expenses() {
  const { data: user } = useQuery(getUserQueryOptions);
  const { data: expenses } = useQuery(getAllExpensesQueryOptions(user));

  if (!expenses || expenses.length === 0) {
    return null;
  }

  const sortedExpenses = expenses.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section className="mt-8">
      <p className="text-lg font-bold">Expenses</p>
      <div className="mt-4 space-y-4">
        {sortedExpenses.map((expense) => (
          <div
            key={expense.userID}
            className="flex w-full items-center justify-between rounded-md border border-gray-6 p-4"
          >
            <div className="flex flex-col *:leading-none">
              <p>{expense.title}</p>
              <p className="text-sm text-gray-11">
                {new Date(expense.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <p>${expense.amount}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
