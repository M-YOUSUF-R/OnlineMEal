document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('loginForm');
            const submitBtn = document.getElementById('submitBtn');
            const notification = document.getElementById('notification');
            
            // Check if user just registered
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('registered') === 'true') {
                notification.innerHTML = '<i class="fas fa-check-circle"></i> Account created! Please login with your credentials.';
                notification.style.display = 'block';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 5000);
            }
            
            // Form validation
            function validateField(field, errorId) {
                const value = field.value.trim();
                const errorElement = document.getElementById(errorId);
                
                if (!value) {
                    field.classList.add('error');
                    field.classList.remove('success');
                    errorElement.style.display = 'block';
                    return false;
                } else {
                    field.classList.remove('error');
                    field.classList.add('success');
                    errorElement.style.display = 'none';
                    return true;
                }
            }
            
            // Real-time validation
            const borderNoInput = document.getElementById('border_no');
            const regNoInput = document.getElementById('reg_no');
            const passwordInput = document.getElementById('password');
            
            borderNoInput.addEventListener('input', () => {
                validateField(borderNoInput, 'borderError');
            });
            
            regNoInput.addEventListener('input', () => {
                validateField(regNoInput, 'regError');
            });
            
            passwordInput.addEventListener('input', () => {
                validateField(passwordInput, 'passwordError');
            });
            
            // Form submission
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                // Validate all fields
                const isBorderValid = validateField(borderNoInput, 'borderError');
                const isRegValid = validateField(regNoInput, 'regError');
                const isPasswordValid = validateField(passwordInput, 'passwordError');
                
                // If all validations pass
                if (isBorderValid && isRegValid && isPasswordValid) {
                    
                    // Disable submit button and show loading
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
                    
                    // Prepare form data
                    const formData = {
                        border_no: borderNoInput.value.trim(),
                        reg_no: regNoInput.value.trim(),
                        password: passwordInput.value,
                        remember: document.getElementById('remember').checked
                    };
                    
                    // Check for "remember me" functionality
                    if (formData.remember) {
                        localStorage.setItem('rememberedBorder', formData.border_no);
                        localStorage.setItem('rememberedReg', formData.reg_no);
                    } else {
                        localStorage.removeItem('rememberedBorder');
                        localStorage.removeItem('rememberedReg');
                    }
                    
                    // Simulate API call (replace with actual API call)
                    setTimeout(() => {
                        // Simulate login success or failure
                        const isSuccess = Math.random() > 0.2; // 80% success rate for demo
                        
                        if (isSuccess) {
                            // Show success notification
                            notification.innerHTML = '<i class="fas fa-check-circle"></i> Login successful! Redirecting...';
                            notification.className = 'notification';
                            notification.style.display = 'block';
                            
                            // In a real app, you would:
                            // 1. Get JWT token from backend
                            // 2. Save token to localStorage/sessionStorage
                            // 3. Redirect to dashboard
                            
                            // For demo, save dummy user data
                            const userData = {
                                border_no: formData.border_no,
                                reg_no: formData.reg_no,
                                name: 'Demo User', // Replace with actual user data from API
                                loggedIn: true
                            };
                            localStorage.setItem('user', JSON.stringify(userData));
                            localStorage.setItem('token', 'demo_jwt_token_' + Date.now());
                            
                            // Redirect to dashboard/meal page after 2 seconds
                            setTimeout(() => {
                                window.location.href = 'meal-manager.html';
                            }, 2000);
                            
                        } else {
                            // Show error notification
                            notification.innerHTML = '<i class="fas fa-exclamation-circle"></i> Invalid credentials. Please try again.';
                            notification.className = 'notification error';
                            notification.style.display = 'block';
                            
                            // Shake form
                            form.classList.add('shake');
                            setTimeout(() => {
                                form.classList.remove('shake');
                            }, 500);
                            
                            // Reset button
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login to Account';
                            
                            // Hide notification after 3 seconds
                            setTimeout(() => {
                                notification.style.display = 'none';
                            }, 3000);
                        }
                        
                        // In a real application, you would send data to your backend API
                        console.log('Login attempt:', formData);
                        
                    }, 1500); // Simulate network delay
                } else {
                    // Shake form to indicate errors
                    form.classList.add('shake');
                    setTimeout(() => {
                        form.classList.remove('shake');
                    }, 500);
                }
            });
            
            // Load remembered credentials if any
            const rememberedBorder = localStorage.getItem('rememberedBorder');
            const rememberedReg = localStorage.getItem('rememberedReg');
            
            if (rememberedBorder && rememberedReg) {
                borderNoInput.value = rememberedBorder;
                regNoInput.value = rememberedReg;
                document.getElementById('remember').checked = true;
                
                // Trigger validation to update UI
                validateField(borderNoInput, 'borderError');
                validateField(regNoInput, 'regError');
            }
            
            // Focus on first input field
            if (borderNoInput.value) {
                passwordInput.focus();
            } else {
                borderNoInput.focus();
            }
        });
