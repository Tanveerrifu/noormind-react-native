import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "../../constants/colors";
import duas from "../../data/duas.json";

type DuaItem = {
  id: string;
  keywords: string[];
  arabic: string;
  pronounce: string;
  meaning: string;
};

export default function Dua() {
  const { mood } = useLocalSearchParams<{ mood?: string }>();
  const userMood = (mood || "").toLowerCase();

  const duaList = duas as DuaItem[];

  const matchedDua =
    duaList.find((d) =>
      d.keywords.some((k) => userMood.includes(k.toLowerCase()))
    ) || duaList[0];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.arabic}>{matchedDua.arabic}</Text>
        <Text style={styles.pronounce}>{matchedDua.pronounce}</Text>
        <Text style={styles.meaning}>{matchedDua.meaning}</Text>
      </View>

      <TouchableOpacity style={styles.playBtn}>
        <Text style={styles.playText}>▶</Text>
      </TouchableOpacity>
    </View>
  );
}

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
    fontSize: 30,
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
  playBtn: {
    backgroundColor: Colors.gold,
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  playText: {
    fontSize: 20,
    color: Colors.background,
  },
});
