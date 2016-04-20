import * as React from 'react';
import * as ItemsExplorer from '../../svg/items';
import { reduxForm } from 'redux-form';
import { BrowsersDef } from '../../../models';
import * as ActionsConstructors from '../../../actions/actionsConstructors';

interface Props {
    actions: Maduk.Actions
    browsersSelect: BrowsersDef;
    fields?: Maduk.fieldsConstructor<Maduk.fields>
}


const config = {
    form: 'constructors',
    initialValues: {
        protocol: "http",
        architecture: "x64",
        domType: "browser",
        testType: "unitaria",
        appType: "estandar",
    },
    fields: [
        'name',
        'target',
        'aplication',
        'version',
        'architecture',
        'domType',
        'testType',
        'appType',
        'protocol'
    ]
}

@reduxForm(config)
export class FormConstructor extends React.Component<Props, any> {
    render() {

        const { chrome, edge, safari, ie, opera, firefox } = this.props.browsersSelect
        const { actions, fields: {
            name,
            target,
            aplication,
            version,
            architecture,
            domType,
            testType,
            appType,
            protocol } } = this.props;

        return (
            <form onSubmit={ (event)=> {
                event.preventDefault()
                actions.createNewConstructor( this.props.fields )
                actions.constrcutorCloseFloat()
            } }>
                <ul className="ul_forms">
                    <li className="li_form" name="form_name">

                        <span>Nombre</span>
                        <input className="const_input" type="text" placeholder="nombre"
                            { ...name }
                            />
                    </li>
                    <li className="li_form input_target_protocol" name="form_name">

                        <span>Target</span>
                        <div>
                            <select name="select_protocols" className={ "proto_" + protocol.value }
                                { ...protocol }
                                >
                                <option value="http">http</option>
                                <option value="https">https</option>
                                <option value="ws">ws</option>
                            </select>
                            
                            <input className="const_input" type="text" placeholder="target"
                                { ...target }
                                />
                        </div>
                    </li>
                    <li className="li_form" name="form_name">

                        <span>Aplicación</span>
                        <input className="const_input" type="text" placeholder="nombre"
                            { ...aplication }
                            />
                    </li>
                    <li className="li_form" name="form_name">

                        <span>Version</span>
                        <input className="const_input" type="text" placeholder="version"
                            { ...version }
                            />
                    </li>
                    <li className="li_form" name="form_name">

                        <span>Arquitectura de sistema</span>
                        <select className="const_select"
                            { ...architecture }
                            >
                            <option value="x64">x64</option>
                            <option value="x86">x86</option>
                        </select>
                        
                    </li>
                    <li className="li_form" name="form_name">

                        <span>Tipo de DOM</span>
                        <select className="const_select"
                            { ...domType }
                            >
                            <option value="browser">browser</option>
                            <option value="virtual">virtual</option>
                        </select>
                        
                    </li>
                    <li className="li_form" name="form_name">

                        <span>Tipo de prueba</span>
                        <select className="const_select"
                            { ...testType }
                            >
                            <option value="unitaria">unitaria</option>
                            <option value="integracion">integración</option>
                        </select>
                        
                    </li>
                    <li className="li_form" name="form_name">

                        <span>Tipo de aplicación</span>
                        <select className="const_select"
                            { ...appType }
                            >
                            <option value="legacy">legacy</option>
                            <option value="estandar">estandar</option>
                            <option value="spa">spa</option>
                        </select>
                        
                    </li>
                    <li className="li_form" name="form_name">

                        <span>Exploradores</span>

                        <ul className="ul_const_explorers">
                            <li className={ chrome ? "browser_select" : "browser_noselect" }
                                onClick= {
                                    () => {
                                        actions.setBrowsersForTest("chrome")
                                    }
                                }
                                ><ItemsExplorer.LogoChrome/></li>
                            <li className={ edge ? "browser_select" : "browser_noselect" }
                                onClick= {
                                    () => {
                                        actions.setBrowsersForTest("edge")
                                    }
                                }
                                ><ItemsExplorer.LogoEdge/></li>
                            <li className={ opera ? "browser_select" : "browser_noselect" }
                                onClick= {
                                    () => {
                                        actions.setBrowsersForTest("opera")
                                    }
                                }
                                ><ItemsExplorer.LogoOpera/></li>
                            <li className={ ie ? "browser_select" : "browser_noselect" }
                                onClick= {
                                    () => {
                                        actions.setBrowsersForTest("ie")
                                    }
                                }
                                ><ItemsExplorer.LogoIe/></li>
                        </ul>

                    </li>
                    <li className="li_form li_boutton" >

                        <button type="submit" className="const_div_button">
                            <p>crear</p>
                        </button>

                    </li>
                </ul>
            </form>
        )
    }
};
