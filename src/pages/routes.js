import Login from "./Login";
import LoginBox from "./Login/login";
import RegisterBox from "./Login/register";
import FindPassword from "./RetrievePassword";
import ResetPassword from "./ResetPassword";
import Apis from './ApisWarper';
import IndexPage from "./IndexPage";
import Scene from "./Scene";
import Plan from './Plan';
import Report from "./Report";
import Machine from "./Machine";
import Doc from "./Doc";
import UserHome from "./UserHome";
import EmailReport from "./EmailReport";
import InvitateExpire from "./InvitateExpire";
import ReportContrast from "./ReportContrast";
import PresetConfig from "./PresetConfig";
import Page404 from "./404";
import TestPlan from "./TestPlan";
import TestReport from "./TestReport";

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
        name: 'reset',
        path: '/reset',
        element: () => <Login><ResetPassword /></Login>
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
    {
        name: 'machine',
        path: '/machine/*',
        element: Machine,
    },
    {
        name: 'doc',
        path: '/doc/*',
        element: Doc,
    },
    {
        name: 'userhome',
        path: '/userhome/*',
        element: UserHome,
    },
    {
        name: 'emailReport',
        path: '/email/report',
        element: EmailReport,
    },
    {
        name: 'invitateExpire',
        path: '/invitateExpire',
        element: InvitateExpire
    },
    {
        name: 'reportContrast',
        path: '/reportContrast',
        element: ReportContrast
    },
    {
        name: 'preset',
        path: '/preset',
        element: PresetConfig
    },
    {
        name: '404',
        path: '/404',
        element: Page404
    },
    {
        name: 'testPlan',
        path: '/testPlan',
        element: TestPlan
    },
    {
        name: 'testReport',
        path: '/testReport',
        element: TestReport
    }
];

const ignorePage = ['login', 'register', 'find', 'userhome', 'reset', 'emailReport', 'invitateExpire', '404'];

// export const RoutePages = Route;

export const RoutePages = Route.map(item => {
    if (!ignorePage.includes(item.name)) {
        return {
            ...item,
            element: () => <>
                {/* <Header /> */}
                <div className='section-page'>
                    {/* <LeftToolbar /> */}
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