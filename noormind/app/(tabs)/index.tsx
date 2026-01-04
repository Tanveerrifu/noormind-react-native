import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import { getPrayerTimes } from "../../utils/prayerTimes";
import { formatTime } from "../../utils/time";

/* ================= DATE HELPERS ================= */

// English Gregorian
function getEnglishDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// Hijri Islamic (English language, no duplicate AH)
function getHijriDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-GB-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/* ================= HOME ================= */

export default function Home() {
  const router = useRouter();
  const [mood, setMood] = useState("");
  const [prayers, setPrayers] = useState<any>(null);
  const [locationError, setLocationError] = useState(false);

  const handleSend = () => {
    if (!mood.trim()) return;
    router.push({
      pathname: "/(tabs)/dua",
      params: { mood },
    });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationError(true);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setPrayers(getPrayerTimes(latitude, longitude));
    })();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.greet}>Assalamu Alaikum</Text>

        <View style={{ marginTop: 6 }}>
          <Text style={styles.subGreet}>📅 {getEnglishDate()}</Text>
          <Text style={styles.subGreet}>🌙 {getHijriDate()}</Text>
        </View>
      </View>

      {/* MOOD INPUT */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>How are you feeling today?</Text>

        <View style={styles.inputRow}>
          <TextInput
            placeholder="আজ মন খুব অস্থির লাগছে..."
            placeholderTextColor={Colors.muted}
            value={mood}
            onChangeText={setMood}
            multiline
            style={styles.input}
          />

          <TouchableOpacity
            onPress={handleSend}
            disabled={!mood.trim()}
            style={[styles.sendBtn, { opacity: mood.trim() ? 1 : 0.4 }]}
          >
            <Ionicons
              name="arrow-forward"
              size={20}
              color={Colors.background}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.analyticsPreview}>
          <Text style={styles.analyticsText}>
            Last 7 days: Mostly Anxious 😟
          </Text>
          <Text style={styles.analyticsText}>Peak time: Night 🌙</Text>
        </View>
      </View>

      {/* PRAYER TIMES */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🕌 Prayer Times (Today)</Text>

        {locationError && (
          <Text style={styles.infoText}>Location permission denied</Text>
        )}

        {!prayers && !locationError && (
          <Text style={styles.infoText}>Loading prayer times…</Text>
        )}

        {prayers && (
          <>
            <PrayerRow name="Fajr" time={formatTime(prayers.fajr)} />
            <PrayerRow name="Dhuhr" time={formatTime(prayers.dhuhr)} />
            <PrayerRow name="Asr" time={formatTime(prayers.asr)} />
            <PrayerRow name="Maghrib" time={formatTime(prayers.maghrib)} />
            <PrayerRow name="Isha" time={formatTime(prayers.isha)} />
          </>
        )}
      </View>

      {/* TODAY GUIDANCE */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📖 Today’s Guidance</Text>
        <Text style={styles.guidance}>
          “When anxiety increases, return to remembrance.”
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/dua")}
          style={styles.viewBtn}
        >
          <Text style={styles.viewBtnText}>View Dua</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* ================= PRAYER ROW ================= */

function PrayerRow({ name, time }: { name: string; time: string }) {
  return (
    <View style={styles.prayerRow}>
      <Text style={styles.prayer}>{name}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 24,
  },
  greet: {
    color: Colors.text,
    fontSize: 26,
    fontWeight: "600",
  },
  subGreet: {
    color: Colors.muted,
    marginTop: 2,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
  },
  cardTitle: {
    color: Colors.text,
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "600",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    color: Colors.text,
    minHeight: 60,
    textAlignVertical: "top",
    paddingRight: 10,
  },
  sendBtn: {
    backgroundColor: Colors.gold,
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  analyticsPreview: {
    marginTop: 12,
  },
  analyticsText: {
    color: Colors.muted,
    fontSize: 13,
  },
  prayerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  prayer: {
    color: Colors.text,
  },
  time: {
    color: Colors.muted,
  },
  infoText: {
    color: Colors.muted,
    marginBottom: 6,
  },
  guidance: {
    color: Colors.text,
    lineHeight: 20,
  },
  viewBtn: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  viewBtnText: {
    color: Colors.gold,
    fontWeight: "600",
  },
});
