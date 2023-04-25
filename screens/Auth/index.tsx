import TextInput from "@components/Common/Input/Controlled/TextInput";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { Button, useTheme } from "react-native-paper";

export default function Profile() {
  const { colors } = useTheme();
  const { control } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = () => {};

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
        gap: 16,
      }}
    >
      <TextInput
        control={control}
        name="username"
        label="Username"
        autoFocus
        keyboardType="email-address"
      />
      <TextInput
        control={control}
        name="password"
        label="Password"
        textContentType="password"
      />
      <Button mode="contained-tonal">Log In</Button>
    </ScrollView>
  );
}
