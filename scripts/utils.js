import { world, system } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import DyProp from "./libs/dyProp";

export default class Utils {
    /**
     * @returns {LogSetting}
     */
    static getLogSetting() {
        const dyProp = new DyProp(world);

        return dyProp.get("logSetting");
    }

    /**
     * formを表示するのを待ちます
     * @param {Player} player - フォームを表示するプレイヤー
     * @param {UI.ActionFormData | UI.ModalFormData | UI.MessageFormData} form - フォーム
     * @returns {Promise<UI.ActionFormResponse | UI.ModalFormResponse | UI.MessageFormResponse>} - フォームの返り値
     */
    static formBusy(player, form) {
        return new Promise(res => {
            system.run(async function run() {
                const response = await form.show(player);
                const { canceled, cancelationReason: reason } = response;

                if (canceled && reason === UI.FormCancelationReason.UserBusy) return system.run(run);
                
                res(response);
            });
        });
    }

    /**
     * @param {"year" | "month" | "day" | "hour" | "minute" | "second"} timeType 
     */
    static getTime(timeType) {
        const times = {};

        const date = new Date();
        const utc = date.toUTCString();
        const g = utc.replace("GMT", "");
        const gDate = new Date(g);
        const hours = gDate.getHours();
        
        gDate.setHours(hours + 9); // 日本時間
        times["year"] = gDate.getFullYear();
        times["month"] = gDate.getMonth() + 1;
        times["day"] = gDate.getDate();
        times["hour"] = gDate.getHours();
        times["minute"] = gDate.getMinutes();
        times["second"] = gDate.getSeconds();

        return times[timeType];
    }
}