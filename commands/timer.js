import { say } from "../auth.js"
import { updateCrons } from "../functions.js";
import { promises as fs } from 'fs';

const allArgs = ["-h", "-e", "-a", "-d", "help", "edit", "add", "delete"]

export const data = {
    name: 'timer',
    level: 'mod',
    response: 'changed timer sucessfully'
}
export async function execute(channel, msg) {
    const crons = JSON.parse(await fs.readFile('crons.json', 'UTF-8'));
    const subcommand = msg.split(' ')[1]
    if (!allArgs.includes(subcommand)) {
        await say(channel, `no valid argument given, pls specify what you wanna do (help(-h)/add(-a)/edit(-e)/delete(-d))`)
        return
    }
    if (subcommand == "help" || subcommand == "-h") {
        await say(channel, `command stucture: (~{cmd} {subcmd} {name} {text} {time}). accepted timeframes (in cron syntax): ({sec}-{min}-{hour}-{day}{month}-{weekday})`)
        return
    }
    const name = msg.split(' ')[2] ?? null
    if (await checkArgument(name, "name")) return
    if (subcommand == "delete" || subcommand == "-d") {
        return
    }
    const text = msg.split(' ')[3] ?? null
    if (await checkArgument(text, "text")) return
    const time = msg.split(' ')[4] ?? null
    if (subcommand == "edit" || subcommand == "-e") {
        if (time == null) {
            time = crons[name].time
        }
    }
    if (await checkArgument(time, "time")) return
    if (subcommand == "edit" || subcommand == "-e") {
        crons[name].text = text
        crons[name].time = time
        await saveCrons()
        await say(channel, `changed timer "${name}`)
        return
    }
    if (subcommand == "add" || subcommand == "-a") {
        crons[name] = {}
        crons[name].text = text
        crons[name].time = time
        await saveCrons()
        return
    }
    console.log({ name, text, time })

    async function saveCrons() {
        await fs.writeFile("crons.json", JSON.stringify(crons))
    }

    async function checkArgument(arg, type) {
        switch (type) {
            case "name":
                if (arg == null) {
                    await say(channel, `invalid name given`)
                    return true
                }
                if (!crons[arg]) {
                    await say(channel, `there is no timer with that name`)
                    return true
                }
                if (crons[arg].channel != channel) {
                    await say(channel, `there is no timer with that name`)
                    return true
                }
                break
            case "text":
                if (arg == null) {
                    await say(channel, `no timer text given`)
                    return true
                }
                break
            case "time":
                if (!arg.match(/(\*|([0-9]|[1-5][0-9]))-(\*|([0-9]|[1-5][0-9]))-(\*|([0-9]|1[0-9]|2[0-3]))-(\*|([1-9]|[12][0-9]|3[01]))-(\*|([1-9]|1[0-2]))-(\*|[0-7])/)) {
                    await say(channel, `invalid timeframe given`)
                    return true
                }
                break
        }
    }
}

