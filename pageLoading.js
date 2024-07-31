document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const homeLink = document.getElementById('home-link');
    const projectsLink = document.getElementById('projects-link');

    // Load initial content
    loadHome();

    homeLink.addEventListener('click', async (e) => {
        e.preventDefault();
        await loadHome();
    });

    projectsLink.addEventListener('click', async (e) => {
        e.preventDefault();
        await loadProjects();
    });

    async function loadHome() {
        await loadContent('home.html');
        // Fetch the README.md file (my CV) and embed its content as HTML
        fetch('README.md')
        .then(response => response.text())
        .then(htmlContent => {
        document.getElementById('markdown-content').innerHTML = htmlContent;
        })
        .catch(error => console.error('Error fetching the README file:', error));
    }

    async function loadProjects() {
        await loadContent('projects.html');
    }

    async function loadContent(file) {
        console.log(`Loading content from: ${file}`);
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.text();
            console.log('Content loaded successfully:', data);
            content.innerHTML = data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
});
