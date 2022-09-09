import React, { useState } from 'react';
import './index.less';
import {
    Setting1 as SvgSetting,
    Save as SvgSave,
    CaretRight as SvgCaretRight
} from 'adesign-react/icons';
import { Button, Message } from 'adesign-react';
import { useSelector, useDispatch } from 'react-redux';
import CreateApi from '@modals/CreateApi';
import SceneConfig from '@modals/SceneConfig';
import Bus from '@utils/eventBus';
import { useParams } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { MarkerType } from 'react-flow-renderer';

const SceneHeader = (props) => {
    const { from } = props;
    const [showSceneConfig, setSceneConfig] = useState(false);
    // console.log(sceneName);
    const dispatch = useDispatch();
    const { id } = useParams();
    // const saveScene = useSelector((store) => store.scene.saveScene);
    const {
        nodes: nodes_scene, 
        edges: edges_scene,
        id_apis: id_apis_scene, 
        node_config: node_config_scene, 
        open_scene: open_scene_scene, 
    } = useSelector((store) => store.scene);
    const {
        nodes: nodes_plan, 
        edges: edges_plan,
        id_apis: id_apis_plan, 
        node_config: node_config_plan, 
        open_plan_scene: open_scene_plan,
    } = useSelector((store) => store.plan);
    const nodes = from === 'scene' ? nodes_scene : nodes_plan;
    const edges = from === 'scene' ? edges_scene : edges_plan;
    const id_apis = from === 'scene' ? id_apis_scene : id_apis_plan;
    const node_config = from === 'scene' ? node_config_scene : node_config_plan;
    const open_scene = from === 'scene' ? open_scene_scene : open_scene_plan;

    const open_scene_name = useSelector((store) => store.scene.open_scene_name);
    console.log(nodes, edges, id_apis, node_config);

    const runScene = () => {
        const { scene_id } = open_scene;
        console.log(scene_id);
        Bus.$emit('runScene', scene_id, open_scene.nodes.length);
        console.log(nodes, edges);
        // const _edges = cloneDeep(edges);
        // // _edges[0].animated = true;
        // // _edges[0].style = {
        // //     stroke: 'blue',
        // // };
        // // _edges[0].markerEnd = {
        // //     type: MarkerType.ArrowClosed,
        // // };

        // dispatch({
        //     type: 'scene/updateChangeEdge',
        //     payload: _edges[0]
        // })
    }
    return (
        <div className='scene-header'>
            <div className='scene-header-left'>{open_scene_name}</div>
            <div className='scene-header-right'>
                <div className='config' onClick={() => setSceneConfig(true)}>
                    <SvgSetting />
                    <span>场景设置</span>
                </div>
                <Button className='saveBtn' preFix={<SvgSave />} onClick={() => {
                    if (from === 'scene') {
                        Bus.$emit('saveScene', nodes, edges, id_apis, node_config, open_scene, () => {
                        Message('success', '保存成功!');
                      });
                    } else {
                        Bus.$emit('saveScenePlan', nodes, edges, id_apis, node_config, open_scene, id, () => {
                        Message('success', '保存成功!');
                      });
                    }
                }}>保存</Button>
                {from === 'scene' && <Button className='runBtn' preFix={<SvgCaretRight />} onClick={() => runScene()}>开始运行</Button>}
            </div>
            {showSceneConfig && <SceneConfig onCancel={() => setSceneConfig(false)} />}
        </div>
    )
};

export default SceneHeader;