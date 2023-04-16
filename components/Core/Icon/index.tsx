import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";

export type IconProps = ComponentProps<typeof MaterialCommunityIcons>;

export default function Icon(props: IconProps) {
  return (
    <MaterialCommunityIcons
      {...props}
      style={[
        props.style,
        {
          fontSize: props.size,
        },
      ]}
    />
  );
}
