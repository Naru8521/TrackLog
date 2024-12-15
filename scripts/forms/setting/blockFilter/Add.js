import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { Log } from "../../../log";
import BlockFilterListForm from "./List";

/**
 * @param {Player} player 
 * @param {LogType} logType 
 * @param {Function} backForm 
 */
export default async function BlockFilterAddForm(player, logType, backForm) {
    const form = new UI.ModalFormData();
    const logSetting = Log.getSetting();
    let blockFilters = logSetting[logType].blockFilters;

    form.title("ブロックフィルター追加");
    form.textField("ブロックID", "minecraft:stone", "");
    form.submitButton("追加");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await BlockFilterListForm(player, logType, backForm);

    blockFilters.push(formValues[0]);
    await BlockFilterListForm(player, logType, backForm);
}