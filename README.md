# discord-pomelo-snipe

- Tries to request a username every 300 seconds (configurable)
- Pings you with a webhook when stuff happens
- Also pings you if your token stops working


This will make requests to the Discord Pomelo API requesting a username. When the API returns a non-error response it will ping you in a channel using a webhook. Whether it got the username or not, idk. You should check your Discord when it pings because something happened.

It will also ping you and exit the script if Discord says the token is bad. Update the token and restart.

---
## Prerequisites
- Requires [Node.js](https://nodejs.org/en/download) (Tested using `19.8.1`)

- Rename `.env.sample` to `.env` and fill in the values
  - `DISCORD_USERNAME`: The username to request
  - `DISCORD_USER_ID`: Your user ID. This ID will be pinged
  - `DISCORD_TOKEN`: Your user token. Required to make the API requests
  - `DISCORD_WEBHOOK`: A Webhook. Messages will be sent to it
  - `LOOP_TIMEOUT`: Time to wait **in seconds** before retrying (Default: `300s`/`5min`)
  - `USER_AGENT`: The User-Agent used in API requests. Change if you want

## Get the code
Download the repo archive .zip and extract it or just use `git`

```shell
git clone https://github.com/antiops/discord-pomelo-snipe
```

## Setup & Run
```shell
# Enter the repo directory
cd discord-pomelo-snipe

# Windows users can also just shift+right-click the folder and click "open cmd/powershell window here"

# Install dependencies
npm install

# Start
node index.js
```

To manually stop the script just press `CTRL`+`c`

# Obvious Disclaimer
As always, Discord doesnt like automated requests from user accounts (usually called self-botting). Even though they have rarely go after self-botters (except the cases where people clearly abused and spammed the service), **use at your own risk**. Make the timeout higher if you'd like to play it safe.


# Libraries Used
- [discord-webhook-node](https://www.npmjs.com/package/discord-webhook-node)
- [axios](https://www.npmjs.com/package/axios)
- [dotenv](https://www.npmjs.com/package/dotenv)

---
# Notes


<details>
  <summary>Response Codes</summary>

  * Authenticated, No access to use Pomelo
    * HTTP: `401`
    * Code: `40001`
    * Message: `Unauthorized`

  * Authenticated, Access to Pomelo
    * HTTP: `200?`
    * Code: `?`
    * Message: `?`

  * Bad Token
    * Code: `0`
    * Message: `401: Unauthorized`

</details>