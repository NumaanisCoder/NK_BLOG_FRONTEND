function removeMarkdown(markdownText) {
    // Remove images
    markdownText = markdownText.replace(/!\[.*?\]\((.*?)\)/g, '');
  
    // Remove headings
    markdownText = markdownText.replace(/^#+\s+/gm, '');
  
    // Remove bold and italic
    markdownText = markdownText.replace(/(\*\*|__)(.*?)\1/g, '$2');
    markdownText = markdownText.replace(/(\*|_)(.*?)\1/g, '$2');
  
    // Remove lists
    markdownText = markdownText.replace(/^(\s*?(\*|\d+\.)\s+)/gm, '');
  
    // Remove blockquotes
    markdownText = markdownText.replace(/^\s*>\s+/gm, '');
  
    // Remove links
    markdownText = markdownText.replace(/\[(.*?)\]\((.*?)\)/g, '$1');
  
    return markdownText;
  }
  
export default removeMarkdown;
