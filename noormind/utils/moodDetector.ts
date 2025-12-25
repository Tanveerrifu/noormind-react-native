export type Mood =
    | "sad"
    | "anxiety"
    | "fear"
    | "stress"
    | "gratitude"
    | "anger"
    | "neutral";

export function detectMood(text: string): Mood {
    const t = text.toLowerCase();

    if (t.includes("মন খারাপ") || t.includes("sad") || t.includes("কষ্ট"))
        return "sad";

    if (t.includes("টেনশন") || t.includes("অস্থির") || t.includes("stress"))
        return "stress";

    if (t.includes("ভয়") || t.includes("fear"))
        return "fear";

    if (t.includes("রাগ") || t.includes("angry"))
        return "anger";

    if (t.includes("ধন্যবাদ") || t.includes("কৃতজ্ঞ"))
        return "gratitude";

    return "neutral";
}
