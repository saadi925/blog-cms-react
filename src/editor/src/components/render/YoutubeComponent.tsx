import YouTubeComponent from "react-youtube";
import { useSelected } from "slate-react";
export function YouTubeEmbed(props: any, styles: any) {
  const { attributes, element, children } = props;
  const { youtubeId } = element;
  const isSelected = useSelected()
  return (
    <div {...attributes}  style={styles} className={`${isSelected ? 'active' :''}`}  contentEditable={false}>
      <YouTubeComponent
        videoId={youtubeId}
        opts={{ playerVars: { origin: "*" } }}
      />
      {children}
    </div>
  );
}
