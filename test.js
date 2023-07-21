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
    if (errorHandler(tryMatchTime(input, true))) return
    input = input.replace(timeRegex, "")
    if (errorHandler(tryMatchSubcmd(input, true))) return
    input = input.replace(subcmdRegex, "")
    if (errorHandler(tryMatchName(input, true))) return
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
    errorHandler(0)

    function tryMatchTime(input, force) {
        try { // try to find a timing in the input
            time = input.match(timeRegex)[0]
        } catch (err) {
            //console.log(err)
            if (force) return 101
        }
    }
    function tryMatchSubcmd(input, force) {
        try { // try to find a subcommand in the input
            subcmd = input.match(subcmdRegex)[0].replace(" ", "")
        } catch (error) {
            //console.log(error)
            if (force) return 102
        }
    }
    function tryMatchName(input, force) {
        try { // try to find a name in the input
            name = input.match(nameRegex)[0].replace(" ", "")
        } catch (error) {
            //console.log(error)
            if (force) return 103
        }
    }
}
function errorHandler(e) {
    switch (e) {
        case 0:
            console.log(`Teststring passed all tests`)
            return 1
        case 101:
            console.log("couldnt match time regex")
            return 1
        case 102:
            console.log("couldn match subcommand regex")
            return 1
        case 103:
            console.log("couldnt match name regex")
            return 1
        case 104:
            console.log("couldnt print vars")
            return 1
        default:
    }
}

teststrings.forEach(element => {
    test(element)
});