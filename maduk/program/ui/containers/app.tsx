import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { stateDef } from '../store/props';
import { BrowsersDef } from '../models';

// actions
import * as actionsConstructors from '../actions/actionsConstructors';
// components 
import { Nav } from '../components/main/nav.tsx';
import { Footer } from '../components/main/footer.tsx';
import { NavigationPanel } from '../components/main/middle/navigationPanel';
import { FloatConstructorCreator } from '../components/constructors/default/floatConstructorCreator';

interface Props {
    children?: any;
    dispatch?: Redux.Dispatch;
    constructorFloatState: boolean;
    browsersSelect: BrowsersDef;
    actions: any;
}

function mapStateToProps(state: stateDef, props: Props) {
    return {
        constructorFloatState: state.constructorFloatState,
        browsersSelect: state.browsersSelect,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch) {
    return {
        actions: bindActionCreators(actionsConstructors, dispatch)
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
    }

    render() {

        const { actions, browsersSelect } = this.props
        
        return (
            <div className="app_wrapper">

                {
                    /* FLOAT DIV TEST GENERATOR */
                    this.props.constructorFloatState ? <FloatConstructorCreator
                        browsersSelect = { browsersSelect }
                        actions = { actions }
                        /> : ""
                }

                <Nav/>
                <section className="middle">
                    <div className="middle_col_left">
                        <NavigationPanel />
                    </div>
                    <div className="middle_col_mid">
                        {
                            this.props.children
                        }
                    </div>
                </section>
                <Footer/>
            </div>
        )
    }
};