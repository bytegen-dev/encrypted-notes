import { useState } from "react";
import {
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../utils/i18n/LanguageContext";
import { useTheme } from "../utils/useTheme";
import { PasscodeInput } from "./PasscodeInput";

interface LockScreenProps {
  onUnlock: () => void;
}

const splashImages = [
  require("../assets/images/splash.gif"),
  require("../assets/images/splash-2.gif"),
  require("../assets/images/splash-3.gif"),
];

export const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const { t } = useLanguage();
  const theme = useTheme();
  const [splashIndex, setSplashIndex] = useState(0);
  const [passcode, setPasscode] = useState("");

  const textColor = "#ffffff";
  const bgColor = "#000000";
  const isDark = theme.isDark;

  const handleSplashClick = () => {
    setSplashIndex((prev) => (prev + 1) % splashImages.length);
  };

  const handleDigitPress = (digit: string) => {
    if (passcode.length < 4) {
      const newPasscode = passcode + digit;
      setPasscode(newPasscode);

      // If 4 digits entered, unlock automatically
      if (newPasscode.length === 4) {
        handleUnlock(newPasscode);
      }
    }
  };

  const handleDelete = () => {
    if (passcode.length > 0) {
      setPasscode(passcode.slice(0, -1));
    }
  };

  const handleUnlock = (code?: string) => {
    // For now, any 4 digit passcode unlocks
    const codeToCheck = code || passcode;
    if (codeToCheck.length === 4) {
      setPasscode("");
      onUnlock();
    }
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" />
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleSplashClick}
        className="flex-1"
      >
        <ImageBackground
          source={splashImages[splashIndex]}
          resizeMode="cover"
          className="flex-1"
          style={{ backgroundColor: bgColor }}
        >
          <View
            className="flex-1 absolute top-0 left-0 right-0 bottom-0"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />

          <View className="pt-40 items-center">
            <Text
              className="text-4xl font-mono font-bold tracking-tighter"
              style={{ color: textColor }}
            >
              {t.lockScreen.locked}_
            </Text>
          </View>

          <View className="flex-1" />

          <View className="pb-12 px-12 gap-6">
            <View className="items-center gap-4">
              <Text
                className="text-base font-mono"
                style={{ color: textColor, opacity: 0.8 }}
              >
                {t.lockScreen.enterPasscode}
              </Text>
              <View className="flex-row gap-3">
                {[0, 1, 2, 3].map((index) => (
                  <View
                    key={index}
                    className="w-4 h-4 rounded-full border-2"
                    style={{
                      borderColor: textColor,
                      backgroundColor:
                        index < passcode.length ? textColor : "transparent",
                    }}
                  />
                ))}
              </View>
            </View>
            <PasscodeInput
              passcode={passcode}
              onDigitPress={handleDigitPress}
              onDelete={handleDelete}
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};
