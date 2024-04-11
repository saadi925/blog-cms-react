// Define a deserializing function that takes a string and returns a value.
export const deserialize = (htmlString: string) => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  return Array.from(doc.body.childNodes).map((child) => {
    return {
      children: [{ text: child.textContent || "" }],
    };
  });
};
