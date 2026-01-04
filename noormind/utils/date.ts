// English Gregorian Date
export function getEnglishDate(date = new Date()) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
}

// Hijri Date (Arabic calendar BUT English language)
export function getHijriEnglishDate(date = new Date()) {
    return new Intl.DateTimeFormat("en-GB-u-ca-islamic", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date) + " AH";
}

// Bangla Date (Bengali calendar + Bangla language)
export function getBanglaDate(date = new Date()) {
    return new Intl.DateTimeFormat("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
}
