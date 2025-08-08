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
    icon: 'lucide:layout-dashboard',
    route: '/dashboard'
  },
  {
    label: '기업 관리',
    icon: 'lucide:building-2',
    route: '/company'
  },
  {
    label: '회원 관리',
    icon: 'lucide:users',
    route: '/user'
  },
  {
    label: '관리자 관리',
    icon: 'lucide:shield-check',
    route: '/admin'
  },
  {
    label: '프로젝트 관리',
    icon: 'lucide:clipboard-list',
    route: '/project'
  },
  {
    label: '고객센터 관리',
    icon: 'lucide:messages-square',
    children: [
      { label: '공지사항 관리', route: '/customer/notice' },
      { label: '1:1문의 관리', route: '/customer/faq' }
    ]
  },
  {
    label: '사이트 관리',
    icon: 'lucide:globe',
    route: '/site'
  },
  {
    label: '알림 발송 관리',
    icon: 'lucide:bell-ring',
    route: '/notification'
  },
  {
    label: '마이 페이지',
    icon: 'lucide:user-circle',
    route: '/my-page'
  }
]
