import * as React from 'react';
import * as Items from './svg';

interface Props {
}

export class CotaninerItems extends React.Component<Props, any> {
    render() {
        return (
            <ul id="__ul_containeritems_">
                <li><Items.ItemConstructors /></li>
                <li><Items.ItemTag /></li>
                <li><Items.ItemHash /></li>
                <li><Items.ItemSearch /></li>
            </ul>
        )
    }
}