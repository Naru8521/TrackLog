/**
 * @typedef {"joinLeave" | "chat" | "block"} LogType 
 */

/**
 * @typedef {Object} LogSetting 
 * @property {boolean} state - ログの取得状態
 * @property {Chat} chat - チャットログ
 * @property {JoinLeave} joinLeave - プレイヤー入退室ログ
 * @property {Block} block
 */

/**
 * @typedef {Object} JoinLeave 
 * @property {boolean} state 
 * @property {number} maxLog 
 * @property {string[]} playerFilters 
 */

/**
 * @typedef {Object} Chat 
 * @property {boolean} state - ログの取得状態
 * @property {number} maxLog - ログの最大保存数
 * @property {string[]} playerFilters - ログとして取得しないプレイヤーIDの配列
 * @property {string[]} stringFilters - ログとして取得しない文字の配列
 */

/**
 * @typedef {Object} Block 
 * @property {boolean} state 
 * @property {number} maxLog 
 * @property {string[]} playerFilters - [NARU20000]
 * @property {string[]} blockFilters - [minecraft:stone]
 */