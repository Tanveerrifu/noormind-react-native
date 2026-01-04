export function getHijriDate(date = new Date()) {
    const formatter = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const parts = formatter.formatToParts(date);

    const day = parts.find(p => p.type === "day")?.value;
    const month = parts.find(p => p.type === "month")?.value;
    const year = parts.find(p => p.type === "year")?.value;

    return `${day} ${month} ${year} AH`;
}
