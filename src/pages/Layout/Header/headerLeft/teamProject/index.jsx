import React from 'react';
import { Dropdown, Button } from 'adesign-react';
import {
    Team as SvgTeam,
    Down as SvgDown
} from 'adesign-react/icons';
import { TeamProjectPanel } from './style';

const TeamProject = () => {
    return (
        <TeamProjectPanel>
            <SvgTeam />
            <Dropdown
                content={
                    <div>123123123</div>
                }
            >
                <Button
                    afterFix={<SvgDown width="16" height="16" className="afterfix" />}
                >
                    哎呀思的私有团队
                </Button>
            </Dropdown>
        </TeamProjectPanel>
    )
};

export default TeamProject;