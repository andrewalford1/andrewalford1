// script.js

// A basic Markdown to HTML converter
function markdownToHTML(markdown) {
    const rules = [
      { regex: /###### (.*$)/gim, replacement: '<h6>$1</h6>' },
      { regex: /##### (.*$)/gim, replacement: '<h5>$1</h5>' },
      { regex: /#### (.*$)/gim, replacement: '<h4>$1</h4>' },
      { regex: /### (.*$)/gim, replacement: '<h3>$1</h3>' },
      { regex: /## (.*$)/gim, replacement: '<h2>$1</h2>' },
      { regex: /# (.*$)/gim, replacement: '<h1>$1</h1>' },
      { regex: /\*\*(.*)\*\*/gim, replacement: '<b>$1</b>' },
      { regex: /\*(.*)\*/gim, replacement: '<i>$1</i>' },
      { regex: /\~\~(.*)\~\~/gim, replacement: '<s>$1</s>' },
      { regex: /\`(.*)\`/gim, replacement: '<code>$1</code>' },
      { regex: /\[(.*?)\]\((.*?)\)/gim, replacement: '<a href="$2">$1</a>' },
      { regex: /!\[(.*?)\]\((.*?)\)/gim, replacement: '<img src="$2" alt="$1">' },
      { regex: /\n$/gim, replacement: '<br>' },
      { regex: /\n/gim, replacement: '<br>' },
      { regex: /^>(.*)$/gim, replacement: '<blockquote>$1</blockquote>' },
      { regex: /^\s*\n\*\s(.*)/gim, replacement: '<ul>\n<li>$1</li>\n</ul>' },
      { regex: /^\*\s(.*)/gim, replacement: '<li>$1</li>' },
      { regex: /^\s*\n\d\.\s(.*)/gim, replacement: '<ol>\n<li>$1</li>\n</ol>' },
      { regex: /^\d\.\s(.*)/gim, replacement: '<li>$1</li>' },
    ];
  
    return rules.reduce((text, rule) => text.replace(rule.regex, rule.replacement), markdown);
  }
  
  // Fetch the Markdown file and convert it to HTML
  fetch('README.md')
    .then(response => response.text())
    .then(markdown => {
      const htmlContent = markdownToHTML(markdown);
      document.getElementById('markdown-content').innerHTML = htmlContent;
    })
    .catch(error => console.error('Error fetching the Markdown file:', error));
  