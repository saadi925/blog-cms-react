export const getSideBarSelectables = (property: string) => {
  switch (property) {
    case "justifyContent":
      return [
        "flex-start",
        "flex-end",
        "center",
        "space-around",
        "space-between",
        "space-evenly",
      ];
    case "alignItems":
      return ["flex-start", "flex-end", "center", "stretch", "baseline"];
    case "alignSelf":
      return ["flex-start", "flex-end", "center", "stretch", "baseline"];
    case "objectFit":
      return ["cover", "contain", "fill", "none", "initial", "none", "unset"];
    case "display":
      return ["relative", "flex", "absolute", "sticky", "fixed", "none"];
    case "flexWrap":
      return [
        "wrap",
        "nowrap",
        "none",
        "wrap-reverse",
        "initial",
        "inherit",
        "unset",
      ];
    case "flexDirection":
      return [
        "column",
        "column-reverse",
        "row",
        "row-reverse",
        "initial",
        "inherit",
        "unset",
      ];
    case "position":
      return ["relative", "flex", "absolute", "sticky", "fixed", "none"];
    // text properties
    case "textTransform":
      return [
        "capitalize",
        "uppercase",
        "lowercase",
        "inherit",
        "initial",
        "none",
        "unset",
      ];
    case "textDecoration":
      return [
        "dashed",
        "dotted",
        "overline",
        "line-through",
        "underline",
        "solid",
        "wavy",
        "none",
      ];
    case "fontWeight":
      return [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
        "bold",
        "bolder",
        "lighter",
      ];
    case "textWrap":
      return [
        "balance",
        "nowrap",
        "pretty",
        "stable",
        "wrap",
        "inherit",
        "initial",
        "unset",
      ];
    default:
      return undefined;
  }
};
