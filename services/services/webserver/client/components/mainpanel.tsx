import * as React from 'react';
import { CotaninerItems } from './cotaninerItems';
import { Selector } from '../store/props';

interface Props {
    selectorsStack: Selector[];
}

export class MainPanel extends React.Component<Props, any> {
    render() {
        return (
            <ul id="__ul_mainpanel_">
                <CotaninerItems
                    selectorsStack = { this.props.selectorsStack }
                    />
            </ul>
        )
    }
}