const teststrings = [
    "-e sena somthing different 0-1-2-*-*-*",
    "-a random hier irgendwas seltsames 0-0-0-*-*-*",
    "-s idk2 idk -2-2-2-2",
    "ddHuh skskdj %@*@"
]
let crons = {
    "sena": {
        "text": "test4",
        "channel": "sog_lokii",
        "time": "0-22-22-1-1-1"
    }
}
const timeRegex = /(\*|([0-9]|[1-5][0-9]))-(\*|([0-9]|[1-5][0-9]))-(\*|([0-9]|1[0-9]|2[0-3]))-(\*|([1-9]|[12][0-9]|3[01]))-(\*|([1-9]|1[0-2]))-(\*|[0-7])/ // regex for cron timings
const subcmdRegex = /^((-h|help)|(-a|add)|(-e|edit)|(-d|delete))/ // regex for subcommands
const nameRegex = /^\s[^\s]*/ // regex for timer name

function test(input) {
    let time, subcmd, name
    try { // try to find a timing in the input
        time = input.match(timeRegex)[0]
    } catch (err) {
        console.log(err)
        return 101
    }
    input = input.replace(timeRegex, "")
    try { // try to find a subcommand in the input
        subcmd = input.match(subcmdRegex)[0].replace(" ", "")
    } catch (error) {
        console.log(error)
        return 102
    }
    input = input.replace(subcmdRegex, "")
    try { // try to find a name in the input
        name = input.match(nameRegex)[0].replace(" ", "")
    } catch (error) {
        console.log(error)
        return 103
    }
    input = input.replace(nameRegex, "")
    while (input.startsWith(" ")) {
        input = input.slice(1)
    }
    while (input.endsWith(" ")) {
        input = input.slice(0, -1)
    }
    try { // try to print all vars
        console.log({ subcmd, name, input, time })
    } catch (error) {
        console.log(error)
        return 104
    }
    return 0
}
let i = 1
teststrings.forEach(element => {
    switch (test(element)) {
        case 0:
            console.log(`Teststring ${i} passed all tests`)
            break
        case 101:
            console.log("couldnt match time regex")
            break
        case 102:
            console.log("couldn match subcommand regex")
            break
        case 103:
            console.log("couldnt match name regex")
            break
        case 104:
            console.log("couldnt print vars")
            break
        default:
            console.log("unknown error with timer command")
    }
    i++
});