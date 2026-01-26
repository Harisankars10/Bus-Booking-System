"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

export default function FilterSidebar() {
    const [openSections, setOpenSections] = useState({
        price: true,
        acc: true,
        amenities: false,
    });

    const toggle = (section: keyof typeof openSections) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-full md:w-64 space-y-4"
        >
            <div className="flex items-center gap-2 mb-4 text-brand-cyan">
                <Filter className="w-5 h-5" />
                <span className="font-bold font-heading uppercase tracking-wider text-sm">Filters</span>
            </div>

            {/* Price Filter */}
            <div className="glass p-4 rounded-xl">
                <div
                    className="flex justify-between items-center cursor-pointer mb-2"
                    onClick={() => toggle("price")}
                >
                    <h4 className="font-bold text-sm">Price Range</h4>
                    {openSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>

                {openSections.price && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="space-y-2 text-sm text-gray-400"
                    >
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" className="rounded bg-white/10 border-white/20" />
                            <span>Below ₹500</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" className="rounded bg-white/10 border-white/20" />
                            <span>₹500 - ₹1000</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" className="rounded bg-white/10 border-white/20" />
                            <span>Above ₹1000</span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* AC Filter */}
            <div className="glass p-4 rounded-xl">
                <div
                    className="flex justify-between items-center cursor-pointer mb-2"
                    onClick={() => toggle("acc")}
                >
                    <h4 className="font-bold text-sm">Bus Type</h4>
                    {openSections.acc ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>

                {openSections.acc && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="space-y-2 text-sm text-gray-400"
                    >
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" className="rounded bg-white/10 border-white/20" />
                            <span>AC Seater</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" className="rounded bg-white/10 border-white/20" />
                            <span>AC Sleeper</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" className="rounded bg-white/10 border-white/20" />
                            <span>Non-AC</span>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.aside>
    );
}
