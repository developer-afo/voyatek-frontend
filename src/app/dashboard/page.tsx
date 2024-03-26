import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1>Welcome to User Dashboard</h1>
      <Link href="/auth/login" className="text-blue-400">
          Log Out
        </Link>
    </div>
  );
}
