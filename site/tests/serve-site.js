"use strict";

const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2"
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requestedPath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const absolutePath = path.resolve(root, `.${requestedPath}`);
  if (!absolutePath.startsWith(root)) {
    response.statusCode = 403;
    response.end("Forbidden");
    return;
  }
  fs.readFile(absolutePath, (error, content) => {
    if (error) {
      response.statusCode = 404;
      response.end("Not found");
      return;
    }
    const ext = path.extname(absolutePath).toLowerCase();
    response.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
    response.end(content);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Test server listening on http://127.0.0.1:${port}`);
});
