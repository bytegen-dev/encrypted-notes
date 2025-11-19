import { BlurView } from "expo-blur";
import { Plus } from "lucide-react-native";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../utils/useTheme";

interface HeaderProps {
  onAddPress: () => void;
}

export const Header = ({ onAddPress }: HeaderProps) => {
  const { textColor, accentColor, isDark } = useTheme();
  // Icon color should be opposite of accent (if accent is white, icon is black, etc)
  const iconColor = accentColor === "#ffffff" ? "#000000" : "#ffffff";

  const blurContent = (
    <View style={styles.container}>
      <Text style={[styles.title, { color: textColor }]}>Notes</Text>
      <TouchableOpacity
        onPress={onAddPress}
        style={[
          styles.addButton,
          {
            backgroundColor: accentColor,
            borderWidth: accentColor === "#ffffff" ? 1 : 0,
            borderColor: "#e0e0e0",
          },
        ]}
      >
        <Plus size={24} color={iconColor} strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );

  if (Platform.OS === "ios") {
    return (
      <BlurView
        intensity={20}
        tint={isDark ? "dark" : "light"}
        style={styles.blurContainer}
      >
        {blurContent}
      </BlurView>
    );
  }

  // Fallback for Android - use semi-transparent background
  return (
    <View
      style={[
        styles.blurContainer,
        {
          backgroundColor: isDark
            ? "rgba(0, 0, 0, 0.5)"
            : "rgba(255, 255, 255, 0.5)",
        },
      ]}
    >
      {blurContent}
    </View>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    zIndex: 1000,
    overflow: "hidden",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});
