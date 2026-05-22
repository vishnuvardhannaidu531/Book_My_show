import http from "node:http";

const PORT = Number(process.env.PROXY_PORT || 8081);
const BACKEND_ORIGIN = process.env.BACKEND_ORIGIN || "https://movieverse-a5qk.onrender.com";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Requested-With",
};

const isProxyPath = (pathname) => pathname.startsWith("/api") || pathname.startsWith("/auth");

const readBody = (request) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });

const getForwardHeaders = (headers) => {
  const blockedHeaders = new Set(["host", "origin", "referer", "connection", "content-length"]);

  return Object.fromEntries(
    Object.entries(headers).filter(([key]) => !blockedHeaders.has(key.toLowerCase())),
  );
};

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    ...corsHeaders,
    "Content-Type": "application/json",
  });
  response.end(JSON.stringify(payload));
};

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "OPTIONS") {
    response.writeHead(204, corsHeaders);
    response.end();
    return;
  }

  if (!isProxyPath(requestUrl.pathname)) {
    sendJson(response, 404, {
      message: "Proxy only forwards /api and /auth requests.",
    });
    return;
  }

  try {
    const targetUrl = new URL(`${requestUrl.pathname}${requestUrl.search}`, BACKEND_ORIGIN);
    const body = ["GET", "HEAD"].includes(request.method) ? undefined : await readBody(request);

    const backendResponse = await fetch(targetUrl, {
      method: request.method,
      headers: getForwardHeaders(request.headers),
      body,
    });

    const responseBody = Buffer.from(await backendResponse.arrayBuffer());
    const contentType = backendResponse.headers.get("content-type") || "application/json";

    response.writeHead(backendResponse.status, {
      ...corsHeaders,
      "Content-Type": contentType,
    });
    response.end(responseBody);
  } catch (error) {
    sendJson(response, 502, {
      message: "Proxy failed to reach backend.",
      detail: error.message,
    });
  }
});

server.listen(PORT, () => {
  console.log(`MovieVerse proxy running on http://127.0.0.1:${PORT}`);
  console.log(`Forwarding /api and /auth to ${BACKEND_ORIGIN}`);
});
