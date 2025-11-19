import { BlurView } from "expo-blur";
import { Lock, LockOpen, Plus, Search } from "lucide-react-native";
import {
  Dimensions,
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../utils/i18n/LanguageContext";
import { useTheme } from "../utils/useTheme";
import { IconButton } from "./IconButton";

interface HeaderProps {
  onAddPress: () => void;
  onSettingsPress?: () => void;
  onLockPress?: () => void;
  isLocked?: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header = ({
  onAddPress,
  onSettingsPress,
  onLockPress,
  isLocked = false,
  searchQuery,
  onSearchChange,
}: HeaderProps) => {
  const { t } = useLanguage();
  const { textColor, isDark, mutedColor, cardBg, borderColor } = useTheme();

  // Detect if device is iPad/tablet (screen width > 768px)
  const { width: screenWidth } = Dimensions.get("window");
  const isTablet = screenWidth > 768;

  const blurContent = (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          className="flex-row items-center gap-2"
          onPress={onSettingsPress}
        >
          <Image
            source={require("../assets/images/image.png")}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: borderColor,
            }}
            resizeMode="contain"
          />
          <Text
            className="text-2xl font-mono font-bold tracking-tighter"
            style={{ color: textColor }}
          >
            notes.env
          </Text>
        </TouchableOpacity>
        <View className="flex-row gap-2">
          {isTablet && (
            <IconButton onPress={onAddPress} variant="outline">
              <Plus size={18} />
            </IconButton>
          )}
          {onLockPress && (
            <IconButton onPress={onLockPress} variant="outline">
              {isLocked ? <Lock size={18} /> : <LockOpen size={18} />}
            </IconButton>
          )}
        </View>
      </View>
      <View
        className="flex-row items-center px-3 py-2 rounded-full border"
        style={{
          backgroundColor: cardBg,
          borderColor: borderColor,
        }}
      >
        <Search size={14} color={mutedColor} />
        <TextInput
          placeholder={t.header.searchPlaceholder}
          placeholderTextColor={mutedColor}
          value={searchQuery}
          onChangeText={onSearchChange}
          className="flex-1 font-mono ml-2 text-base tracking-tighter"
          style={{ color: textColor }}
        />
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
