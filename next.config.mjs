/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",  // 정적 내보내기
    basePath: "/ERP",  // GitHub Repo 이름 (대소문자 주의)
    trailingSlash: true, // 정적 배포 시 라우팅 호환성 향상
    images: {
        unoptimized: true,
    },
};


export default nextConfig;

