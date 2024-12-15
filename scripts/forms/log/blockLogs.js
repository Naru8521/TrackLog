import { Player, world } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import DyProp from "../../libs/dyProp";
import { logTypes } from "../../config";
import LogMenuForm from "./Menu";
import Utils from "../../utils";

const dyProp = new DyProp(world);

/**
 * @param {Player} player 
 * @param {string} search 
 * @param {number} page 
 * @param {boolean} showLog
 */
export default async function BlockLogsForm(player, search, page, showLog) {
    if (!search) return await searchForm(player, undefined, undefined, LogMenuForm);

    const count = 50;
    const logs = dyProp.whileGetArray(`${logTypes.block}_` + search).reverse();
    const totalPages = Math.ceil(logs.length / count);
    const { x, y, z, id } = getLocation(search);
    const form = new UI.ActionFormData();

    form.title(`(${x}, ${y}, ${z}) ${logTypes.block}ログ${page >= 0 ? `-${page + 1}ページ` : ""}`);

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

    const { selection, canceled } = await Utils.formBusy(player, form);

    if (canceled) return;
    if (page !== undefined) {
        if (!(page > 0 && page < totalPages - 1) && selection === 0) return await BlockLogsForm(player, search, undefined, showLog);
        if (page > 0 && selection === 0) return await BlockLogsForm(player, search, page - 1);
        if (page < totalPages - 1 && selection === 0) return await BlockLogsForm(player, search, page + 1);
        if (page > 0 && page < totalPages - 1 && selection === 1) return await BlockLogsForm(player, search, page + 1);
        if (page > 0 && page < totalPages - 1 && selection === 2) return await BlockLogsForm(player, search, undefined, showLog);
        if ((page > 0 || page < totalPages - 1) && selection === 1) return await BlockLogsForm(player, search, undefined, showLog);
    } else {
        if (selection === 0 && !showLog) return await LogMenuForm(player);
        if (selection > 0) return await BlockLogsForm(player, search, selection - 1, showLog);
    }
}

/**
 * @param {Player} player 
 * @param {string} search 
 */
async function searchForm(player, search, err, backForm) {
    const dimensionIds = ["minecraft:overworld", "minecraft:nether", "minecraft:the_end"];
    const form = new UI.ModalFormData();
    const { x, y, z, id } = getLocation(search);

    form.title("座標を検索");
    form.textField(`${err ? `${err}\n` : ""}X`, "", `${x ? x : ""}`);
    form.textField("Y", "", `${y ? y : ""}`);
    form.textField("Z", "", `${z ? z : ""}`);
    form.dropdown("Dimension", dimensionIds, id ? dimensionIds.indexOf(id) : 0);

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await backForm(player);

    const newX = Math.floor(parseFloat(formValues[0].trim()));
    const newY = Math.floor(parseFloat(formValues[1].trim()));
    const newZ = Math.floor(parseFloat(formValues[2].trim()));

    if (isNaN(newX) || isNaN(newY) || isNaN(newZ)) return searchForm(player, search, "§cX,Y,Zのいずれかの座標が無効な値です。§f", backForm);

    await BlockLogsForm(player, `${newX}_${newY}_${newZ}_${dimensionIds[formValues[3]]}`);
}

/**
 * @param {string} string 
 */
function getLocation(string) {
    if (string) {
        return {
            x: parseFloat(string.split("_")[0]),
            y: parseFloat(string.split("_")[1]),
            z: parseFloat(string.split("_")[2]),
            id: string.split("_")[3]
        }
    }

    return {
        x: undefined,
        y: undefined,
        z: undefined,
        id: undefined
    }
}