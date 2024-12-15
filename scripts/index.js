import { Direction, system, world } from "@minecraft/server";
import DyProp from "./libs/dyProp";
import CommandHandler from "./libs/commandHandler";
import { commands, commandSetting, commandsPath, defaultLogSetting } from "./config";
import "./events";
import BlockLogsForm from "./forms/log/blockLogs";

const commandHandler = new CommandHandler(commandsPath, commandSetting, commands);

system.run(() => {
    const dyProp = new DyProp(world);

    if (!dyProp.hasKey("logSetting")) {
        dyProp.set("logSetting", defaultLogSetting);
    }
});

world.beforeEvents.chatSend.subscribe(ev => {
    commandHandler.handleCommand(ev);
});

world.beforeEvents.playerInteractWithBlock.subscribe(async ev => {
    const { player, block, isFirstEvent, blockFace } = ev;
    const logShow = player.getDynamicProperty("logShow");

    if (isFirstEvent && logShow) {
        ev.cancel = true;
        
        let x = block.x;
        let y = block.y;
        let z = block.z;
        let id = block.dimension.id;

        if (blockFace === Direction.Up) y++;
        if (blockFace === Direction.Down) y--;
        if (blockFace === Direction.North) z--;
        if (blockFace === Direction.South) z++;
        if (blockFace === Direction.East) x++;
        if (blockFace === Direction.West) x--;

        await BlockLogsForm(player, `${x}_${y}_${z}_${id}`, undefined, true);
    }
});

world.beforeEvents.playerBreakBlock.subscribe(async ev => {
    const { player, block } = ev;
    const logShow = player.getDynamicProperty("logShow");

    if (logShow) {
        ev.cancel = true;
        await BlockLogsForm(player, `${block.x}_${block.y}_${block.z}_${block.dimension.id}`, undefined, true);
    }
});