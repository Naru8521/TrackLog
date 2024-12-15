import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { Log } from "../../../log";
import StringFilterListForm from "./List";

/**
 * @param {Player} player 
 * @param {LogType} logType 
 * @param {Function} backForm 
 * @param {number} i
 */
export default async function StringFilterEditForm(player, logType, backForm, i) {
    const form = new UI.ModalFormData();
    const logSetting = Log.getSetting();
    let stringFilters = logSetting[logType].stringFilters;

    form.title("文字フィルター編集");
    form.textField("文字", "", stringFilters[i]);
    form.toggle("削除", false);
    form.submitButton("追加");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await StringFilterListForm(player, logType, backForm);
    if (formValues[1]) {
        stringFilters.splice(i, 1);
    } else {
        stringFilters[i] = formValues[0];
    }
    
    await StringFilterListForm(player, logType, backForm);
}