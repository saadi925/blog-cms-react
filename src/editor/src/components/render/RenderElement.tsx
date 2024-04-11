import React from "react";
import { DefaultElement, useFocused, useSelected } from "slate-react";
import { getStylesForElement } from "../editor/helpers/editorstyles/getStylesOnElement";
import useGetProperties from "../editor/hooks/useGetProperties";
import ImageComponent from "./ImageComponent";
import { YouTubeEmbed } from "./YoutubeComponent";
import ElementOverlay from "./ElementOverlay";

export function RenderElement(props: any) {
  const selected = useSelected();
  const { attributes, children, element } = props;
    const style = getStylesForElement(element);
  const divStyles = element.style;
  const focused = useFocused();
  useGetProperties(focused, selected, element);
  switch (element.type) {
    case "image":
      return <ImageComponent  style={style}  {...props} />
    case "youtube":
      return <YouTubeEmbed styles={style} {...props} />;
    case "link":
      return (
      <ElementOverlay type={element.type} {...props}>
        <a {...attributes} style={style} >
          {children}
        </a>
      </ElementOverlay>
      );
    case "quote":
      return (
       <ElementOverlay {...props} type={element.type}>
         <blockquote {...attributes} style={style} >
          {children}
        </blockquote>
       </ElementOverlay>
      );
     case "code":
      return (
      <ElementOverlay type={element.type} {...props}>
          <code {...attributes} style={style} >
          {children}
        </code>
        </ElementOverlay>
      );
    case "bulleted-list":
      return (
       <ElementOverlay className="list-reset" type={element.type} {...props}>
        <ul {...attributes} style={style} >
          {children}
        </ul>
        </ElementOverlay>
      );
    case "numbered-list":
      return (
        <ElementOverlay className="list-reset" type={element.type} {...props}>
        <ol  {...attributes} style={style} >
          {children}
        </ol>
        </ElementOverlay>
      );
    case "list-item":
      return (
        <ElementOverlay type={element.type} {...props}>
        <li  {...attributes} style={style} >
          {children}
        </li>
        </ElementOverlay>
      );
    case "heading":
      return (
      <ElementOverlay type={element.type} {...props} >
      {React.createElement(`h${element.level}`, { ...attributes, style, divStyles }, children)}
      </ElementOverlay>
      );
    case "paragraph":
      return (
    <ElementOverlay type={element.type} {...props}>
      <p {...attributes} style={style} >
        {children}
      </p>
    </ElementOverlay>
      );
    default:
      return (
        <DefaultElement
          {...props}

          style={style}
          
        >
          {children}
          {/* <ElementOverlay {...props}/> */}
        </DefaultElement>
      );
  }  
}