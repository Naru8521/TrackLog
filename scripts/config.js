/** @type {import("./libs/commandHandler").CommandsPath} */
export const commandsPath = "../commands";

/** @type {import("./libs/commandHandler").CommandSetting} */
export const commandSetting = {
    prefixs: ["log"],
    ids: []
};

/** @type {import("./libs/commandHandler").Commands} */
export const commands = [
    {
        name: "list",
        tags: ["op"]
    },
    {
        name: "setting",
        tags: ["op"]
    },
    {
        name: "on",
        tags: ["op"]
    },
    {
        name: "off",
        tags: ["op"]
    },
    {
        name: "reset",
        tags: ["op"]
    },
    {
        name: "show",
        tags: ["op"]
    }
];

/** @type {LogSetting} */
export const defaultLogSetting = {
    state: true,
    chat: {
        state: true,
        maxLog: 500,
        playerFilters: [],
        stringFilters: []
    },
    joinLeave: {
        state: true,
        maxLog: 500,
        playerFilters: []
    },
    block: {
        state: true,
        maxLog: 500,
        playerFilters: [],
        blockFilters: []
    }
};

export const MessagePrefix = "§f[§eLOG§f]";
export const MessagePrefixError = "§f[§cLOG§f]";

export const logTypes = {
    joinLeave: "joinLeave",
    chat: "chat",
    block: "block"
};