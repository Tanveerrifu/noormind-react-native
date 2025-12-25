import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/colors";

export default function Home() {
  const [mood, setMood] = useState("");
  const router = useRouter();

  const handleSend = () => {
    if (!mood.trim()) return;

    router.push({
      pathname: "/dua",
      params: { mood },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greet}>Assalamu Alaikum</Text>

      <Text style={styles.subtitle}>
        Share your feelings. NoorMind will suggest a dua for your heart.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>How are you feeling?</Text>

        <View style={styles.inputRow}>
          <TextInput
            placeholder="আজ মন খুব অস্থির লাগছে..."
            placeholderTextColor={Colors.muted}
            style={styles.input}
            multiline
            value={mood}
            onChangeText={setMood}
          />

          <TouchableOpacity
            style={[styles.sendBtn, { opacity: mood.trim() ? 1 : 0.4 }]}
            onPress={handleSend}
            disabled={!mood.trim()}
          >
            <Ionicons
              name="arrow-forward"
              size={20}
              color={Colors.background}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  greet: {
    color: Colors.text,
    fontSize: 24,
    marginTop: 40,
    fontWeight: "600",
  },
  subtitle: {
    color: Colors.muted,
    marginTop: 8,
    lineHeight: 20,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 16,
    marginTop: 30,
  },
  label: {
    color: Colors.text,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    color: Colors.text,
    minHeight: 60,
    paddingRight: 10,
    textAlignVertical: "top",
  },
  sendBtn: {
    backgroundColor: Colors.gold,
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
});
