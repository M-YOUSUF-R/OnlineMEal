const meals = [
            {
                id: 1,
                type: "MEAL",
                change_last_time: "11:00 PM - 12:00 AM (night)",
                icon: "fa-utensils",
                iconClass: "breakfast-icon",
                defaultOn: true
            }
        ];
        
        // Initialize with current date (today only)
        let currentDate = new Date();
        
        // DOM elements
        const mealsContainer = document.getElementById('meals-container');
        const currentDateElement = document.getElementById('current-date');
        const saveBtn = document.getElementById('save-btn');
        const notification = document.getElementById('notification');
        
        // Format date to display
        function formatDate(date) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        }
        
        // Update current date display
        function updateDateDisplay() {
            currentDateElement.textContent = formatDate(currentDate);
        }
        
        // Create meal card HTML
        function createMealCard(meal) {
            const isOn = localStorage.getItem(`meal-${meal.id}-${currentDate.toDateString()}`) 
                ? localStorage.getItem(`meal-${meal.id}-${currentDate.toDateString()}`) === 'true'
                : meal.defaultOn;
            
            return `
                <div class="meal-card ${isOn ? 'active' : ''}" data-meal-id="${meal.id}">
                    <div class="meal-header">
                        <div>
                            <h3 class="meal-type">
                                <i class="fas ${meal.icon} meal-icon ${meal.iconClass}"></i>
                                ${meal.type}
                            </h3>
                            <p class="meal-time">Meal change last time: ${meal.change_last_time}</p>
                        </div>
                        <span class="meal-status ${isOn ? 'status-on' : 'status-off'}">
                            ${isOn ? 'ON' : 'OFF'}
                        </span>
                    </div>
                    <div class="toggle-container">
                        <span class="toggle-label">Turn meal ${isOn ? 'OFF' : 'ON'}</span>
                        <label class="toggle-switch">
                            <input type="checkbox" class="meal-toggle" ${isOn ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            `;
        }
        
        // Render all meal cards
        function renderMeals() {
            mealsContainer.innerHTML = '';
            meals.forEach(meal => {
                mealsContainer.innerHTML += createMealCard(meal);
            });
            
            // Add event listeners to toggles
            document.querySelectorAll('.meal-toggle').forEach(toggle => {
                toggle.addEventListener('change', function() {
                    const mealCard = this.closest('.meal-card');
                    const mealId = mealCard.dataset.mealId;
                    const isOn = this.checked;
                    
                    // Update card appearance
                    if (isOn) {
                        mealCard.classList.add('active');
                        mealCard.querySelector('.meal-status').textContent = 'ON';
                        mealCard.querySelector('.meal-status').className = 'meal-status status-on';
                        mealCard.querySelector('.toggle-label').textContent = 'Turn meal OFF';
                    } else {
                        mealCard.classList.remove('active');
                        mealCard.querySelector('.meal-status').textContent = 'OFF';
                        mealCard.querySelector('.meal-status').className = 'meal-status status-off';
                        mealCard.querySelector('.toggle-label').textContent = 'Turn meal ON';
                    }
                });
            });
        }
        
        // Save meal preferences to localStorage
        function savePreferences() {
            const preferences = {};
            
            document.querySelectorAll('.meal-card').forEach(card => {
                const mealId = card.dataset.mealId;
                const isOn = card.querySelector('.meal-toggle').checked;
                
                // Save to localStorage for today only
                localStorage.setItem(`meal-${mealId}-${currentDate.toDateString()}`, isOn);
                
                // Also add to preferences object (could be sent to server)
                preferences[mealId] = isOn;
            });
            
            // Show notification
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
            
            // In a real app, you would send preferences to server here
            console.log('Preferences saved:', preferences);
            console.log('For date:', currentDate.toDateString());
        }
        
        // Event listeners
        saveBtn.addEventListener('click', savePreferences);
        
        // Initialize the page
        updateDateDisplay();
        renderMeals();
  
  // Render meal card
  function renderMeals() {
      mealsContainer.innerHTML = '';
      meals.forEach(meal => {
          mealsContainer.innerHTML += createMealCard(meal);
      });
      
      // Add event listeners to toggles
      document.querySelectorAll('.meal-toggle').forEach(toggle => {
          toggle.addEventListener('change', function() {
              const mealCard = this.closest('.meal-card');
              const mealId = mealCard.dataset.mealId;
              const isOn = this.checked;
              
              // Update card appearance
              if (isOn) {
                  mealCard.classList.add('active');
                  mealCard.querySelector('.meal-status').textContent = 'ON';
                  mealCard.querySelector('.meal-status').className = 'meal-status status-on';
                  mealCard.querySelector('.toggle-label').textContent = 'Turn meal OFF';
              } else {
                  mealCard.classList.remove('active');
                  mealCard.querySelector('.meal-status').textContent = 'OFF';
                  mealCard.querySelector('.meal-status').className = 'meal-status status-off';
                  mealCard.querySelector('.toggle-label').textContent = 'Turn meal ON';
              }
          });
      });
  }
  
  // Save meal preferences to localStorage
  function savePreferences() {
      const preferences = {};
      
      document.querySelectorAll('.meal-card').forEach(card => {
          const mealId = card.dataset.mealId;
          const isOn = card.querySelector('.meal-toggle').checked;
          
          // Save to localStorage
          localStorage.setItem(`meal-${mealId}-${currentDate.toDateString()}`, isOn);
          
          // Also add to preferences object
          preferences[mealId] = isOn;
      });
      
      // Show notification
      notification.classList.add('show');
      setTimeout(() => {
          notification.classList.remove('show');
      }, 3000);
      
      console.log('Preferences saved:', preferences);
      console.log('For date:', currentDate.toDateString());
  }
  
  // Change date
  function changeDate(days) {
      currentDate.setDate(currentDate.getDate() + days);
      updateDateDisplay();
      renderMeals();
  }
  
  // Event listeners
  prevDayBtn.addEventListener('click', () => changeDate(-1));
  nextDayBtn.addEventListener('click', () => changeDate(1));
  saveBtn.addEventListener('click', savePreferences);
  
  // Initialize the page
  updateDateDisplay();
  renderMeals();
