import * as React from 'react';
import * as Items from '../svg/items';

interface Props {
}

export class Nav extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props)
    }
    
    render() {
        return (
            <nav>
                <div className="nav_col_left">
                    <ul className="logo_ul">
                        <li className="logo_text">
                            <p>MADUK</p>
                        </li>
                    </ul>
                </div>
                <div className="nav_col_mid"></div>
            </nav>
        )
    }
}
