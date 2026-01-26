"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Bus, User } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Search", href: "/search" },
    { name: "My Bookings", href: "/bookings" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass bg-transparent/20"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-gradient-to-tr from-brand-blue to-brand-purple rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Bus className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-heading">
                        SkyBus
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "relative text-sm font-medium transition-colors hover:text-brand-cyan",
                                pathname === link.href ? "text-brand-cyan" : "text-gray-300"
                            )}
                        >
                            {link.name}
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-cyan rounded-full"
                                />
                            )}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <button className="px-5 py-2 text-sm font-medium text-white transition-all hover:text-brand-cyan">
                            Login
                        </button>
                    </Link>
                    <Link href="/register">
                        <button className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-brand-blue to-brand-purple rounded-full shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 hover:scale-105 transition-all duration-300">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
