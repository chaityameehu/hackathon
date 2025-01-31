function togglePricing(period) {
    const monthlyPlans = document.querySelectorAll('.monthly-plan');
    const annualPlans = document.querySelectorAll('.annual-plan');
    
    if (period === 'monthly') {
      monthlyPlans.forEach(plan => plan.classList.remove('hidden'));
      annualPlans.forEach(plan => plan.classList.add('hidden'));
    } else {
      annualPlans.forEach(plan => plan.classList.remove('hidden'));
      monthlyPlans.forEach(plan => plan.classList.add('hidden'));
    }
  }
function logout() {
    if (confirm("Are you sure you want to log out?")) {
      
      window.location.href = "index.html";
    }
  }

  document.getElementById('update-progress-btn').addEventListener('click', function() {
    // Simulate course progress
    let currentProgress = parseInt(document.getElementById('course-progress').style.width);

    if (currentProgress < 100) {
        currentProgress += 5; // Increase by 5% each time the button is clicked
        updateProgress(currentProgress);
    }
});

let currentProgress = 0;
let currentPoints = 0; // Starting points
let currentBadges = 0; // Starting badges

// When clicking on the "Update Progress" button
document.getElementById('update-progress-btn').addEventListener('click', function() {
    if (currentProgress < 100) {
        currentProgress += 5; // Increase progress by 5% each time
        updateProgress(currentProgress);
    }
});

// When clicking on the "Update Points" button
document.getElementById('update-points-btn').addEventListener('click', function() {
    currentPoints += 100; // Increase points by 100 each time
    updatePoints(currentPoints);
});

// When clicking on the "Earn a Badge" button
document.getElementById('update-badges-btn').addEventListener('click', function() {
    currentBadges += 1; // Earn 1 badge
    updateBadges(currentBadges);
});

function updateProgress(progress) {
    // Update the course progress bar width
    const progressBar = document.getElementById('course-progress');
    progressBar.style.width = `${progress}%`;

    // Update the progress text
    document.getElementById('course-progress-text').innerText = `${progress}% Completed`;

    // Apply a smooth transition effect for the progress bar
    progressBar.style.transition = 'width 0.5s ease-out';
}

function updatePoints(points) {
    // Smoothly update the skill points display
    const skillPointsElement = document.getElementById('skill-points');

    // Create a smooth animation for the points (we'll use setInterval to increment the points gradually)
    let currentDisplayedPoints = parseInt(skillPointsElement.innerText);
    let interval = setInterval(function() {
        if (currentDisplayedPoints < points) {
            currentDisplayedPoints += 10; // Increment points by 10 each step
            skillPointsElement.innerText = currentDisplayedPoints;
        } else {
            clearInterval(interval); // Stop when points reach the desired value
        }
    }, 50); // Update every 50ms
}

function updateBadges(badges) {
    // Smoothly update the badge count
    const badgesElement = document.getElementById('badges-earned');

    // Create a smooth animation for the badges (we'll use setInterval to increment the badges gradually)
    let currentDisplayedBadges = parseInt(badgesElement.innerText);
    let interval = setInterval(function() {
        if (currentDisplayedBadges < badges) {
            currentDisplayedBadges += 1; // Increment badges by 1 each step
            badgesElement.innerText = `${currentDisplayedBadges} Badges`;
        } else {
            clearInterval(interval); // Stop when badges reach the desired value
        }
    }, 500); // Update every 500ms
}

