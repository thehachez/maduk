import * as React from 'react';
import * as ActionsConstructors from '../../../actions/actionsConstructors';

// components
import {
    ItemConstructorCreate,
    ItemConstructorConfig } from '../../svg/items';

interface Props {
    actions: Maduk.Actions
}

export class ConstructorPanel extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className="container_con_middle">
                <div className="flex_start">
                    <ul className="ul_nav_panel_start ul_navs">
                        <li className="li_navs">
                            <div className="div_item">
                                <ItemConstructorCreate/>
                            </div>

                            <div className="div_text_target">
                                <p>Administrar</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="flex_end">
                    <ul className="ul_nav_panel_end ul_navs">
                        <li className="li_opt li_navs">
                            <i className="div_item_opt copy icon"></i>
                        </li>
                        <li className="li_opt li_navs">
                            <i className="div_item_opt linkify icon"></i>
                        </li>
                        <li className="li_opt li_navs">
                            <i className="div_item_opt remove icon"></i>
                        </li>
                        <li className="li_opt li_navs"
                            onClick={
                                this.props.actions.constrcutorOpenFloat
                            }>
                            <i className="div_item_opt plus icon"></i>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
};

