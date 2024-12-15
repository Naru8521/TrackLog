import { Block, Entity, Player, world } from "@minecraft/server";
import { MessagePrefix, MessagePrefixError } from "../config";
import { Log } from "../log";

/**
 * @param {string[]} args 
 * @param {{ player: Player?, entity: Entity?, initiator: Entity?, block: Block? }} ev 
 */
export function run(args, ev) {
    const { player, entity, initiator, block } = ev;
    const logSetting = Log.getSetting();

    if (logSetting.state) {
        if (player) player.sendMessage(`${MessagePrefixError} §cすでにlogの取得はオンになっています。`);
        return;
    }

    logSetting.state = true;
    Log.setSetting(logSetting);

    if (player) player.sendMessage(`${MessagePrefix} §flogの取得をオンにしました。`);
}