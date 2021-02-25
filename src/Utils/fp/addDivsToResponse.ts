const inserString = (str: string, index: number, stringToAdd: string) => {
  return (
    str.substring(0, index) + stringToAdd + str.substring(index, str.length)
  );
};

export const addDivsToResponse = (response: string) => {
  const openingTag = "<h2>",
    closingTag = "</h2>",
    indices = [];

  const openingDiv = `<div>`;
  const middleDiv = "</div> <div>";
  const closingDiv = "</div>";

  let startIndex = 0,
    searchStrLen = openingTag.length,
    index,
    count = 0;

  response = openingDiv + response + closingDiv;

  while ((index = response.indexOf(openingTag, startIndex)) > -1) {
    if (count > 0) {
      indices.push(index);
    }
    startIndex = index + searchStrLen;
    count += 1;
  }
  console.log(indices);
  return response;
};
