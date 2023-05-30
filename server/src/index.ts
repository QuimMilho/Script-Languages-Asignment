import Config from "./config";
import { Logger } from "./Logger";
import Server from "./server";
import Database from "./server/Database";

/*
CREATE TABLE `gameHistory` (
	`gameId` INT NOT NULL AUTO_INCREMENT,
	`result` INT NOT NULL,
	`jog1` VARCHAR(100) NOT NULL,
	`jog2` VARCHAR(100) NOT NULL,
	`type` VARCHAR(7),
	PRIMARY KEY (`gameId`)
);
*/

export interface Game {
    jog1: string;
    jog2: string;
    result: number;
    gameId: number;
    type: 'computer' | 'local';
}

const logger = new Logger(`${process.cwd()}/logs`);

const config = new Config(`${process.cwd()}/config.json`, logger);

const verify = config.verifyConfig();
if (verify[0] === "ok") {
    config.load();
} else if (verify[0] === "no") {
    config.configure();
    config.save();
} else {
    config.correctConfig(verify);
    config.save();
}

const database = new Database(config.getDatabaseConfig(), logger);

const server = new Server(
    config.getServerConfig(),
    `${process.cwd()}/certs`,
    logger
);

async function start() {
    server.start();
}

start();

export default { logger, server, database };
