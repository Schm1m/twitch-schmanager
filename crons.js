import * as cron from 'node-cron'
import { say } from './auth.js';
import { promises as fs } from 'fs';

let taskarray = []

export async function stopAllTasks() {
    taskarray.forEach(element => {
        element.stop()
    });
}

export async function startAllTasks() {
    const tasks = JSON.parse(await fs.readFile('crons.json', 'UTF-8'));
    let i = 0
    for (const [key, value] of Object.entries(tasks)) {
        taskarray[i] = cron.schedule(value.time.replace(/-/g, " "), async () => {
            await say(value.channel, value.text)
        })
        i++
    }
}