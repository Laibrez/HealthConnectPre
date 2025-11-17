// Smooth scroll behavior for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#3498db';
        }
    });
});

// Form submission handler
const form = document.getElementById('infoForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(form);
    const data = {};
    
    // Get all form fields
    for (let [key, value] of formData.entries()) {
        if (key === 'involvement') {
            // Handle checkboxes
            if (!data[key]) {
                data[key] = [];
            }
            data[key].push(value);
        } else {
            data[key] = value;
        }
    }
    
    // Save to localStorage (simulating backend storage)
    saveResponse(data);
    
    // Show success message
    showMessage('Thank you for your response! We appreciate your input and will be in touch soon.', 'success');
    
    // Reset form
    form.reset();
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Function to save response to localStorage
function saveResponse(data) {
    // Get existing responses
    let responses = JSON.parse(localStorage.getItem('healthConnectResponses')) || [];
    
    // Add timestamp to the data
    data.timestamp = new Date().toISOString();
    
    // Add new response
    responses.push(data);
    
    // Save back to localStorage
    localStorage.setItem('healthConnectResponses', JSON.stringify(responses));
    
    // Log for verification (in a real app, this would go to a backend)
    console.log('Response saved:', data);
    console.log('Total responses:', responses.length);
}

// Function to show messages
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// Function to get all responses (for testing/admin purposes)
function getAllResponses() {
    const responses = JSON.parse(localStorage.getItem('healthConnectResponses')) || [];
    console.log('All responses:', responses);
    return responses;
}

// Make getAllResponses available globally for testing
window.getAllResponses = getAllResponses;

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe team members and resource cards
document.addEventListener('DOMContentLoaded', () => {
    const teamMembers = document.querySelectorAll('.team-member');
    const resourceCards = document.querySelectorAll('.resource-card');
    
    // Set initial state
    [...teamMembers, ...resourceCards].forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Observe elements
    teamMembers.forEach(member => observer.observe(member));
    resourceCards.forEach(card => observer.observe(card));
});

// Console welcome message
console.log('%c HealthConnect ', 'background: #667eea; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c FIU Startup Initiative ', 'background: #764ba2; color: white; font-size: 14px; padding: 5px; border-radius: 3px;');
console.log('To view all form responses, use: getAllResponses()');
