import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>App preferences will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
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
});
