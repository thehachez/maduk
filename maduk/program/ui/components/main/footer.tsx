import * as React from 'react';
interface Props {
}

export class Footer extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <footer>
                <div className="footer_col_left"></div>
                <div className="footer_col_mid"></div>
            </footer>
        )
    }

};

