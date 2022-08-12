import Login from "./Login";
import Apis from './ApisWarper';
import IndexPage from "./IndexPage";

export const RoutePages = [
    {
        name: 'login',
        path: '/login',
        element: Login,
    },
    {
        name: 'index',
        path: '/index',
        element: IndexPage,
    },
    {
        name: 'apis',
        path: '/apis/*',
        element: Apis,
    }
]