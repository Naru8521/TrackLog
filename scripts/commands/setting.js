import { Block, Entity, Player, world } from "@minecraft/server";
import SettingMenuForm from "../forms/setting/Menu";

/**
 * @param {string[]} args 
 * @param {{ player: Player?, entity: Entity?, initiator: Entity?, block: Block? }} ev 
 */
export async function run(args, ev) {
    const { player, entity, initiator, block } = ev;

    if (player) await SettingMenuForm(player);
}