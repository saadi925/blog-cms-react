
export default function SourceCodeViewer({
  sourceCode,
}: {
  sourceCode: string;
}) {
  const formattedSourceCode = sourceCode.split("\n").join("\n");

  return (
    <p>
    {formattedSourceCode}
    </p>
  );
}
