// Search functionality
const searchContainer = document.getElementById('searchContainer');
const searchInput = document.getElementById('searchInput');
let isSearchOpen = false;

function toggleSearch() {
    isSearchOpen = !isSearchOpen;
    
    if (isSearchOpen) {
        searchContainer.classList.add('expanded');
        searchInput.style.display = 'block';
        searchInput.focus();
        
        // Hide search text and shortcut
        const searchText = searchContainer.querySelector('.search-text');
        const searchShortcut = searchContainer.querySelector('.search-shortcut');
        if (searchText) searchText.style.display = 'none';
        if (searchShortcut) searchShortcut.style.display = 'none';
    } else {
        searchContainer.classList.remove('expanded');
        searchInput.style.display = 'none';
        
        // Show search text and shortcut
        const searchText = searchContainer.querySelector('.search-text');
        const searchShortcut = searchContainer.querySelector('.search-shortcut');
        if (searchText) searchText.style.display = 'inline';
        if (searchShortcut) searchShortcut.style.display = 'inline';
    }
}

// Search container click handler
searchContainer.addEventListener('click', toggleSearch);

// Close search when clicking outside
document.addEventListener('click', (e) => {
    if (isSearchOpen && !searchContainer.contains(e.target)) {
        toggleSearch();
    }
});

// Close search on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isSearchOpen) {
        toggleSearch();
    }
});

// Keyboard shortcut Ctrl+K
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
    }
});

// Dropdown functionality
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const icon = document.getElementById(dropdownId + '-icon');
    
    if (dropdown.classList.contains('show')) {
        // Close this dropdown with animation
        dropdown.classList.remove('show');
        icon.classList.remove('rotated');
        
        // Hide after animation completes
        setTimeout(() => {
            dropdown.style.display = 'none';
        }, 300);
    } else {
        // Close all other dropdowns with animation
        document.querySelectorAll('.nav-dropdown').forEach(d => {
            if (d.id !== dropdownId) {
                d.classList.remove('show');
                const otherIcon = document.getElementById(d.id + '-icon');
                if (otherIcon) otherIcon.classList.remove('rotated');
                
                setTimeout(() => {
                    d.style.display = 'none';
                }, 300);
            }
        });
        
        // Show this dropdown
        dropdown.style.display = 'flex';
        setTimeout(() => {
            dropdown.classList.add('show');
        }, 10);
        
        // Rotate icon
        icon.classList.add('rotated');
    }
}

// Close dropdowns when clicking outside - DISABLED to keep dropdowns open
// document.addEventListener('click', (e) => {
//     if (!e.target.closest('.nav-item')) {
//         document.querySelectorAll('.nav-dropdown').forEach(d => {
//             d.classList.remove('show');
//         });
//         document.querySelectorAll('.ph-caret-down').forEach(i => {
//             i.classList.remove('rotated');
//         });
//     }
// });

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link, .basic-card').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all nav links and toggles
        document.querySelectorAll('.nav-link, .nav-toggle').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked link
        if (link.classList.contains('nav-link')) {
            link.classList.add('active');
        }
        
        // In a real application, this would navigate to the actual page
        console.log('Navigate to:', link.getAttribute('href'));
    });
});

// Handle dropdown toggle clicks for active state
document.querySelectorAll('.nav-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        // Don't add active class to dropdown toggles
        // Only remove active class from nav links
        document.querySelectorAll('.nav-link').forEach(item => {
            item.classList.remove('active');
        });
    });
});

// Add hover effects for cards
document.querySelectorAll('.basic-card, .service-card, .info-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-2px)';
        card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('mobile-open');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Messdiener Wiki loaded successfully!');
    
    // Add loading animation
    document.querySelectorAll('.basic-card, .service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
