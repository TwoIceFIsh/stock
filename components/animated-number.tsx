"use client"
import React, {useEffect, useState} from 'react';
import {formatToDollar} from "@/lib/format-to-dollar";
import {formatToPercent} from "@/lib/format-to-percent";

interface AnimatedNumberProps {
    value: number;
    toDollar?: boolean;
    toPercent?: boolean;
    toInt?: boolean;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({value, toInt, toDollar, toPercent}) => {
    const [displayValue, setDisplayValue] = useState<number>(value);

    useEffect(() => {
        let start: number | null = null;
        const duration = 50; // 1 second
        const initialValue = displayValue;
        const difference = value - initialValue;

        const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const increment = difference * (progress / duration);
            const newValue = initialValue + increment;

            setDisplayValue(newValue);

            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(value);
            }
        };

        requestAnimationFrame(animate);
    }, [value, displayValue]);

    let formattedValue: string | number = displayValue;

    if (!isNaN(displayValue)) {
        if (toDollar) {
            formattedValue = formatToDollar(displayValue.toFixed(2));
        } else if (toPercent) {
            formattedValue = formatToPercent(displayValue.toFixed(2));
        } else if (toInt) {
            formattedValue = parseInt(displayValue.toFixed(0));
        }
    } else {
        console.error("displayValue is not a valid number:", displayValue);
        formattedValue = "Invalid number";
    }

    return <span>{formattedValue}</span>;
};

export default AnimatedNumber;