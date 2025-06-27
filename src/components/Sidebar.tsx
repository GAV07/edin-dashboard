"use client";
import { navlinks } from "@/constants/navlinks";
import { Navlink } from "@/types/navlink";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Heading } from "./Heading";
import { socials } from "@/constants/socials";
import { Badge } from "./Badge";
import { AnimatePresence, motion } from "framer-motion";
import { IconLayoutSidebarRightCollapse, IconMail, IconLogout, IconUser, IconSettings } from "@tabler/icons-react";
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

  const handleSignOut = async () => {
    // Track sign out event
    if (typeof window !== 'undefined' && window.gtag && session?.user) {
      window.gtag('event', 'logout', {
        event_category: 'Authentication',
        user_id: session.user.id,
        event_label: session.user.role,
      });
    }
    
    // Sign out and redirect to signin page
    try {
      await signOut({ 
        callbackUrl: '/auth/signin',
        redirect: false // Don't use NextAuth's redirect, handle it manually
      });
      // Manual redirect after sign out
      router.push('/auth/signin');
    } catch (error) {
      console.error('Sign out error:', error);
      // Fallback redirect
      router.push('/auth/signin');
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
            exit={{ x: -200 }}
            className="px-6  z-[100] py-10 bg-neutral-100 max-w-[14rem] lg:w-fit  fixed lg:relative  h-screen left-0 flex flex-col justify-between"
          >
            <div className="flex-1 overflow-auto">
              <SidebarHeader />
              <Navigation setOpen={setOpen} />
            </div>
            <div className="space-y-3">
              {/* User Info Section */}
              {session?.user && (
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <IconUser className="h-4 w-4 text-gray-500" />
                    <span className="text-xs font-medium text-gray-700">Signed in as</span>
                  </div>
                  <p className="text-xs font-bold text-primary truncate">{session.user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                      {session.user.role}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Sign Out Button */}
              {session?.user && (
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center space-x-2 py-2 px-3 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition duration-200"
                >
                  <IconLogout className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              )}
              
              <div onClick={() => isMobile() && setOpen(false)}>
                <Badge href="https://www.dropbox.com/scl/fi/rofebzx4l0r5r0lcaweih/Deep-Dive-EDIN.pdf?rlkey=x835swqlmkbwwnb8xm007wjy2&st=rmocy3oj&dl=0" text="Edin Deck" target="_blank" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="fixed lg:hidden bottom-4 right-4 h-10 w-10 bg-black text-white rounded-full flex items-center justify-center z-50 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-800"
        onClick={() => setOpen(!open)}
      >
        <IconLayoutSidebarRightCollapse className="h-5 w-5" />
      </button>
    </>
  );
};

export const Navigation = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex flex-col space-y-1 my-10 relative z-[100]">
      {navlinks.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => isMobile() && setOpen(false)}
          target={link.label === "Documents" ? "_blank" : undefined}
          rel={link.label === "Documents" ? "noopener noreferrer" : undefined}
          className={twMerge(
            "text-gray-700 hover:text-gray-900 transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm",
            isActive(link.href) && "bg-white shadow-lg text-primary"
          )}
        >
          <link.icon
            className={twMerge(
              "h-4 w-4 flex-shrink-0",
              isActive(link.href) && "text-accent"
            )}
          />
          <span>{link.label}</span>
        </Link>
      ))}

      {/* Admin Section - Only show for admin users */}
      {session?.user?.role === 'admin' && (
        <>
          <Heading as="p" className="text-sm md:text-sm lg:text-sm pt-6 px-2">
            Admin
          </Heading>
          <Link
            href="/admin/users"
            onClick={() => isMobile() && setOpen(false)}
            className={twMerge(
              "text-gray-700 hover:text-gray-900 transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm",
              isActive('/admin/users') && "bg-white shadow-lg text-primary"
            )}
          >
            <IconSettings
              className={twMerge(
                "h-4 w-4 flex-shrink-0",
                isActive('/admin/users') && "text-accent"
              )}
            />
            <span>Manage Users</span>
          </Link>
        </>
      )}

      <Heading as="p" className="text-sm md:text-sm lg:text-sm pt-6 px-2">
        Socials
      </Heading>
      {socials.map((link: Navlink) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => isMobile() && setOpen(false)}
          className={twMerge(
            "text-gray-700 hover:text-gray-900 transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm"
          )}
        >
          <link.icon
            className={twMerge(
              "h-4 w-4 flex-shrink-0",
              isActive(link.href) && "text-accent"
            )}
          />
          <span>{link.label}</span>
        </a>
      ))}
      <Heading as="p" className="text-sm md:text-sm lg:text-sm pt-6 px-2">
        Contact
      </Heading>
      <Link href="mailto:info@edin.capital" className="text-gray-700 hover:text-gray-900 transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm">
        <IconMail className="h-4 w-4 flex-shrink-0" />
        <span>info@edin.capital</span>
      </Link>
    </div>
  );
};

const SidebarHeader = () => {
  return (
    <div className="flex space-x-2">
      <Image
        src="/images/logos/edincapital_logo.jpeg"
        alt="Avatar"
        height={40}
        width={40}
        className="object-cover object-top rounded-full flex-shrink-0"
      />
      <div className="flex text-sm flex-col">
        <p className="font-bold text-primary">Edin Capital</p>
        <p className="font-light text-secondary">Fund 1</p>
      </div>
    </div>
  );
};
