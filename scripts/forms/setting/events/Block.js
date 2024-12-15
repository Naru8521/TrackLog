import { Player, world } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { Log } from "../../../log";
import SettingMenuForm from "../Menu";
import SettingChangeStateForm from "../ChangeState";
import { logTypes } from "../../../config";
import PlayerFilterListForm from "../playerFilter/List";
import BlockFilterListForm from "../blockFilter/List";

/**
 * @param {Player} player 
 */
export default async function SettingBlockMenuForm(player) {
    const form = new UI.ActionFormData();
    const logSetting = Log.getSetting();
    const setting = logSetting.block;

    form.title("チャットログ設定");
    form.button(`状態\n${setting.state ? "§a" : "§c"}${setting.state}`);
    form.button("プレイヤーフィルターリスト");
    form.button("ブロックフィルターリスト");
    form.button("戻る");

    const { selection, canceled } = await form.show(player);

    if (canceled) return;
    if (selection === 0) return await SettingChangeStateForm(player, logTypes.block, SettingBlockMenuForm);
    if (selection === 1) return await PlayerFilterListForm(player, logTypes.block, SettingBlockMenuForm);
    if (selection === 2) return await BlockFilterListForm(player, logTypes.block, SettingBlockMenuForm);
    if (selection === 3) return await SettingMenuForm(player);
}