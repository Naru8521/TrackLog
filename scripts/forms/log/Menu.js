import { Player, world } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import Utils from "../../utils";
import LogsForm from "./Logs";
import { logTypes } from "../../config";
import BlockLogsForm from "./blockLogs";

/**
 * @param {Player} player 
 */
export default async function LogMenuForm(player) {
    const form = new UI.ActionFormData();
    
    form.title("ログメニュー");
    form.button("入退出");
    form.button("チャット");
    form.button("ブロック");

    const { selection, canceled } = await Utils.formBusy(player, form);

    if (canceled) return;
    if (selection === 0) return await LogsForm(player, logTypes.joinLeave);
    if (selection === 1) return await LogsForm(player, logTypes.chat);
    if (selection === 2) return await BlockLogsForm(player);
}