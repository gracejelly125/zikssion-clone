export interface SubMenu {
  label: string
  route: string
}

export interface SidebarMenu {
  icon?: string
  label: string
  route?: string
  children?: SubMenu[]
}

export const SIDEBAR_MENUS: SidebarMenu[] = [
  {
    label: '대시보드',
    icon: 'https://api.iconify.design/lucide:layout-dashboard.svg',
    route: '/dashboard'
  },
  {
    label: '기업 관리',
    icon: 'https://api.iconify.design/lucide:building-2.svg',
    route: '/company'
  },
  {
    label: '회원 관리',
    icon: 'https://api.iconify.design/lucide:users.svg',
    route: '/user'
  },
  {
    label: '관리자 관리',
    icon: 'https://api.iconify.design/lucide:shield-check.svg',
    route: '/admin'
  },
  {
    label: '프로젝트 관리',
    icon: 'https://api.iconify.design/lucide:messages-square.svg',
    route: '/project'
  },
  {
    label: '고객센터 관리',
    icon: 'https://api.iconify.design/lucide:messages-square.svg',
    children: [
      { label: '공지사항 관리', route: '/customer/notice' },
      { label: '1:1문의 관리', route: '/customer/faq' }
    ]
  },
  {
    label: '사이트 관리',
    icon: 'https://api.iconify.design/lucide:globe.svg',
    children: [
      { label: '배너 관리', route: '/site/banner' },
      { label: '사업자 정보 관리', route: '/site/business-info' },
      { label: '약관 관리', route: '/site/policy' }
    ]
  },
  {
    label: '알림 발송 관리',
    icon: 'https://api.iconify.design/lucide:bell-ring.svg',
    route: '/notification'
  },
  {
    label: '마이 페이지',
    icon: 'https://api.iconify.design/lucide:user-circle.svg',
    route: '/my-page'
  }
]
