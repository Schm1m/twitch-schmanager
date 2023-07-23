import { say, onlinechannels } from "../auth.js"
import { predefError } from "../functions.js"
import { error } from "console";

export const data = {
    name: 'say',
    level: 'mod',
    response: 'any given text'
}
export async function execute(channel, msg) {
    let toChannel = msg.split(' ')[1]
    let forward = msg.split(' ').slice(2).join(' ')
    if (!onlinechannels.includes(toChannel)) {
        await say(channel, `could not send a message to channel: ${toChannel}`)
        error(predefError("invalid target"))
    }
    await say(toChannel, forward)
}