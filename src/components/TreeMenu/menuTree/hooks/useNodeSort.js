import { useSelector, useDispatch } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
// import { Collection } from '@indexedDB/project';
import { of } from 'rxjs';
import { tap, filter, map, switchMap } from 'rxjs/operators';
import isArray from 'lodash/isArray';
import { pushTask } from '@asyncTasks/index';
import Bus from '@utils/eventBus';

const useNodeSort = (props) => {
    const { treeData, type } = props;

    console.log(treeData);

    const dispatch = useDispatch();
    const sceneDatas = useSelector((store) => store.scene.sceneDatas);
    const apiDatas = useSelector((store) => store?.apis?.apiDatas);
    const data = type === 'apis' ? apiDatas : sceneDatas;
    const project_id = useSelector((store) => store?.workspace?.CURRENT_PROJECT_ID);

    const flattenNodes = [];
    treeData && Object.entries(treeData).forEach(([target_id, value]) => {
        flattenNodes.push({
            ...value,
            target_id,
        });
    });

    // 获取全部父级id列表
    const getParentKeys = (nodeItem) => {
        const results = [];
        const digAll = (node) => {
            // console.log(node);
            const parent = treeData[node.parent_id];
            if (typeof parent !== 'undefined') {
                digAll(parent);
            }
            results.push(node.target_id);
        };
        digAll(nodeItem);
        return results;
    };

    // 获取子节点列表
    const getChildList = (parent_id) => {
        return Object.values(treeData)
            .filter((d) => d?.parent_id === parent_id)
            .sort((a, b) => a.sort - b.sort);
    };

    const handleNodeDragEnd = (
        sourceKey,
        targetKey,
        mode
    ) => {
        console.log(treeData, sourceKey, targetKey, mode);
        const sourceData = treeData[sourceKey];
        // const sourceData = treeData.filter(item => item.target_id === sourceKey)[0];
        const targetData = treeData[targetKey];
        // const targetData = treeData.filter(item => item.target_id === targetKey)[0];

        console.log(targetData);
        let parent_id = '-1';

        let targetList = getChildList(targetData?.parent_id);

        // 禁止父节点拖动到子节点
        const targetParentKeys = getParentKeys(targetData);
        console.log(targetParentKeys, sourceKey, targetKey);
        if (targetParentKeys.includes(sourceKey) || sourceKey === targetKey) {
            return;
        }
        console.log(1);
        // 不是目录禁止拖进去
        if (mode === 'inside' && (targetData?.target_type !== 'folder' && targetData.target_type !== 'group')) {
            return;
        }
        console.log(2);

        // 插到上面还是插到下面
        if (mode === 'top' || mode === 'bottom') {
            targetList = targetList.filter((item) => item.target_id !== sourceKey);
            sourceData.parent_id = targetData.parent_id;
            parent_id = targetData.parent_id;

            // 被拖进目标序号
            let sortIndex = 0;
            targetList.forEach((item, index) => {
                if (item.target_id === targetKey) {
                    sortIndex = index;
                }
            });
            if (mode === 'top') {
                targetList.splice(sortIndex, 0, sourceData);
            } else if (mode === 'bottom') {
                targetList.splice(sortIndex + 1, 0, sourceData);
            }
        } else if (mode === 'inside') {
            // 插到里面
            parent_id = targetKey;
            let tlist = getChildList(targetKey);
            tlist = tlist.filter((item) => item.target_id !== sourceKey);
            const tData = { ...sourceData, parent_id: parseInt(targetKey) };
            tlist.splice(0, 0, tData);
            targetList = tlist;
        }

        // 重新生成sort
        targetList = targetList.map((targetInfo, index) => ({
            ...targetInfo,
            sort: index,
        }));

        const result = {
            task_id: `${project_id}/${parent_id}`,
            parent_id,
            project_id,
            sort_target: sourceKey,
            target_info: targetList.map(({ parent_id, sort, target_id }) => ({
                parent_id,
                sort,
                target_id,
            })),
        };

        of('')
            .pipe(
                tap(() => {
                    console.log(123123123123);
                    // 更新redux
                    const newDatas = cloneDeep(data);
                    if (type === 'apis') {

                        console.log('targetList', targetList);
                        targetList.forEach((item) => {
                            newDatas[item.target_id] = {
                                ...newDatas[item.target_id],
                                sort: item.sort,
                                parent_id,
                            };

                            Bus.$emit('updateOpensById', {
                                id: item.target_id,
                                data: { sort: item.sort, parent_id },
                            });
                        });
                        dispatch({
                            type: 'apis/updateApiDatas',
                            payload: { ...newDatas },
                        });
                    } else {
                        // dispatch({
                        //     type: 'apis/updateSceneDatas',
                        //     payload: { ...newDatas },
                        // });
                    }

                }),
                switchMap(() => {
                    console.log(456456456);
                    const ids = [];
                    for (let i = 0; i < targetList.length; i++) {
                        ids.push(targetList[i].target_id);
                    }

                    if (type === 'apis') {
                        Bus.$emit('dragUpdateTarget', {
                            ids,
                            targetList
                        })
                    } else {
                        console.log(789789789);
                        Bus.$emit('dragUpdateScene', {
                            ids,
                            targetList
                        })
                    }
                })
                // switchMap(() => {
                //     targetList.forEach(item => {
                //         Bus.$emit('saveTargetById', {
                //             id: item.target_id
                //         })
                //     })
                // })
                // switchMap(() => Collection.bulkGet(targetList.map((item) => item.target_id))),
                // filter((dataList) => isArray(dataList)),
                // map((data) => {
                //     console.log(data);
                //     const targetDatas = {};
                //     targetList.forEach((item) => {
                //         targetDatas[item.target_id] = item;
                //     });
                //     return data.map((item) => ({
                //         ...item,
                //         parent_id: targetDatas[item.target_id].parent_id,
                //         sort: targetDatas[item.target_id].sort,
                //     }));
                // }),
                // tap((dataList) => {
                //     // 更新数据库
                //     Collection.bulkPut(dataList);
                // }),

                // tap(() => {
                //     // 添加异步任务
                //     pushTask({
                //         task_id: `${project_id}/${parent_id}`,
                //         action: 'SORT',
                //         model: 'API',
                //         payload: result,
                //         project_id,
                //     });
                // })
            )
            .subscribe();
    };

    return {
        handleNodeDragEnd,
    };
};

export default useNodeSort;
