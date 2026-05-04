import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Zap } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Documentação" },
    { to: "/widget", label: "Widget Demo" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{ background: "rgba(249,250,251,0.9)", backdropFilter: "blur(12px)", borderColor: "rgba(153,69,255,0.15)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #9945FF, #14F195)" }}
            >
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span style={{ color: "#111827" }} className="hidden sm:block">
              <span style={{ fontWeight: 700 }}>SolPay</span>
              <span style={{ color: "#9945FF", fontWeight: 400 }}> SDK</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-2 rounded-lg transition-all"
                  style={{
                    color: isActive ? "#9945FF" : "#111827",
                    background: isActive ? "rgba(153,69,255,0.08)" : "transparent",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg text-sm transition-all"
              style={{ color: "#9945FF", border: "1px solid rgba(153,69,255,0.3)" }}
            >
              GitHub
            </a>
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg text-sm transition-all"
              style={{
                background: "linear-gradient(135deg, #9945FF, #14F195)",
                color: "#111827",
                fontWeight: 600,
              }}
            >
              Começar Agora
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "#111827" }}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-lg"
                style={{ color: "#111827" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
