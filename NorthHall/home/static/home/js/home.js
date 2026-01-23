// Simple animation on load
        document.addEventListener('DOMContentLoaded', function() {
            // Add fade-in effect to elements
            const elements = document.querySelectorAll('.main-content, .feature-card');
            elements.forEach((element, index) => {
                element.style.opacity = '0';
                setTimeout(() => {
                    element.style.transition = 'opacity 0.8s ease-out';
                    element.style.opacity = '1';
                }, index * 100);
            });
            
            // Add hover effects to buttons
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
            
            // Optional: Add a subtle background animation
            const overlay = document.querySelector('.background-overlay');
            let hue = 0;
            
            function updateBackground() {
                hue = (hue + 0.1) % 360;
                const color1 = `hsl(${hue}, 80%, 30%)`;
                const color2 = `hsl(${(hue + 180) % 360}, 80%, 50%)`;
                document.body.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
                
                requestAnimationFrame(updateBackground);
            }
            
            // Uncomment the line below to enable animated background
            updateBackground();
        });
