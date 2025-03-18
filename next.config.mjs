import MillionLint from "@million/lint";

/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "s4.anilist.co",
            },
        ],
    },
};

export default MillionLint.next({ rsc: true })(nextConfig);
