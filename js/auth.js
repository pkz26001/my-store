// Authentication System

function toggleForms() {
    document.getElementById('login-form').style.display = 
        document.getElementById('login-form').style.display === 'none' ? 'block' : 'none';
    document.getElementById('signup-form').style.display = 
        document.getElementById('signup-form').style.display === 'none' ? 'block' : 'none';
}

// Login Handler
document.getElementById('login-form-element')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (users[email] && users[email].password === password) {
        localStorage.setItem('currentUser', JSON.stringify({
            email: email,
            name: users[email].name,
            loginTime: new Date().toISOString()
        }));
        alert('Login successful!');
        window.location.href = 'products.html';
    } else {
        alert('Invalid email or password');
    }
});

// Sign Up Handler
document.getElementById('signup-form-element')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;

    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (users[email]) {
        alert('Email already registered');
        return;
    }

    // Save new user
    users[email] = {
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully! Please login.');
    toggleForms();
});

// Check if user is logged in
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully');
    window.location.href = 'index.html';
}

// Update navbar with user info
function updateNavbarWithUser() {
    const user = getCurrentUser();
    if (user) {
        // Update navbar to show logged-in user
        console.log('User logged in:', user.name);
    }
}

window.addEventListener('load', updateNavbarWithUser);