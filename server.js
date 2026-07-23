/**
 * @fileoverview Minimal, dependency-free Node.js HTTP "Hello, World!" server.
 *
 * Built entirely on the Node.js built-in `http` module, this server has zero
 * third-party dependencies. A single catch-all request handler responds to
 * every incoming request — regardless of HTTP method or URL path — with
 * `200 OK`, a `Content-Type: text/plain` header, and the body `Hello, World!\n`.
 * The server binds to the loopback interface `127.0.0.1:3000`, so it is
 * reachable only from the local machine.
 *
 * This module exports nothing (it is not intended to be `require`-d as a
 * library); simply evaluating the file creates and starts the HTTP server as a
 * side effect.
 *
 * @module server
 */
const http = require('http');

/**
 * Loopback (localhost) IPv4 address the HTTP server binds to. Because this is
 * the loopback interface, the server is reachable only from the local machine;
 * change to '0.0.0.0' (or a specific interface) to accept external connections.
 * @constant {string}
 */
const hostname = '127.0.0.1';
/**
 * TCP port the HTTP server listens on.
 * @constant {number}
 */
const port = 3000;

/**
 * Catch-all HTTP request handler.
 *
 * Handles every incoming HTTP request identically: it performs no routing and
 * ignores the request method and URL. Whether the request is a GET, POST,
 * DELETE, or any other method — and regardless of the path — the response is
 * always status `200`, header `Content-Type: text/plain`, and the fixed body
 * `Hello, World!\n`.
 *
 * @param {http.IncomingMessage} req - The inbound HTTP request object (not inspected by this handler).
 * @param {http.ServerResponse} res - The outbound HTTP response used to set the status code, header, and body.
 * @returns {void}
 */
const server = http.createServer((req, res) => {
  // Respond with HTTP 200 (OK) to every request.
  res.statusCode = 200;
  // Serve the body as plain text.
  res.setHeader('Content-Type', 'text/plain');
  // Fixed 14-byte response body, including the trailing newline.
  res.end('Hello, World!\n');
});

/**
 * Starts the HTTP server listening on the configured {@link port} and
 * {@link hostname}. The provided callback is invoked once the server has begun
 * listening, at which point it logs the startup URL to stdout
 * (`Server running at http://127.0.0.1:3000/`).
 *
 * @returns {void}
 * @listens Server#listening
 */
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
