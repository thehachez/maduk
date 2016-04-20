import * as React from 'react';
import { Link } from 'react-router';
import { ItemTests,
    ItemConstructors,
    ItemChars,
    ItemConfig } from '../../svg/items';

interface Props {
}

export class NavigationPanel extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <ul className="navigationPanel_ul">
                <Link to="constructors">
                    <li>
                        <ItemConstructors/>
                    </li>
                </Link>
                <Link to="testflow">
                    <li>
                        <ItemTests/>
                    </li>
                </Link>
            </ul>
        )
    }
};

