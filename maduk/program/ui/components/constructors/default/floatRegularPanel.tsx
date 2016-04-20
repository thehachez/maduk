import * as React from 'react';
import * as ActionsConstructors from '../../../actions/actionsConstructors';

interface Props {
    actions: Maduk.Actions
}

export class FloatRegularPanel extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
    }

    render() {

        return (
            <ul className="ul_nav_panel_end_RegPanel ul_navs">
                <li className="li_opt li_navs border-none">
                    <i className="div_item_opt minus icon"></i>
                </li>
                <li className="li_opt li_navs border-none"
                    onClick={
                        this.props.actions.constrcutorCloseFloat
                    }>
                    <i className="div_item_opt remove icon"></i>
                </li>
            </ul>
        )
    }
};


