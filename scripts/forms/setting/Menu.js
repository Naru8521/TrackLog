import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { Log } from "../../log";
import Utils from "../../utils";
import SettingChangeStateForm from "./ChangeState";
import SettingChatMenuForm from "./events/Chat";
import SettingJoinLeaveMenuForm from "./events/JoinLeave";

/**
 * @param {Player} player 
 */
export default async function SettingMenuForm(player) {
    const form = new UI.ActionFormData();
    const logSetting = Log.getSetting();

    form.title("設定メニュー");
    form.button(`状態\n${logSetting.state ? "§a" : "§c"}${logSetting.state}`);
    form.button("入退出ログ設定");
    form.button("チャットログ設定");
    form.button("ブロックログ設定");

    const { selection, canceled } = await Utils.formBusy(player, form);

    if (canceled) return;
    if (selection === 0) return await SettingChangeStateForm(player, undefined, SettingMenuForm);
    if (selection === 1) return await SettingJoinLeaveMenuForm(player);
    if (selection === 2) return await SettingChatMenuForm(player);
}