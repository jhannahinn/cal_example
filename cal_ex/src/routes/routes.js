import {createWebHistory, createRouter} from 'vue-router'
// import MainPage from "@/views/MainPage.vue"
import HomeCalender from "@/views/HomeCalender.vue"


var routes = [
  {
    path : '/',
    redirect : '/mainPage/homecalender'
  },
  {
    path : '/mainPage',
    component : MainPage,
    children : [
      {
        path : 'homecalender/:year?/:month?',
        component : HomeCalender
      }
    ]
  }
];


const history = createWebHistory();


const router = createRouter({
  history,
  routes
});

export default router;
