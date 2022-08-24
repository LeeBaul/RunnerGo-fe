import { combineReducers } from 'redux';

import apisReducer from './apis';
import globalReducer from './global';
import projectsReducer from './projects';
import teamsReducer from './teams';
import userReducer from './user';
import envsReducer from './envs';
import opensReducer from './opens';
import consoleReducer from './console';
import workspaceReducer from './workspace';
import desktopProxyReducer from './desktopProxy';
import conflictReducer from './conflict';
import runnerReducer from './runner';
import plansReducer from './plan';

const reducers = combineReducers({
    apis: apisReducer,
    global: globalReducer,
    projects: projectsReducer,
    teams: teamsReducer,
    user: userReducer,
    envs: envsReducer,
    opens: opensReducer,
    workspace: workspaceReducer,
    desktopProxy: desktopProxyReducer,
    conflict: conflictReducer,
    console: consoleReducer,
    runner: runnerReducer,
    plan: plansReducer,
});

export default reducers;