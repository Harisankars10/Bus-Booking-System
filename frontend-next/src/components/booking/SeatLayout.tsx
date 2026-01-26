"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

interface Seat {
    id: string;
    row: number;
    col: number;
    type: "seater" | "sleeper";
    status: "available" | "booked" | "selected" | "female";
    price: number;
}

interface SeatLayoutProps {
    onSeatSelect: (selectedSeats: Seat[]) => void;
}

// Mock Data Generator
const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    // Lower Deck (Seater)
    for (let r = 1; r <= 8; r++) {
        for (let c = 1; c <= 4; c++) {
            if (c === 3) continue; // Aisle
            seats.push({
                id: `L-${r}${String.fromCharCode(64 + c)}`,
                row: r,
                col: c,
                type: "seater",
                status: Math.random() > 0.8 ? "booked" : Math.random() > 0.9 ? "female" : "available",
                price: 500,
            });
        }
    }
    return seats;
};

export default function SeatLayout({ onSeatSelect }: SeatLayoutProps) {
    const [seats, setSeats] = useState<Seat[]>(generateSeats());
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    const handleSeatClick = (seat: Seat) => {
        if (seat.status === "booked") return;

        let newStatus: Seat["status"] = "available";
        let newSelected = [...selectedSeats];

        if (seat.status === "selected") {
            newStatus = "available";
            newSelected = newSelected.filter((s) => s.id !== seat.id);
        } else {
            newStatus = "selected";
            newSelected.push({ ...seat, status: "selected" });
        }

        const updatedSeats = seats.map((s) =>
            s.id === seat.id ? { ...s, status: newStatus } : s
        );

        setSeats(updatedSeats);
        setSelectedSeats(newSelected);
        onSeatSelect(newSelected);
    };

    return (
        <div className="flex flex-col items-center gap-8">
            {/* Legend */}
            <div className="flex gap-4 text-xs md:text-sm text-gray-400">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-white/10 border border-white/30" /> Available
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-brand-cyan shadow-[0_0_10px_rgba(6,182,212,0.5)] border border-brand-cyan" /> Selected
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-700 opacity-50 cursor-not-allowed" /> Booked
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-pink-500/20 border border-pink-500" /> Female
                </div>
            </div>

            {/* Bus Layout */}
            <div className="p-8 glass rounded-3xl relative border border-white/10">
                {/* Driver Icon */}
                <div className="absolute top-8 right-8 w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center">
                    <span className="text-xs text-gray-500">D</span>
                </div>

                <div className="grid grid-cols-5 gap-x-8 gap-y-4">
                    <div className="col-span-2 space-y-4">
                        {/* Left Column seats */}
                        {Array.from({ length: 8 }).map((_, r) => (
                            <div key={r} className="flex gap-4">
                                {seats.filter(s => s.row === r + 1 && s.col <= 2).map(seat => (
                                    <SeatItem key={seat.id} seat={seat} onClick={() => handleSeatClick(seat)} />
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="col-span-1 flex justify-center items-center text-gray-700 text-xs tracking-widest uppercase py-4 writing-vertical-rl">
                        Aisle
                    </div>

                    <div className="col-span-2 space-y-4">
                        {/* Right Column seats */}
                        {Array.from({ length: 8 }).map((_, r) => (
                            <div key={r} className="flex gap-4">
                                {seats.filter(s => s.row === r + 1 && s.col > 2).map(seat => (
                                    <SeatItem key={seat.id} seat={seat} onClick={() => handleSeatClick(seat)} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SeatItem({ seat, onClick }: { seat: Seat; onClick: () => void }) {
    const isSelected = seat.status === "selected";
    const isBooked = seat.status === "booked";
    const isFemale = seat.status === "female";

    return (
        <motion.div
            onClick={onClick}
            whileHover={!isBooked ? { scale: 1.2 } : {}}
            whileTap={!isBooked ? { scale: 0.9 } : {}}
            className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 relative",
                isBooked
                    ? "bg-gray-700 opacity-30 cursor-not-allowed"
                    : isSelected
                        ? "bg-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.6)] z-10"
                        : isFemale
                            ? "bg-pink-500/20 border border-pink-500 hover:bg-pink-500/40"
                            : "bg-white/10 border border-white/20 hover:border-brand-cyan hover:bg-brand-cyan/20"
            )}
        >
            <div className={cn("w-8 h-8 rounded border-t-2 opacity-50", isSelected ? "border-white" : "border-gray-400")}></div>
            {/* Armrests */}
            <div className="absolute bottom-1 left-0 w-1 h-4 bg-current opacity-30 rounded-full" />
            <div className="absolute bottom-1 right-0 w-1 h-4 bg-current opacity-30 rounded-full" />
        </motion.div>
    );
}
