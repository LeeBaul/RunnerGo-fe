// import { UserProjects } from '@indexedDB/project';
import isUndefined from 'lodash/isUndefined';
// import { Task, Await_Task } from '@indexedDB/asyn_task';
import { filter, tap } from 'rxjs/operators';
// import { User } from '@indexedDB/user';
import { onlineStatus, isLogin } from '@utils/common';
import dayjs from 'dayjs';
import { globalTask$ } from '../global';
// import { ITaskInfo } from '../types';
import { taskState } from './state';
import { executeTask } from './executeTask';

// 获取当前项目ID
export const getCurrentProjectId = async (uuid) => {
    const userData = await User.get(uuid);
    return userData?.workspace?.CURRENT_PROJECT_ID;
};

// 获取用户下项目详情
const getUserProjectInfo = async (project_id, uuid) => {
    const id = `${project_id}/${uuid}`;
    return await UserProjects.get(id);
};

// force是否强制执行，如果为true则冲突
export const runTask = async (force = -1) => {
    console.log('start run task');
    if (onlineStatus() === false) {
        console.log('1.无网不执行任务');
        return;
    }
    if (!isLogin()) {
        console.log('2.未登陆不执行');
        return;
    }
    if (taskState.taskRunSwitch === 'off') {
        console.log('3.开关关闭时，不执行任务');
        return;
    }
    taskState.taskRunSwitch = 'off';
    if (taskState.dormant_to_time !== 0 && dayjs().unix() < taskState.dormant_to_time) {
        // 休眠状态，不执行任务
        console.log(`4.休眠状态，不执行任务，休眠截止时间：${taskState.dormant_to_time}`);
        return;
    }

    const uuid = localStorage.getItem('uuid');
    if (uuid === null) {
        console.log(`5.uuid获取失败`);
        return;
    }

    const project_id = await getCurrentProjectId(uuid);
    if (project_id === undefined) {
        console.log(`6.project_id获取失败`);
        return;
    }

    const projectInfo = await getUserProjectInfo(project_id, uuid);
    if (isUndefined(projectInfo)) {
        console.log(`7.本地项目信息获取失败`);
        return;
    }

    if (projectInfo?.is_push === false) {
        resolve('8.项目未上传');
        return;
        // todo
    }

    // 当前队列里未执行的全部任务列表
    const dbTaskList = await Task.where('project_id').anyOf([project_id, 'NOT_NEED']).toArray();

    // 如果没有任务了，则处理下载接口异步任务
    if (dbTaskList.length === 0) {
        taskState.taskRunSwitch = 'on';
        console.log('9.任务队列里没有任务了');
        return;
    }

    let indexTask = null; // 取得排序最小的那个任务
    dbTaskList?.forEach((item) => {
        if (indexTask === null || item.sort < indexTask.sort) {
            indexTask = item;
        }
    });

    // 执行异步任务方法
    try {
        await executeTask(indexTask);
    } catch (ex) {
    } finally {
        console.log('15.异步任务同步已结束');
        setTimeout(() => {
            taskState.taskRunSwitch = 'on';
            console.log('16.异步任务开关已开启,继续执行一条任务');
            globalTask$.next({
                action: 'runTask',
            });
        }, taskState.throuteSeconds);
    }
};

globalTask$
    .pipe(
        filter((message) => message.action === 'runTask'),
        tap(() => {
            runTask();
        })
    )
    .subscribe();
