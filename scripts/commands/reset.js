import { Block, Entity, Player, world } from "@minecraft/server";
import DyProp from "../libs/dyProp";
import { defaultLogSetting, logTypes, MessagePrefix } from "../config";

/**
 * @param {string[]} args 
 * @param {{ player: Player?, entity: Entity?, initiator: Entity?, block: Block? }} ev 
 */
export async function run(args, ev) {
    const { player, entity, initiator, block } = ev;
    const dyProp = new DyProp(world);

    if (args[0] === "setting") {
        dyProp.set("logSetting", defaultLogSetting);

        if (player) {
            player.sendMessage(`${MessagePrefix} §f設定を初期化しました。`);
        }
    }

    if (args[0] === "data") {
        const keys = dyProp.getAllKeys().filter(key => key !== "logSetting");

        for (const key of keys) {
            dyProp.remove(key);
        }

        if (player) {
            player.sendMessage(`${MessagePrefix} §fすべてのログデータを削除しました。`);
        }
    }
}