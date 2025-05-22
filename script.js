function sendCommand(command) {
  const tvIp = document.getElementById("tv-ip").value;

  // This assumes the TV accepts HTTP GET commands (example only)
  fetch(`http://${tvIp}/api/send?cmd=${command}`)
    .then((res) => res.text())
    .then((data) => {
      console.log("Sent:", command, "| Response:", data);
      alert(`Command "${command}" sent to ${tvIp}`);
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Failed to reach the TV. Check the IP or connection.");
    });
}
