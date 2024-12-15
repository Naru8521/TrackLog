import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { Log } from "../../../log";
import BlockFilterAddForm from "./Add";
import BlockFilterEditForm from "./Edit";

/**
 * @param {Player} player 
 * @param {LogType} logType 
 * @param {Function} backForm 
 */
export default async function BlockFilterListForm(player, logType, backForm) {
    const form = new UI.ActionFormData();
    const logSetting = Log.getSetting();
    const blockFilters = logSetting[logType].blockFilters;

    form.title("ブロックフィルターリスト");
    form.button("戻る");
    form.button("追加");
    
    for (const filterBlock of blockFilters) {
        form.button(filterBlock);
    }

    const { selection, canceled } = await form.show(player);

    if (canceled) return;
    if (selection === 0) return await backForm(player);
    if (selection === 1) return await BlockFilterAddForm(player, logType, backForm);
    await BlockFilterEditForm(player, logType, backForm, selection - 2);
}