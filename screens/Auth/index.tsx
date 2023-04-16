import { ScrollView, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function Profile() {
  const { colors } = useTheme();
  return (
    <ScrollView
      style={{
        minHeight: "100%",
        backgroundColor: colors.surface,
      }}
      contentContainerStyle={{
        display: "flex",
        justifyContent: "center",
        flex: 1,
        padding: 8,
      }}
    >
      <TextInput
        label="Username"
        autoFocus
        style={{
          marginBottom: 16,
        }}
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        style={{
          marginBottom: 48,
        }}
        textContentType="password"
      />
      <Button>Log In</Button>
    </ScrollView>
  );
}
