document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const homeLink = document.getElementById('home-link');
    const portfolioLink = document.getElementById('portfolio-link');

    // Load initial content
    loadHome(1);

    homeLink.addEventListener('click', async (e) => {
        e.preventDefault();
        await loadHome(1);
    });

    portfolioLink.addEventListener('click', async (e) => {
        e.preventDefault();
        await loadportfolio();
    });

    async function loadHome(cvPageNumber) {
        console.log(homeLink);
        await loadContent('home.html', homeLink);
        updateCVpageButtonStates();
        loadCVContent(cvPageNumber);
    }

    async function loadportfolio() {
        console.log(portfolioLink);
        await loadContent('portfolio.html', portfolioLink);
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
        portfolioLink.classList.remove('font-bold', 'underline');

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

    // Function to fetch and print the entire CV content
    function printFullCV() {
        fetch('README.md')
            .then(response => response.text())
            .then(htmlContent => {
                // Create a new window for printing
                const printWindow = window.open('', '_blank');
                printWindow.document.write(`
                    <html>
                    <head>
                        <title>Okay this is kind of a hack</title>
                        <link rel="stylesheet" href="tailwind-output.css">
                        <link rel="stylesheet" href="embedded-cv.css">
                    </head>
                    <body class="cv-content">
                        ${htmlContent}
                    </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.print();
            })
            .catch(error => console.error('Error fetching the README file:', error));
    }

    // Add event listener to the print button
    document.getElementById('print-btn').addEventListener('click', printFullCV);
});
