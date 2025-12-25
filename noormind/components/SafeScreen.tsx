import { View, StyleSheet, Platform, StatusBar } from "react-native";
import { Colors } from "../constants/colors";

export default function SafeScreen({ children }: any) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
