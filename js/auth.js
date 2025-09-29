// Auth functionality for VozNica

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (localStorage.getItem('currentUser')) {
        window.location.href = 'index.html';
        return;
    }

    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const guestBtn = document.getElementById('guest-btn');
    const authCard = document.getElementById('auth-card');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Show auth card on button clicks
    loginBtn.addEventListener('click', () => {
        authCard.style.display = 'block';
        showForm('login');
    });

    registerBtn.addEventListener('click', () => {
        authCard.style.display = 'block';
        showForm('register');
    });

    // Guest access
    guestBtn.addEventListener('click', () => {
        localStorage.setItem('guest', 'true');
        window.location.href = 'index.html';
    });

    // Tab switching
    tabLogin.addEventListener('click', () => showForm('login'));
    tabRegister.addEventListener('click', () => showForm('register'));

    // Form submissions
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);

    function showForm(formType) {
        if (formType === 'login') {
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
        } else {
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
            tabRegister.classList.add('active');
            tabLogin.classList.remove('active');
        }
    }

    function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            alert('Nombre de usuario o contraseña inválidos');
        }
    }

    function handleRegister(e) {
        e.preventDefault();

        // Get form values
        const names = document.getElementById('register-names').value.trim();
        const lastnames = document.getElementById('register-lastnames').value.trim();
        const dob = document.getElementById('register-dob').value;
        const sex = document.getElementById('register-sex').value;
        const department = document.getElementById('register-department').value;
        const phone = document.getElementById('register-phone').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const username = document.getElementById('register-username').value.trim();
        const password = document.getElementById('register-password').value;

        // Clear previous errors
        clearErrors();

        // Validations
        let isValid = true;

        if (!names || !lastnames || !dob || !sex || !department || !phone || !email || !username || !password) {
            alert('Todos los campos son obligatorios');
            isValid = false;
        }

        if (isValid) {
            const dobDate = new Date(dob);
            const today = new Date();
            if (dobDate >= today) {
                showError('register-dob', 'La fecha de nacimiento es inválida');
                isValid = false;
            }

            const age = today.getFullYear() - dobDate.getFullYear();
            if (age < 13) {
                showError('register-dob', 'Debes tener al menos 13 años');
                isValid = false;
            }
        }

        if (isValid) {
            // Check if username already exists
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(u => u.username === username)) {
                showError('register-username', 'El nombre de usuario ya existe');
                isValid = false;
            }
        }

        if (isValid) {
            // Register user
            const newUser = {
                names,
                lastnames,
                dob,
                sex,
                department,
                phone,
                email,
                username,
                password
            };

            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));

            window.location.href = 'index.html';
        }
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    function clearErrors() {
        document.querySelectorAll('.error').forEach(el => el.remove());
    }
});