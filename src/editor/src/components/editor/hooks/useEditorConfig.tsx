import { Text, Range, NodeEntry } from "slate";

import { useCallback, useState } from "react";
import { RenderElement } from "../../render/RenderElement";
import { Leaf } from "../../render/Leaf";
export function useEditorConfig() {
  const [search, setSearch] = useState<string | undefined>();

  const decorate = useCallback(
    (entry: NodeEntry) => {
      const ranges: Range[] = [];

      if (search && Text.isText(entry[0])) {
        const { text } = entry[0];
        const parts = text.split(search);
        let offset = 0;

        parts.forEach((part, i) => {
          if (i !== 0) {
            ranges.push({
              anchor: { path: entry[1], offset: offset - search.length },
              focus: { path: entry[1], offset },
              highlight: true,
            });
          }

          offset = offset + part.length + search.length;
        });
      }

      return ranges;
    },
    [search]
  );

  const renderElement = useCallback((props: any) => {
    return <RenderElement {...props} />;
  }, []);
  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);
  return { renderElement, renderLeaf, decorate, setSearch };
}
