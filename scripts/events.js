import { ItemStack, Player, world } from "@minecraft/server";
import { logTypes } from "./config";
import { Log } from "./log";
import Utils from "./utils";

world.afterEvents.playerJoin.subscribe(ev => {
    const { playerName } = ev;
    const logSetting = Log.getSetting();
    const setting = logSetting.joinLeave;

    if (logSetting.state && setting.state) {
        const playerFilters = setting.playerFilters;

        if (playerFilters.includes(playerName)) return;

        const log = `${getTimeString("§e", "§f")} ${playerName} §ajoin§f`;
        Log.add(logTypes.joinLeave, setting.maxLog, log);
    }
});

world.beforeEvents.playerLeave.subscribe(ev => {
    const { player } = ev;
    const logSetting = Log.getSetting();
    const setting = logSetting.joinLeave;

    if (logSetting.state && setting.state) {
        const playerFilters = setting.playerFilters;

        if (playerFilters.includes(player.name)) return;

        const log = `${getTimeString("§e", "§f")} ${player.name} §cleave§f`;
        Log.add(logTypes.joinLeave, setting.maxLog, log);
    }
});

world.afterEvents.chatSend.subscribe(ev => {
    const { sender, message } = ev;
    const logSetting = Log.getSetting();
    const setting = logSetting.chat;

    if (logSetting.state && setting.state) {
        const playerFilters = setting.playerFilters;
        const stringFilters = setting.stringFilters;

        if (playerFilters.includes(sender.name)) return;
        if (stringFilters.includes(message.trim())) return;

        const log = `${getTimeString("§e", "§f")} §f<${sender.name}§f> ${message}`;
        Log.add(logTypes.chat, setting.maxLog, log);
    }
});

world.afterEvents.playerBreakBlock.subscribe(ev => {
    const { player, block, brokenBlockPermutation } = ev;
    const logShow = player.getDynamicProperty("logShow");
    const logSetting = Log.getSetting();
    const setting = logSetting.block;

    if (logSetting.state && setting.state && !logShow) {
        const playerFilters = setting.playerFilters;
        const blockFilters = setting.blockFilters;

        if (playerFilters.includes(player.name)) return;
        if (blockFilters.includes(brokenBlockPermutation.type.id)) return;

        const log = `${getTimeString("§e", "§f")} §b${player.name}§f break §d${brokenBlockPermutation.type.id.split(":")[1]}§f`;
        Log.add(`${logTypes.block}_${block.location.x}_${block.location.y}_${block.location.z}_${block.dimension.id}`, setting.maxLog, log);
    }
});

world.afterEvents.playerPlaceBlock.subscribe(ev => {
    const { player, block } = ev;
    const logShow = player.getDynamicProperty("logShow");
    const logSetting = Log.getSetting();
    const setting = logSetting.block;

    if (logSetting.state && setting.state && !logShow) {
        const playerFilters = setting.playerFilters;
        const blockFilters = setting.blockFilters;

        if (playerFilters.includes(player.name)) return;
        if (blockFilters.includes(block.typeId)) return;

        const log = `${getTimeString("§e", "§f")} §b${player.name}§f place §d${block.typeId.split(":")[1]}§f`;
        Log.add(`${logTypes.block}_${block.location.x}_${block.location.y}_${block.location.z}_${block.dimension.id}`, setting.maxLog, log);
    }
});

world.afterEvents.blockExplode.subscribe(ev => {
    const { source, block, explodedBlockPermutation } = ev;
    const logSetting = Log.getSetting();
    const setting = logSetting.block;

    if (logSetting.state && setting.state) {
        const blockFilters = setting.blockFilters;

        if (source instanceof Player && playerFilters.includes(source.name)) return;
        if (blockFilters.includes(block.typeId)) return;

        const log = `${getTimeString("§e", "§f")} §b${source ? source instanceof Player ? `${source.name} ` : `${source.typeId.split(":")[1]} ` : ""}§fexplode §d${explodedBlockPermutation.type.id.split(":")[1]}§f`;
        Log.add(`${logTypes.block}_${block.location.x}_${block.location.y}_${block.location.z}_${block.dimension.id}`, setting.maxLog, log);
    }
});

world.afterEvents.buttonPush.subscribe(ev => {
    const { source, block } = ev;
    const logSetting = Log.getSetting();
    const setting = logSetting.block;

    if (source instanceof Player) {
        const logShow = source.getDynamicProperty("logShow");

        if (logShow) return;
    }

    if (logSetting.state && setting.state) {
        const playerFilters = setting.playerFilters;
        const blockFilters = setting.blockFilters;

        if (source instanceof Player && playerFilters.includes(source.name)) return;
        if (blockFilters.includes(block.typeId)) return;

        try {
            const log = `${getTimeString("§e", "§f")} §b${source instanceof Player ? source.name : source.typeId.split(":")[1]}§f pushed §d${block.typeId.split(":")[1]}§f`;
            Log.add(`${logTypes.block}_${block.location.x}_${block.location.y}_${block.location.z}_${block.dimension.id}`, setting.maxLog, log);
        } catch {}
    }
});

