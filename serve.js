#!/usr/bin/env node

/**
 * Serve static built files
 */

const http = require("http");
const path = require("path");
const express = require("express");
const staticGZIP = require("express-static-gzip");

const port = process.env.PORT || 3000;
const buildDir = path.join(__dirname, "build");
const frontendBuildIndex = path.join(buildDir, "index.html");

const app = express();

app.set("port", port);
app.enable("trust proxy");

if (process.env.NODE_ENV === "production") {
  app.use(enforceHTTPS);
}

app.use("/", staticGZIP(buildDir));
app.get("*", (req, res) => {
  res.sendFile(frontendBuildIndex);
});


const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function enforceHTTPS(req, res, next) {
  if (req.secure) {
    next();
  } else if (req.method === "GET") {
    res.redirect(301, "https://" + req.headers.host + req.originalUrl);
  } else {
    res.send(403, "Please use HTTPS when submitting data to this server.");
  }
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}
