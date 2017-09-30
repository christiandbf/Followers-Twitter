require('dotenv').config()
const Twit = require('twit')
const fs = require('fs')

const twitterAPI = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

var opt = {
    screen_name: process.argv[2],
    cursor: '-1',
    count: '200',
}

const INTERVAL = 60001
const destFolder = __dirname + '/' + opt.screen_name

console.log('Creating folder: ' + destFolder)
fs.mkdir(destFolder)

function getFollowers() {
    console.log('Requesting data')
    const promise = new Promise((resolve, reject) => {
        console.log('Data received')
        twitterAPI.get('followers/list', opt, (err, data, response) => {
            if (data) resolve(data)
        })
    })
    return promise
}

function saveDataJSON(json) {
    console.log('Saving data')
    fs.writeFileSync((destFolder + '/' + opt.screen_name + opt.cursor + '.json'), json);
}

function main() {
    getFollowers().then(data => {
        let json = JSON.stringify(data.users)
        saveDataJSON(json)
        opt.cursor = data.next_cursor_str
        if (data.next_cursor_str == '0') clearInterval(intervalFun)
    })
}

main()

intervalFun = setInterval(() => {
    main()
}, INTERVAL)