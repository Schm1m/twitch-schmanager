import { say } from "../auth.js"
import { updateCrons } from "../functions.js";
import { promises as fs } from 'fs';

const crons = JSON.parse(await fs.readFile('crons.json', 'UTF-8'));
const subcmdregex = /((-h|help)|(-e|edit)|(-d|delete)|(-a|add))/

export const data = {
    name: 'timer',
    level: 'mod',
    response: 'changed timers'
}
export async function execute(channel, msg) {
    if (!msg.match(subcmdregex)) {
        await say(channel, `no valid subcommand found`)
    }
}