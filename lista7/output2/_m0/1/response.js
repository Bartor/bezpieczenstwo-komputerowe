var res = {'data':'HTTP/1.1 200 Partial Content\x0aX-Powered-By: Express\x0aAccept-Ranges: bytes\x0aCache-Control: public, max-age=0\x0aLast-Modified: Sun, 24 Nov 2019 13:00:14 GMT\x0aETag: W/\x22484-16e9d7f9330\x22\x0aContent-Type: application/javascript; charset=UTF-8\x0aContent-Range: bytes 0-1155/1156\x0aContent-Length: 1156\x0aDate: Fri, 13 Dec 2019 21:05:20 GMT\x0aConnection: keep-alive\x0a\x0awindow.addEventListener(\x27load\x27, () =\x3e {\x0a    const footer = document.querySelector(\x27footer\x27);\x0a    const notifications = new Notification(footer, 5);\x0a\x0a    document.getElementById(\x27transferForm\x27).addEventListener(\x27submit\x27, event =\x3e {\x0a        event.preventDefault();\x0a\x0a        let response = {};\x0a        for (let element of event.target) {\x0a            response[element.id] = element.value;\x0a        }\x0a\x0a        fetch(\x27/account/transfer\x27,\x0a            {\x0a                method: \x27POST\x27,\x0a                headers: {\x0a                    \x27Content-Type\x27: \x27application/json\x27\x0a                },\x0a                body: JSON.stringify(response)\x0a            }).then(response =\x3e {\x0a            response.json().then(data =\x3e {\x0a                if (response.status === 200) {\x0a                    notifications.notify(\x27#08c552\x27, \x27Transfer successful\x27);\x0a                    setTimeout(() =\x3e window.location = `/account/transfer/${data.transferId}`, 500);\x0a                } else {\x0a                    data.errors.forEach(error =\x3e notifications.notify(\x27#c52337\x27, error));\x0a                }\x0a            });\x0a        }).catch(err =\x3e {\x0a            console.error(err);\x0a        });\x0a    });\x0a});'}