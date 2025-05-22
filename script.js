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

function sendCommand(command) {
  const tvIp = document.getElementById("tv-ip").value.trim();

  if (!tvIp) {
    alert("Please enter or select a TV IP address.");
    return;
  }

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

// 🔍 Simulated network scan (local use only)
function scanNetwork() {
  const baseIp = "192.168.1.";
  const list = document.getElementById("tv-list");
  list.innerHTML = "Scanning...";

  let found = [];

  for (let i = 2; i < 255; i++) {
    const ip = baseIp + i;
    fetch(`http://${ip}/api/ping`, { mode: "no-cors" })
      .then(() => {
        found.push(ip);
        list.innerHTML += `<li><a href="#" onclick="selectTV('${ip}')">${ip}</a></li>`;
      })
      .catch(() => {
        // Ignore unreachable IPs
        if (i === 254 && found.length === 0) {
          list.innerHTML = "<li>No TVs found</li>";
        }
      });
  }
}

function selectTV(ip) {
  document.getElementById("tv-ip").value = ip;
}

