import * as React from 'react';
import { ActionsDef } from '../actions';

interface Props {
    actions: ActionsDef;
 }

export class MainPanel extends React.Component<Props, any> {
    render() {
        
        const actions = this.props.actions
        
        return (
            <ul id="__ul_mainpanel_">
            </ul>
        )
    }
}