import * as React from 'react';
// components
import { FloatRegularPanel } from './floatregularpanel';
import { FormConstructor } from './formConstructor';

interface Props {
    browsersSelect: any;
    actions: any;
}

export class FloatConstructorCreator extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
    }

    render() {

        const { actions, browsersSelect } = this.props

        return (
            <div id="floatPanel" className="floatConstructor_creator_in">
                <div className="flcon_grid_creator_row_cn">
                    <div className="flcon_grid_creator_row_top">
                        <div className="float_con_mid_col_left">
                        </div>
                        <div className="float_con_mid_col_mid">
                        </div>
                        <div className="float_con_mid_col_right flexend">

                            <FloatRegularPanel
                                actions = { actions }
                                />

                        </div>
                    </div>

                    <div className="flcon_grid_creator_row_bot">
                        <div className="float_con_mid_col_left">
                        </div>
                        <div className="float_con_mid_col_mid">

                            <FormConstructor
                                browsersSelect = { browsersSelect }
                                actions = { actions }
                                />

                        </div>
                        <div className="float_con_mid_col_right">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

