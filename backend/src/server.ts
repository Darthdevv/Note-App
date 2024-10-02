const express = require('express');
const app = express();
const port = 5000;

app.get("/", (req: any, res: any) => {
  res.send("Welcome to the Node.js Express Server!");
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
