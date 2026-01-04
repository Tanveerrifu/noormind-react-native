import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/colors";
import duas from "../../data/duas.json";

/* ================= EMOTION ================= */

type Emotion = "sad" | "anxiety" | "sleep" | "unknown";

function detectEmotion(text: string): Emotion {
  const t = text.toLowerCase();
  if (t.includes("মন খারাপ") || t.includes("দুঃখ") || t.includes("sad"))
    return "sad";
  if (t.includes("টেনশন") || t.includes("অস্থির") || t.includes("anxious"))
    return "anxiety";
  if (t.includes("ঘুম") || t.includes("sleep")) return "sleep";
  return "unknown";
}

function emotionLabel(emotion: Emotion) {
  if (emotion === "sad") return "Sadness (মন খারাপ)";
  if (emotion === "anxiety") return "Anxiety (অস্থিরতা)";
  if (emotion === "sleep") return "Sleep / Tiredness";
  return "Unclear mood";
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

/* ================= SCREEN ================= */

export default function Dua() {
  const { mood } = useLocalSearchParams<{ mood?: string }>();
  const emotion = detectEmotion(mood || "");

  const [dua, setDua] = useState<any>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const lastIndexRef = useRef<Record<string, number>>({});

  useEffect(() => {
    async function loadDua() {
      const storageKey = `dua-${emotion}-${todayKey()}`;
      const saved = await AsyncStorage.getItem(storageKey);

      if (saved) {
        setDua(JSON.parse(saved));
        return;
      }

      const fallback = {
        id: "general",
        arabic: "اللَّهُمَّ رَحْمَتَكَ أَرْجُو",
        pronounce: "আল্লাহুম্মা রহমাতাকা আরজু",
        meaning: "হে আল্লাহ! আমি আপনার রহমতের আশাই করি",
      };

      if (emotion === "unknown") {
        await AsyncStorage.setItem(storageKey, JSON.stringify(fallback));
        setDua(fallback);
        return;
      }

      const matched = duas.filter((d) => d.id === emotion);
      const last = lastIndexRef.current[emotion] ?? -1;
      const next = (last + 1) % matched.length;
      lastIndexRef.current[emotion] = next;

      const selected = matched[next];
      await AsyncStorage.setItem(storageKey, JSON.stringify(selected));
      setDua(selected);
    }

    loadDua();
  }, [emotion]);

  useEffect(() => {
    async function checkBookmark() {
      if (!dua) return;
      const saved = await AsyncStorage.getItem("bookmarks");
      const list = saved ? JSON.parse(saved) : [];
      setBookmarked(list.some((d: any) => d.arabic === dua.arabic));
    }
    checkBookmark();
  }, [dua]);

  async function toggleBookmark() {
    const saved = await AsyncStorage.getItem("bookmarks");
    let list = saved ? JSON.parse(saved) : [];

    if (bookmarked) {
      list = list.filter((d: any) => d.arabic !== dua.arabic);
    } else {
      list.push(dua);
    }

    await AsyncStorage.setItem("bookmarks", JSON.stringify(list));
    setBookmarked(!bookmarked);
  }

  if (!dua) return null;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.reason}>
          {emotion === "unknown"
            ? "We couldn’t clearly understand your mood, so here is a comforting dua for you."
            : `Suggested because you felt: ${emotionLabel(emotion)}`}
        </Text>

        <Text style={styles.arabic}>{dua.arabic}</Text>
        <Text style={styles.pronounce}>{dua.pronounce}</Text>
        <Text style={styles.meaning}>{dua.meaning}</Text>

        <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkBtn}>
          <Text style={{ color: Colors.gold }}>
            {bookmarked ? "★ Saved" : "☆ Save"}
          </Text>
        </TouchableOpacity>
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
  reason: {
    color: Colors.muted,
    fontSize: 12,
    textAlign: "center",
    marginBottom: 12,
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
  bookmarkBtn: {
    marginTop: 16,
    alignSelf: "center",
  },
});
