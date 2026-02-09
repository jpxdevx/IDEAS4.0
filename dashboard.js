const sampleData = [
{ pH: 7.2, turbidity: 5.1, timestamp: new Date(Date.now() - 90000) },
{ pH: 7.1, turbidity: 4.8, timestamp: new Date(Date.now() - 80000) },
{ pH: 7.3, turbidity: 5.5, timestamp: new Date(Date.now() - 70000) },
{ pH: 7.0, turbidity: 4.2, timestamp: new Date(Date.now() - 60000) },
{ pH: 7.4, turbidity: 6.0, timestamp: new Date(Date.now() - 50000) },
{ pH: 6.9, turbidity: 3.9, timestamp: new Date(Date.now() - 40000) },
{ pH: 7.5, turbidity: 5.8, timestamp: new Date(Date.now() - 30000) },
{ pH: 7.2, turbidity: 4.5, timestamp: new Date(Date.now() - 20000) },
{ pH: 7.1, turbidity: 5.2, timestamp: new Date(Date.now() - 10000) },
{ pH: 7.3, turbidity: 4.9, timestamp: new Date() }
];

let phChart, turbidityChart, pieChart;

function initCharts() {
const ctxPh = document.getElementById('phChart').getContext('2d');
phChart = new Chart(ctxPh, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'pH Level', data: [], borderColor: '#005f99', backgroundColor: 'rgba(0,95,153,0.1)', fill: true }] },
    options: { responsive: true, plugins: { tooltip: { callbacks: { label: (ctx) => `pH: ${ctx.parsed.y.toFixed(2)} (Safe: 6.5-8.5)` } } }, scales: { y: { beginAtZero: false, title: { display: true, text: 'pH Value' } } } }
});

const ctxTurbidity = document.getElementById('turbidityChart').getContext('2d');
turbidityChart = new Chart(ctxTurbidity, {
    type: 'bar',
    data: { labels: [], datasets: [{ label: 'Turbidity (NTU)', data: [], backgroundColor: '#4caf50' }] },
    options: { responsive: true, plugins: { tooltip: { callbacks: { label: (ctx) => `Cloudiness: ${ctx.parsed.y.toFixed(2)} NTU (Lower is better)` } } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'NTU' } } } }
});

const ctxPie = document.getElementById('pieChart').getContext('2d');
pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: { labels: ['pH Level', 'Turbidity (NTU)'], datasets: [{ data: [], backgroundColor: ['#005f99', '#4caf50'] }] },
    options: { responsive: true, plugins: { tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed.toFixed(2)}` } } } }
});
}

function loadData() {
if (sampleData.length > 0) {
    // Sort by timestamp (latest first)
    const data = sampleData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const latest = data[data.length - 1];

    // Update current readings
    document.getElementById('current-pH').textContent = latest.pH.toFixed(2);
    document.getElementById('current-turbidity').textContent = latest.turbidity.toFixed(2) + " NTU";

    // Prepare chart data
    const labels = data.map(d => new Date(d.timestamp).toLocaleTimeString());
    const phData = data.map(d => d.pH);
    const turbidityData = data.map(d => d.turbidity);

    // Update charts
    phChart.data.labels = labels;
    phChart.data.datasets[0].data = phData;
    phChart.update();

    turbidityChart.data.labels = labels;
    turbidityChart.data.datasets[0].data = turbidityData;
    turbidityChart.update();

    pieChart.data.datasets[0].data = [latest.pH, latest.turbidity];
    pieChart.update();
}
}

initCharts();
loadData();