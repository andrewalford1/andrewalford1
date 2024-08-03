document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const homeLink = document.getElementById('home-link');
    const projectsLink = document.getElementById('projects-link');

    // Load initial content
    loadHome(1);

    homeLink.addEventListener('click', async (e) => {
        e.preventDefault();
        await loadHome(1);
    });

    projectsLink.addEventListener('click', async (e) => {
        e.preventDefault();
        await loadProjects();
    });

    async function loadHome(cvPageNumber) {
        console.log(homeLink);
        await loadContent('home.html', homeLink);
        updateCVpageButtonStates();
        loadCVContent(cvPageNumber);
    }

    async function loadProjects() {
        console.log(projectsLink);
        await loadContent('projects.html', projectsLink);
    }

    async function loadContent(file, activeLink) {
        console.log(`Loading content from: ${file}`);
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.text();
            console.log('Content loaded successfully:', data);
            content.innerHTML = data;
            updateActiveLink(activeLink);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    function loadCVContent(pageNumber) {
        // Fetch the README.md file (my CV) and embed its content as HTML
        fetch('README.md')
        .then(response => response.text())
        .then(htmlContent => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            let selectedPageContent = '';
            
            if (pageNumber == 1) {
                selectedPageContent = tempDiv.querySelector('#pageOneContent').innerHTML;
            }
            
            if (pageNumber == 2) {
                selectedPageContent = tempDiv.querySelector('#pageTwoContent').innerHTML;
            }

            document.getElementById('markdown-content').innerHTML = selectedPageContent;
        })
        .catch(error => console.error('Error fetching the README file:', error));
    }

    window.changeCVPage = function(pageNumber) {
        
        loadCVContent(pageNumber);
        
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });        
    }

    function updateActiveLink(activeLink) {
        // Remove active class from all links
        homeLink.classList.remove('font-bold', 'underline');
        projectsLink.classList.remove('font-bold', 'underline');

        // Add active class to the clicked link
        activeLink.classList.add('font-bold', 'underline');
    }

    function updateCVpageButtonStates() {
        const page1Button = document.getElementById('pageOneBtn');
        const page2Button = document.getElementById('pageTwoBtn');

        if (page1Button && page2Button) {
            page1Button.addEventListener('click', () => {
                page1Button.disabled = true;
                page2Button.disabled = false;
            });

            page2Button.addEventListener('click', () => {
                page1Button.disabled = false;
                page2Button.disabled = true;
            });
        }
    }
});
