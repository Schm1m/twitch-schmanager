import * as fs2 from 'fs'
import { isCommand, whatCommand } from './functions.js';
import { chatClient, say } from "./auth.js";
import * as cron from 'node-cron'
import { exec } from 'child_process'
import { startAllTasks } from './crons.js';

let commands = []
const cmdFiles = fs2.readdirSync('./commands').filter(file => file.endsWith('.js'));
for await (const file of cmdFiles) {
    const command = await import(`./commands/${file}`)
    commands.push(command.data.name)
}

chatClient.connect()

await startAllTasks()

const twitchChat = chatClient.onMessage(async (channel, user, text, msg) => {
    if (msg.userInfo.userName == "schmanager") return
    if (await isCommand(text, commands) == true) {
        if (msg.userInfo.isMod == true || msg.userInfo.isBroadcaster == true || user == "schm1m") {
            const command = await import(`./commands/${await whatCommand(text)}.js`)
            try {
                console.log(`executing command (${command.data.name})`)
                await command.execute(channel, text)
            } catch (error) {
                console.log(error)
            }
        } else {
            await say(channel, `only mods can run commands in this version of schmanager`)
        }
    } // basic command handling, running the specified execute() function of the given command
})