world.afterEvents.tripWireTrip.subscribe(ev => {
    const { sources, block } = ev;
    const logSetting = Log.getSetting();
    const setting = logSetting.block;

    try {
        for (const source of sources) {
            if (logSetting.state && setting.state) {
                const playerFilters = setting.playerFilters;
                const blockFilters = setting.blockFilters;
    
                if (source instanceof Player && playerFilters.includes(source.name)) return;
                if (blockFilters.includes(block.typeId)) return;
    
                const log = `${getTimeString("§e", "§f")} §b${source instanceof Player ? source.name : source.typeId.split(":")[1]}§f pressed §d${block.typeId}§f`;
                Log.add(`${logTypes.block}_${block.location.x}_${block.location.y}_${block.location.z}_${block.dimension.id}`, setting.maxLog, log);
            }
        }
    } catch {}
});

world.afterEvents.pressurePlatePush.subscribe(ev => {
    const { source, block } = ev;
    const logSetting = Log.getSetting();
    const setting = logSetting.block;

    if (logSetting.state && setting.state) {
        const playerFilters = setting.playerFilters;
        const blockFilters = setting.blockFilters;

        if (source instanceof Player && playerFilters.includes(source.name)) return;
        if (blockFilters.includes(block.typeId)) return;

        const log = `${getTimeString("§e", "§f")} §b${source instanceof Player ? source.name : source.typeId.split(":")[1]}§f pushed §d${block.typeId.split(":")[1]}§f`;
        Log.add(`${logTypes.block}_${block.location.x}_${block.location.y}_${block.location.z}_${block.dimension.id}`, setting.maxLog, log);
    }
});

world.afterEvents.leverAction.subscribe(ev => {
    const { player, block, isPowered } = ev;
    const logShow = player.getDynamicProperty("logShow");
    const logSetting = Log.getSetting();
    const setting = logSetting.block;

    if (logSetting.state && setting.state && !logShow) {
        const playerFilters = setting.playerFilters;
        const blockFilters = setting.blockFilters;

        if (playerFilters.includes(player.name)) return;
        if (blockFilters.includes(block.typeId)) return;

        const log = `${getTimeString("§e", "§f")} §b${player.name}§f lever ${isPowered ? "on" : "off"} §d${block.typeId.split(":")[1]}§f`;
        Log.add(`${logTypes.block}_${block.location.x}_${block.location.y}_${block.location.z}_${block.dimension.id}`, setting.maxLog, log);
    }
});

