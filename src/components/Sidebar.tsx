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
import { IconLayoutSidebarRightCollapse, IconMail } from "@tabler/icons-react";
import { isMobile } from "@/lib/utils";

export const Sidebar = () => {
  const [open, setOpen] = useState(isMobile() ? false : true);

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
            <div onClick={() => isMobile() && setOpen(false)}>
              <Badge href="https://www.dropbox.com/scl/fi/rofebzx4l0r5r0lcaweih/Deep-Dive-EDIN.pdf?rlkey=x835swqlmkbwwnb8xm007wjy2&st=rmocy3oj&dl=0" text="Edin Deck" target="_blank" />
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
