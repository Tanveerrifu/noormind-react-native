/* ========= Bangladesh Govt Revised Bangla Calendar ========= */

const banglaMonths = [
    { name: "বৈশাখ", start: [4, 14] },
    { name: "জ্যৈষ্ঠ", start: [5, 15] },
    { name: "আষাঢ়", start: [6, 15] },
    { name: "শ্রাবণ", start: [7, 16] },
    { name: "ভাদ্র", start: [8, 16] },
    { name: "আশ্বিন", start: [9, 16] },
    { name: "কার্তিক", start: [10, 16] },
    { name: "অগ্রহায়ণ", start: [11, 15] },
    { name: "পৌষ", start: [12, 15] },
    { name: "মাঘ", start: [1, 14] },
    { name: "ফাল্গুন", start: [2, 13] },
    { name: "চৈত্র", start: [3, 15] },
];

const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

function toBanglaNumber(num: number) {
    return num
        .toString()
        .split("")
        .map((d) => banglaDigits[parseInt(d)])
        .join("");
}

export function getBanglaPanchang(date = new Date()) {
    const gDay = date.getDate();
    const gMonth = date.getMonth() + 1; // 1-based
    const gYear = date.getFullYear();

    let banglaMonthIndex = 0;

    for (let i = 0; i < banglaMonths.length; i++) {
        const [m, d] = banglaMonths[i].start;

        if (
            gMonth > m ||
            (gMonth === m && gDay >= d)
        ) {
            banglaMonthIndex = i;
        }
    }

    const banglaMonth = banglaMonths[banglaMonthIndex];

    const startMonth = banglaMonth.start[0];
    const startDay = banglaMonth.start[1];

    const startDate =
        startMonth > gMonth
            ? new Date(gYear - 1, startMonth - 1, startDay)
            : new Date(gYear, startMonth - 1, startDay);

    const diffDays = Math.floor(
        (date.getTime() - startDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const banglaDay = diffDays + 1;

    const banglaYear =
        gMonth > 4 || (gMonth === 4 && gDay >= 14)
            ? gYear - 593
            : gYear - 594;

    return `${toBanglaNumber(banglaDay)} ${banglaMonth.name} ${toBanglaNumber(
        banglaYear
    )}`;
}
