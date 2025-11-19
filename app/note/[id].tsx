import { Stack, useLocalSearchParams } from "expo-router";
import { NotePreviewContent } from "../../components/NotePreviewContent";

export default function NotePreview() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <NotePreviewContent noteId={id || null} isSplitView={false} />
    </>
  );
}
