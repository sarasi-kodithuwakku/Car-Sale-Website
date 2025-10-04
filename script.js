document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    //  Part 1: Data and Rendering
    // ----------------------------------------------------

    const cars = [
        { make: 'BMW', model: '3 Series', price: 18500000, mileage: 30000, year: 2020, description: 'A luxury sports sedan known for its performance and style. This model features a powerful engine and advanced technology.', imageUrl: 'https://c4.wallpaperflare.com/wallpaper/421/26/425/car-cars-1920x1200-bmw-wallpaper-preview.jpg' },
        { make: 'Toyota', model: 'Prius', price: 12500000, mileage: 50000, year: 2018, description: 'An efficient hybrid car, perfect for city driving. It offers excellent fuel economy and a smooth, quiet ride.', imageUrl: 'https://w0.peakpx.com/wallpaper/456/373/HD-wallpaper-2022-toyota-prius-xle-nightshade-edition-2.jpg' },
        { make: 'Honda', model: 'Civic', price: 10000000, mileage: 25000, year: 2021, description: 'A reliable and popular compact car with a sporty feel. This model includes modern safety features and a comfortable interior.', imageUrl: 'https://c4.wallpaperflare.com/wallpaper/915/463/644/honda-type-r-honda-civic-type-r-car-wallpaper-preview.jpg' },
        { make: 'Mercedes-Benz', model: 'C-Class', price: 22000000, mileage: 40000, year: 2019, description: 'A sophisticated and powerful executive sedan. It combines elegant design with a premium feel and high-end performance.', imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800' },
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
                    <a href="vehicle-details.html?id=${index}" class="btn view-details" data-id="${index}">View Details</a>
                </div>
            </div>
        `;
    };

    const renderProducts = (productList, containerId) => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = productList.map((product, index) => createProductCard(product, index)).join('');
        }
    };
    
    // Function to handle switching between views
    const setActiveSection = (targetId) => {
        const sections = document.querySelectorAll('.page-section');
        
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // ----------------------------------------------------
    //  Part 2: Logic for the Index (Home) Page
    // ----------------------------------------------------

    if (document.body.id === 'index-page') {
        renderProducts(cars.slice(0, 2), 'featured-products');

        const navLinks = document.querySelectorAll('.nav-links a[href^="#"], footer a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                setActiveSection(targetId);
                history.pushState(null, '', `#${targetId}`);
            });
        });

        const testDriveButton = document.querySelector('.cta-section .btn');
        if (testDriveButton) {
            testDriveButton.addEventListener('click', (e) => {
                e.preventDefault();
                setActiveSection('test-drive-section');
                const testDriveForm = document.getElementById('test-drive-form');
                if (testDriveForm) {
                    testDriveForm.reset();
                    const today = new Date().toISOString().split('T')[0];
                    document.getElementById('td-date').value = today;
                    document.getElementById('td-message').value = "I am interested in a test drive. Please contact me to arrange a suitable time.";
                }
            });
        }

        // Handle initial hash on load
        const hash = window.location.hash.substring(1);
        if (hash) {
            setActiveSection(hash);
        } else {
            setActiveSection('home');
        }

        // Contact form
        const contactForm = document.getElementById("contact-form");
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for contacting us! We will get back to you shortly.');
                setActiveSection('thank-you-section');
                this.reset();
            });
        }
        
        // Test drive form
        const testDriveFormIndex = document.getElementById("test-drive-form");
        if (testDriveFormIndex) {
            testDriveFormIndex.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you! Your test drive has been scheduled. We will contact you to confirm the details.');
                setActiveSection('thank-you-section');
                this.reset();
            });
        }
    }

    // ----------------------------------------------------
    //  Part 3: Logic for the Vehicle Details Page
    // ----------------------------------------------------

    if (document.body.id === 'details-page') {
        const params = new URLSearchParams(window.location.search);
        const productIndex = params.get('id');
        
        if (productIndex !== null && productIndex !== '' && cars[productIndex]) {
            // Show single product view
            const product = cars[productIndex];
            const container = document.getElementById('product-details-container');
            
            if (container) {
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
                        <a href="index.html#contact" class="btn contact-from-details">Contact Us</a>
                        <a href="javascript:void(0);" class="btn schedule-test-drive" data-car-id="${productIndex}">Schedule Test Drive</a>
                    </div>
                `;

                // Schedule test drive button
                const scheduleButton = document.querySelector('.schedule-test-drive');
                if (scheduleButton) {
                    scheduleButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        setActiveSection('test-drive-section');
                        const testDriveForm = document.getElementById('test-drive-form');
                        if (testDriveForm) {
                            testDriveForm.reset();
                            const today = new Date().toISOString().split('T')[0];
                            const tdDate = document.getElementById('td-date');
                            const tdMessage = document.getElementById('td-message');
                            if (tdDate) tdDate.value = today;
                            if (tdMessage) tdMessage.value = `I'm interested in a test drive for the ${product.make} ${product.model}. Please contact me to arrange a suitable time.`;
                        }
                    });
                }
            }
            
            setActiveSection('single-product-container');
            
        } else {
            // Show all vehicles view
            setActiveSection('all-vehicles-container');
            
            const makeFilter = document.getElementById('make-filter');
            const priceRange = document.getElementById('price-range');
            const priceDisplay = document.getElementById('price-display');
            
            const applyFilters = () => {
                const selectedMake = makeFilter ? makeFilter.value : 'All';
                const maxPrice = priceRange ? parseInt(priceRange.value, 10) : 30000000;
                
                const filteredProducts = cars.filter(car => {
                    const makeMatch = selectedMake === 'All' || car.make === selectedMake;
                    const priceMatch = car.price <= maxPrice;
                    return makeMatch && priceMatch;
                });
                
                renderProducts(filteredProducts, 'product-listings');
            };

            if (priceRange && priceDisplay) {
                priceRange.addEventListener('input', () => {
                    priceDisplay.textContent = formatPrice(priceRange.value);
                    applyFilters();
                });
            }

            if (makeFilter) {
                makeFilter.addEventListener('change', applyFilters);
            }
            
            // Initial render
            applyFilters();
        }

        // Test drive form on details page
        const testDriveForm = document.getElementById('test-drive-form');
        if (testDriveForm) {
            testDriveForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you! Your test drive has been scheduled. We will contact you to confirm the details.');
                setActiveSection('thank-you-section');
                this.reset();
            });
        }
    }

    // ----------------------------------------------------
    //  Part 4: Common Logic (for both pages)
    // ----------------------------------------------------

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
            });
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
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    // Load saved theme
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