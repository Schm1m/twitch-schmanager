export async function isCommand(msg, commands) {
    if (msg.startsWith('~')) {
        const tryCommand = msg.split(' ')
        if (commands.includes(tryCommand[0].slice(1)) == true) return true
    } else return false
}

export async function whatCommand(msg) {
    return msg.split(' ')[0].slice(1)
}

export async function updateCrons() {

}

export function removeSpaceStart(txt) {
    while (txt.startsWith(" ")) {
        txt = txt.slice(1)
    }
    return txt
}

export function removeSpaceEnd(txt) {
    while (txt.endsWith(" ")) {
        txt = txt.slice(0, -1)
    }
    return txt
}

export function predefError(reason) {
    return `command failed. reason: ${reason}`
}