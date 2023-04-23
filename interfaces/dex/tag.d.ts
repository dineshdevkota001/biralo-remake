namespace Tag {
  interface Attributes {
    name?: LocalizedString;
    description?: LocalizedString;
    group?: Group;
    version?: number;
  }
  type Group = "content" | "format" | "genre" | "theme";
  type Type = Object<"tag", Attributes>;
  type ListResponse = Response.Collection<Type>;
}
