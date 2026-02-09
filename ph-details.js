// Sample pH data
const phData = [
    { pH: 7.2, timestamp: new Date(Date.now() - 90000) },
    { pH: 7.1, timestamp: new Date(Date.now() - 80000) },
    { pH: 7.3, timestamp: new Date(Date.now() - 70000) },
    { pH: 7.0, timestamp: new Date(Date.now() - 60000) },
    { pH: 7.4, timestamp: new Date(Date.now() - 50000) },
    { pH: 6.9, timestamp: new Date(Date.now() - 40000) },
    { pH: 7.5, timestamp: new Date(Date.now() - 30000) },
    { pH: 7.2, timestamp: new Date(Date.now() - 20000) },
    { pH: 7.1, timestamp: new Date(Date.now() - 10000) },
    { pH: 2.2, timestamp: new Date() }
];

function initChart() {
    const ctx = document.getElementById('phDetailChart').getContext('2d');
    const labels = phData.map(d => new Date(d.timestamp).toLocaleTimeString());
    const values = phData.map(d => d.pH);

    new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
        label: 'pH Level',
        data: values,
        borderColor: '#005f99',
        backgroundColor: 'rgba(0,95,153,0.1)',
        fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
        tooltip: {
            callbacks: {
            label: (ctx) => `pH: ${ctx.parsed.y.toFixed(2)}`
            }
        }
        },
        scales: {
        y: {
            beginAtZero: false,
            title: { display: true, text: 'pH Value' }
        }
        }
    }
    });
}

function checkSafety() {
    const latest = phData[phData.length - 1].pH;
    const statusDiv = document.getElementById('statusMessage');
    const suggestionList = document.getElementById('suggestionList');
    suggestionList.innerHTML = "";

    if (latest >= 6.5 && latest <= 8.5) {
    statusDiv.textContent = `✅ Water is SAFE to drink (pH: ${latest.toFixed(2)})`;
    statusDiv.className = "status safe";
    suggestionList.innerHTML += "<li>Safe for drinking</li>";
    suggestionList.innerHTML += "<li>Safe for cooking and utensils</li>";
    suggestionList.innerHTML += "<li>Safe for irrigation</li>";
    } else {
    statusDiv.textContent = `⚠️ Water is NOT safe to drink (pH: ${latest.toFixed(2)})`;
    statusDiv.className = "status unsafe";
    suggestionList.innerHTML += "<li>Use for irrigation (plants can tolerate wider pH)</li>";
    suggestionList.innerHTML += "<li>Use for cleaning or washing utensils</li>";
    suggestionList.innerHTML += "<li>Industrial or non-potable applications</li>";
    }
}

initChart();
checkSafety();