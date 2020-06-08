// dashboard base layout
export const layout = () => import('src/modules/Dashboard/DashboardLayout.vue')

// default page of dashboard
export const index = () => import('src/views/dashboard/DashboardIndex.vue')

// whops, not found
export const notFound = () => import('src/views/Error404.vue')
