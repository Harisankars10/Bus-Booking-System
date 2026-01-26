export interface Bus {
    id: string;
    name: string;
    type: string;
    rating: number;
    totalRatings: number;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
    seatsAvailable: number;
    amenities: string[];
}
