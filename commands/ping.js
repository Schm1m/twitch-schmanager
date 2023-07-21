import { say } from "../auth.js"

export const data = {
    name: 'ping',
    level: 'mod',
    response: 'pong'
}
export async function execute(channel, msg) {
    await say(channel, `pong`)
}