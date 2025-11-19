import { Pin, PinOff, Trash2 } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { Note } from "../utils/storage";
import { formatDate } from "../utils/formatDate";
import { useTheme } from "../utils/useTheme";

interface NoteCardProps {
  note: Note;
  onPress: (note: Note) => void;
  onPin: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NoteCard = ({ note, onPress, onPin, onDelete }: NoteCardProps) => {
  const { cardBg, textColor, borderColor, accentColor, mutedColor } = useTheme();

  return (
    <View
      className="rounded-xl p-4 mb-3 border"
      style={{
        backgroundColor: cardBg,
        borderColor,
      }}
    >
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity
            onPress={() => onPin(note.id)}
            className="p-1 mr-2"
          >
            {note.pinned ?? false ? (
              <Pin size={18} color={accentColor} fill={accentColor} />
            ) : (
              <PinOff size={18} color={mutedColor} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress(note)} className="flex-1">
            <Text
              className="text-lg font-semibold"
              style={{ color: textColor }}
              numberOfLines={1}
            >
              {note.title || "Untitled"}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => onDelete(note.id)}
          className="p-1"
        >
          <Trash2 size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => onPress(note)}>
        {note.content ? (
          <Text
            className="text-sm mb-2"
            style={{ color: mutedColor }}
            numberOfLines={3}
          >
            {note.content}
          </Text>
        ) : null}

        <Text
          className="text-xs"
          style={{ color: mutedColor }}
        >
          {formatDate(note.updatedAt)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

