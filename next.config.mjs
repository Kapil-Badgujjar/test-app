/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: "/api/:path*", // Matches all API routes
            headers: [
              { key: "Access-Control-Allow-Origin", value: ["https://checkout.stripe.com","https://test-app-kapil-badgujjar.vercel.app"] },
              { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
              { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
            ],
          },
        ];
      },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**"
            }
        ]
    },
};

export default nextConfig;
