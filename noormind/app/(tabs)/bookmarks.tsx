import { View, Text } from "react-native";
import { Colors } from "../../constants/colors";

export default function Bookmarks() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, padding: 20 }}>
      <Text style={{ color: Colors.text, fontSize: 20, marginTop: 40 }}>
        Saved Duas
      </Text>
      <Text style={{ color: Colors.muted, marginTop: 10 }}>
        Bookmarked duas will appear here.
      </Text>
    </View>
  );
}