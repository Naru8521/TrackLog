import { Player, world } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { Log } from "../../../log";
import SettingMenuForm from "../Menu";
import SettingChangeStateForm from "../ChangeState";
import { logTypes } from "../../../config";
import PlayerFilterListForm from "../playerFilter/List";
import StringFilterListForm from "../stringFilter/List";

/**
 * @param {Player} player 
 */
export default async function SettingChatMenuForm(player) {
    const form = new UI.ActionFormData();
    const logSetting = Log.getSetting();
    const setting = logSetting.chat;

    form.title("チャットログ設定");
    form.button(`状態\n${setting.state ? "§a" : "§c"}${setting.state}`);
    form.button("プレイヤーフィルターリスト");
    form.button("文字フィルターリスト");
    form.button("戻る");

    const { selection, canceled } = await form.show(player);

    if (canceled) return;
    if (selection === 0) return await SettingChangeStateForm(player, logTypes.chat, SettingChatMenuForm);
    if (selection === 1) return await PlayerFilterListForm(player, logTypes.chat, SettingChatMenuForm);
    if (selection === 2) return await StringFilterListForm(player, logTypes.chat, SettingChatMenuForm);
    if (selection === 3) return await SettingMenuForm(player);
}