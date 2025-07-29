/** @type {import('next').NextConfig} */
const cspHeader = `
  upgrade-insecure-requests;
`;

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false, // Désactive les source maps en production
  async headers() {
    return [
      {
        source: "/(.*)", // Applique les headers à toutes les routes
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload", // HSTS avec includeSubDomains et preload
          },
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(self), camera=(), microphone=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
