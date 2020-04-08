import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import AddPatient from './views/AddPatient'
import EditPatient from './views/EditPatient'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes:[{
        name: 'home',
        path: '/',
        component: Home,
    },{
        name: 'addPatient',
        path:'/addPatient',
        component: AddPatient
    },{
        name: 'editPatient',
        path:'/editPatient',
        component: EditPatient 
    },
    {
        path:'*',
        redirect: '/'
    }]
})