import * as React from 'react';
import * as logoExplorers from '../../svg/items';

interface Props {
    name: string;
    target: string;
    aplication: string;
    version: string;
    browsers: {
        chrome: boolean,
        edge: boolean,
        opera: boolean,
        firefox: boolean,
        ie: boolean
    };
}

export class ConstructorsBoxes extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
    }

    render() {

        const { chrome, edge, opera, firefox, ie } = this.props.browsers;


        return (
            <ul className="constructors_boxes">
                <li className="cn_boxes_name">
                    <p>{ this.props.name }</p>
                </li>
                <li className="cn_boxes_inf">
                    <p>{ this.props.aplication }</p>
                    <p>{ this.props.version }</p>
                </li>
                <li className="cn_boxes_stat">
                    <ul className="ul_explorers_boxes">
                    
                        { chrome ? <li><logoExplorers.LogoChrome /></li> : undefined }
                        { edge ? <li><logoExplorers.LogoEdge /></li> : undefined }
                        { opera ? <li><logoExplorers.LogoOpera /></li> : undefined }
                        { ie ? <li><logoExplorers.LogoIe /></li> : undefined }

                    </ul>
                </li>
            </ul>
        )
    }
};

