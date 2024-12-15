import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { Log } from "../../log";

/**
 * @param {Player} player 
 * @param {LogType} logType 
 * @param {Promise<Function>} backForm
 */
export default async function SettingChangeStateForm(player, logType, backForm) {
    const form = new UI.ModalFormData();
    const logSetting = Log.getSetting();

    form.title("状態を変更");
    form.toggle("状態", logType ? logSetting[logType].state : logSetting.state);
    form.submitButton("設定");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await backForm(player);

    logType
        ? logSetting[logType].state = formValues[0]
        : logSetting.state = formValues[0];
    Log.setSetting(logSetting);
    await backForm(player);
}