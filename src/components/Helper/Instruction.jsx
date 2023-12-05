import React from 'react';
import ReactMarkdown from 'react-markdown';

const Instruction = () => {
  const markdownContent = `
**Instructions for Formatting:**

1. **Headers:**
   - Use \`# \` for headings. Example: \`# Heading 1\`.

2. **Emphasis (Bold and Italic):**
   - Use \`**\` for bold and \`*\` for italic. Example: \`**Bold Text**\` and \`*Italic Text*\`.

3. **Lists:**
   - Use \`-\` for bullet points and numbers for ordered lists. Example:
     \`\`\`markdown
     - Item 1
     - Item 2
     1. Numbered Item 1
     2. Numbered Item 2
     \`\`\`

4. **Links:**
   - Use \`[Link Text](URL)\`. Example: \`[Visit Example](https://www.example.com)\`.

5. **Images:**
   - Use \`![Alt Text](Image URL)\`. Example: \`![Logo](logo.png)\`.

6. **Blockquotes:**
   - Use {'>'} for blockquotes. Example: {'>'} This is a blockquote.

7. **Code:**
   - Use \` for inline code and triple backticks (\`\`\`) for code blocks. Example:
     \`\`\`markdown
     \`Inline Code\`
     \`\`\`
     \`\`\`javascript
     const example = 'Hello, Markdown!';
     console.log(example);
     \`\`\`

8. **Horizontal Line:**
   - Use \`---\` for a horizontal line.

Remember to leave an empty line between different Markdown elements.

Feel free to ask if you have any questions or need further clarification!

---

This message provides a concise overview of the Markdown syntax with examples. Adjust it based on your audience and the platform where they'll be entering Markdown-formatted text.
  `;

  return (
    <div>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default Instruction;
