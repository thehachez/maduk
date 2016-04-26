import * as React from 'react';
import { CotaninerItems } from './cotaninerItems';
import { Selector } from '../store/props';

interface Props {
    actions: any;
    selectorMenu: boolean;
    selectorsStack: Selector[];
}

export class MainPanel extends React.Component<Props, any> {
    render() {
        return (
            <ul className="__ul_mainpanel_">
                <CotaninerItems
                    actions = { this.props.actions }
                    selectorMenu = { this.props.selectorMenu }
                    selectorsStack = { this.props.selectorsStack }
                    />
            </ul>
        )
    }
}