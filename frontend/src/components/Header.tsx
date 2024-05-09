import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { User } from "~/types";

async function fetchUser() {
  const res = await fetch("/api/user");
  const data = (await res.json()) as User;
  return data;
}

export default function Header() {
  const { data: user } = useQuery({
    queryKey: ["user-info"],
    queryFn: fetchUser,
  });

  return (
    <header className="flex items-center justify-between border-b border-gray-6 bg-gray-1 py-4">
      <Link to="/" className="text-2xl font-bold tracking-tighter">
        Expense Tracker
      </Link>
      {user ? (
        <img
          src={user.avatarURL}
          alt={user.name}
          className="size-8 rounded-full"
        />
      ) : (
        <a
          href="/api/auth/github"
          className="rounded-md border border-gray-7 bg-gray-3 px-3 py-0.5 font-medium transition-colors ease-out hover:border-gray-8 hover:bg-gray-4"
        >
          Login
        </a>
      )}
    </header>
  );
}
