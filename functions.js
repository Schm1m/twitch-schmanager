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