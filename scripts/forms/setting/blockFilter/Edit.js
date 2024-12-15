import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { Log } from "../../../log";
import BlockFilterListForm from "./List";

/**
 * @param {Player} player 
 * @param {LogType} logType 
 * @param {Function} backForm 
 * @param {number} i
 */
export default async function BlockFilterEditForm(player, logType, backForm, i) {
    const form = new UI.ModalFormData();
    const logSetting = Log.getSetting();
    let blockFilters = logSetting[logType].blockFilters;

    form.title("ブロックフィルター編集");
    form.textField("ブロックID", "minecraft:stone", blockFilters[i]);
    form.toggle("削除", false);
    form.submitButton("追加");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await BlockFilterListForm(player, logType, backForm);
    if (formValues[1]) {
        blockFilters.splice(i, 1);
    } else {
        blockFilters[i] = formValues[0];
    }
    
    await BlockFilterListForm(player, logType, backForm);
}