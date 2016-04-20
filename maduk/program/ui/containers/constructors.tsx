import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { stateDef } from '../store/props';
import { Constructor }  from '../models';
import * as actionsConstructors from '../actions/actionsConstructors';

// components
import { ConstructorPanel } from '../components/constructors/middle/constructorPanel';
import { ConstructorsBoxes } from '../components/constructors/middle/constructorsBoxes';

interface Props {
    dispatch?: Redux.Dispatch;
    actions: Maduk.Actions;
    constructors: Array<Constructor>;
}

function mapStateToProps(state: stateDef, props: Props) {
    return {
        constructors: state.constructors
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch) {
    return {
        actions: bindActionCreators<any>(actionsConstructors, dispatch)
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Constructors extends React.Component<Props, any> {
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

                        <ConstructorPanel
                            actions = { this.props.actions }
                            />

                    </div>
                    <div className="mid_col_right"></div>
                </div>
                <div className="middle_row_mid">
                    <div className="mid_col_left">
                    </div>
                    <div className="mid_col_mid">
                        <div className="middle_container">
                            {
                                this.props.constructors.map((value: Constructor, key) => {
                               
                                    return <ConstructorsBoxes
                                        key = { key }
                                        name = { value.name }
                                        target = { value.target }
                                        aplication = {value.aplication }
                                        version = { value.version }
                                        browsers = { value.browsers }
                                        />
                                })
                            }

                        </div>
                    </div>
                    <div className="mid_col_right"></div>
                </div>
            </div>
        )
    }
}


