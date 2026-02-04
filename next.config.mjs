/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",  // 정적 내보내기
    basePath: "/ERP",  // GitHub Repo 이름
    images: {
        unoptimized: true,
    },
};

export default nextConfig;

