import { BlurView } from "expo-blur";
import { X } from "lucide-react-native";
import {
  Alert,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../utils/useTheme";
import { IconButton } from "./IconButton";

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onClearData: () => void;
  onExport: () => void;
  onImport: () => void;
}

export const SettingsModal = ({
  visible,
  onClose,
  onClearData,
  onExport,
  onImport,
}: SettingsModalProps) => {
  const { textColor, mutedColor, isDark, cardBg, borderColor } = useTheme();

  // Use a muted background for the modal
  const modalBg = isDark ? "#0a0a0a" : "#fafafa";

  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to permanently delete all notes? This action is irreversible and cannot be undone. All your notes will be lost forever.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear All Data",
          style: "destructive",
          onPress: onClearData,
        },
      ]
    );
  };

  const headerContent = (
    <View className="flex-row justify-between items-center">
      <IconButton onPress={onClose} variant="outline">
        <X size={24} strokeWidth={2.5} />
      </IconButton>
      <Text className="text-lg font-semibold" style={{ color: textColor }}>
        Settings
      </Text>
      <View className="w-11" />
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: modalBg }}>
        {Platform.OS === "ios" ? (
          <BlurView
            intensity={20}
            tint={isDark ? "dark" : "light"}
            className="absolute top-0 left-0 right-0 pt-4 pb-4 px-4 z-[1000] border-b"
            style={{ borderBottomColor: "rgba(128, 128, 128, 0.2)" }}
          >
            {headerContent}
          </BlurView>
        ) : (
          <View
            className="absolute top-0 left-0 right-0 pt-4 pb-4 px-4 z-[1000] border-b"
            style={{
              backgroundColor: isDark
                ? "rgba(0, 0, 0, 0.5)"
                : "rgba(255, 255, 255, 0.5)",
              borderBottomColor: "rgba(128, 128, 128, 0.2)",
            }}
          >
            {headerContent}
          </View>
        )}

        <ScrollView
          className="flex-1 p-4"
          contentContainerStyle={{ paddingTop: 70 }}
        >
          <TouchableOpacity
            onPress={onImport}
            className="p-4 rounded-xl border mb-3"
            style={{
              backgroundColor: cardBg,
              borderColor: borderColor,
            }}
          >
            <Text className="text-base font-semibold" style={{ color: textColor }}>
              Import Notes
            </Text>
            <Text
              className="text-sm mt-1"
              style={{ color: mutedColor }}
            >
              Import notes from JSON file
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onExport}
            className="p-4 rounded-xl border mb-3"
            style={{
              backgroundColor: cardBg,
              borderColor: borderColor,
            }}
          >
            <Text className="text-base font-semibold" style={{ color: textColor }}>
              Export Notes
            </Text>
            <Text
              className="text-sm mt-1"
              style={{ color: mutedColor }}
            >
              Export all notes as JSON file
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleClearData}
            className="p-4 rounded-xl border mb-3"
            style={{
              backgroundColor: cardBg,
              borderColor: borderColor,
            }}
          >
            <Text className="text-base font-semibold" style={{ color: textColor }}>
              Clear All Data
            </Text>
            <Text
              className="text-sm mt-1"
              style={{ color: mutedColor }}
            >
              Delete all notes permanently
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

