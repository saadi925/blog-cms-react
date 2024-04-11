import { Descendant, Text } from "slate";
import escapeHtml from "escape-html";
import { getStylesForElement } from "../helpers/editorstyles/getStylesOnElement";
import { CustomElement } from "../../editor/editor";
// @ts-ignore 
import reactToCss from "react-style-object-to-css";
interface NodeWithColor extends Text {
  color?: string;
  backgroundColor?: string;
}
export const serializeToHtml = (nodes: Descendant[]) => {
  return nodes.map((node) => serializeNodeToHtml(node)).join("");
};


export const serializeNodeToHtml = (node: Descendant): string => {
  if (Text.isText(node)) {

    let string = escapeHtml(node.text);
    
    if (node.bold) {
      
      string = `<strong>${string}</strong>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    if (node.fontSize) {
      string = `<span style="font-size:${node.fontSize}">${string}</span>`;
    }
    if (node.code) {
      string = `<code>${string}</code>`;
    }
    if ((node as NodeWithColor).color) {
      const color = (node as NodeWithColor).color;

      string = `<span style="color:${color}">${string}</span>`;
    }
    if ((node as NodeWithColor).backgroundColor) {
      const backgroundColor = (node as NodeWithColor).backgroundColor;

      string = `<span style="background-color:${backgroundColor}">${string}</span>`;
   
      
    }
    return string;
  }

  const element: CustomElement = node;
  // @ts-ignore
  const children = (element.children || [])
    .map((n : any) => serializeNodeToHtml(n))
    .join("");

  // Get styles dynamically based on the element type
  let inlineStyles = getStylesForElement(element);
  const isStyles = !(Object.keys(inlineStyles).length === 0);
  if (isStyles) {
    inlineStyles = reactToCss(inlineStyles);
  }
  // <u><em><strong></strong></em></u>
  //  id u em or strong is empty then return <br> 
  
  const isEmpty = (!children.trim() || (children.trim() === '<span></span>')) || (children.trim() === '<strong></strong>') || (children.trim() === '<em></em>') || (children.trim() === '<u></u>') || (children.trim() === '<strong><em></em></strong>') || (children.trim() === '<strong><u></u></strong>') || (children.trim() === '<em><u></u></em>') || (children.trim() === '<strong><em><u></u></em></strong>') || (children.trim() === '<strong><u><em></em></u></strong>') || (children.trim() === '<em><strong></strong></em>') || (children.trim() === '<u><strong></strong></u>') || (children.trim() === '<em><u><strong></strong></u></em>') || (children.trim() === '<u><em><strong></strong></em></u>')  || children.trim() === '<u><em></em></u>' || children.trim() === ''
  if (isEmpty) {
    return "<br>";
  }
  console.log(children);

  switch (element.type as CustomElement["type"]) {  
    
    case "quote":
      return `<blockquote ${
        isStyles ? `style="${inlineStyles}"` : ""
      }>${children}</blockquote>`;
      case "code":
        return `<pre ${
          isStyles ? `style="${inlineStyles}"` : ""
        }><code>${children}</code></pre>`;
        case "paragraph":
          if (!children.trim() || (children.trim() === '<span></span>')) {
            return "<br>";
          }else
          return `<p ${isStyles ? `style="${inlineStyles}"` : ""}>${children}</p>`;
          case "link":
    // @ts-ignore

            const url = escapeHtml(element.url);
            return `<a href="${url}" ${
        isStyles ? `style="${inlineStyles}"` : ""
      }>${children}</a>`;
      case "heading":
    // @ts-ignore

        const level = element.level || 1;
        return `<h${level} ${
        isStyles ? `style="${inlineStyles}"` : ""
      }>${children}</h${level}>`;
    case "list-item":
      return `<li ${
        isStyles ? `style="${inlineStyles}"` : ""
      }>${children}</li>`;
    case "numbered-list":
      return `<ol ${
        isStyles ? `style="${inlineStyles}"` : ""
      }>${children}</ol>`;
    case "bulleted-list":
      return `<ul ${
        isStyles ? `style="${inlineStyles}"` : ""
      }>${children}</ul>`;
    case "image":
    // @ts-ignore

      const imageUrl = escapeHtml(element.url);
      return `<img src="${imageUrl}" alt="img" ${
        isStyles ? `style="${inlineStyles}"` : ""
      } />`;
    case "youtube":
    // @ts-ignore

    const youtubeId = escapeHtml(element.youtubeId);
      return  `
        ${youtubeEmbed(youtubeId, inlineStyles)}
      `
    default:
      return children;
  }
};


const youtubeEmbed = (youtubeId: string,inlineStyles : any) => {
  return `<iframe style="${inlineStyles}"  src="https://www.youtube.com/embed/${youtubeId}" 
  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
  ></iframe>`;
}

