document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    //  Part 1: Data and Rendering
    // ----------------------------------------------------

    // This array holds all the data for our cars.
    // Each object represents a car with its details.
    const cars = [
        { make: 'BMW', model: '3 Series', price: 18500000, mileage: 30000, year: 2020, description: 'A luxury sports sedan known for its performance and style. This model features a powerful engine and advanced technology.', imageUrl: 'https://c4.wallpaperflare.com/wallpaper/421/26/425/car-cars-1920x1200-bmw-wallpaper-preview.jpg' },
        { make: 'Toyota', model: 'Prius', price: 12500000, mileage: 50000, year: 2018, description: 'An efficient hybrid car, perfect for city driving. It offers excellent fuel economy and a smooth, quiet ride.', imageUrl: 'https://w0.peakpx.com/wallpaper/456/373/HD-wallpaper-2022-toyota-prius-xle-nightshade-edition-2.jpg' },
        { make: 'Honda', model: 'Civic', price: 10000000, mileage: 25000, year: 2021, description: 'A reliable and popular compact car with a sporty feel. This model includes modern safety features and a comfortable interior.', imageUrl: 'https://c4.wallpaperflare.com/wallpaper/915/463/644/honda-type-r-honda-civic-type-r-car-wallpaper-preview.jpg' },
        { make: 'Mercedes-Benz', model: 'C-Class', price: 22000000, mileage: 40000, year: 2019, description: 'A sophisticated and powerful executive sedan. It combines elegant design with a premium feel and high-end performance.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbaYB2a0NqUZnofMeH7M_oz5IZti8zQQX1Ug&s' },
        { make: 'Toyota', model: 'Aqua', price: 6500000, mileage: 60000, year: 2017, description: 'A compact hybrid hatchback, ideal for economical daily use. It is known for its incredible fuel efficiency and maneuverability.', imageUrl: 'https://media.drive.com.au/obj/tx_q:50,rs:auto:1920:1080:1/driveau/upload/cms/uploads/9wBrLGPxRcyhPP9eIkil' },
    ];

    // Helper function to format prices with "LKR" and commas.
    const formatPrice = (price) => {
        return `LKR ${price.toLocaleString()}`;
    };

    // Helper function to create the HTML for a single product card.
    // It takes a product object and creates a div with its details.
    const createProductCard = (product, index) => {
        return `
            <div class="product-card">
                <img src="${product.imageUrl}" alt="${product.make} ${product.model}">
                <div class="product-details">
                    <h4>${product.make} ${product.model}</h4>
                    <p>${formatPrice(product.price)}</p>
                    ${product.mileage ? `<p>Mileage: ${product.mileage.toLocaleString()} km</p>` : ''}
                    ${product.year ? `<p>Year: ${product.year}</p>` : ''}
                    <a href="vehicle-details.html?id=${index}" class="btn view-details">View Details</a>
                </div>
            </div>
        `;
    };

    // Function to show a list of products on the page.
    // It gets the container element and fills it with product cards.
    const renderProducts = (productList, containerId) => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = productList.map((product, index) => createProductCard(product, index)).join('');
        }
    };

    // ----------------------------------------------------
    //  Part 2: Logic for the Index (Home) Page
    // ----------------------------------------------------

    // This part of the code only runs if the current page is index.html.
    if (document.body.id === 'index-page') {
        // Render the featured products on the home page.
        const featuredProducts = cars.slice(0, 2); // Show first two cars as featured
        renderProducts(featuredProducts, 'featured-products');
        
        // Render all products on the vehicles page.
        renderProducts(cars, 'product-listings');

        // Navigation and Page Switching for the single-page layout.
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('.page-section');

        const setActiveSection = (targetId) => {
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');

            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === `#${targetId}`) {
                    link.classList.add('active-link');
                }
            });
        };

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Prevent the default link behavior (page reload).
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                setActiveSection(targetId);
            });
        });

        // Set the initial active section based on the URL hash (e.g., #vehicles).
        const initialHash = window.location.hash.substring(1) || 'home';
        setActiveSection(initialHash);


        // Filtering and Search Logic for the vehicles section.
        const makeFilter = document.getElementById('make-filter');
        const priceRange = document.getElementById('price-range');
        const priceDisplay = document.getElementById('price-display');
        const applyFiltersBtn = document.getElementById('apply-filters');
    
        if (priceRange) {
            priceRange.addEventListener('input', () => {
                priceDisplay.textContent = formatPrice(priceRange.value);
            });
        }
    
        const applyFilters = () => {
            const selectedMake = makeFilter.value;
            const maxPrice = parseInt(priceRange.value, 10);
    
            const filteredProducts = cars.filter(car => {
                const makeMatch = selectedMake === 'All' || car.make === selectedMake;
                const priceMatch = car.price <= maxPrice;
                return makeMatch && priceMatch;
            });
    
            renderProducts(filteredProducts, 'product-listings');
        };

        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', applyFilters);
        }
    }

    // ----------------------------------------------------
    //  Part 3: Logic for the Vehicle Details Page
    // ----------------------------------------------------

    // This part of the code only runs if the current page is vehicle-details.html.
    if (document.body.id === 'details-page') {
        // Get the product ID from the URL.
        const params = new URLSearchParams(window.location.search);
        const productIndex = params.get('id');
        
        // Change: If no ID is present, default to the first car (index 0).
        const indexToDisplay = (productIndex !== null && productIndex !== undefined) ? productIndex : 0;
        const product = cars[indexToDisplay];
        
        const container = document.getElementById('product-details-container');

        if (product) {
            // If a product is found, display its detailed information.
            container.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.imageUrl}" alt="${product.make} ${product.model}">
                </div>
                <div class="product-info-container">
                    <h2>${product.make} ${product.model}</h2>
                    <p><strong>Price:</strong> ${formatPrice(product.price)}</p>
                    <p><strong>Year:</strong> ${product.year}</p>
                    <p><strong>Mileage:</strong> ${product.mileage.toLocaleString()} km</p>
                    <p><strong>Description:</strong> ${product.description}</p>
                    <a href="index.html#contact" class="btn">Contact Us</a>
                </div>
            `;
        } else {
            // If the provided ID is invalid, show a different error message.
            container.innerHTML = `<p class="error-message">Sorry, we couldn't find details for that vehicle.</p>`;
        }
    }

    // Add this new code to the end of the script.
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Dark Mode Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Save the user's preference
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Check for saved theme preference on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});
