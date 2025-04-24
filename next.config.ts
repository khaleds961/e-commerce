import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "**",
                protocol: "https",
            },
            {
                hostname: '**',
                protocol: 'http'
            },
        ]
    }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
