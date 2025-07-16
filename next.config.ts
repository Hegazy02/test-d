// next.config.ts
/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' *.yourdomain.com;
  style-src 'self' 'unsafe-inline' *.yourdomain.com;
  img-src 'self' data: *.yourdomain.com;
  font-src 'self' data: *.yourdomain.com;
  connect-src 'self' *.yourdomain.com;
  frame-src 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
`;

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\n/g, ""),
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
  images: {
    // ✅ الطريقة الحديثة (Next.js 12.3+)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "darb-dashboard.vercel.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "4stoqepuhlprywzv.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      // ✅ إضافة pattern عام لـ Vercel Storage
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
    // ✅ الطريقة القديمة للتوافق (بدون https://)
    domains: [
      "darb-dashboard.vercel.app",
      "4stoqepuhlprywzv.public.blob.vercel-storage.com",
      "images.unsplash.com",
      "via.placeholder.com",
      "picsum.photos",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    legacyBrowsers: false,
  },
  transpilePackages: [],
  // إضافة webpack config لحل مشاكل التحويل
  webpack: (config, { isServer }) => {
    config.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js"],
      ".jsx": [".tsx", ".jsx"],
    };

    return config;
  },
};

module.exports = nextConfig;
