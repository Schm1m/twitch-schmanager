import { chatClient, say } from "../auth.js";
console.log("pinging for sena-time...")
const channel = 'sog_lokii'
chatClient.connect()
try {
    await say(channel, 'BearLove DinkDonk')
} catch (error) {
    console.log(error)
}