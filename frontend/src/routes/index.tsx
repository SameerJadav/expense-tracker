import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { User } from "~/types";
import ExpensesTable from "~/components/ExpensesTable";
import Form from "~/components/Form";
import Header from "~/components/Header";
import Icons from "~/components/Icons";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage(): JSX.Element {
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

  return user ? (
    <>
      <Header />
      <div className="mb-14 mt-4 px-4">
        <Form />
        <ExpensesTable />
      </div>
    </>
  ) : (
    <div className="w-dvh flex h-dvh items-center justify-center bg-gray-3 p-4">
      <div className="w-full rounded-md bg-gray-1 p-6 shadow md:max-w-md">
        <p className="text-2xl font-bold tracking-tighter">
          Expense<span className="text-blue-9">Tracker</span>
        </p>
        <p className="mt-6 text-xl font-medium">Sign in</p>
        <p className="text-gray-11">to continue to expensetracker</p>
        <a
          href="/api/auth/github"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-gray-7 bg-gray-1 px-4 py-2 text-lg font-medium transition-colors ease-out hover:border-gray-8 hover:bg-gray-4"
        >
          <Icons.Github className="size-6" /> <span>Sign in with GitHub</span>
        </a>
      </div>
    </div>
  );
}
