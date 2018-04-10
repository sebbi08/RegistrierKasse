import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import PriceList from '../components/PriceList'
import CashRegister from '../components/CashRegister'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'landing-page',
            component: Home
        },

        {
            path: '/PriceList/:id',
            name: 'edit-price-list',
            component: PriceList
        },
        {
            path: '/PriceList',
            name: 'new-price-list',
            component: PriceList
        },
        {
            path: '/CashRegister/:id',
            name: 'cash-register',
            component: CashRegister
        }
    ]
})
