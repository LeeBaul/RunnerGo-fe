import React from 'react';
import { Modal, Button, Collapse as Col, Input } from 'adesign-react';
import { Search as SvgSearch } from 'adesign-react/icons';
import './index.less';

const { CollapseItem, Collapse } = Col;

const ImportApi = (props) => {
    const { onCancel } = props;

    return (
        <Modal title={null} visible={true} onCancel={() => onCancel()}>
            <div className='import'>
                <div className='import-left'>
                    <div className='title'>
                        <p>Apipost</p>
                    </div>
                    <div className='import-left-container'>
                        <Collapse defaultActiveKey="a1">
                            <CollapseItem name="a1" header="这是一个折叠标题">
                                <Input placeholder="搜索项目/目录/接口名称" beforeFix={<SvgSearch width="16px" height="16px" />}  />
                                <Collapse defaultActiveKey="a11">
                                    <CollapseItem name="a11" header="新闻列表项目">
                                        8868686
                                    </CollapseItem>
                                </Collapse>
                                {/* 这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。 */}
                            </CollapseItem>
                            <CollapseItem name="a2" header="设置默认展开项">
                                这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
                            </CollapseItem>
                            <CollapseItem name="a3" header="自定义折叠面板内容">
                                <Button />
                            </CollapseItem>
                        </Collapse>
                    </div>
                </div>
                <div className='import-right'>
                    <div className='title'>
                        <p>鲲鹏测试: 鲲鹏团队一</p>
                        {/* <Button>x</Button> */}
                    </div>
                    <div className='import-right-container'></div>
                </div>
            </div>
        </Modal>
    )
};

export default ImportApi;