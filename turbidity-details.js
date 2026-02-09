// Sample turbidity data
const turbidityData = [
    { turbidity: 4.5, timestamp: new Date(Date.now() - 90000) },
    { turbidity: 5.2, timestamp: new Date(Date.now() - 80000) },
    { turbidity: 6.1, timestamp: new Date(Date.now() - 70000) },
    { turbidity: 3.8, timestamp: new Date(Date.now() - 60000) },
    { turbidity: 7.0, timestamp: new Date(Date.now() - 50000) },
    { turbidity: 4.2, timestamp: new Date(Date.now() - 40000) },
    { turbidity: 5.5, timestamp: new Date(Date.now() - 30000) },
    { turbidity: 4.9, timestamp: new Date(Date.now() - 20000) },
    { turbidity: 6.3, timestamp: new Date(Date.now() - 10000) },
    { turbidity: 5.0, timestamp: new Date() }
];

function initChart() {
    const ctx = document.getElementById('turbidityDetailChart').getContext('2d');
    const labels = turbidityData.map(d => new Date(d.timestamp).toLocaleTimeString());
    const values = turbidityData.map(d => d.turbidity);

    new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
        label: 'Turbidity (NTU)',
        data: values,
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76,175,80,0.1)',
        fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
        tooltip: {
            callbacks: {
            label: (ctx) => `Turbidity: ${ctx.parsed.y.toFixed(2)} NTU`
            }
        }
        },
        scales: {
        y: {
            beginAtZero: true,
            title: { display: true, text: 'NTU' }
        }
        }
    }
    });
}

function checkSafety() {
    const latest = turbidityData[turbidityData.length - 1].turbidity;
    const statusDiv = document.getElementById('statusMessage');
    const suggestionList = document.getElementById('suggestionList');
    suggestionList.innerHTML = "";

    if (latest < 5) {
    statusDiv.textContent = `✅ Water is SAFE to drink (Turbidity: ${latest.toFixed(2)} NTU)`;
    statusDiv.className = "status safe";
    suggestionList.innerHTML += "<li>Safe for drinking</li>";
    suggestionList.innerHTML += "<li>Safe for cooking and utensils</li>";
    suggestionList.innerHTML += "<li>Safe for irrigation</li>";
    } else {
    statusDiv.textContent = `⚠️ Water is NOT safe to drink (Turbidity: ${latest.toFixed(2)} NTU)`;
    statusDiv.className = "status unsafe";
    suggestionList.innerHTML += "<li>Use for irrigation (plants tolerate higher turbidity)</li>";
    suggestionList.innerHTML += "<li>Use for cleaning or washing utensils</li>";
    suggestionList.innerHTML += "<li>Industrial or construction applications</li>";
    }
}

initChart();
checkSafety();