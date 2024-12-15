import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { Log } from "../../../log";
import StringFilterListForm from "./List";

/**
 * @param {Player} player 
 * @param {LogType} logType 
 * @param {Function} backForm 
 */
export default async function StringFilterAddForm(player, logType, backForm) {
    const form = new UI.ModalFormData();
    const logSetting = Log.getSetting();
    let stringFilters = logSetting[logType].stringFilters;

    form.title("文字フィルター追加");
    form.textField("文字", "", "");
    form.submitButton("追加");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await StringFilterListForm(player, logType, backForm);

    stringFilters.push(formValues[0]);
    await StringFilterListForm(player, logType, backForm);
}