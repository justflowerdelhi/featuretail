/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname, // ✅ FORCE CORRECT ROOT
  },
};

module.exports = nextConfig;
module.exports = {
  images: {
    unoptimized: true, // ✅ TEMP FIX (fastest)
  },
};
