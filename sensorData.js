// To be replace with real time readings keeping the objects same
// Device: ESP32, Turbidity sens, php sens

const sensorReadings = [
{ pH: 7.2, turbidity: 5.1, timestamp: new Date(Date.now() - 90000) },
{ pH: 7.1, turbidity: 4.8, timestamp: new Date(Date.now() - 80000) },
{ pH: 7.3, turbidity: 5.5, timestamp: new Date(Date.now() - 70000) },
{ pH: 7.0, turbidity: 4.2, timestamp: new Date(Date.now() - 60000) },
{ pH: 7.4, turbidity: 6.0, timestamp: new Date(Date.now() - 50000) },
{ pH: 6.9, turbidity: 3.9, timestamp: new Date(Date.now() - 40000) },
{ pH: 7.5, turbidity: 5.8, timestamp: new Date(Date.now() - 30000) },
{ pH: 7.2, turbidity: 4.5, timestamp: new Date(Date.now() - 20000) },
{ pH: 7.1, turbidity: 5.2, timestamp: new Date(Date.now() - 10000) },
{ pH: 7.3, turbidity: 4.9, timestamp: new Date()},
{ pH: 7.3, turbidity: 5.5, timestamp: new Date(Date.now())},
{ pH: 7.0, turbidity: 4.2, timestamp: new Date(Date.now())},
{ pH: 7.4, turbidity: 6.0, timestamp: new Date(Date.now())},
{ pH: 6.9, turbidity: 3.9, timestamp: new Date(Date.now())},
{ pH: 7.5, turbidity: 5.8, timestamp: new Date(Date.now())},
{ pH: 7.3, turbidity: 5.5, timestamp: new Date(Date.now())},
{ pH: 7.0, turbidity: 4.2, timestamp: new Date(Date.now())},
{ pH: 7.4, turbidity: 6.0, timestamp: new Date(Date.now())},
{ pH: 6.9, turbidity: 3.9, timestamp: new Date(Date.now())},
{ pH: 7.5, turbidity: 5.8, timestamp: new Date(Date.now())},
];

// Safety judgement fn
function evaluateWaterSafety(latest) 
{
    const safePH = latest.pH >= 6.5 && latest.pH <= 8.5;
    const safeTurbidity = latest.turbidity < 5;

    if (safePH && safeTurbidity) 
        return { safe: true, message: "✅ Water is SAFE to drink" };
    
    else
        return { safe: false, message: "⚠️ Water is NOT safe to drink" };
}

export { evaluateWaterSafety, sensorReadings };