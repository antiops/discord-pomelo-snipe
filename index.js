require('dotenv').config({ path: '.env' })
const axios = require('axios')
const { Webhook } = require('discord-webhook-node')

const config = {
  discord: {
    username: process.env.DISCORD_USERNAME,
    userID: process.env.DISCORD_USER_ID,
    token: process.env.DISCORD_TOKEN,
    webhook: process.env.DISCORD_WEBHOOK
  },
  timeout: process.env.LOOP_TIMEOUT,
  userAgent: process.env.USER_AGENT
}

const DISCORD_POMELO_API = 'https://discord.com/api/v9/users/@me/pomelo'

const hook = new Webhook(config.discord.webhook)

let tryCount = 1

const data = JSON.stringify({
  username: config.discord.username
})

const options = {
  method: 'POST',
  url: DISCORD_POMELO_API,
  headers: {
    'authorization': config.discord.token,
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'user-agent': config.userAgent
  },
  data: data
}

const sleep = () => new Promise(resolve => setTimeout(resolve, config.timeout * 1000))

const sendPing = async (message) => {
  try {
    const successMessage = `[${new Date().toISOString()}] <@${config.discord.userID}> Something happened. Message: ${message}`
    console.log(successMessage)
    await hook.send(successMessage)
    return process.exit(0)
  } catch (err) {
    console.log(`[!] Failed to send webhook request. Last Message: ${message}`)
    return process.exit(1)
  }
}

const preCheck = () => {
  if (!config.discord.username) throw Error('Missing Username to Snipe')
  if (!config.discord.userID) throw Error('Missing User ID. Required to ping you when when stuff happens')
  if (!config.discord.token) throw Error('Missing User Token. Required to make Discord API calls')
  if (!config.discord.webhook) throw Error('Missing Discord Webhook. Required to send you messages when stuff happens')
  return true
}

const runSniper = async () => {
  preCheck()
  console.log(`[${new Date().toISOString()}][+] Sniper Running. Trying Username "${config.discord.username}" every ${config.timeout} seconds`)
  // pepege
  while (true) {
    try {
      const res = await axios(options)
      const data = res.data
      return sendPing(`API returned something that isn't an error! Check to see if the username was grabbed [${data.code}:${data.message}]`)
    } catch (err) {
      if (err.response.data.code === 0) return sendPing(`Token is bad, API didn't accept it [${err.response.data.code}:${err.response.data.message}]`)

      console.log(`[${new Date().toISOString()}][!] HTTP ${err.response.status} | ${err.response.data.code}:${err.response.data.message}`)
      console.log(`[${new Date().toISOString()}][!] Trying again in ${config.timeout} seconds (Tried ${tryCount} Times)`)

      tryCount += 1

      // mimi
      await sleep()
    }
  }
}

runSniper()
