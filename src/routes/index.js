import VueRouter from 'vue-router'
import Dashboard from '../components/Dashboard'
import Add from '../components/Add'
import Edit from '../components/Edit'
const routes = [
    { path: '/', component: Dashboard },
    { path: '/add', component: Add },
    { path: "/edit/:id", component: Edit }
]

const router = new VueRouter({
    routes
})

export default router;