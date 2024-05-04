"use client";

import { useTheme } from "next-themes";
import Icons from "~/components/Icons";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className="rounded-md p-2 transition-colors ease-out hover:bg-gray-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-5"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      {theme === "light" ? (
        <Icons.Sun className="size-4" />
      ) : (
        <Icons.Moon className="size-4" />
      )}
    </button>
  );
}
