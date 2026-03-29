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
            form.addEventListener('submit', function(e) {
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
                }
                
                if (!termsCheckbox.checked) {
                    document.getElementById('termsError').style.display = 'block';
                }

                // If any validation fails, prevent submission
                if (!(isBorderValid && isRegValid && isNameValid && isRoomValid && 
                    isPasswordValid && passwordsMatch && termsCheckbox.checked)) {
                    e.preventDefault();
                    form.classList.add('shake');
                    setTimeout(() => {
                        form.classList.remove('shake');
                    }, 500);
                } else {
                    // Success, let the form submit naturally to Django
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
                }
            });
            
            // Focus on first input field
            borderNoInput.focus();
        });
