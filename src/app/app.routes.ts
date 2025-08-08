import { Routes } from '@angular/router'
import AdminLayoutLayout from './layout/admin-layout/admin-layout.layout'

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.page')
      },
      {
        path: 'company',
        loadComponent: () => import('./pages/company/company.page')
      },
      {
        path: 'user',
        loadComponent: () => import('./pages/user/user.page')
      },
      {
        path: 'admin',
        loadComponent: () => import('./pages/admin/admin.page')
      },
      {
        path: 'project',
        loadComponent: () => import('./pages/project/project.page')
      },
      {
        path: 'customer',
        children: [
          {
            path: 'notice',
            children: [
              {
                path: '',
                loadComponent: () => import('./pages/customer/notice/customer-notice.page')
              },
              {
                path: ':id',
                loadComponent: () => import('./pages/customer/notice/customer-notice.page')
              }
            ]
          }
        ]
      },
      {
        path: 'customer/faq',
        loadComponent: () => import('./pages/customer/faq/faq.page')
      },
      {
        path: 'site',
        loadComponent: () => import('./pages/site/site.page')
      },
      {
        path: 'notification',
        loadComponent: () => import('./pages/notification/notification.page')
      },
      {
        path: 'my-page',
        loadComponent: () => import('./pages/my-page/my-page.page')
      }
    ]
  }
]
