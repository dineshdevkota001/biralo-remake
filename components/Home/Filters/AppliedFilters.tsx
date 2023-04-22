import useVariables from "@contexts/VariableContext";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

export default function AppliedFilters() {
  const { search, getValues } = useVariables();
  const values = getValues?.();

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 8,
      }}
    >
      <Text
        style={{
          height: 200,
        }}
      >
        {search || "None"}
        {JSON.stringify(values)}
      </Text>
    </ScrollView>
  );
}
