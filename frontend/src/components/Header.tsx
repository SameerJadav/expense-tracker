import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { User } from "~/types";
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
    <div className="flex items-center justify-between bg-gray-1 p-4">
      <div className="flex items-center gap-4 *:leading-none">
        <Link to="/" className="text-2xl font-bold tracking-tighter">
          Expense<span className="text-blue-9">Tracker</span>
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
        <img
          src={user?.avatarURL}
          alt={user?.name}
          className="size-8 rounded-md"
        />
      </div>
    </div>
  );
}
