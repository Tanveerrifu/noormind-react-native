import duas from "../data/duas.json";

export function pickDuaByMood(mood: string) {
    const matched = duas.filter((dua: any) =>
        dua.moods.includes(mood)
    );

    if (matched.length === 0) return null;

    // random dua return
    return matched[Math.floor(Math.random() * matched.length)];
}
