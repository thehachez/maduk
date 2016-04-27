import * as React from 'react';
import * as Items from './svg';
import { Selector } from '../store/props';

interface Props {
    actions: any;
    selector: Selector;
    key: number;
}

export class PendingSelector extends React.Component<Props, any> {
    render() {

        const { actions, selector, key } = this.props;
        const defaultValue = selector.value || selector.tagName;

        return (
            <ul className="ul_selectors_pending" key={ key }>
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
                            <span onClick={ () => actions.editSelector(selector.keyid, selector.stagekey) }>
                                <Items.ItemEdit />
                            </span>
                        </li>
                        <li>
                            <span onClick={ () => actions.deleteSelector(selector.keyid, selector.stagekey) }>
                                <Items.ItemDel />
                            </span>
                        </li>
                        <li>
                            <span onClick={ () => actions.confirmSelector(selector.keyid, selector.stagekey) }>
                                <Items.ItemCheck />
                            </span>
                        </li>
                    </ul>
                </li>
            </ul>
        )
    }
}