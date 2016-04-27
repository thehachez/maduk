import * as React from 'react';
import { CotaninerItems } from './cotaninerItems';
import { Selector, Stages } from '../store/props';

interface Props {
    actions: any;
    stages: Stages[];
    selectorMenu: boolean;
    selectorsStack: Selector[];
}

export class MainPanel extends React.Component<Props, any> {
    render() {
        return (
            <ul className="__ul_mainpanel_">
                <CotaninerItems
                    actions = { this.props.actions }
                    stages = { this.props.stages }
                    selectorMenu = { this.props.selectorMenu }
                    selectorsStack = { this.props.selectorsStack }
                    />
            </ul>
        )
    }
}