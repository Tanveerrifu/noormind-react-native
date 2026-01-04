import {
    CalculationMethod,
    Coordinates,
    Madhab,
    PrayerTimes,
} from "adhan";

export function getPrayerTimes(
    latitude: number,
    longitude: number,
    date = new Date()
) {
    const coordinates = new Coordinates(latitude, longitude);

    const params = CalculationMethod.Karachi();
    params.madhab = Madhab.Hanafi;

    const prayerTimes = new PrayerTimes(coordinates, date, params);

    return {
        fajr: prayerTimes.fajr,
        dhuhr: prayerTimes.dhuhr,
        asr: prayerTimes.asr,
        maghrib: prayerTimes.maghrib,
        isha: prayerTimes.isha,
    };
}
