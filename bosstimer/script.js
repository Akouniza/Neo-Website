let activeTimers = {}; // Store active timers to prevent duplicates

function startTimer(minutes, elementId) {
    if (activeTimers[elementId]) clearInterval(activeTimers[elementId]); // Clear existing timer

    let timeRemaining = minutes * 60;
    const timerElement = document.getElementById(elementId);

    function updateTimer() {
        let min = Math.floor(timeRemaining / 60);
        let sec = timeRemaining % 60;
        timerElement.textContent = 
            (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;

        if (timeRemaining <= 0) {
            clearInterval(activeTimers[elementId]);
            delete activeTimers[elementId];
            alert(`${elementId} timer is over!`);
        } else {
            timeRemaining--;
        }
    }

    updateTimer(); // Call immediately
    activeTimers[elementId] = setInterval(updateTimer, 1000);
}
