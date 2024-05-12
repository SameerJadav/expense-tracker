import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { User } from "~/types";
import Icons from "~/components/Icons";
import Menu from "~/components/Menu";

export default function Header() {
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

  return (
    <header className="flex items-center justify-between bg-gray-1 p-4">
      <div className="flex items-center gap-4 *:leading-none">
        <Link to="/" className="text-2xl font-bold tracking-tighter">
          Expense Tracker
        </Link>
        <Link
          to="/"
          className="hidden font-medium text-gray-11 transition-colors ease-out hover:text-gray-12 md:inline [&.active]:text-gray-12"
        >
          Dashboard
        </Link>
        <Link
          to="/about"
          className="hidden font-medium text-gray-11 transition-colors ease-out hover:text-gray-12 md:inline [&.active]:text-gray-12"
        >
          About
        </Link>
      </div>
      <Menu />
      <div className="hidden md:block">
        {user ? (
          <img
            src={user.avatarURL}
            alt={user.name}
            className="size-8 rounded-md"
          />
        ) : (
          <a
            href="/api/auth/github"
            className="flex items-center gap-2 rounded-md border border-gray-7 bg-gray-3 px-4 py-1 font-medium transition-colors ease-out hover:border-gray-8 hover:bg-gray-4"
          >
            <Icons.Github className="size-5" /> <span>Login with GitHub</span>
          </a>
        )}
      </div>
    </header>
  );
}
