import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

export default function Bookmarks() {
  const [list, setList] = useState<any[]>([]);

  // Reload bookmarks whenever tab is focused
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("bookmarks").then((res) => {
        setList(res ? JSON.parse(res) : []);
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* HEADER – EXACT SAME STYLE AS SETTINGS */}
      <Text style={styles.title}>Saved Duas</Text>
      <Text style={styles.subtitle}>
        Your bookmarked duas will appear here.
      </Text>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {list.length === 0 && (
          <Text style={styles.empty}>No saved duas yet.</Text>
        )}

        {list.map((d, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.arabic}>{d.arabic}</Text>
            <Text style={styles.pronounce}>{d.pronounce}</Text>
            <Text style={styles.meaning}>{d.meaning}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20, // SAME AS SETTINGS
  },

  // 🔥 HEADER STYLES (COPIED FROM SETTINGS)
  title: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "600",
    marginTop: 40,
  },
  subtitle: {
    color: Colors.muted,
    marginTop: 8,
  },

  content: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  empty: {
    color: Colors.muted,
    marginTop: 60,
    textAlign: "center",
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  arabic: {
    color: Colors.gold,
    fontSize: 22,
    textAlign: "center",
    marginBottom: 8,
  },
  pronounce: {
    color: Colors.text,
    textAlign: "center",
  },
  meaning: {
    color: Colors.muted,
    textAlign: "center",
    marginTop: 4,
    lineHeight: 18,
  },
});
