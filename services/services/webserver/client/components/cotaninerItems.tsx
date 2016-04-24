import * as React from 'react';
import * as Items from './svg';

interface Props {
}

export class CotaninerItems extends React.Component<Props, any> {
    render() {
        return (
            <ul id="__ul_containeritems_">
                <li><Items.ItemRedoList /></li>
                <li><Items.ItemLabel /></li>
                <li><Items.ItemSearch /></li>
                <li><Items.ItemCode /></li>
            </ul>
        )
    }
}