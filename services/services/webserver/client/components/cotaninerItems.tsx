import * as React from 'react';
import * as Items from './svg';
import { ActionsDef } from '../actions';
import { Selector, Stages } from '../store/props';
import { PendingSelector } from './pendingselector';
import { ConfirmSelector } from './confirmselector';

interface Props {
    actions: ActionsDef;
    stages: Stages[];
    selectorMenu: boolean;
    selectorsStack: Selector[];
}

export class CotaninerItems extends React.Component<Props, any> {

    render() {

        const { actions, stages, selectorMenu, selectorsStack } = this.props;

        return (
            <div className="__con_containeritems_">
                <ul id="__me_select_top" className="__ul_containeritems_top">
                    <li  onClick= {() => {
                        if (!selectorMenu)
                            actions.showSelectorMenu()
                        else
                            actions.hiddeSelectorMenu()
                    } }>

                        <Items.ItemOpenOps />

                    </li>
                </ul>
                <ul id="__me_select_add"  className="__ul_containeritems_add">
                    <li>
                        <span onClick={ () => actions.createStage() }>
                            <Items.ItemAddStage />
                        </span>
                    </li>
                </ul>
                <ul id="__me_select_mid"  className="__ul_containeritems_mid">
                    {
                        stages.map((stage, key) => {
                            return (
                                <div className="__con_stages"  key={ key }>

                                    <ul className="ul_stages_props" onClick= { () => {
                                        actions.selectStage(stage.keyid)
                                    } }>
                                        <li className="stage_props">
                                            <div className="stage_name">
                                                <p>{ stage.name }</p>
                                            </div>
                                            <div className="stage_attrs">
                                                <p>{ stage.items }</p>
                                            </div>
                                        </li>
                                        <li className="stage_items">
                                            <ul className="ul_stage_items">
                                                <li><Items.ItemDel /> </li>
                                                <li><Items.ItemEdit /></li>
                                                <li onClick= { () => {
                                                    if (!stage.stateExRe)
                                                        actions.expandStage(stage.keyid);
                                                    else
                                                        actions.reduceStage(stage.keyid);
                                                } }
                                                    ><Items.ItemCode /></li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <div className="stages_items" id={ "stageContainer" + stage.keyid }>
                                        {
                                            selectorsStack.map((selector, key) => {
                                                if (stage.keyid === selector.stagekey)
                                                    if (selector.state === "pending")
                                                        return <PendingSelector
                                                            key= { key }
                                                            actions = { actions }
                                                            selector = { selector }
                                                            />
                                                    else if (selector.state === "confirmed")
                                                        return <ConfirmSelector
                                                            key= { key }

                                                            actions = { actions }
                                                            selector = { selector }
                                                            />
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </ul>
                <ul id="__me_select_bot" className="__ul_containeritems_bot">
                    <li className="input_pal">
                        <input type="text"/>
                    </li>
                    <li className="item_pal">
                        <Items.ItemSearch />
                    </li>
                </ul>
            </div>
        )
    }
}