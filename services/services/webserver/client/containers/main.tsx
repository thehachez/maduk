import * as React from 'react';
import { connect } from 'react-redux';
import { StateDef } from '../store/props';
import { bindActionCreators } from 'redux';

// actions
import * as actions from '../actions';
// components 
import { MainPanel } from '../components/mainpanel';
import { BottomPanel } from '../components/bottompanel';

interface Props {
    children?: any;
    dispatch?: Redux.Dispatch;
    actions: any;
    mangeMenu: boolean;
}

function mapStateToProps(state: StateDef, props: any) {
    return {
        mangeMenu: state.mangeMenu,
        selectorProps: state.selectorProps,
        selectorsStack: state.selectorsStack
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

        const { actions, mangeMenu, selectorProps, selectorsStack } = this.props

        return (
            <div>
                <div id="__mad_topper_">
                    <MainPanel
                        selectorsStack = { selectorsStack }
                        />
                </div>
                <div id="__mad_bottom_">
                    <BottomPanel
                        selectorProps = { selectorProps }
                        />
                </div>
            </div>
        )
    }
};

export const App = connect(
    mapStateToProps,
    mapDispatchToProps)(AppView);
