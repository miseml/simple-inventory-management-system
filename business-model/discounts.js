import {
    VOLUME_DISCOUNTS,
    HOLIDAY_CATEGORIES,
    LOCATION_MULTIPLIER,
    isBlackFriday,
    isPolishHolidaySale
} from "./constants.js";

const calculateDiscount = ({totalQuantity, categories, orderDate}) => {
    let applicableDiscounts = [];

    const volumeDiscount = VOLUME_DISCOUNTS.find(
        (d) => totalQuantity >= d.minQty
    );
    if (volumeDiscount) {
        applicableDiscounts.push(volumeDiscount.discount);
    }

    if (isBlackFriday(orderDate)) {
        applicableDiscounts.push(0.25);
    }

    if (
        isPolishHolidaySale(orderDate) &&
        categories.some((c) => HOLIDAY_CATEGORIES.includes(c))
    ) {
        applicableDiscounts.push(0.15);
    }
    return applicableDiscounts.length
        ? Math.max(...applicableDiscounts)
        : 0;
};

export const calculateFinalOrderValue = ({
                                             orderItems,
                                             customer,
                                             orderDate = new Date(),
                                         }) => {
    const baseTotal = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0.0
    );

    const totalQuantity = orderItems.reduce(
        (sum, item) => {
            console.log(sum, item);
            return sum + item.quantity
        },
        0
    );

    const categories = [...new Set(orderItems.map((i) => i.category))];

    const discountRate = calculateDiscount({
        totalQuantity,
        categories,
        orderDate,
    });

    const discountedTotal = baseTotal * (1 - discountRate);

    const locationMultiplier =
        LOCATION_MULTIPLIER[customer.location] ?? 1.0;

    const finalTotal = discountedTotal * locationMultiplier;

    return {
        baseTotal,
        discountRate,
        discountedTotal,
        locationMultiplier,
        finalTotal: Number(finalTotal.toFixed(2)),
    };
};