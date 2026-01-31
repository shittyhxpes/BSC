import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout } from "../actions";
import AdminLayoutWrapper from "@/components/AdminLayoutWrapper";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get("bsc_admin_session")?.value === "true";

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <AdminLayoutWrapper logoutAction={logout}>
      {children}
    </AdminLayoutWrapper>
  );
}
