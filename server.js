const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios"); // for sending requests to TV
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  const { command } = req.body;

  // Replace with your Devant TV's IP and command logic
  const TV_IP = "192.168.1.50"; // example IP
  const commandMap = {
    power: "POWER",
    vol_up: "VOLUP",
    vol_down: "VOLDOWN",
    ch_up: "CHUP",
    ch_down: "CHDOWN",
  };

  try {
    const tvCommand = commandMap[command];

    if (!tvCommand) return res.status(400).json({ error: "Invalid command" });

    // Replace with your TV's actual endpoint if known
    const response = await axios.get(`http://${TV_IP}/api/send?cmd=${tvCommand}`);
    
    res.json({ status: "ok", sent: tvCommand, tvResponse: response.data });
  } catch (error) {
    console.error("Error sending to TV:", error.message);
    res.status(500).json({ error: "Failed to send command" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
