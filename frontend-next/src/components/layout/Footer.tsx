"use client";

import { Bus } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative bg-black/60 pt-16 pb-8 border-t border-white/10 mt-auto">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-gradient-to-tr from-brand-blue to-brand-purple rounded-lg">
                                <Bus className="text-white w-5 h-5" />
                            </div>
                            <span className="text-lg font-bold text-white font-heading">
                                SkyBus
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Premium bus booking experience. Safe, fast, and comfortable travel across the country.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/about" className="hover:text-brand-cyan transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-brand-cyan transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-brand-cyan transition-colors">Blog</Link></li>
                            <li><Link href="/press" className="hover:text-brand-cyan transition-colors">Press</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/help" className="hover:text-brand-cyan transition-colors">Help Center</Link></li>
                            <li><Link href="/terms" className="hover:text-brand-cyan transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-brand-cyan transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-cyan transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Stay Updated</h3>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Enter your email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-purple w-full" />
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} SkyBus Inc. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
                        <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
