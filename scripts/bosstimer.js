let activeTimers = {}; // Store active timers to prevent duplicates
let allTimers = []; // Store all timer data for next boss calculation

function startTimer(minutes, elementId, channelId) {
    // Check if timer already exists, if yes, reset the timer
    let existingTimer = allTimers.find(timer => timer.elementId === elementId);
    
    if (existingTimer) {
        // If the timer already exists, just reset the timeRemaining and stop previous interval
        clearInterval(activeTimers[elementId]);
        existingTimer.timeRemaining = minutes * 60;
        activeTimers[elementId] = setInterval(() => updateTimer(existingTimer), 1000);
    } else {
        // If the timer is not found, add a new timer entry
        let timeRemaining = minutes * 60;
        allTimers.push({ elementId, timeRemaining, channelId });
        activeTimers[elementId] = setInterval(() => updateTimer(allTimers.find(timer => timer.elementId === elementId)), 1000);
    }

    // Update the next boss section with the latest timers
    updateNextSpawnedBoss();
}

function updateTimer(timer) {
    let { elementId, timeRemaining, channelId } = timer;
    const timerElement = document.getElementById(elementId);
    let min = Math.floor(timeRemaining / 60);
    let sec = timeRemaining % 60;
    timerElement.textContent = 
        (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;

    if (timeRemaining <= 0) {
        clearInterval(activeTimers[elementId]);
        delete activeTimers[elementId];
        // Remove expired timer from allTimers array
        allTimers = allTimers.filter(timer => timer.elementId !== elementId);
    } else {
        // Decrease time for active timers
        timer.timeRemaining--;
    }
}

function updateNextSpawnedBoss() {
    const nextBossContainer = document.getElementById("next-spawned-boss");
    nextBossContainer.innerHTML = `<h2>Next Spawned Boss</h2>`; // Reset the content

    // Sort the timers based on timeRemaining (ascending order, closest first)
    allTimers.sort((a, b) => a.timeRemaining - b.timeRemaining);

    // If there are timers, apply the highlight class to the first one (the next to spawn)
    if (allTimers.length > 0) {
        const nextTimer = allTimers[0]; // The next timer to spawn (the first in the sorted list)

        // Loop through all active timers and display them
        allTimers.forEach(timer => {
            const timerElement = document.createElement("div");
            timerElement.classList.add("timer-entry");

            const timeFormatted = formatTime(timer.timeRemaining);
            timerElement.innerHTML = `<strong>Channel ${timer.channelId}:</strong> ${timeFormatted}`;

            // Highlight the next to spawn timer
            if (timer === nextTimer) {
                timerElement.classList.add("highlight");
            }

            nextBossContainer.appendChild(timerElement);
        });
    }
}


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Create the grid squares dynamically
for (let i = 1; i <= 10; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.innerHTML = `
        <h2>Channel ${i}</h2>
        <div class="timer" id="timer${i}">00:00</div>
        <button class="btn boss-dead" onclick="startTimer(5, 'timer${i}', ${i})">Boss Dead</button>
        <button class="btn mutated-spawn" onclick="startTimer(2, 'timer${i}', ${i})">Mutated Boss Spawn</button>
        <button class="btn mutated-died" onclick="startTimer(8, 'timer${i}', ${i})">Mutated Boss Died</button>
    `;
    document.querySelector('.grid-left').appendChild(square);
}

// Update the "Next Spawned Boss" every second for real-time updates
setInterval(updateNextSpawnedBoss, 1000);
