document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const highlightsLink = document.getElementById('highlights-link');
    const projectsLink = document.getElementById('projects-link');

    // Load initial content
    loadContent('highlights.html');

    highlightsLink.addEventListener('click', async (e) => {
        e.preventDefault();
        await loadContent('highlights.html');
    });

    projectsLink.addEventListener('click', async (e) => {
        e.preventDefault();
        await loadContent('projects.html');
    });

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
