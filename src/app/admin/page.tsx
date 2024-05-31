"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Dashboard } from "./components";

export default function DashboardPage() {
  const router = useRouter();

  const { data: session, status }: { data: any; status: string } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" && session?.user.role !== "admin") {
      router.push("/");
    }
  }, [router, status]);

  return (
    <div>
      <Dashboard />
    </div>
  );
}
