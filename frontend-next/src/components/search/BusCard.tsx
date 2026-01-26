"use client";

import { Bus } from "@/types";
import { motion } from "framer-motion";
import { Star, Clock, Wifi, Coffee, BatteryCharging } from "lucide-react";
import Link from "next/link";

interface BusCardProps {
    bus: Bus;
    index: number;
}

const amenityIcons: Record<string, any> = {
    Wifi: Wifi,
    Coffee: Coffee,
    Power: BatteryCharging,
};

export default function BusCard({ bus, index }: BusCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-2xl mb-4 group hover:bg-white/5 transition-all duration-300 relative overflow-hidden"
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">

                {/* Bus Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold font-heading">{bus.name}</h3>
                        <span className="px-2 py-1 bg-brand-cyan/20 text-brand-cyan text-xs rounded-full border border-brand-cyan/30">
                            {bus.type}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1 bg-green-500/20 px-1.5 py-0.5 rounded text-green-400 text-sm">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{bus.rating}</span>
                        </div>
                        <span className="text-gray-500 text-xs">({bus.totalRatings} ratings)</span>
                    </div>

                    <div className="flex gap-4 text-gray-400">
                        {bus.amenities.map(amenity => {
                            const Icon = amenityIcons[amenity];
                            return Icon ? <Icon key={amenity} className="w-4 h-4" /> : null;
                        })}
                    </div>
                </div>

                {/* Timings */}
                <div className="flex items-center gap-6 text-center">
                    <div>
                        <p className="text-lg font-bold">{bus.departureTime}</p>
                        <p className="text-xs text-gray-500">Departure</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-20 h-[1px] bg-gray-600"></div>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {bus.duration}
                        </span>
                    </div>
                    <div>
                        <p className="text-lg font-bold">{bus.arrivalTime}</p>
                        <p className="text-xs text-gray-500">Arrival</p>
                    </div>
                </div>

                {/* Price & Action */}
                <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-4 w-full md:w-auto justify-between border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 mt-4 md:mt-0">
                    <div className="text-right">
                        <p className="text-gray-400 text-xs">Starting from</p>
                        <p className="text-2xl font-bold text-brand-cyan">₹{bus.price}</p>
                    </div>

                    <Link href={`/book/${bus.id}`}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-gradient-to-r from-brand-blue to-brand-purple rounded-lg font-bold shadow-lg shadow-brand-blue/20"
                        >
                            View Seats
                        </motion.button>
                    </Link>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex justify-between text-xs text-gray-500">
                <span>{bus.seatsAvailable} Seats Available</span>
                <span className="text-brand-purple">Window Seats Available</span>
            </div>
        </motion.div>
    );
}
