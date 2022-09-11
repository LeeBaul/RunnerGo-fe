import Login from "./Login";
import LoginBox from "./Login/login";
import RegisterBox from "./Login/register";
import FindPassword from "./RetrievePassword";
import Apis from './ApisWarper';
import IndexPage from "./IndexPage";
import Scene from "./Scene";
import Plan from './Plan';
import Report from "./Report";

import Header from './Layout/Header';
import LeftToolbar from './Layout/LeftToolbar';

const Route = [
    {
        name: 'login',
        path: '/login',
        element: () => <Login><LoginBox /></Login>,
    },
    {
        name: 'register',
        path: '/register',
        element: () => <Login><RegisterBox /></Login>
    },
    {
        name: 'find',
        path: '/find',
        element: () => <Login><FindPassword /></Login>
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
    },
    {
        name: 'scene',
        path: '/scene/*',
        element: Scene,
    },
    {
        name: 'plan',
        path: '/plan/*',
        element: Plan,
    },
    {
        name: 'report',
        path: '/report/*',
        element: Report,
    },
];

const ignorePage = ['login', 'register', 'find'];

// export const RoutePages = Route;

export const RoutePages = Route.map(item => {
    if (!ignorePage.includes(item.name)) {
        console.log(item.element);
        return {
            ...item,
            element: () => <>
                <Header />
                <div className='section-page'>
                    <LeftToolbar />
                    <div className='main-page'>
                        <item.element />
                    </div>
                </div>
            </>
        }
    } else {
        return item;
    }
})