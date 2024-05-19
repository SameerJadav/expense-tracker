import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getUserQueryOptions } from "~/utils/api";
import Expenses from "~/components/Expenses";
import Form from "~/components/Form";
import Header from "~/components/Header";
import Icons from "~/components/Icons";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage(): JSX.Element {
  const { data: user } = useQuery(getUserQueryOptions);

  return user ? (
    <div className="mx-auto max-w-4xl">
      <Header />
      <div className="mb-14 mt-4 px-4">
        <Form />
        <Expenses />
      </div>
    </div>
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
