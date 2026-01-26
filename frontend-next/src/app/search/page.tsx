"use client";

import BusCard from "@/components/search/BusCard";
import FilterSidebar from "@/components/search/FilterSidebar";
import Skeleton from "@/components/ui/Skeleton";
import { Bus } from "@/types";
import { useEffect, useState } from "react";

const MOCK_BUSES: Bus[] = [
    {
        id: "1",
        name: "SkyBus Premium",
        type: "AC Sleeper (2+1)",
        rating: 4.8,
        totalRatings: 124,
        departureTime: "21:00",
        arrivalTime: "06:00",
        duration: "9h 00m",
        price: 1250,
        seatsAvailable: 15,
        amenities: ["Wifi", "Coffee", "Power"],
    },
    {
        id: "2",
        name: "IntrCity SmartBus",
        type: "AC Seater (2+2)",
        rating: 4.5,
        totalRatings: 89,
        departureTime: "22:30",
        arrivalTime: "07:15",
        duration: "8h 45m",
        price: 899,
        seatsAvailable: 24,
        amenities: ["Wifi", "Power"],
    },
    {
        id: "3",
        name: "GreenLine Travels",
        type: "Non-AC Sleeper",
        rating: 4.2,
        totalRatings: 56,
        departureTime: "19:00",
        arrivalTime: "04:30",
        duration: "9h 30m",
        price: 650,
        seatsAvailable: 8,
        amenities: ["Power"],
    },
    {
        id: "4",
        name: "Orange Tours",
        type: "Volvo Multi-Axle",
        rating: 4.7,
        totalRatings: 210,
        departureTime: "23:00",
        arrivalTime: "07:00",
        duration: "8h 00m",
        price: 1500,
        seatsAvailable: 2,
        amenities: ["Wifi", "Coffee", "Power"],
    },
];

export default function SearchPage() {
    const [loading, setLoading] = useState(true);
    const [buses, setBuses] = useState<Bus[]>([]);

    useEffect(() => {
        // Simulate API call
        const timer = setTimeout(() => {
            setBuses(MOCK_BUSES);
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen pt-24 px-6 pb-12 bg-background">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

                {/* Sidebar */}
                <FilterSidebar />

                {/* Results */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold font-heading">
                            Bangalore to Hyderabad
                            <span className="text-sm font-normal text-gray-400 block ml-0.5 mt-1">
                                {loading ? "Searching..." : `${buses.length} Buses Found`}
                            </span>
                        </h1>

                        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none">
                            <option>Sort by: Popularity</option>
                            <option>Sort by: Price Low to High</option>
                            <option>Sort by: Departure Time</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="glass p-6 rounded-2xl h-48 w-full flex flex-col gap-4">
                                    <div className="flex justify-between">
                                        <Skeleton className="h-6 w-1/3" />
                                        <Skeleton className="h-6 w-20" />
                                    </div>
                                    <Skeleton className="h-4 w-1/4" />
                                    <div className="flex justify-between items-center mt-auto">
                                        <Skeleton className="h-8 w-32" />
                                        <Skeleton className="h-10 w-32" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            buses.map((bus, index) => <BusCard key={bus.id} bus={bus} index={index} />)
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
