import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import type { User } from "~/types";

export default function Form(): JSX.Element {
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

  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
      date: "",
    },
    onSubmit: ({ value }) => {
      fetch("/api/expenses/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.userID,
          title: value.title,
          amount: value.amount,
          date: value.date,
        }),
      });
      value.title = "";
      value.amount = 0;
      value.date = "";
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="rounded-md border border-gray-6 bg-gray-2 p-4 shadow"
    >
      <p className="text-lg font-medium">Add New Expense</p>
      <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
        <form.Field
          name="title"
          validators={{
            onChange: ({ value }) =>
              value === "" ? "Title cannot be empty" : undefined,
          }}
          children={(field) => (
            <div className="flex flex-col gap-1 md:flex-1">
              <label id={field.name} className="text-sm font-medium capitalize">
                {field.name}
              </label>
              <input
                name={field.name}
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Groceries"
                className="rounded-md border border-gray-7 bg-gray-3 p-2 transition-colors ease-out placeholder:text-gray-11 hover:border-gray-8 focus-visible:border-gray-8 focus-visible:outline-none"
              />
              {field.state.meta.errors ? (
                <p className="h-[14px] text-sm/none text-red-9">
                  {field.state.meta.errors}
                </p>
              ) : null}
            </div>
          )}
        />
        <form.Field
          name="amount"
          validators={{
            onChange: ({ value }) =>
              value < 1 ? "Amount cannot be less than 0" : undefined,
          }}
          children={(field) => (
            <div className="flex flex-col gap-1 md:flex-1">
              <label id={field.name} className="text-sm font-medium capitalize">
                {field.name}
              </label>
              <input
                name={field.name}
                id={field.name}
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                placeholder="50"
                className="rounded-md border border-gray-7 bg-gray-3 p-2 transition-colors ease-out placeholder:text-gray-11 hover:border-gray-8 focus-visible:border-gray-8 focus-visible:outline-none"
              />
              {field.state.meta.errors ? (
                <p className="h-[14px] text-sm/none text-red-9">
                  {field.state.meta.errors}
                </p>
              ) : null}
            </div>
          )}
        />
        <form.Field
          name="date"
          validators={{
            onChange: ({ value }) =>
              value === "" ? "Date cannot be empty" : undefined,
          }}
          children={(field) => (
            <div className="flex flex-col gap-1">
              <label id={field.name} className="text-sm font-medium capitalize">
                {field.name}
              </label>
              <input
                name={field.name}
                id={field.name}
                type="date"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="rounded-md border border-gray-7 bg-gray-3 p-2 transition-colors ease-out hover:border-gray-8 focus-visible:border-gray-8 focus-visible:outline-none"
              />
              {field.state.meta.errors ? (
                <p className="h-[14px] text-sm/none text-red-9">
                  {field.state.meta.errors}
                </p>
              ) : null}
            </div>
          )}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit]}
        children={([canSubmit]) => (
          <button
            className="mt-2 rounded-md bg-gray-12 px-3 py-1 font-medium text-gray-1 transition-colors ease-out disabled:cursor-not-allowed disabled:bg-gray-11"
            type="submit"
            disabled={!canSubmit}
          >
            Add Expense
          </button>
        )}
      />
    </form>
  );
}
