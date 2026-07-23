/**
 * @fileoverview Minimal, dependency-free Node.js HTTP "Hello, World!" server.
 *
 * Built entirely on the Node.js built-in `http` module, this server has zero
 * third-party dependencies. A single catch-all request handler serves the
 * ordinary HTTP requests it receives (through the server's `request` event)
 * with `200 OK`, a `Content-Type: text/plain` header, and the body
 * `Hello, World!\n`. Two methods differ at the wire level and are documented on
 * the request handler below: `HEAD` (same `200`/`text/plain` response, but Node
 * sends no body) and `CONNECT` (routed by Node to the separate `connect` event,
 * which this file does not handle, so it receives no response).
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
 * Node invokes this callback for the server's ordinary `request` events. For
 * such a request the handler performs no routing and ignores the method and
 * URL: whether it is a GET, POST, OPTIONS, DELETE, or any other method reaching
 * this callback (and regardless of the path), it sets status `200`, header
 * `Content-Type: text/plain`, and passes the fixed 14-byte payload
 * `Hello, World!\n` to `res.end`.
 *
 * Two HTTP methods behave differently at the wire level; this is standard
 * Node.js behavior, not logic implemented here:
 * - `HEAD`: this callback still runs and sets the same `200`/`text/plain`
 *   headers, but Node omits the body from the response (a HEAD response must
 *   not carry a body), so the client receives zero body bytes.
 * - `CONNECT`: Node dispatches CONNECT requests to the server's separate
 *   `connect` event rather than to this `request` callback. No `connect`
 *   listener is registered, so this callback never runs for CONNECT and the
 *   client receives no response.
 *
 * @param {http.IncomingMessage} req - The inbound HTTP request object (not inspected by this handler).
 * @param {http.ServerResponse} res - The outbound HTTP response used to set the status code, header, and body.
 * @returns {void}
 */
const server = http.createServer((req, res) => {
  // Set the response status to 200 (OK).
  res.statusCode = 200;
  // Serve the body as plain text.
  res.setHeader('Content-Type', 'text/plain');
  // Pass the fixed 14-byte payload (including the trailing newline) to res.end.
  res.end('Hello, World!\n');
});

/**
 * Starts the HTTP server listening on the configured {@link port} and
 * {@link hostname}. The provided callback is invoked once the server has begun
 * listening, at which point it logs the startup URL to stdout
 * (`Server running at http://127.0.0.1:3000/`).
 *
 * @returns {void}
 */
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
