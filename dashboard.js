import { evaluateWaterSafety, sensorReadings } from "./sensorData.js";

let phChart, turbidityChart, pieChart;

function initCharts() 
{
    // pH readings - Line Graph
    const ctxPh = document.getElementById('phChart').getContext('2d');
    phChart = new Chart(ctxPh, 
        {
            type: 'line',
            data: { labels: [], datasets: [{ label: 'pH Level', data: [], borderColor: '#005f99', backgroundColor: 'rgba(0,95,153,0.1)', fill: true }] },
            options: { responsive: true, plugins: { tooltip: { callbacks: { label: (ctx) => `pH: ${ctx.parsed.y.toFixed(2)} (Safe: 6.5-8.5)` } } }, scales: { y: { beginAtZero: false, title: { display: true, text: 'pH Value' } } } }
    });

    // Turbidity readings - Bar Graph
    const ctxTurbidity = document.getElementById('turbidityChart').getContext('2d');
    turbidityChart = new Chart(ctxTurbidity, 
        {
            type: 'bar',
            data: { labels: [], datasets: [{ label: 'Turbidity (NTU)', data: [], backgroundColor: '#4caf50' }] },
            options: { responsive: true, plugins: { tooltip: { callbacks: { label: (ctx) => `Cloudiness: ${ctx.parsed.y.toFixed(2)} NTU (Lower is better)` } } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'NTU' } } } }
    });

    // pH vs Trubidity - Pie Chart
    const ctxPie = document.getElementById('pieChart').getContext('2d');
    pieChart = new Chart(ctxPie, 
        {
            type: 'pie',
            data: { labels: ['pH Level', 'Turbidity (NTU)'], datasets: [{ data: [], backgroundColor: ['#005f99', '#4caf50'] }] },
            options: { responsive: true, plugins: { tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed.toFixed(2)}` } } } }
    });
}

let currentInd = 0;

function loadData() 
{
    if (sensorReadings.length > 0 && currentInd < sensorReadings.length) 
    {
        // Sort by timestamp (latest first)
        const data = sensorReadings.slice(0, currentInd + 1).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        const recentData = data.slice(-10);
        const latest = recentData[recentData.length - 1];

        // Update current readings
        document.getElementById('current-pH').textContent = latest.pH.toFixed(2);
        document.getElementById('current-turbidity').textContent = latest.turbidity.toFixed(2) + " NTU";

        // Prepare chart data
        const labels = recentData.map(d => new Date(d.timestamp).toLocaleTimeString());
        const phData = recentData.map(d => d.pH);
        const turbidityData = recentData.map(d => d.turbidity);

        // Update charts
        phChart.data.labels = labels;
        phChart.data.datasets[0].data = phData;
        phChart.update();

        turbidityChart.data.labels = labels;
        turbidityChart.data.datasets[0].data = turbidityData;
        turbidityChart.update();

        pieChart.data.datasets[0].data = [latest.pH, latest.turbidity];
        pieChart.update();

        currentInd++;
    }
}

function checkSafety() 
{
    const latest = sensorReadings[sensorReadings.length - 1];
    const statusDiv = document.getElementById('statusMessage');

    const safety = evaluateWaterSafety(latest)

    statusDiv.textContent = safety.message;
    statusDiv.className = safety.safe ? "status safe" : "status unsafe";
}

checkSafety();
initCharts();
loadData();
setInterval(loadData, 10000);