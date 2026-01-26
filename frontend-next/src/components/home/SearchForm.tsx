"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Search } from "lucide-react";
import { useState } from "react";

export default function SearchForm() {
    const [focused, setFocused] = useState<string | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full max-w-4xl mx-auto p-4 glass-card rounded-2xl relative z-20"
        >
            <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* From Input */}
                <div className="relative flex-1 group w-full">
                    <label className="absolute -top-6 left-2 text-xs text-brand-cyan font-medium opacity-0 group-focus-within:opacity-100 transition-opacity">
                        Depart From
                    </label>
                    <div
                        className={`flex items-center gap-3 p-4 bg-white/5 rounded-xl border transition-all duration-300 ${focused === "from"
                                ? "border-brand-blue bg-white/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                                : "border-white/10 hover:border-white/20"
                            }`}
                    >
                        <MapPin className="text-brand-purple w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Leaving from..."
                            className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-full"
                            onFocus={() => setFocused("from")}
                            onBlur={() => setFocused(null)}
                        />
                    </div>
                </div>

                {/* To Input */}
                <div className="relative flex-1 group w-full">
                    <label className="absolute -top-6 left-2 text-xs text-brand-cyan font-medium opacity-0 group-focus-within:opacity-100 transition-opacity">
                        Going To
                    </label>
                    <div
                        className={`flex items-center gap-3 p-4 bg-white/5 rounded-xl border transition-all duration-300 ${focused === "to"
                                ? "border-brand-purple bg-white/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                                : "border-white/10 hover:border-white/20"
                            }`}
                    >
                        <MapPin className="text-brand-cyan w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Going to..."
                            className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-full"
                            onFocus={() => setFocused("to")}
                            onBlur={() => setFocused(null)}
                        />
                    </div>
                </div>

                {/* Date Input */}
                <div className="relative flex-1 group w-full">
                    <label className="absolute -top-6 left-2 text-xs text-brand-cyan font-medium opacity-0 group-focus-within:opacity-100 transition-opacity">
                        Travel Date
                    </label>
                    <div
                        className={`flex items-center gap-3 p-4 bg-white/5 rounded-xl border transition-all duration-300 ${focused === "date"
                                ? "border-brand-cyan bg-white/10 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                                : "border-white/10 hover:border-white/20"
                            }`}
                    >
                        <Calendar className="text-white w-5 h-5" />
                        <input
                            type="date"
                            className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-full [color-scheme:dark]"
                            onFocus={() => setFocused("date")}
                            onBlur={() => setFocused(null)}
                        />
                    </div>
                </div>

                {/* Search Button */}
                <button className="w-full md:w-auto p-4 bg-gradient-to-r from-brand-blue to-brand-purple rounded-xl text-white font-bold shadow-lg shadow-brand-blue/30 hover:shadow-brand-blue/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" />
                    <span>Search Buses</span>
                </button>
            </div>
        </motion.div>
    );
}
