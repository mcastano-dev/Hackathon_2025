// Main JavaScript for VozNica frontend

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in or guest
    if (!localStorage.getItem('currentUser') && !localStorage.getItem('guest')) {
        window.location.href = 'login.html';
        return;
    }

    // Always load the main page
    initHomePage();
});

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('guest');
    window.location.href = 'login.html';
}


// Home page functionality
function initHomePage() {

    // Sidebar toggle
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mobileSidebarToggle = document.getElementById('mobile-sidebar-toggle');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    mobileSidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            showSection(sectionId);
            // Update active link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Modal functionality
    const modal = document.getElementById('modal');
    const modalClose = document.querySelector('.modal-close');

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    function openModal(title, content) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-body').innerHTML = content;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    }

    function showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            // Initialize section if needed
            if (sectionId === 'publicaciones') {
                initPublications();
            } else if (sectionId === 'perfil') {
                initProfile();
            } else if (sectionId === 'buscar') {
                initSearch();
            } else if (sectionId === 'biblioteca') {
                initCulturalLibrary();
            } else if (sectionId === 'mapa') {
                initInteractiveMap();
            }
        }
    }

    // Publications functionality
    function initPublications() {
        loadPublications();
        setupPublicationEvents();
    }

    function setupPublicationEvents() {
        // Create publication button
        const createBtn = document.getElementById('create-publication-btn');
        const pubModal = document.getElementById('publication-modal');
        const pubForm = document.getElementById('publication-form');
        const modalClose = pubModal.querySelector('.modal-close');

        createBtn.addEventListener('click', () => {
            pubModal.classList.add('open');
            pubModal.setAttribute('aria-hidden', 'false');
        });

        modalClose.addEventListener('click', () => {
            pubModal.classList.remove('open');
            pubModal.setAttribute('aria-hidden', 'true');
        });

        pubModal.addEventListener('click', (e) => {
            if (e.target === pubModal) {
                pubModal.classList.remove('open');
                pubModal.setAttribute('aria-hidden', 'true');
            }
        });

        // Form submission
        pubForm.addEventListener('submit', handlePublicationSubmit);

        // Search and filter
        const searchInput = document.getElementById('publication-search');
        const dateFilter = document.getElementById('date-filter');

        searchInput.addEventListener('input', filterPublications);
        dateFilter.addEventListener('change', filterPublications);
    }

    function handlePublicationSubmit(e) {
        e.preventDefault();
        const title = document.getElementById('pub-title').value.trim();
        const content = document.getElementById('pub-content').value.trim();
        const category = document.getElementById('pub-category').value;

        if (!title || !content) return;

        const user = JSON.parse(localStorage.getItem('currentUser'));
        const publication = {
            id: Date.now(),
            title,
            content,
            category,
            author: user.names + ' ' + user.lastnames,
            username: user.username,
            date: new Date().toISOString(),
            likes: 0,
            comments: []
        };

        // Save to localStorage
        const publications = JSON.parse(localStorage.getItem('publications')) || [];
        publications.unshift(publication); // Add to beginning
        localStorage.setItem('publications', JSON.stringify(publications));

        // Reset form and close modal
        e.target.reset();
        document.getElementById('publication-modal').classList.remove('open');

        // Reload publications
        loadPublications();
    }

    function loadPublications() {
        const feed = document.getElementById('publications-feed');
        const publications = JSON.parse(localStorage.getItem('publications')) || [];

        // Add some sample publications if none exist
        if (publications.length === 0) {
            const samplePublications = [
                {
                    id: 1,
                    title: "La Leyenda del Cadejo",
                    content: "En las tradiciones nicaragüenses, el Cadejo es un espíritu protector que aparece como un perro negro o blanco. Según la leyenda, el Cadejo blanco protege a los borrachos que regresan a casa de noche, mientras que el negro los lleva al infierno. Esta historia se transmite de generación en generación en las comunidades rurales.",
                    category: "historia",
                    author: "María González",
                    username: "maria_g",
                    date: "2024-09-25T10:00:00.000Z",
                    likes: 15,
                    comments: ["¡Qué interesante!", "Nunca había oído esta historia"]
                },
                {
                    id: 2,
                    title: "Receta Tradicional: Anafre Nicaragüense",
                    content: "El anafre es un plato típico de Nicaragua hecho con carne de res, yuca, plátanos verdes y chicharrón. Se cuece lentamente en una olla de barro. Ingredientes: 1kg de carne de res, 2kg de yuca, 4 plátanos verdes, 200g de chicharrón, condimentos al gusto.",
                    category: "receta",
                    author: "Carlos Rodríguez",
                    username: "carlos_r",
                    date: "2024-09-24T14:30:00.000Z",
                    likes: 8,
                    comments: ["¡Mi plato favorito!"]
                }
            ];
            localStorage.setItem('publications', JSON.stringify(samplePublications));
            publications.push(...samplePublications);
        }

        feed.innerHTML = publications.map(pub => createPublicationCard(pub)).join('');
    }

    function createPublicationCard(pub) {
        const date = new Date(pub.date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return `
            <div class="publication-card" data-id="${pub.id}">
                <div class="publication-header">
                    <div class="author-info">
                        <div class="author-avatar">${pub.author.charAt(0)}</div>
                        <div>
                            <h4>${pub.author}</h4>
                            <span class="username">@${pub.username}</span>
                            <span class="date">${date}</span>
                        </div>
                    </div>
                    <span class="category">${pub.category}</span>
                </div>
                <div class="publication-content">
                    <h3>${pub.title}</h3>
                    <p>${pub.content}</p>
                </div>
                <div class="publication-actions">
                    <button class="action-btn like-btn" onclick="toggleLike(${pub.id})">
                        👍 ${pub.likes}
                    </button>
                    <button class="action-btn comment-btn" onclick="showComments(${pub.id})">
                        💬 ${pub.comments.length}
                    </button>
                    <button class="action-btn share-btn" onclick="sharePublication(${pub.id})">
                        📤 Compartir
                    </button>
                </div>
            </div>
        `;
    }

    function filterPublications() {
        const searchTerm = document.getElementById('publication-search').value.toLowerCase();
        const dateFilter = document.getElementById('date-filter').value;
        const cards = document.querySelectorAll('.publication-card');

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('.publication-content p').textContent.toLowerCase();
            const author = card.querySelector('.author-info h4').textContent.toLowerCase();
            const username = card.querySelector('.username').textContent.toLowerCase();

            const matchesSearch = title.includes(searchTerm) ||
                                content.includes(searchTerm) ||
                                author.includes(searchTerm) ||
                                username.includes(searchTerm);

            let matchesDate = true;
            if (dateFilter) {
                const pubDate = new Date(card.dataset.date);
                const now = new Date();
                const diffTime = now - pubDate;
                const diffDays = diffTime / (1000 * 60 * 60 * 24);

                switch (dateFilter) {
                    case 'today':
                        matchesDate = diffDays < 1;
                        break;
                    case 'week':
                        matchesDate = diffDays < 7;
                        break;
                    case 'month':
                        matchesDate = diffDays < 30;
                        break;
                    case 'year':
                        matchesDate = diffDays < 365;
                        break;
                }
            }

            card.style.display = matchesSearch && matchesDate ? 'block' : 'none';
        });
    }

    // Global functions for publication actions
    window.toggleLike = function(id) {
        const publications = JSON.parse(localStorage.getItem('publications')) || [];
        const pub = publications.find(p => p.id === id);
        if (pub) {
            pub.likes += 1; // Simple increment, in real app would track user likes
            localStorage.setItem('publications', JSON.stringify(publications));
            loadPublications();
        }
    };

    window.showComments = function(id) {
        // Simple alert for now, could open comments modal
        alert('Comentarios próximamente');
    };

    window.sharePublication = function(id) {
        // Simple share functionality
        if (navigator.share) {
            navigator.share({
                title: 'Publicación de VozNica',
                text: 'Mira esta publicación en VozNica',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Enlace copiado al portapapeles');
        }
    };

    // Profile functionality
    function initProfile() {
        loadProfileInfo();
        loadUserPosts();
        setupProfileEvents();
    }

    function setupProfileEvents() {
        // Edit profile button
        const editBtn = document.getElementById('edit-profile-btn');
        const editModal = document.getElementById('edit-profile-modal');
        const editForm = document.getElementById('edit-profile-form');
        const modalClose = editModal.querySelector('.modal-close');

        editBtn.addEventListener('click', () => {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            document.getElementById('edit-names').value = user.names;
            document.getElementById('edit-lastnames').value = user.lastnames;
            editModal.classList.add('open');
            editModal.setAttribute('aria-hidden', 'false');
        });

        modalClose.addEventListener('click', () => {
            editModal.classList.remove('open');
            editModal.setAttribute('aria-hidden', 'true');
        });

        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) {
                editModal.classList.remove('open');
                editModal.setAttribute('aria-hidden', 'true');
            }
        });

        // Form submission
        editForm.addEventListener('submit', handleProfileUpdate);
    }

    function handleProfileUpdate(e) {
        e.preventDefault();
        const names = document.getElementById('edit-names').value.trim();
        const lastnames = document.getElementById('edit-lastnames').value.trim();

        if (!names || !lastnames) return;

        // Update user in localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userIndex = users.findIndex(u => u.username === currentUser.username);

        if (userIndex !== -1) {
            users[userIndex].names = names;
            users[userIndex].lastnames = lastnames;
            localStorage.setItem('users', JSON.stringify(users));

            currentUser.names = names;
            currentUser.lastnames = lastnames;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            // Close modal and reload profile
            document.getElementById('edit-profile-modal').classList.remove('open');
            loadProfileInfo();
            loadUserPosts(); // In case name changed in posts
        }
    }

    function loadProfileInfo() {
        const profileInfo = document.getElementById('profile-info');
        const user = JSON.parse(localStorage.getItem('currentUser'));

        const publications = JSON.parse(localStorage.getItem('publications')) || [];
        const userPosts = publications.filter(p => p.username === user.username);

        profileInfo.innerHTML = `
            <div class="profile-card">
                <div class="profile-avatar">
                    ${user.names.charAt(0)}${user.lastnames.charAt(0)}
                </div>
                <div class="profile-details">
                    <h3>${user.names} ${user.lastnames}</h3>
                    <p class="username">@${user.username}</p>
                    <p class="department">${user.department}</p>
                    <div class="profile-stats">
                        <span>${userPosts.length} publicaciones</span>
                        <span>${userPosts.reduce((sum, p) => sum + p.likes, 0)} likes</span>
                    </div>
                </div>
            </div>
        `;
    }

    function loadUserPosts() {
        const userPostsDiv = document.getElementById('user-posts');
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const publications = JSON.parse(localStorage.getItem('publications')) || [];
        const userPosts = publications.filter(p => p.username === user.username);

        if (userPosts.length === 0) {
            userPostsDiv.innerHTML = '<p>No has creado ninguna publicación aún.</p>';
            return;
        }

        userPostsDiv.innerHTML = userPosts.map(post => `
            <div class="user-post-item" data-id="${post.id}">
                <div class="post-header">
                    <h4>${post.title}</h4>
                    <div class="post-actions">
                        <button onclick="editPost(${post.id})" class="btn-small">Editar</button>
                        <button onclick="deletePost(${post.id})" class="btn-small btn-danger">Eliminar</button>
                    </div>
                </div>
                <p class="post-excerpt">${post.content.substring(0, 150)}${post.content.length > 150 ? '...' : ''}</p>
                <div class="post-meta">
                    <span class="category">${post.category}</span>
                    <span class="date">${new Date(post.date).toLocaleDateString('es-ES')}</span>
                    <span class="likes">${post.likes} likes</span>
                </div>
            </div>
        `).join('');
    }

    // Search functionality
    function initSearch() {
        setupSearchEvents();
    }

    function setupSearchEvents() {
        const searchBtn = document.getElementById('search-user-btn');
        const searchInput = document.getElementById('user-search');

        searchBtn.addEventListener('click', performUserSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performUserSearch();
            }
        });
    }

    function performUserSearch() {
        const username = document.getElementById('user-search').value.trim().toLowerCase();
        const resultsDiv = document.getElementById('search-results');

        if (!username) {
            resultsDiv.innerHTML = '<p>Por favor ingresa un nombre de usuario.</p>';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username.toLowerCase() === username);

        if (!user) {
            resultsDiv.innerHTML = '<p>No se encontró ningún usuario con ese nombre.</p>';
            return;
        }

        // Load user's posts
        const publications = JSON.parse(localStorage.getItem('publications')) || [];
        const userPosts = publications.filter(p => p.username === user.username);

        resultsDiv.innerHTML = `
            <div class="user-profile-card">
                <div class="profile-card">
                    <div class="profile-avatar">
                        ${user.names.charAt(0)}${user.lastnames.charAt(0)}
                    </div>
                    <div class="profile-details">
                        <h3>${user.names} ${user.lastnames}</h3>
                        <p class="username">@${user.username}</p>
                        <p class="department">${user.department}</p>
                        <div class="profile-stats">
                            <span>${userPosts.length} publicaciones</span>
                            <span>${userPosts.reduce((sum, p) => sum + p.likes, 0)} likes</span>
                        </div>
                    </div>
                </div>

                <div class="user-posts-section">
                    <h4>Publicaciones de ${user.names}</h4>
                    ${userPosts.length === 0 ?
                        '<p>Este usuario no ha creado publicaciones aún.</p>' :
                        userPosts.map(post => `
                            <div class="publication-card">
                                <div class="publication-header">
                                    <div class="author-info">
                                        <div class="author-avatar">${user.names.charAt(0)}</div>
                                        <div>
                                            <h4>${user.names} ${user.lastnames}</h4>
                                            <span class="username">@${user.username}</span>
                                            <span class="date">${new Date(post.date).toLocaleDateString('es-ES')}</span>
                                        </div>
                                    </div>
                                    <span class="category">${post.category}</span>
                                </div>
                                <div class="publication-content">
                                    <h3>${post.title}</h3>
                                    <p>${post.content}</p>
                                </div>
                                <div class="publication-actions">
                                    <button class="action-btn like-btn">👍 ${post.likes}</button>
                                    <button class="action-btn comment-btn">💬 ${post.comments.length}</button>
                                </div>
                            </div>
                        `).join('')
                    }
                </div>
            </div>
        `;
    }

    // Global functions for post management
    window.editPost = function(id) {
        const publications = JSON.parse(localStorage.getItem('publications')) || [];
        const post = publications.find(p => p.id === id);
        if (post) {
            // Populate edit modal (you could add an edit modal similar to create)
            alert('Funcionalidad de edición próximamente');
        }
    };

    window.deletePost = function(id) {
        if (confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
            const publications = JSON.parse(localStorage.getItem('publications')) || [];
            const filteredPublications = publications.filter(p => p.id !== id);
            localStorage.setItem('publications', JSON.stringify(filteredPublications));
            loadUserPosts(); // Reload user's posts
        }
    };

    // Cultural Library functionality
    function initCulturalLibrary() {
        loadCulturalResources();
        setupLibraryEvents();
    }

    // Interactive Map functionality
    function initInteractiveMap() {
        loadNicaraguaMap();
        setupMapEvents();
    }

    function setupLibraryEvents() {
        const searchInput = document.getElementById('library-search');
        const categoryFilter = document.getElementById('category-filter');

        searchInput.addEventListener('input', filterLibraryResources);
        categoryFilter.addEventListener('change', filterLibraryResources);
    }

    function loadCulturalResources() {
        const grid = document.getElementById('library-grid');
        const resources = getCulturalResources();

        grid.innerHTML = resources.map(resource => createResourceCard(resource)).join('');
    }

    function createResourceCard(resource) {
        return `
            <div class="resource-card" data-category="${resource.category}">
                <div class="resource-thumbnail">
                    <div class="thumbnail-placeholder">${resource.icon}</div>
                </div>
                <div class="resource-content">
                    <h3>${resource.title}</h3>
                    <p>${resource.description}</p>
                    <div class="resource-meta">
                        <span class="category">${resource.category}</span>
                        <span class="type">${resource.type}</span>
                    </div>
                </div>
                <div class="resource-actions">
                    <a href="${resource.url}" target="_blank" class="btn-primary">Acceder al recurso</a>
                    <button onclick="shareResource('${resource.title}', '${resource.url}')" class="btn-secondary">Compartir</button>
                </div>
            </div>
        `;
    }

    function filterLibraryResources() {
        const searchTerm = document.getElementById('library-search').value.toLowerCase();
        const categoryFilter = document.getElementById('category-filter').value;
        const cards = document.querySelectorAll('.resource-card');

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.resource-content p').textContent.toLowerCase();
            const category = card.dataset.category;

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = !categoryFilter || category === categoryFilter;

            card.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
        });
    }

    function getCulturalResources() {
        return [
            {
                id: 1,
                title: "Historia de Nicaragua",
                description: "Recorrido completo por la historia de Nicaragua desde la época precolombina hasta la actualidad.",
                category: "historia",
                type: "Documento",
                icon: "📚",
                url: "https://es.wikipedia.org/wiki/Historia_de_Nicaragua"
            },
            {
                id: 2,
                title: "Leyendas y Tradiciones Nicaragüenses",
                description: "Colección de las leyendas más famosas como La Llorona, El Cadejo y otras tradiciones populares.",
                category: "tradiciones",
                type: "Artículo",
                icon: "👻",
                url: "https://www.laprensa.com.ni/2019/10/31/suplemento/la-prensa-domingo/2575085-leyendas-nicaraguenses"
            },
            {
                id: 3,
                title: "Arte Contemporáneo Nicaragüense",
                description: "Exploración del arte moderno y contemporáneo de Nicaragua, incluyendo pintura, escultura y artes visuales.",
                category: "arte",
                type: "Galería",
                icon: "🎨",
                url: "https://www.elnuevodiario.com.ni/arte/"
            },
            {
                id: 4,
                title: "Música Tradicional de Nicaragua",
                description: "Descubre los ritmos tradicionales como el palo de mayo, la marimba y otros géneros musicales nicaragüenses.",
                category: "musica",
                type: "Audio",
                icon: "🎵",
                url: "https://www.musicapopularnicaraguense.com/"
            },
            {
                id: 5,
                title: "Gastronomía Nicaragüense",
                description: "Recetas tradicionales, ingredientes autóctonos y la diversidad culinaria de Nicaragua.",
                category: "gastronomia",
                type: "Recetario",
                icon: "🍲",
                url: "https://www.laprensa.com.ni/vida/gastronomia/"
            },
            {
                id: 6,
                title: "Literatura Nicaragüense",
                description: "Obras de autores clásicos como Rubén Darío, Ernesto Cardenal y literatura contemporánea.",
                category: "literatura",
                type: "Biblioteca",
                icon: "📖",
                url: "https://www.bibliotecanacionalnicaragua.gob.ni/"
            },
            {
                id: 7,
                title: "Religión y Costumbres Nicaragüenses",
                description: "Festividades religiosas, procesiones y tradiciones espirituales en la cultura nicaragüense.",
                category: "religion",
                type: "Artículo",
                icon: "⛪",
                url: "https://www.elnuevodiario.com.ni/variedades/religion/"
            },
            {
                id: 8,
                title: "Folklore Nicaragüense",
                description: "Estudio del folklore, mitos, leyendas y expresiones culturales tradicionales.",
                category: "tradiciones",
                type: "Investigación",
                icon: "🎭",
                url: "https://www.inide.gob.ni/"
            },
            {
                id: 9,
                title: "Arquitectura Colonial",
                description: "Edificios históricos, iglesias coloniales y patrimonio arquitectónico de Nicaragua.",
                category: "historia",
                type: "Fotografías",
                icon: "🏛️",
                url: "https://www.patrimoniohistorico.gob.ni/"
            },
            {
                id: 10,
                title: "Danzas Tradicionales",
                description: "Las danzas folklóricas más importantes como El Güegüense, Los Diabilitos y La Indita.",
                category: "arte",
                type: "Vídeos",
                icon: "💃",
                url: "https://www.culturanicaragua.gob.ni/"
            }
        ];
    }

    // Global function for sharing resources
    window.shareResource = function(title, url) {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: 'Recurso cultural de VozNica',
                url: url
            });
        } else {
            navigator.clipboard.writeText(url);
            alert('Enlace copiado al portapapeles');
        }
    };

    function loadNicaraguaMap() {
        // Google Maps will be initialized by the callback function
        // This function is called when the mapa section becomes active
        if (window.google && window.google.maps) {
            initGoogleMap();
        } else {
            // If Google Maps isn't loaded yet, wait for it
            window.initMap = initGoogleMap;
        }
    }

    function initGoogleMap() {
        const mapContainer = document.querySelector('.nicaragua-map');

        // Center of Nicaragua
        const nicaraguaCenter = { lat: 12.8654, lng: -85.2072 };

        // Create Google Map
        const map = new google.maps.Map(mapContainer, {
            zoom: 7,
            center: nicaraguaCenter,
            mapTypeId: google.maps.MapTypeId.HYBRID, // Satellite view
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: false,
            fullscreenControl: true
        });

        // Store map instance globally for marker management
        window.nicaraguaMap = map;

        // Add landmarks as markers
        addGoogleMapMarkers(map);
    }

    function addGoogleMapMarkers(map) {
        const landmarks = getNicaraguanLandmarks();

        // Custom marker icons by type
        const markerIcons = {
            historical: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="14" fill="#E45953" stroke="white" stroke-width="3"/>
                        <path d="M16 6 L20 14 L16 12 L12 14 Z" fill="white"/>
                    </svg>
                `),
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(16, 32)
            },
            cultural: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="14" fill="#FDBC32" stroke="white" stroke-width="3"/>
                        <path d="M12 12 L20 12 L20 16 L16 20 L12 16 Z" fill="white"/>
                    </svg>
                `),
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(16, 32)
            },
            natural: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="14" fill="#22c55e" stroke="white" stroke-width="3"/>
                        <path d="M8 20 Q16 8 24 20 Q16 16 8 20" fill="white"/>
                    </svg>
                `),
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(16, 32)
            }
        };

        landmarks.forEach(landmark => {
            const marker = new google.maps.Marker({
                position: { lat: landmark.lat, lng: landmark.lng },
                map: map,
                title: landmark.name,
                icon: markerIcons[landmark.type],
                animation: google.maps.Animation.DROP
            });

            // Add click listener to show landmark info
            marker.addListener('click', () => {
                showLandmarkInfo(landmark);
            });
        });
    }

    function setupMapEvents() {
        // Map is interactive through pin clicks
    }

    function showLandmarkInfo(landmark) {
        const modal = document.getElementById('modal');
        const title = `${landmark.name} - ${landmark.location}`;
        const content = `
            <div class="landmark-info">
                <div class="landmark-header">
                    <span class="landmark-type ${landmark.type}">${landmark.type}</span>
                    <h3>${landmark.name}</h3>
                    <p class="landmark-location">${landmark.location}</p>
                </div>
                <div class="landmark-description">
                    <p>${landmark.description}</p>
                </div>
                <div class="landmark-details">
                    <h4>Información histórica:</h4>
                    <p>${landmark.history}</p>
                    ${landmark.significance ? `<p><strong>Importancia:</strong> ${landmark.significance}</p>` : ''}
                </div>
                <div class="landmark-actions">
                    <button onclick="shareResource('${landmark.name}', window.location.href)" class="btn-secondary">Compartir</button>
                </div>
            </div>
        `;

        openModal(title, content);
    }

    function getNicaraguanLandmarks() {
        return [
            {
                id: 1,
                name: "Catedral de León",
                location: "León",
                type: "historical",
                lat: 12.4370,
                lng: -86.8794,
                description: "La Catedral de León es una de las catedrales más antiguas de América Latina y un símbolo de la arquitectura colonial española.",
                history: "Construida entre 1747 y 1814, es Patrimonio de la Humanidad por la UNESCO desde 2011.",
                significance: "Representa la fusión de culturas indígenas y españolas en Nicaragua."
            },
            {
                id: 2,
                name: "Volcán Masaya",
                location: "Masaya",
                type: "natural",
                lat: 11.9859,
                lng: -86.1612,
                description: "Uno de los volcanes más activos de Nicaragua, conocido como la 'Boca del Infierno'.",
                history: "Ha estado activo por miles de años y es parte del Parque Nacional Volcán Masaya.",
                significance: "Importante sitio turístico y científico para el estudio de vulcanología."
            },
            {
                id: 3,
                name: "Islas Solentiname",
                location: "Río San Juan",
                type: "cultural",
                lat: 11.2361,
                lng: -84.8269,
                description: "Archipiélago en el Lago de Nicaragua conocido por su arte naif y comunidad artística.",
                history: "Descubiertas por los españoles en el siglo XVI, se convirtieron en un centro artístico en los años 60-70.",
                significance: "Centro de arte primitivista nicaragüense y lugar de encuentro cultural."
            },
            {
                id: 4,
                name: "Ruinas de León Viejo",
                location: "León",
                type: "historical",
                lat: 12.4286,
                lng: -86.6175,
                description: "Primer asentamiento español en Nicaragua, destruido por el volcán Momotombo en 1610.",
                history: "Fundada en 1524, fue la primera capital de Nicaragua hasta su destrucción.",
                significance: "Patrimonio de la Humanidad por la UNESCO, muestra la historia colonial temprana."
            },
            {
                id: 5,
                name: "Laguna de Apoyo",
                location: "Masaya/Granada",
                type: "natural",
                lat: 11.9158,
                lng: -86.0486,
                description: "Crater volcánico con aguas cristalinas, uno de los lagos más profundos de Centroamérica.",
                history: "Formado por la erupción de un volcán hace aproximadamente 23,000 años.",
                significance: "Importante reserva natural y sitio de buceo único en Nicaragua."
            },
            {
                id: 6,
                name: "Fortaleza de la Inmaculada Concepción",
                location: "Granada",
                type: "historical",
                lat: 11.9344,
                lng: -85.9575,
                description: "Fortaleza española del siglo XVII construida para proteger Granada de piratas.",
                history: "Construida entre 1673 y 1675, es una de las fortalezas mejor conservadas de América Latina.",
                significance: "Símbolo de la resistencia española contra los piratas en el siglo XVII."
            },
            {
                id: 7,
                name: "Catedral de Granada",
                location: "Granada",
                type: "historical",
                lat: 11.9342,
                lng: -85.9572,
                description: "Imponente catedral neoclásica que domina el skyline de Granada.",
                history: "Construida en el siglo XIX, reemplaza a la catedral original destruida por un terremoto.",
                significance: "Centro religioso y cultural de Granada, ejemplo de arquitectura neoclásica."
            },
            {
                id: 8,
                name: "Volcán Momotombo",
                location: "León",
                type: "natural",
                lat: 12.4214,
                lng: -86.5397,
                description: "Volcán activo y símbolo nacional de Nicaragua, visible desde gran parte del país.",
                history: "Ha erupcionado más de 20 veces en los últimos 450 años.",
                significance: "Parte del paisaje nacional y importante para la vulcanología."
            },
            {
                id: 9,
                name: "Basílica de Nuestra Señora de la Asunción",
                location: "León",
                type: "historical",
                lat: 12.4372,
                lng: -86.8792,
                description: "Basílica menor y uno de los templos más importantes de Nicaragua.",
                history: "Construida en el siglo XVIII, es un ejemplo del barroco nicaragüense.",
                significance: "Centro de peregrinación religiosa y patrimonio arquitectónico."
            },
            {
                id: 10,
                name: "Reserva Biológica Indio-Maíz",
                location: "RAAN",
                type: "natural",
                lat: 14.0167,
                lng: -84.0167,
                description: "Una de las reservas naturales más grandes de Centroamérica, hogar de comunidades indígenas.",
                history: "Establecida en 1991 para proteger la biodiversidad y las culturas indígenas.",
                significance: "Importante para la conservación de especies endémicas y culturas tradicionales."
            }
        ];
    }
}
