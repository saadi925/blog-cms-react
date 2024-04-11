export function LinkElement(props: any) {
  const { element, children } = props;
  console.log(element);
  
  const getLinkOverlay = () => {
    const { url } = element;
    console.log(url);
  };
  return (
    <>
      <a className="link" href={element.url}>{children}</a>
      {getLinkOverlay()}
    </>
  );
}
