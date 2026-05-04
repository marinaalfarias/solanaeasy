import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";

export function RootLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen" style={{ background: "#F9FAFB", color: "#111827" }}>
      {!isDashboard && <Navbar />}
      <Outlet />
    </div>
  );
}
