import * as React from 'react';
import { CotaninerItems } from './cotaninerItems';

interface Props {
}

export class MainPanel extends React.Component<Props, any> {
    render() {
        return (
            <ul id="__ul_mainpanel_">
                <CotaninerItems />
            </ul>
        )
    }
}