import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { Log } from "../../log";
import LogMenuForm from "./Menu";

/**
 * @param {Player} player 
 * @param {LogType} logType 
 * @param {number} page 
 */
export default async function LogsForm(player, logType, page) {
    const count = 50;
    const logs = Log.get(logType).reverse();
    const totalPages = Math.ceil(logs.length / count);
    const form = new UI.ActionFormData();

    form.title(`${logType}ログ${page >= 0 ? `-${page + 1}ページ` : ""}`);

    if (page !== undefined) {
        const currentLogs = logs.slice(page * count, page * count + count).reverse();

        form.body(currentLogs.join("\n"));

        if (page > 0) form.button("前のページ");
        if (page < totalPages - 1) form.button("次のページ");

        form.button("戻る");
    } else {
        form.button("戻る");

        for (let i = 0; i < totalPages; i++) {
            form.button(`ページ ${i + 1}`);
        }
    }

    // フォームを表示
    const { selection, canceled } = await form.show(player);
    if (canceled) return;

    if (page !== undefined) {
        if (!(page > 0 && page < totalPages - 1) && selection === 0) return await LogsForm(player, logType);
        if (page > 0 && selection === 0) return await LogsForm(player, logType, page - 1);
        if (page < totalPages - 1 && selection === 0) return await LogsForm(player, logType, page + 1);
        if (page > 0 && page < totalPages - 1 && selection === 1) return await LogsForm(player, logType, page + 1);
        if (page > 0 && page < totalPages - 1 && selection === 2) return await LogsForm(player, logType);
        if ((page > 0 || page < totalPages - 1) && selection === 1) return await LogsForm(player, logType);
    } else {
        if (selection === 0) return await LogMenuForm(player);
        return await LogsForm(player, logType, selection - 1);
    }
}
