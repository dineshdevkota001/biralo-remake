import { FilterChip, Section, formArrayHelpers } from "./commmon";
import useVariables from "@contexts/VariableContext";
import { ContentRating } from "@interfaces/dex/enum";
import { PublicationDemographic } from "@interfaces/dex/enum";
import { capitalize } from "lodash";
import { Controller } from "react-hook-form";

const formatFilters = [
  {
    name: "publicationDemographics",
    title: "Demographics",
    values: PublicationDemographic,
  },
  {
    name: "contentRating",
    title: "Content Rating",
    values: ContentRating,
  },
];

export default function FormatFilter() {
  const { control } = useVariables();

  return (
    <>
      {formatFilters?.map(({ name, title, values }) => (
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange } }) => (
            <Section title={title}>
              {value?.length ? null : <FilterChip selected>Any</FilterChip>}
              {Object.values(values).map((tag) => {
                const { isPresent, getToggledArray } = formArrayHelpers(
                  value,
                  tag,
                );

                return (
                  <FilterChip
                    selected={isPresent}
                    onPress={() => {
                      onChange(getToggledArray());
                    }}
                  >
                    {capitalize(tag.split("_").join(" "))}
                  </FilterChip>
                );
              })}
            </Section>
          )}
        />
      ))}
    </>
  );
}
