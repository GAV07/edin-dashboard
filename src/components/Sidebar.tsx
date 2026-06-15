"use client";
import { navGroups } from "@/constants/navlinks";
import { socials } from "@/constants/socials";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  IconLayoutSidebarRightCollapse,
  IconDownload,
  IconLogout,
  IconSettings,
  IconDatabaseImport,
} from "@tabler/icons-react";
import { isMobile } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

export const Sidebar = () => {
  const [open, setOpen] = useState(isMobile() ? false : true);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    if (typeof window !== "undefined" && window.gtag && session?.user) {
      window.gtag("event", "logout", {
        event_category: "Authentication",
        user_id: session.user.id,
        event_label: session.user.role,
      });
    }
    try {
      await signOut({ callbackUrl: "/auth/signin", redirect: false });
      router.push("/auth/signin");
    } catch (error) {
      console.error("Sign out error:", error);
      router.push("/auth/signin");
    }
  };

  const isActive = (href: string) => pathname === href;

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <>
      {open && (
        <aside className="sb">
          {/* Brand header */}
          <div className="sb-head">
            <span className="sb-mark">
              <Image
                src="/images/logos/edincapital_logo.jpeg"
                alt="Edin Capital"
                width={30}
                height={30}
              />
            </span>
            <span className="sb-brand">
              <span className="sb-brand-name">Edin Capital</span>
              <span className="sb-brand-sub">Investor Portal</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="sb-scroll">
            {navGroups.map((g) => (
              <React.Fragment key={g.group}>
                <div className="sb-group-label">{g.group}</div>
                {g.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => isMobile() && setOpen(false)}
                    className={`sb-link${isActive(item.href) ? " is-active" : ""}`}
                  >
                    <item.icon className="sb-ico" />
                    <span className="sb-lab">{item.label}</span>
                  </Link>
                ))}
              </React.Fragment>
            ))}

            {/* Admin Section */}
            {session?.user?.role === "admin" && (
              <>
                <div className="sb-group-label">Admin</div>
                <Link
                  href="/admin/users"
                  onClick={() => isMobile() && setOpen(false)}
                  className={`sb-link${isActive("/admin/users") ? " is-active" : ""}`}
                >
                  <IconSettings className="sb-ico" />
                  <span className="sb-lab">Manage Users</span>
                </Link>
                <Link
                  href="/admin/data"
                  onClick={() => isMobile() && setOpen(false)}
                  className={`sb-link${isActive("/admin/data") ? " is-active" : ""}`}
                >
                  <IconDatabaseImport className="sb-ico" />
                  <span className="sb-lab">Sync Data</span>
                </Link>
              </>
            )}

            {/* Socials */}
            <div className="sb-group-label">Socials</div>
            {socials.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => isMobile() && setOpen(false)}
                className="sb-link"
              >
                <link.icon className="sb-ico" />
                <span className="sb-lab">{link.label}</span>
              </a>
            ))}

          </nav>

          {/* Footer */}
          <div className="sb-foot">
            <a
              className="sb-cta"
              href="https://www.dropbox.com/scl/fi/rofebzx4l0r5r0lcaweih/Deep-Dive-EDIN.pdf?rlkey=x835swqlmkbwwnb8xm007wjy2&st=rmocy3oj&dl=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Download deck</span>
              <IconDownload style={{ width: 15, height: 15 }} />
            </a>

            {session?.user && (
              <div className="sb-user">
                <span className="sb-user-av">{initials}</span>
                <span className="sb-user-info">
                  <span className="sb-user-name">{session.user.name}</span>
                  <span className="sb-user-role">{session.user.role}</span>
                </span>
              </div>
            )}

            {session?.user && (
              <button onClick={handleSignOut} className="sb-signout">
                <IconLogout style={{ width: 14, height: 14 }} />
                <span>Sign out</span>
              </button>
            )}
          </div>
        </aside>
      )}

      {/* Mobile toggle */}
      <button
        className="fixed lg:hidden bottom-4 right-4 h-10 w-10 rounded-full flex items-center justify-center z-50 shadow-lg"
        style={{ background: "var(--green-700)", color: "var(--paper-100)" }}
        onClick={() => setOpen(!open)}
      >
        <IconLayoutSidebarRightCollapse className="h-5 w-5" />
      </button>
    </>
  );
};
