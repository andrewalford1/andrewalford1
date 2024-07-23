// Fetch the README.md file and embed its content as HTML
fetch('README.md')
  .then(response => response.text())
  .then(htmlContent => {
    document.getElementById('markdown-content').innerHTML = htmlContent;
  })
  .catch(error => console.error('Error fetching the README file:', error));
