import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'via.placeholder.com'
            },            
            {
              protocol: 'https',
              hostname: "utfs.io"
            }, {
              protocol: 'https',
              hostname: "img.clerk.com"
            },
            
            {
              protocol:"https",
              hostname:"images.unsplash.com"
            }
          ],
    }
};
 
export default withNextIntl(nextConfig);