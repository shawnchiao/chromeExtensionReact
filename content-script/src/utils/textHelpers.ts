// @ts-nocheck
export function getFullSentence(selection) {
  var contextNode = window.getSelection().anchorNode.parentNode;
  // console.log('contextNode', contextNode);
  var fullText = contextNode.textContent || contextNode.innerText;
  // // console.log('fullText', fullText);
  var regex = /(?<=\s|^)[^.!?]+(?:\.(?!\s)[^.!?]+)*(?:[.!?](?=\s|$)|$)/g

  var sentences = fullText.match(regex) || [];
  console.log('sentences full context', sentences);
  for (var i = 0; i < sentences.length; i++) {
    if (sentences[i].includes(selection.trim())) {
      return sentences[i].trim();
    }
  }
  return selection.trim();
}