import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { Log } from "../../../log";
import PlayerFilterListForm from "./List";

/**
 * @param {Player} player 
 * @param {LogType} logType 
 * @param {Function} backForm 
 * @param {number} i
 */
export default async function PlayerFilterEditForm(player, logType, backForm, i) {
    const form = new UI.ModalFormData();
    const logSetting = Log.getSetting();
    let playerFilters = logSetting[logType].playerFilters;

    form.title("プレイヤーフィルター編集");
    form.textField("プレイヤー名", "", playerFilters[i]);
    form.toggle("削除", false);
    form.submitButton("追加");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await PlayerFilterListForm(player, logType, backForm);
    if (formValues[1]) {
        playerFilters.splice(i, 1);
    } else {
        playerFilters[i] = formValues[0];
    }
    
    await PlayerFilterListForm(player, logType, backForm);
}