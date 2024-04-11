import { calculateHeadingFontSize } from "../editor/HeadingButtons";

export const Leaf = (props: any) => {
  const { leaf, children, attributes } = props;
  const alignmentStyles = {
    textAlign: leaf.textAlign || "left",
  };

  const fontStyles = {
    fontSize: leaf.level
      ? calculateHeadingFontSize(leaf.level)
      : leaf.fontSize || "inherit",
  };

  const colorStyles = {
    color: leaf.color,
    backgroundColor: leaf.highlight
      ? "crimson"
      : leaf.backgroundColor ?? "inherit",
  };

  if (leaf.code) {
    return (
      <code style={{ ...fontStyles, ...alignmentStyles, ...colorStyles }}>
        {children}
      </code>
    );
  }

  return (
    <span
      {...attributes}
      {...(leaf.highlight && { "data-cy": "search-highlighted" })}
      style={{
        fontWeight: leaf.bold ? "bold" : "normal",
        fontStyle: leaf.italic ? "italic" : "normal",
        textDecoration: leaf.underline
          ? "underline"
          : leaf.strikethrough
          ? "line-through"
          : "none",
        ...fontStyles,
        ...alignmentStyles,
        ...colorStyles,
      }}
    >
      {children}
    </span>
  );
};
