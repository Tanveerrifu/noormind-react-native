import { Tabs } from "expo-router";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopWidth: 0,
          elevation: 0,
          height: 64,
        },
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: Colors.muted,
        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 6,
        },
        tabBarIcon: ({ color }) => {
          let icon: any = "home";

          if (route.name === "index") icon = "home";
          if (route.name === "dua") icon = "play-circle";
          if (route.name === "bookmarks") icon = "bookmark";
          if (route.name === "settings") icon = "settings";

          return <Ionicons name={icon} size={22} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="dua" options={{ title: "Dua" }} />
      <Tabs.Screen name="bookmarks" options={{ title: "Saved" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
