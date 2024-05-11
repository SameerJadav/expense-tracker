import { Close, Content, Root, Trigger } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { User } from "~/types";
import Icons from "~/components/Icons";

async function fetchUser() {
  const res = await fetch("/api/user");
  const data = (await res.json()) as User;
  return data;
}

export default function Menu() {
  const { data: user } = useQuery({
    queryKey: ["user-info"],
    queryFn: fetchUser,
  });

  return (
    <Root>
      <Trigger className="md:hidden" asChild>
        <button>
          <Icons.Menu className="size-6" />
          <span className="sr-only">Menu</span>
        </button>
      </Trigger>
      <Content asChild className="fixed inset-0">
        <div className="z-50 h-dvh w-dvw animate-fade-in bg-gray-1 text-gray-12">
          <div className="flex items-center justify-between p-4">
            <Link
              to="/"
              className="text-2xl font-bold leading-none tracking-tighter"
            >
              Expense Tracker
            </Link>
            <Close asChild>
              <button>
                <Icons.Cross className="size-6" />
                <span className="sr-only">Cross</span>
              </button>
            </Close>
          </div>
          <div className="mt-4 flex flex-col gap-4 p-4">
            <Link to="/" className="rounded-md p-2 [&.active]:bg-gray-5">
              Dashboard
            </Link>
            <Link to="/about" className="rounded-md p-2 [&.active]:bg-gray-5">
              About
            </Link>
            <div className="border-t border-gray-6 pt-6">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatarURL}
                      alt={user.name}
                      className="size-10 rounded-md"
                    />
                    <div className="space-y-1 *:leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-gray-11">{user.email}</p>
                    </div>
                  </div>
                  <button>Log out</button>
                </div>
              ) : (
                <a
                  href="/api/auth/github"
                  className="flex w-max items-center gap-2 rounded-md border border-gray-7 bg-gray-3 px-4 py-1 font-medium"
                >
                  <Icons.Github className="size-5" />
                  <span>Login with GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </Content>
    </Root>
  );
}
