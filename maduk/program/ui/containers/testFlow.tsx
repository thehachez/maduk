import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { stateDef } from '../store/props';
import * as actionsConstructors from '../actions/actionsConstructors';

// components

interface Props {
    dispatch?: Redux.Dispatch;
    actions: Maduk.Actions;
}

function mapStateToProps(state: stateDef, props: Props) {
    return {
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch) {
    return {
        actions: bindActionCreators<any>(actionsConstructors, dispatch)
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class TestFlow extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props)
    }
    render() {
       
        return (
            <div className="constructors_wrapper">
                <div className="middle_row_top">
                    <div className="mid_col_left">
                    </div>
                    <div className="mid_col_mid">

                        ready

                    </div>
                    <div className="mid_col_right"></div>
                </div>
                <div className="middle_row_mid">
                    <div className="mid_col_left">
                    </div>
                    <div className="mid_col_mid">
                        <div className="middle_container">
                          
                        </div>
                    </div>
                    <div className="mid_col_right"></div>
                </div>
            </div>
        )
    }
}


