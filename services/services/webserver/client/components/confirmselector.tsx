import * as React from 'react';
import * as Items from './svg';
import { Selector } from '../store/props';

interface Props {
    actions: any;
    selector: Selector;
    key: number;
}

export class ConfirmSelector extends React.Component<Props, any> {
    render() {

        const { actions, selector, key } = this.props;
        const defaultValue = selector.value || selector.tagName;

        return (
            <ul className="ul_selectors" key={ key } >
                <li className="li_selec_label">
                    <p>{ selector.uniqueName }</p>
                </li>
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
    }
}