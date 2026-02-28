export function showWaterAlert(pH, turbidity) {

  if (!("Notification" in window)) {
    console.log("Notifications not supported");
    return;
  }

  if (Notification.permission === "granted") {

    new Notification("⚠️ Water Alert", {
      body: `pH: ${pH} | Turbidity: ${turbidity}`,
      icon: "water.png"
    });

  }
}