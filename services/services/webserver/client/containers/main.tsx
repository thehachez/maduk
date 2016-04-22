import * as React from 'react';
import { connect } from 'react-redux';
import { StateDef } from '../store/props';
import { bindActionCreators } from 'redux';

// actions
import * as actions from '../actions';
// components 
import { MainPanel } from '../components/mainpanel';

interface Props {
    children?: any;
    dispatch?: Redux.Dispatch;
    actions: any;
    mangeMenu: boolean;
}

function mapStateToProps(state: StateDef, props: any) {
    return {
        mangeMenu: state.mangeMenu,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

class AppView extends React.Component<any, any> {
    constructor(props: Props) {
        super(props);
    }

    render() {

        const { actions, mangeMenu } = this.props

        return (
            <div id="__main_maduk_">
                <MainPanel />  
            </div>
        )
    }
};

export const App = connect(
    mapStateToProps,
    mapDispatchToProps)(AppView);
