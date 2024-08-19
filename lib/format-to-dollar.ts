export function formatToDollar(amount: string): string {
    const floatAmount = parseFloat(amount);
    const roundedAmount = floatAmount.toFixed(2);
    const formattedAmount = parseFloat(roundedAmount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    if (formattedAmount.includes("-")) {
        return `${formattedAmount.replace("-", "")}`;
    } else {
        return `${formattedAmount}`;
    }
}