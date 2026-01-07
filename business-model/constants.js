export const VOLUME_DISCOUNTS = [
    { minQty: 50, discount: 0.30 },
    { minQty: 10, discount: 0.20 },
    { minQty: 5, discount: 0.10 },
];

export const LOCATION_MULTIPLIER = {
    US: 1.0,
    EUROPE: 1.15,
    ASIA: 0.95,
};

export const HOLIDAY_CATEGORIES = ["ELECTRONICS", "BOOKS"];

export const isBlackFriday = (date) => {
    //last Friday of November
    const d = new Date(date);
    return (
        d.getMonth() === 10 && // November
        d.getDay() === 5 && // Friday
        d.getDate() >= 23
    );
};

export const POLISH_HOLIDAYS = ["1-1", "6-1", "5-4", "6-4", "1-5", "3-5", "24-5", "4-7", "15-8", "1-11", "11-11", "24-12", "25-12", "26-12" ];

export const isPolishHolidaySale = (date) => {
    // Example Polish holidays (simplified)
    const dayMonth = `${date.getDate()}-${date.getMonth() + 1}`;
    return POLISH_HOLIDAYS.includes(dayMonth);
};
