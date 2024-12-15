import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { Log } from "../../../log";
import StringFilterAddForm from "./Add";
import StringFilterEditForm from "./Edit";

/**
 * @param {Player} player 
 * @param {LogType} logType 
 * @param {Function} backForm 
 */
export default async function StringFilterListForm(player, logType, backForm) {
    const form = new UI.ActionFormData();
    const logSetting = Log.getSetting();
    const stringFilters = logSetting[logType].stringFilters;

    form.title("文字フィルターリスト");
    form.button("戻る");
    form.button("追加");
    
    for (const filterString of stringFilters) {
        form.button(filterString);
    }

    const { selection, canceled } = await form.show(player);

    if (canceled) return;
    if (selection === 0) return await backForm(player);
    if (selection === 1) return await StringFilterAddForm(player, logType, backForm);
    await StringFilterEditForm(player, logType, backForm, selection - 2);
}