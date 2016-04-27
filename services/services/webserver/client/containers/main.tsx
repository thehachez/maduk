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
}

function mapStateToProps(state: StateDef, props: any) {
    return {
        stages: state.stages,
        mangeMenu: state.mangeMenu,
        selectorMenu: state.selectorMenu,
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

        const { 
            actions,
            mangeMenu,
            stages,
            selectorMenu,
            selectorProps,
            selectorsStack 
        } = this.props

        return (
            <div>
                <div id="__mad_topper_">
                    <MainPanel
                        actions = { actions }
                        stages = { stages }
                        selectorMenu = { selectorMenu }
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
