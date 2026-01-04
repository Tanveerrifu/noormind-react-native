import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import duas from "../../data/duas.json";

/* ================= HELPERS ================= */

function detectEmotion(text: string) {
  const t = text.toLowerCase();

  if (t.includes("মন খারাপ") || t.includes("দুঃখ") || t.includes("sad"))
    return "sad";

  if (t.includes("টেনশন") || t.includes("অস্থির") || t.includes("anxious"))
    return "anxiety";

  if (t.includes("ঘুম") || t.includes("sleep") || t.includes("sleepy"))
    return "sleep";

  return "unknown";
}

/* ================= SCREEN ================= */

export default function Dua() {
  const { mood } = useLocalSearchParams<{ mood?: string }>();
  const emotion = detectEmotion(mood || "");

  // 🔒 keep index between renders (rotation)
  const lastIndexRef = useRef<Record<string, number>>({});

  // filter matching duas
  const matchedDuas = duas.filter((d) => d.id === emotion);

  // fallback if nothing matched
  const fallback = {
    arabic: "اللَّهُمَّ رَحْمَتَكَ أَرْجُو",
    pronounce: "আল্লাহুম্মা রহমাতাকা আরজু",
    meaning: "হে আল্লাহ! আমি আপনার রহমতের আশাই করি",
  };

  if (matchedDuas.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.arabic}>{fallback.arabic}</Text>
          <Text style={styles.pronounce}>{fallback.pronounce}</Text>
          <Text style={styles.meaning}>{fallback.meaning}</Text>
        </View>
      </View>
    );
  }

  // rotation logic
  const lastIndex = lastIndexRef.current[emotion] ?? -1;
  const nextIndex = (lastIndex + 1) % matchedDuas.length;
  lastIndexRef.current[emotion] = nextIndex;

  const dua = matchedDuas[nextIndex];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.arabic}>{dua.arabic}</Text>
        <Text style={styles.pronounce}>{dua.pronounce}</Text>
        <Text style={styles.meaning}>{dua.meaning}</Text>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 24,
  },
  arabic: {
    color: Colors.gold,
    fontSize: 28,
    textAlign: "center",
    marginBottom: 16,
  },
  pronounce: {
    color: Colors.text,
    textAlign: "center",
    marginBottom: 8,
  },
  meaning: {
    color: Colors.muted,
    textAlign: "center",
    lineHeight: 20,
  },
});
