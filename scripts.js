document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const highlightsLink = document.getElementById('highlights-link');
    const projectsLink = document.getElementById('projects-link');

    // Load content based on current URL
    loadContent(location.pathname);

    highlightsLink.addEventListener('click', (e) => {
        e.preventDefault();
        history.pushState({ page: 'highlights' }, '', '/highlights');
        loadContent('/highlights');
    });

    projectsLink.addEventListener('click', (e) => {
        e.preventDefault();
        history.pushState({ page: 'projects' }, '', '/projects');
        loadContent('/projects');
    });

    // Handle the popstate event (back/forward buttons)
    window.addEventListener('popstate', (e) => {
        loadContent(location.pathname);
    });

    async function loadContent(path) {
        let file;
        if (path === '/projects') {
            file = 'projects.html';
        } else {
            file = 'highlights.html';
        }
        
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
