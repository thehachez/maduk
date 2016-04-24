import * as React from 'react';
import * as Items from './svg';

interface Props {
    seletorProps: {
        tagName: string,
        id: string,
        className: string,
        nodeName: string
    }
}

export class BottomPanel extends React.Component<Props, any> {
    render() {

        const { tagName, id, className, nodeName } = this.props.seletorProps;

        return (
            <div id="__con_bottompanel_">
                <div className="__con_bottompanel_left">
                    <ul className="__ul_bottompanel_left">
                    </ul>
                </div>
                <div className="__con_bottompanel_mid">
                    <ul className="__ul_bottompanel_mid">
                    </ul>
                </div>
                <div className="__con_bottompanel_right">
                    <ul className="__ul_bottompanel_right">
                        <li className="__li_btp_selector">
                            <p>{ id || tagName } </p>
                        </li>
                        <li className="__li_btp_item"><Items.ItemCodeColor /></li>
                    </ul>
                </div>
            </div>
        )
    }
}