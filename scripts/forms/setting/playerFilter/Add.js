import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { Log } from "../../../log";
import PlayerFilterListForm from "./List";

/**
 * @param {Player} player 
 * @param {LogType} logType 
 * @param {Function} backForm 
 */
export default async function PlayerFilterAddForm(player, logType, backForm) {
    const form = new UI.ModalFormData();
    const logSetting = Log.getSetting();
    let playerFilters = logSetting[logType].playerFilters;

    form.title("プレイヤーフィルター追加");
    form.textField("プレイヤー名", "", "");
    form.submitButton("追加");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await PlayerFilterListForm(player, logType, backForm);

    playerFilters.push(formValues[0]);
    await PlayerFilterListForm(player, logType, backForm);
}