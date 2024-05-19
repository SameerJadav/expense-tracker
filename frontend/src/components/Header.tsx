import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getUserQueryOptions } from "~/utils/api";

export default function Header() {
  const { data: user } = useQuery(getUserQueryOptions);

  return (
    <div className="flex items-center justify-between bg-gray-1 p-4">
      <div className="flex items-center gap-4 *:leading-none">
        <Link to="/" className="text-2xl font-bold tracking-tighter">
          Expense<span className="text-blue-9">Tracker</span>
        </Link>
      </div>
      <div>
        <img
          src={user?.avatarURL}
          alt={user?.name}
          className="size-8 rounded-md"
        />
      </div>
    </div>
  );
}
