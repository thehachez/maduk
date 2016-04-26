import * as React from 'react';
import * as Items from './svg';
import { Selector } from '../store/props';

interface Props {
    actions: any;
    selectorMenu: boolean;
    selectorsStack: Selector[];
}

export class CotaninerItems extends React.Component<Props, any> {

    render() {

        const { actions, selectorMenu, selectorsStack } = this.props;

        return (
            <div className="__con_containeritems_">
                <ul id="__me_select_top" className="__ul_containeritems_top">
                    <li  onClick= {() => {
                        if (!selectorMenu)
                            actions.showSelectorMenu()
                        else
                            actions.hiddeSelectorMenu()
                    } }>

                        <Items.ItemAddStage/>

                    </li>
                </ul>
                <ul id="__me_select_add"  className="__ul_containeritems_add">
                </ul>
                <ul id="__me_select_mid"  className="__ul_containeritems_mid">
                    {
                        selectorsStack.map((selector, key) => {
                            const defaultValue = selector.value || selector.tagName;

                            if (selector.state === "pending")
                                return (
                                    <ul className="ul_selectors_pending" key= { key }>
                                        <li className="selec_pend_name">
                                        
                                            {
                                                !selector.editable
                                                    ? <p>{  selector.uniqueName || defaultValue }</p>
                                                    : <ul className="selec_pend_name_editable">
                                                        <li className="selec_pname_edit_input">
                                                            <input id="editUnique" type="text" defaultValue={ selector.uniqueName || defaultValue }/>
                                                        </li>
                                                        <li className="selec_pname_edit_item">
                                                            <button onClick={ () => actions.confirmEditSelector(selector.keyid, document.getElementById("editUnique")) }>listo</button>
                                                        </li>
                                                    </ul>
                                            }

                                        </li>
                                        <li className="selec_pend_items">
                                            <ul className="ul_selec_pend_items">
                                                <li>
                                                    <span onClick={ () => actions.editSelector(selector.keyid) }>
                                                        <Items.ItemEdit />
                                                    </span>
                                                </li>
                                                <li>
                                                    <span onClick={ () => actions.deleteSelector(selector.keyid) }>
                                                        <Items.ItemDel />
                                                    </span>
                                                </li>
                                                <li>
                                                    <span onClick={ () => actions.confirmSelector(selector.keyid) }>
                                                        <Items.ItemCheck />
                                                    </span>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>)
                            else
                                return (
                                    <ul className="ul_selectors" key={ key }>
                                        <li className="li_selec_label"><p>unique</p></li>
                                        <li className="li_selec_props">
                                            <ul className="ulc_select_props">
                                                <li>
                                                    <div className="selector_lab_item">
                                                        <Items.ItemCode/>
                                                    </div>
                                                    <div className="selector_label">
                                                        <p>{ selector.tagName }</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="selector_lab_item">
                                                        <Items.ItemLabel/>
                                                    </div>
                                                    <div className="selector_label">
                                                        <p>{ selector.value || "no value" }</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                )
                        })
                    }
                </ul>
                <ul id="__me_select_bot" className="__ul_containeritems_bot">
                    <li className="input_pal"><input type="text"/></li>
                    <li className="item_pal"><Items.ItemSearch /></li>
                </ul>
            </div>
        )
    }
}