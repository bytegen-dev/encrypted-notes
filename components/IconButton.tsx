import { ReactNode, cloneElement, isValidElement } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { useTheme } from "../utils/useTheme";

interface IconButtonProps {
  onPress: () => void;
  children: ReactNode;
  style?: ViewStyle;
}

export const IconButton = ({ onPress, children, style }: IconButtonProps) => {
  const { accentColor } = useTheme();
  const iconColor = accentColor === "#ffffff" ? "#000000" : "#ffffff";

  // Clone the child element and apply the icon color
  const childrenWithColor = isValidElement(children)
    ? cloneElement(children as any, { color: iconColor })
    : children;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-11 h-11 rounded-full justify-center items-center"
      style={[
        {
          backgroundColor: accentColor,
          borderWidth: accentColor === "#ffffff" ? 1 : 0,
          borderColor: "#e0e0e0",
        },
        style,
      ]}
    >
      {childrenWithColor}
    </TouchableOpacity>
  );
};

