import { View } from "react-native";
import { Chip, ChipProps, Text, useTheme } from "react-native-paper";

export function FilterChip(props: ChipProps & { icon?: "plus" | "minus" }) {
  const { colors } = useTheme();
  if (props.icon === "plus")
    return (
      <Chip
        {...props}
        style={[
          {
            backgroundColor: colors.primaryContainer,
          },
          props.style,
        ]}
        textStyle={[
          {
            color: colors.onPrimaryContainer,
          },
          props.textStyle,
        ]}
      />
    );

  if (props.icon === "minus")
    return (
      <Chip
        {...props}
        style={[
          {
            backgroundColor: colors.errorContainer,
          },
          props.style,
        ]}
        textStyle={[
          {
            color: colors.onErrorContainer,
          },
          props.textStyle,
        ]}
      />
    );
  return <Chip mode={props.selected ? "flat" : "outlined"} {...props} />;
}

export function Section({
  title,
  children,
}: { title: string } & IHaveChildren) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        borderColor: colors.shadow,
        gap: 4,
      }}
    >
      <Text
        variant="labelLarge"
        style={{
          width: "100%",
          color: colors.onSurfaceVariant,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

export function formArrayHelpers(
  arr: Array<string>,
  tag: string | { id: string },
  someFunction = (x: string) => x === (typeof tag === "string" ? tag : tag.id),
) {
  const isPresent = arr?.some(someFunction);
  if (isPresent) console.log(arr, isPresent, tag);

  const getInsertedArray = () => {
    if (isPresent) return arr;
    return [...(arr ?? []), typeof tag === "string" ? tag : tag.id];
  };
  const getRemovedArray = () => {
    if (!isPresent) return arr;
    return arr.filter((x) => !someFunction(x));
  };
  const getToggledArray = isPresent ? getRemovedArray : getInsertedArray;

  return { isPresent, getInsertedArray, getRemovedArray, getToggledArray };
}
