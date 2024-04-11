import React from "react";

interface HtmlViewerProps {
  content: string;
}

const HtmlViewer: React.FC<HtmlViewerProps> = ({ content }) => {
  return (
    <div className="text-white">
      <h2>HTML Viewer</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default HtmlViewer;
