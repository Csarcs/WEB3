const WebSocket = require('ws')

const APIKEY = process.env.POLY_API_KEY || 'iPtYB81tpPDppUl15n9IRV39kvgy51ZP'
const ws = new WebSocket('wss://socket.polygon.io/forex')

// Connection Opened:
ws.on('open', () => {
    console.log('Connected!')
    ws.send(JSON.stringify({"action":"auth","params":APIKEY}))
    ws.send(JSON.stringify({"action":"subscribe","params":"C.AUD/USD,C.USD/EUR,C.USD/JPY"}))
})

// Per message packet:
ws.on('message', ( data ) => {
    data = JSON.parse( data )
    data.map(( msg ) => {
        if( msg.ev === 'status' ){
            return console.log('Status Update:', msg.message)
        }
        console.log('Tick:', msg)
    })
})

ws.on('error', console.log);