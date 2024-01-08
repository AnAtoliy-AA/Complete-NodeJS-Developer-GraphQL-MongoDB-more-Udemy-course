const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });

  res.end(JSON.stringify({ id: 1, text: "hi there!" }));
});

server.listen(PORT, () => {
  console.log("listening on port " + PORT + "...");
});