world.beforeEvents.playerInteractWithBlock.subscribe(ev => {
    const { isFirstEvent, player, block } = ev;
    const logShow = player.getDynamicProperty("logShow");

    if (isFirstEvent && !logShow) {
        if (
            block.getComponent("inventory") ||
            (
                block.getComponent("fluidContainer") &&
                [
                    "minecraft:water_bucket",
                    "minecraft:lava_bucket",
                    "minecraft:powder_snow_bucket"
                ].includes(getSelectedItemId(player))
            ) ||
            (
                block.getComponent("sign") &&
                !block.getComponent("sign").isWaxed
            ) ||
            (
                [
                    "minecraft:command_block",
                    "minecraft:chain_command_block",
                    "minecraft:repeating_command_block",
                    "minecraft:structure_block"
                ].includes(block.typeId) &&
                player.isOp()
            ) ||
            (
                [
                    "minecraft:bee_nest",
                    "minecraft:beehive"
                ].includes(block.typeId) &&
                block.permutation.getState("honey_level") === 5
            ) ||
            (
                [
                    "minecraft:campfire",
                    "minecraft:soul_campfire"
                ].includes(block.typeId) &&
                (
                    getSelectedItemId(player).includes("shovel") ||
                    [
                        "minecraft:chicken",
                        "minecraft:porkchop",
                        "minecraft:beef",
                        "minecraft:mutton",
                        "minecraft:rabbit",
                        "minecraft:cod",
                        "minecraft:salmon"
                    ].includes(getSelectedItemId(player))
                )
            ) ||
            (
                "minecraft:respawn_anchor" === block.typeId &&
                getSelectedItemId(player) === "minecraft:glow_stone"
            ) ||
            (
                "minecraft:chiseled_bookshelf" === block.typeId &&
                [
                    "minecraft:book",
                    "minecraft:enchanted_book",
                    "minecraft:writable_book"
                ].includes(getSelectedItemId(player))
            ) ||
            (
                "minecraft:lectern" === block.typeId &&
                getSelectedItemId(player) === "minecraft:writable_book"
            ) ||
            (
                [
                    "minecraft:bed",
                    "minecraft:crafting_table",
                    "minecraft:cartography_table",
                    "minecraft:fletching_table",
                    "minecraft:smithing_table",
                    "minecraft:anvil",
                    "minecraft:chipped_anvil",
                    "minecraft:damaged_anvil",
                    "minecraft:grindstone",
                    "minecraft:enchanting_table",
                    "minecraft:ender_chest",
                    "minecraft:noteblock",
                    "minecraft:frame",
                    "minecraft:glow_frame",
                    "minecraft:glower_pot",
                    "minecraft:bell",
                    "minecraft:stonecutter_block"
                ].includes(block.typeId)
            ) ||
            (
                block.typeId === "minecraft:composter" &&
                (
                    getSelectedItemId(player).includes("leaves") ||
                    getSelectedItemId(player).includes("sapling") ||
                    getSelectedItemId(player) === "minecraft:mangrove_propagule" ||
                    getSelectedItemId(player).includes("seeds") ||
                    [
                        "minecraft:wheat",
                        "minecraft:melon_slice",
                        "minecraft:pumpkin",
                        "minecraft:sweet_berries",
                        "minecraft:glow_berries",
                        "minecraft:pitcher_pod",
                        "minecraft:potato",
                        "minecraft:carrot",
                        "minecraft:apple",
                        "minecraft:melon_block",
                        "minecraft:beetroot",
                        "minecraft:fern",
                        "minecraft:large_fern",
                        "minecraft:short_grass",
                        "minecraft:tall_grass",
                        "minecraft:nether_sprouts",
                        "minecraft:crimson_roots",
                        "minecraft:warped_roots",
                        "minecraft:dandelion",
                        "minecraft:poppy",
                        "minecraft:cornflower",
                        "minecraft:oxeye_daisy",
                        "minecraft:pink_tulip",
                        "minecraft:orange_tulip",
                        "minecraft:red_tulip",
                        "minecraft:azure_bluet",
                        "minecraft:allium",
                        "minecraft:blue_orchid",
                        "minecraft:lily_of_the_valley",
                        "minecraft:sunflower",
                        "minecraft:lilac",
                        "minecraft:rose_bush",
                        "minecraft:peony",
                        "minecraft:pitcher_plant",
                        "minecraft:pink_petals",
                        "minecraft:wither_rose",
                        "minecraft:torchflower",
                        "minecraft:open_eyeblossom",
                        "minecraft:closed_eyeblossom",
                        "minecraft:cocoa_beans",
                        "minecraft:kelp",
                        "minecraft:vine",
                        "minecraft:weeping_vines",
                        "minecraft:twisting_vines",
                        "minecraft:waterlily",
                        "minecraft:seagrass",
                        "minecraft:small_dripleaf_block",
                        "minecraft:glow_lichen",
                        "minecraft:flowering_azalea",
                        "minecraft:azalea",
                        "minecraft:moss_block",
                        "minecraft:moss_block",
                        "minecraft:moss_carpet",
                        "minecraft:big_dripleaf",
                        "minecraft:spore_blossom",
                        "minecraft:mangrove_roots",
                        "minecraft:pale_moss_carpet",
                        "minecraft:pale_moss_block",
                        "minecraft:pale_hanging_moss",
                        "minecraft:hanging_roots",
                        "minecraft:brown_mushroom",
                        "minecraft:red_mushroom",
                        "minecraft:crimson_fungus",
                        "minecraft:warped_fungus",
                        "minecraft:brown_mushroom_block",
                        "minecraft:red_mushroom_block",
                        "minecraft:mushroom_stem",
                        "minecraft:sugar_cane",
                        "minecraft:nether_wart"
                    ].includes(getSelectedItemId(player))
                )
            )
        ) {
            const logSetting = Log.getSetting();
            const setting = logSetting.block;

            if (logSetting.state && setting.state) {
                const playerFilters = setting.playerFilters;
                const blockFilters = setting.blockFilters;

                if (playerFilters.includes(player.name)) return;
                if (blockFilters.includes(block.typeId)) return;

                const log = `${getTimeString("§e", "§f")} §b${player.name}§f click §d${block.typeId.split(":")[1]}§f`;
                Log.add(`${logTypes.block}_${block.location.x}_${block.location.y}_${block.location.z}_${block.dimension.id}`, setting.maxLog, log);
            }
        }
    }
});

/**
 * @param {Player} player 
 * @returns {string} 
 */
function getSelectedItemId(player) {
    const container = player.getComponent("inventory")?.container;
    const item = container.getItem(player.selectedSlotIndex);

    if (item) return item.typeId;
    return "minecraft:air";
}

/**
 * 現在の時間を文字列で返す
 * @param {string} start 
 * @param {string} end
 * @returns {string}
 */
function getTimeString(start = "", end = "") {
    const year = Utils.getTime("year");
    const month = zeroPad(Utils.getTime("month"));
    const day = zeroPad(Utils.getTime("day"));
    const hour = zeroPad(Utils.getTime("hour"));
    const minute = zeroPad(Utils.getTime("minute"));
    const second = zeroPad(Utils.getTime("second"));

    return `${start}${year}/${month}/${day} ${hour}:${minute}:${second}${end}`;
}

/**
 * @param {number} num 
 * @returns {string}
 */
function zeroPad(num) {
    return String(num).padStart(2, "0");
}