import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      /* Certifications became Levels. Every old URL keeps working, including
         deep links to a lesson, so nothing indexed or shared goes dead. */
      { source: "/certifications", destination: "/levels", permanent: true },
      {
        source: "/certifications/:level",
        destination: "/levels/:level",
        permanent: true,
      },
      {
        source: "/certifications/:level/:lesson",
        destination: "/levels/:level/:lesson",
        permanent: true,
      },
      /* Certificate became the badge, and pricing became the community. */
      { source: "/certificate", destination: "/community", permanent: true },
    ];
  },
};

export default nextConfig;
