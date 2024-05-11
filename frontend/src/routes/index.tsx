import { createFileRoute } from "@tanstack/react-router";
import Form from "~/components/Form";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage(): JSX.Element {
  return (
    <div className="mt-4 px-4">
      <Form />
    </div>
  );
}
