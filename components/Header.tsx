import { BlurView } from "expo-blur";
import { Plus, Search } from "lucide-react-native";
import { Platform, Text, TextInput, View } from "react-native";
import { useTheme } from "../utils/useTheme";
import { IconButton } from "./IconButton";

interface HeaderProps {
  onAddPress: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header = ({
  onAddPress,
  searchQuery,
  onSearchChange,
}: HeaderProps) => {
  const { textColor, isDark, mutedColor, cardBg, borderColor } = useTheme();

  const blurContent = (
    <View className="gap-3">
      <Text
        className="text-3xl font-bold text-center"
        style={{ color: textColor }}
      >
        cryptonotes
      </Text>
      <View className="flex-row items-center gap-2">
        <View
          className="flex-1 flex-row items-center px-3 py-2 rounded-full border bg-transparent"
          style={{
            borderColor: borderColor,
          }}
        >
          <Search size={16} color={mutedColor} />
          <TextInput
            placeholder="Search notes..."
            placeholderTextColor={mutedColor}
            value={searchQuery}
            onChangeText={onSearchChange}
            className="flex-1 ml-2 text-base"
            style={{ color: textColor }}
          />
        </View>
        <IconButton onPress={onAddPress} variant="outline">
          <Plus size={24} strokeWidth={2.5} />
        </IconButton>
      </View>
    </View>
  );

  if (Platform.OS === "ios") {
    return (
      <BlurView
        intensity={20}
        tint={isDark ? "dark" : "light"}
        className="absolute top-0 left-0 right-0 pt-[60px] pb-4 px-4 z-[1000] overflow-hidden"
      >
        {blurContent}
      </BlurView>
    );
  }

  // Fallback for Android - use semi-transparent background
  return (
    <View
      className="absolute top-0 left-0 right-0 pt-[60px] pb-4 px-4 z-[1000] overflow-hidden"
      style={{
        backgroundColor: isDark
          ? "rgba(0, 0, 0, 0.5)"
          : "rgba(255, 255, 255, 0.5)",
      }}
    >
      {blurContent}
    </View>
  );
};
