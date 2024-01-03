import Image from "next/image";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-centers p-24 mx-5">
      <Dashboard />
    </main>
  );
}
