const Twit = require('twit')

const twitterAPI = new Twit({
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: '',
})

const INTERVAL = 61000

var opt = {
    screen_name: process.argv[2],
    cursor: '-1',
    count: '200'
}

function getFollowers() {
    const promise = new Promise((resolve, reject) => {
        twitterAPI.get('followers/list', opt, (err, data, response) => {
            if (data) resolve(data)
        })
    })
    return promise
}

function putHeader(data) {
    var keys = Object.keys(data.users[0])
    var str = ''
    for (key of keys) {
        (key == keys[keys.length - 1]) ? str += key : str += key + ','
    }
    console.log(str)
}

function saveUser(user) {
    var str = ''
    var keys = Object.keys(user)
    for (key of keys) {
        (key == keys[keys.length - 1]) ? str += user[key] : str += user[key] + ','
    }
    console.log(str)
}

function main() {
    getFollowers().then((data) => {
        if (opt.cursor == "-1" && data.users.length > 0) putHeader(data)
        for (user of data.users) {
            saveUser(user);
        }
        opt.cursor = data.next_cursor_str
        if (data.next_cursor_str == '0') process.exit()
    })
}

main()

setInterval(() => {
    main()
}, INTERVAL)
