document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    //  Part 1: Data and Rendering
    // ----------------------------------------------------

    const cars = [
        { make: 'BMW', model: '3 Series', price: 18500000, mileage: 30000, year: 2020, description: 'A luxury sports sedan known for its performance and style. This model features a powerful engine and advanced technology.', imageUrl: 'https://c4.wallpaperflare.com/wallpaper/421/26/425/car-cars-1920x1200-bmw-wallpaper-preview.jpg' },
        { make: 'Toyota', model: 'Prius', price: 12500000, mileage: 50000, year: 2018, description: 'An efficient hybrid car, perfect for city driving. It offers excellent fuel economy and a smooth, quiet ride.', imageUrl: 'https://w0.peakpx.com/wallpaper/456/373/HD-wallpaper-2022-toyota-prius-xle-nightshade-edition-2.jpg' },
        { make: 'Honda', model: 'Civic', price: 10000000, mileage: 25000, year: 2021, description: 'A reliable and popular compact car with a sporty feel. This model includes modern safety features and a comfortable interior.', imageUrl: 'https://c4.wallpaperflare.com/wallpaper/915/463/644/honda-type-r-honda-civic-type-r-car-wallpaper-preview.jpg' },
        { make: 'Mercedes-Benz', model: 'C-Class', price: 22000000, mileage: 40000, year: 2019, description: 'A sophisticated and powerful executive sedan. It combines elegant design with a premium feel and high-end performance.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbaYB2a0NqUZnofMeH7M_oz5IZti8zQQX1Ug&s' },
        { make: 'Toyota', model: 'Aqua', price: 6500000, mileage: 60000, year: 2017, description: 'A compact hybrid hatchback, ideal for economical daily use. It is known for its incredible fuel efficiency and maneuverability.', imageUrl: 'https://media.drive.com.au/obj/tx_q:50,rs:auto:1920:1080:1/driveau/upload/cms/uploads/9wBrLGPxRcyhPP9eIkil' },
    ];

    const formatPrice = (price) => {
        return `LKR ${Number(price).toLocaleString()}`;
    };

    const createProductCard = (product, index) => {
        return `
            <div class="product-card">
                <img src="${product.imageUrl}" alt="${product.make} ${product.model}">
                <div class="product-details">
                    <h4>${product.make} ${product.model}</h4>
                    <p><strong>Price:</strong> ${formatPrice(product.price)}</p>
                    ${product.mileage ? `<p><strong>Mileage:</strong> ${product.mileage.toLocaleString()} km</p>` : ''}
                    ${product.year ? `<p><strong>Year:</strong> ${product.year}</p>` : ''}
                    <a href="#" class="btn view-details" data-id="${index}">View Details</a>
                </div>
            </div>
        `;
    };

    const renderProducts = (productList, containerId) => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = productList.map((product, index) => createProductCard(product, index)).join('');
            // Add event listeners to the new "View Details" buttons
            document.querySelectorAll('.view-details').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const productIndex = e.target.getAttribute('data-id');
                    showSingleProduct(productIndex);
                });
            });
        }
    };
    
    // Function to handle switching between views
    const setActiveSection = (targetId) => {
        const sections = document.querySelectorAll('.page-section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href').includes(targetId)) {
                link.classList.add('active-link');
            }
        });
    };

    // ----------------------------------------------------
    //  Part 2: Logic for the Index (Home) Page
    // ----------------------------------------------------

    if (document.body.id === 'index-page') {
        renderProducts(cars.slice(0, 2), 'featured-products');

        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            if (link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = e.target.getAttribute('href').substring(1);
                    setActiveSection(targetId);
                });
            }
        });

        const initialHash = window.location.hash.substring(1) || 'home';
        setActiveSection(initialHash);
        
        // Handle contact form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Contact form submitted!');
                alert('Thank you for your message! We will get back to you shortly.');
                contactForm.reset();
            });
        }
    }

    // ----------------------------------------------------
    //  Part 3: Logic for the Vehicle Details Page
    // ----------------------------------------------------

    const showSingleProduct = (productIndex) => {
        const product = cars[productIndex];
        const container = document.getElementById('product-details-container');
        
        setActiveSection('single-product-container');
        
        if (product && container) {
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
        } else if (container) {
            container.innerHTML = `<p class="error-message">Sorry, we couldn't find details for that vehicle.</p>`;
        }
    };
    
    if (document.body.id === 'details-page') {
        // Handle navigation for the vehicle details page
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = e.target.getAttribute('href');
                if (href.startsWith('index.html#')) {
                    // Redirect to index page with a hash
                    window.location.href = href;
                } else if (href.startsWith('vehicle-details.html')) {
                    // Handle internal navigation for this page
                    setActiveSection('all-vehicles-container');
                }
            });
        });

        // Get URL parameters for single product view
        const params = new URLSearchParams(window.location.search);
        const productIndex = params.get('id');
        
        if (productIndex !== null) {
            // Display single product details if an ID is present
            showSingleProduct(productIndex);
        } else {
            // Display all vehicles if no ID is present
            setActiveSection('all-vehicles-container');
            
            const makeFilter = document.getElementById('make-filter');
            const priceRange = document.getElementById('price-range');
            const priceDisplay = document.getElementById('price-display');
            
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

            if (priceRange) {
                priceRange.addEventListener('input', () => {
                    priceDisplay.textContent = formatPrice(priceRange.value);
                });
            }

            // Tie filter changes to update the display
            makeFilter.addEventListener('change', applyFilters);
            priceRange.addEventListener('input', applyFilters);
            
            // Initial render of all products
            applyFilters();
        }
    }

    // ----------------------------------------------------
    //  Part 4: Common Logic (for both pages)
    // ----------------------------------------------------

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                localStorage.setItem('theme', 'light');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });
    }

    const savedTheme = localStorage.getItem('theme');
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
});