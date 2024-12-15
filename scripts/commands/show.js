import { Block, Entity, Player, world } from "@minecraft/server";
import { MessagePrefix, MessagePrefixError } from "../config";

/**
 * @param {string[]} args 
 * @param {{ player: Player?, entity: Entity?, initiator: Entity?, block: Block? }} ev 
 */
export async function run(args, ev) {
    const { player, entity, initiator, block } = ev;
    const logShow = player.getDynamicProperty("logShow");
    const state = args[0];

    if (player) {
        if (!state || (state !== "on" && state !== "off")) {
            player.sendMessage(`${MessagePrefixError} §clog show <on | off>`);
            return;
        }

        if (state === "on") {
            if (!logShow) {
                player.setDynamicProperty("logShow", true);
                player.sendMessage(`${MessagePrefix} §fログ確認をオンにしました。§dブロックを右クリックまたは左クリックでログを確認できます。`);
            } else {
                player.sendMessage(`${MessagePrefixError} §cログ確認は既にオンです。`);
            }
        }

        if (state === "off") {
            if (logShow) {
                player.setDynamicProperty("logShow", false);
                player.sendMessage(`${MessagePrefix} §fログ確認をオフにしました。`);
            } else {
                player.sendMessage(`${MessagePrefixError} §cログ確認は既にオフです。`);
            }
        }
    }
}