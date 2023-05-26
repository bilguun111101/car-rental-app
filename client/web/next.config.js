/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false, // THIS IS THE FLAG THAT MATTERS
  },
  images: {
    domains: [
      'datawow.s3.amazonaws.com',
      'links.papareact.com',
      'www.pngmart.com',
      'e7.pngegg.com',
      'cdn-icons-png.flaticon.com',
      'firebasestorage.googleapis.com',
      'res.cloudinary.com',
      'images.unsplash.com',
      'toyota-topmotors.mn',
      'i.pinimg.com',
    ],
  },
};

// for disabling DUPLICATE ATOM KEY warning on terminal console....
const intercept = require('intercept-stdout');

// safely ignore recoil stdout warning messages
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return '';
  }
  return text;
}

// Intercept in dev and prod
intercept(interceptStdout);

module.exports = nextConfig;
