import isFunction from 'lodash/isFunction';
import dayjs from 'dayjs';
// import { Task, Await_Task } from '@indexedDB/asyn_task';
import { isError } from 'lodash';
import SYNCTASK from '../tasks';
// import { ITaskInfo } from '../types';
import { taskState } from './state';

// 执行task同步
export const executeTask = async (indexTask) => {
    // 调用同步接口
    const syncFunc = SYNCTASK?.[indexTask.model]?.[indexTask.action];
    if (isFunction(syncFunc) === false) {
        taskState.taskRunSwitch = 'on';
        console.log('11.任务处理方法未定义');
        return;
    }

    try {
        console.log('excute task', indexTask);
        await syncFunc(indexTask);
        taskState.dormant_try_counter = 0;
        taskState.dormant_to_time = 0;
        console.log('12.异步任务同步成功');
        await Task.delete(indexTask.id);
    } catch (err) {
        indexTask.hangup += 1;
        taskState.dormant_try_counter += 1;
        if (taskState.dormant_try_counter > taskState.dormant_try_limit) {
            taskState.dormant_to_time = dayjs().unix() + taskState.dormant_long_second;
        }
        console.log('13.异步任务接口调用失败');
        if ((isError(err) && err.message === 'delete_task') || err === 'delete_task') {
            // 删除任务
            await Task.delete(indexTask.id);
            console.log('14.异步任务执行失败并且已删除');
        }
        // 如果任务失败次数超过n次，放到失败任务队列中
        else if (indexTask.hangup >= taskState.a_tark_try_limit) {
            console.log(
                `15.超过最大失败次数，已失败次数：${indexTask.hangup}，最大失败次数：${taskState.a_tark_try_limit}`
            );
            await Await_Task.put({ ...indexTask, hangup: 0 }, indexTask.id);
            await Task.delete(indexTask.id);
            taskState.taskRunSwitch = 'on';
        } else {
            // 修改任务执行次数
            console.log(`当前任务已失败次数：${indexTask.hangup}`);
            await Task.update(indexTask.id, {
                hangup: indexTask.hangup,
            });
        }
    }
};
