import { error } from "console";
import { say } from "../auth.js"
import { updateCrons, removeSpaceStart, predefError } from "../functions.js";
import { promises as fs } from 'fs';

const subcmdregex = /^((-h\b|\bhelp\b)|(-e\b|\bedit\b)|(-d\b|\bdelete\b)|(-a\b|\badd\b))/
const timeregex = /(\*|([0-9]|[1-5][0-9]))-(\*|([0-9]|[1-5][0-9]))-(\*|([0-9]|1[0-9]|2[0-3]))-(\*|([1-9]|[12][0-9]|3[01]))-(\*|([1-9]|1[0-2]))-(\*|[0-7])$/

export const data = {
    name: 'timer',
    level: 'mod',
    response: 'changed timers'
}
export async function execute(channel, msg) {
    const crons = JSON.parse(await fs.readFile('crons.json', 'UTF-8'));

    async function saveCrons() {
        await fs.writeFile("crons.json", JSON.stringify(crons))
        await updateCrons()
    }

    msg = msg.replace(`~timer `, ``)
    if (!msg.match(subcmdregex)) {
        await say(channel, `no valid subcommand found`)
        error(predefError("no subcommand given"))
        return
    }
    const subcmd = msg.match(subcmdregex)[0]
    msg = msg.replace(subcmdregex, "")
    msg = removeSpaceStart(msg)
    switch (subcmd) {
        case "-h":
        case "help":
            await say(channel, `command usage: (~timer {subcmd} {name} {text} {time}). Available subcommands: (help/edit/delete/add) or in short (-h/-e/-d/-a). time syntax (in cron syntax): ({sec}-{min}-{hour}-{day}-{month}-{weekday}) "*" for a blank. exp: "0-15-0-*-*-*" repeats every day at 15 o´clock.`)
            break
        case "-e":
        case "edit":
            const editTimerName = msg.split(" ")[0]
            if (!crons[editTimerName]) {
                await say(channel, `there is not timer with the name "${editTimerName}"`)
                error(predefError("invalid timer name"))
                return
            }
            if (crons[editTimerName].channel != channel) {
                await say(channel, `there is no timer "${editTimerName}" for this channel`)
                error(predefError("invalid timer access point"))
                return
            }
            msg = msg.replace(editTimerName + " ", "")
            const editTime = msg.match(timeregex) ? msg.match(timeregex)[0] : null
            if (!editTime) {
                crons[editTimerName].text = msg
                await saveCrons()
                await say(channel, `successfully edited timer "${editTimerName}"`)
                return
            }
            msg = msg.replace(" " + editTime, "")
            crons[editTimerName].text = msg
            crons[editTimerName].time = editTime
            await saveCrons()
            await say(channel, `successfully edited timer "${editTimerName}"`)
            break
        case "-d":
        case "delete":
            const deleteTimerName = msg.split(" ")[0]
            if (!crons[deleteTimerName]) {
                await say(channel, `there is not timer with the name "${deleteTimerName}"`)
                error(predefError("invalid timer name"))
                return
            }
            if (crons[deleteTimerName].channel != channel) {
                await say(channel, `there is no timer "${deleteTimerName}" for this channel`)
                error(predefError("invalid timer access point"))
                return
            }
            delete crons[deleteTimerName]
            await saveCrons()
            await say(channel, `successfully deleted timer "${deleteTimerName}"`)
            break
        case "-a":
        case "add":
            const addTimerName = msg.split(" ")[0]
            msg = msg.replace(addTimerName + " ", "")
            if (crons[addTimerName]) {
                await say(channel, `a timer named ${addTimerName} already exists`)
                error(predefError("duplicate timer"))
                return
            }
            if (!msg.match(timeregex)) {
                await say(channel, `no time for new timer "${addTimerName}" defined`)
                error(predefError("missing cron timing"))
                return
            }
            const addTime = msg.match(timeregex)[0]
            msg = msg.replace(" " + addTime, "")
            crons[addTimerName] = {
                channel: channel,
                time: addTime,
                text: msg
            }
            await saveCrons()
            await say(channel, `successfully created timer "${addTimerName}"`)
            break
    }
}

