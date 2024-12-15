import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { Log } from "../../../log";
import PlayerFilterAddForm from "./Add";
import PlayerFilterEditForm from "./Edit";

/**
 * @param {Player} player 
 * @param {LogType} logType 
 * @param {Function} backForm 
 */
export default async function PlayerFilterListForm(player, logType, backForm) {
    const form = new UI.ActionFormData();
    const logSetting = Log.getSetting();
    const playerFilters = logSetting[logType].playerFilters;

    form.title("プレイヤーフィルターリスト");
    form.button("戻る");
    form.button("追加");
    
    for (const filterPlayerName of playerFilters) {
        form.button(filterPlayerName);
    }

    const { selection, canceled } = await form.show(player);

    if (canceled) return;
    if (selection === 0) return await backForm(player);
    if (selection === 1) return await PlayerFilterAddForm(player, logType, backForm);
    await PlayerFilterEditForm(player, logType, backForm, selection - 2);
}