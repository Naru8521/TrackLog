import { world } from "@minecraft/server";
import DyProp from "./libs/dyProp";

export class Log {
    /**
     * @returns {LogSetting}
     */
    static getSetting() {
        const dyProp = new DyProp(world);

        return dyProp.get("logSetting");
    }

    /**
     * @param {LogSetting} logSetting
     */
    static setSetting(logSetting) {
        const dyProp = new DyProp(world);

        dyProp.set("logSetting", logSetting);
    }

    /**
     * @param {LogType} logType 
     * @returns {string[]}
     */
    static get(logType) {
        const dyProp = new DyProp(world);

        return dyProp.whileGetArray(logType);
    }

    /**
     * @param {LogType} logType 
     * @param {number} max 
     * @param {string} log 
     */
    static add(logType, max, log) {
        const dyProp = new DyProp(world);
        let datas = dyProp.whileGetArray(logType);

        datas.push(log);
        datas = pruneOldEntries(datas, max);
        dyProp.whileSetArray(logType, datas);
    }

    /**
     * @param {LogType} logType 
     * @param {string[]} logs 
     */
    static save(logType, logs) {
        const dyProp = new DyProp(world);

        dyProp.whileSetArray(logType, logs);
    }
}

/**
 * @param {string[]} datas 
 * @param {number} max 
 */
function pruneOldEntries(datas, max) {
    while (datas.length > max) {
        datas.shift();
    }

    return datas;
}