// @ts-nocheck
export function getFullSentence(selection) {
  let contextNode = window.getSelection().anchorNode;

  // If the selection is in a text node, get its parent
  if (contextNode.nodeType === Node.TEXT_NODE) {
    contextNode = contextNode.parentNode;
  }

  // If the contextNode is a span, look for a parent p tag
  while (contextNode.nodeName.toLowerCase() === 'span') {
    if (contextNode.parentNode && contextNode.parentNode.nodeName.toLowerCase() === 'p') {
      contextNode = contextNode.parentNode;
      break;
    }
    contextNode = contextNode.parentNode;
  }

  // Get the full text content of the context node
  console.log("contextNode", contextNode);
  console.log("contextNode.textContent", contextNode.textContent);
  console.log("contextNode.innerText", contextNode.innerText);
  const fullText = contextNode.innerText || contextNode.textContent;

  // If the contextNode is a p tag, return its entire text content
  if (contextNode.nodeName.toLowerCase() === 'p') {
    return fullText.trim();
  }

  // Otherwise, use the previous sentence-finding logic
  const regex = /(?<=\s|^)[^.!?]+(?:\.(?!\s)[^.!?]+)*(?:[.!?](?=\s|$)|$)/g;
  const sentences = fullText.match(regex) || [];

  for (let i = 0; i < sentences.length; i++) {
    if (sentences[i].includes(selection.trim())) {
      return sentences[i].trim();
    }
  }

  return selection.trim();
}