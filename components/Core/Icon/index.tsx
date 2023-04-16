import React, { ComponentProps, useState } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LayoutChangeEvent } from "react-native";

export default function Icon(
  props: ComponentProps<typeof MaterialCommunityIcons>,
) {
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
