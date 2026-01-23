document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('registrationForm');
            const submitBtn = document.getElementById('submitBtn');
            const notification = document.getElementById('notification');
            
            // Form validation
            function validateField(field, errorId, validationFn) {
                const value = field.value.trim();
                const errorElement = document.getElementById(errorId);
                
                if (!validationFn(value)) {
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
            
            // Validation functions
            function validateNotEmpty(value) {
                return value.length > 0;
            }
            
            function validatePassword(value) {
                return value.length >= 4 && value.length <= 8;
            }
            
            function validatePasswordMatch(password, confirmPassword) {
                return password === confirmPassword;
            }
            
            // Real-time validation
            const borderNoInput = document.getElementById('border_no');
            const regNoInput = document.getElementById('reg_no');
            const fullNameInput = document.getElementById('full_name');
            const roomNoInput = document.getElementById('room_no');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirm_password');
            const termsCheckbox = document.getElementById('terms');
            
            // Add input event listeners for real-time validation
            borderNoInput.addEventListener('input', () => {
                validateField(borderNoInput, 'borderError', validateNotEmpty);
            });
            
            regNoInput.addEventListener('input', () => {
                validateField(regNoInput, 'regError', validateNotEmpty);
            });
            
            fullNameInput.addEventListener('input', () => {
                validateField(fullNameInput, 'nameError', validateNotEmpty);
            });
            
            roomNoInput.addEventListener('input', () => {
                validateField(roomNoInput, 'roomError', validateNotEmpty);
            });
            
            passwordInput.addEventListener('input', () => {
                validateField(passwordInput, 'passwordError', validatePassword);
                // Also validate confirm password when password changes
                if (confirmPasswordInput.value.trim()) {
                    const passwordsMatch = validatePasswordMatch(passwordInput.value, confirmPasswordInput.value);
                    confirmPasswordInput.classList.toggle('error', !passwordsMatch);
                    confirmPasswordInput.classList.toggle('success', passwordsMatch);
                    document.getElementById('confirmError').style.display = passwordsMatch ? 'none' : 'block';
                }
            });
            
            confirmPasswordInput.addEventListener('input', () => {
                const passwordsMatch = validatePasswordMatch(passwordInput.value, confirmPasswordInput.value);
                confirmPasswordInput.classList.toggle('error', !passwordsMatch);
                confirmPasswordInput.classList.toggle('success', passwordsMatch);
                document.getElementById('confirmError').style.display = passwordsMatch ? 'none' : 'block';
            });
            
            // Form submission
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                // Validate all fields
                const isBorderValid = validateField(borderNoInput, 'borderError', validateNotEmpty);
                const isRegValid = validateField(regNoInput, 'regError', validateNotEmpty);
                const isNameValid = validateField(fullNameInput, 'nameError', validateNotEmpty);
                const isRoomValid = validateField(roomNoInput, 'roomError', validateNotEmpty);
                const isPasswordValid = validateField(passwordInput, 'passwordError', validatePassword);
                const passwordsMatch = validatePasswordMatch(passwordInput.value, confirmPasswordInput.value);
                
                if (!passwordsMatch) {
                    confirmPasswordInput.classList.add('error');
                    confirmPasswordInput.classList.remove('success');
                    document.getElementById('confirmError').style.display = 'block';
                } else {
                    confirmPasswordInput.classList.remove('error');
                    confirmPasswordInput.classList.add('success');
                    document.getElementById('confirmError').style.display = 'none';
                }
                
                // Validate terms
                const termsError = document.getElementById('termsError');
                if (!termsCheckbox.checked) {
                    termsError.style.display = 'block';
                    termsCheckbox.parentElement.classList.add('shake');
                    setTimeout(() => {
                        termsCheckbox.parentElement.classList.remove('shake');
                    }, 500);
                } else {
                    termsError.style.display = 'none';
                }
                
                // If all validations pass
                if (isBorderValid && isRegValid && isNameValid && isRoomValid && 
                    isPasswordValid && passwordsMatch && termsCheckbox.checked) {
                    
                    // Disable submit button and show loading
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
                    
                    // Prepare form data
                    const formData = {
                        border_no: borderNoInput.value.trim(),
                        reg_no: regNoInput.value.trim(),
                        password: passwordInput.value,
                        full_name: fullNameInput.value.trim(),
                        room_no: roomNoInput.value.trim(),
                        phone: document.getElementById('phone').value.trim() || ''
                    };
                    
                    // Simulate API call (replace with actual API call)
                    setTimeout(() => {
                        // Show success notification
                        notification.innerHTML = '<i class="fas fa-check-circle"></i> Account created successfully!';
                        notification.className = 'notification';
                        notification.style.display = 'block';
                        
                        // Reset button
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
                        
                        // Hide notification after 3 seconds and redirect
                        setTimeout(() => {
                            notification.style.display = 'none';
                            // Redirect to login page after successful registration
                            window.location.href = 'login.html?registered=true';
                        }, 3000);
                        
                        // In a real application, you would send data to your backend API
                        console.log('Registration data:', formData);
                        
                    }, 1500); // Simulate network delay
                } else {
                    // Shake form to indicate errors
                    form.classList.add('shake');
                    setTimeout(() => {
                        form.classList.remove('shake');
                    }, 500);
                }
            });
            
            // Focus on first input field
            borderNoInput.focus();
        });
