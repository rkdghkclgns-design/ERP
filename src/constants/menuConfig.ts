export const MENU_ITEMS = [
    {
        id: 'dashboard',
        label: '경영 현황판',
        path: '/', // basePath 적용됨
        icon: 'LayoutDashboard',
        help: {
            title: '경영 현황판 가이드',
            description: '로컬 DB에 저장된 데이터를 한눈에 봅니다.',
            actionGuide: '데이터가 안 보이면 "새로고침"을 하세요.',
            example: '명령어: "오늘 예약 현황 요약해줘"'
        }
    },
    {
        id: 'reservation',
        label: '예약/재고 관리',
        path: '/reservation',
        icon: 'Calendar',
        help: {
            title: '통합 재고 예약',
            description: '플레이존과 캔버스존의 자원을 공유하여 관리합니다.',
            actionGuide: '패키지 예약 시 두 구역의 재고가 동시 차감됩니다.',
            example: '상황: 14시 패키지 예약 시 -> 14시 단품도 매진됨.'
        }
    },
    {
        id: 'admin',
        label: '관리 및 백업',
        path: '/admin',
        icon: 'Settings',
        help: {
            title: '데이터 백업/복구',
            description: '브라우저에 저장된 데이터를 파일로 내보내거나 불러옵니다.',
            actionGuide: '브라우저 캐시 삭제 전 반드시 백업하세요.',
            example: '백업 파일을 다운로드하여 안전한 곳에 보관하세요.'
        }
    }
];
