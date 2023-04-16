import { View } from "react-native";

interface IDuplicateProps {
  Component: React.FC;
  times?: number;
}
export default function Duplicate({ Component, times = 6 }: IDuplicateProps) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {Array.from({ length: times }).map((_, index) => (
        <Component key={`skeleton-${index.toString()}`} />
      ))}
    </View>
  );
}
