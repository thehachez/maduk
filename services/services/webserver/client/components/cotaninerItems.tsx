import * as React from 'react';
import * as Items from './svg';
import { Selector } from '../store/props';

interface Props {
    selectorsStack: Selector[];
}

export class CotaninerItems extends React.Component<Props, any> {

    render() {

        const { selectorsStack } = this.props;

        return (
            <div id="__con_containeritems_">
                <ul id="__ul_containeritems_top">
                    <li><Items.ItemAddStage /></li>
                    <li><Items.ItemLabel /></li>
                    <li><Items.ItemMinusCircle /></li>
                    <li><Items.ItemAddCircle /></li>
                </ul>
                <ul id="__ul_containeritems_mid">
                    {
                        selectorsStack.map((selector, key) => {
                            return (
                                <ul className="ul_selectors" key={ key }>
                                    <li className="li_selec_label"><p>unique</p></li>
                                    <li className="li_selec_props">
                                        <ul>
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
                                                    <p>{ selector.id || "no id" }</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="selector_lab_item">
                                                    <Items.ItemClass/>
                                                </div>
                                                <div className="selector_label">
                                                    <p>{ selector.className || "no class"}</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            )
                        })
                    }
                </ul>
                <ul id="__ul_containeritems_bot">
                    <li className="input_pal"><input type="text"/></li>
                    <li className="item_pal"><Items.ItemSearch /></li>
                </ul>
            </div>
        )
    }
}