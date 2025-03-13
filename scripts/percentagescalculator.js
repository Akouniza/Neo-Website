function calculateCriticalRate() {
    let points = parseFloat(document.getElementById("pointsCrit").value);
    if (isNaN(points) || points < 0) {
        alert("Please enter a valid number for Critical Rate.");
        return;
    }

    let criticalRate = (97.04427 * points) / (2368.384 + points);
    document.getElementById("critRateResult").innerHTML = `<p>Critical Rate: ${criticalRate.toFixed(2)}%</p>`;
}

function calculateCriticalDamage() {
    let points = parseFloat(document.getElementById("pointsDamage").value);
    if (isNaN(points) || points < 0) {
        alert("Please enter a valid number for Critical Damage.");
        return;
    }

    let criticalDamage = (290.8 * points) / (2102.36 + points) + 125;
    document.getElementById("critDamageResult").innerHTML = `<p>Critical Damage: ${criticalDamage.toFixed(2)}%</p>`;
}

function calculateAccuracy() {
    let points = parseFloat(document.getElementById("pointsAccuracy").value);
    if (isNaN(points) || points < 0) {
        alert("Please enter a valid number for Accuracy.");
        return;
    }

    let accuracy = (96.16 * points) / (820.5 + points) + 85;
    document.getElementById("AccuracyResult").innerHTML = `<p>Accuracy: ${accuracy.toFixed(2)}%</p>`;
}

function calculateDebuffResistance() {
    let points = parseFloat(document.getElementById("pointsDebuffResistance").value);
    if (isNaN(points) || points < 0) {
        alert("Please enter a valid number for Debuff Resistance.");
        return;
    }

    let debuffResistance = (100.0794 * points) / (366.3908 + points);
    document.getElementById("DebuffResistanceResult").innerHTML = `<p>Debuff Resistance: ${debuffResistance.toFixed(2)}%</p>`;
}
