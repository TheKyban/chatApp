(function () {
    const inputL = document.getElementById('loginInput')
    const loginBtn = document.getElementById('loginbtn')
    const exitBtn = document.getElementById('chatexit')
    const sendBtn = document.getElementById('sendbtn')
    const inputM = document.getElementById('cInput')
    const messageBox = document.querySelector('.message')

    const socket = io();

    let uname;

    const login = () => {
        let username = inputL.value;
        if (username.length === 0) return;
        socket.emit('newuser', username)
        uname = username;
        document.querySelector(".login").classList.remove('active')
        document.querySelector(".chat").classList.add('active')
    }
    loginBtn.onclick = login
    document.querySelector('.login').addEventListener('keypress', (e) => {
        if (e.key == "Enter") {
            console.log('loged')
            login()
        }
    })

    exitBtn.onclick = () => {
        socket.emit('exituser', uname)
        window.location.href = window.location.href
    }


    const send = () => {
        let m = inputM.value
        let info = {
            name: uname,
            mess: m
        }
        if (m.length > 0) {
            render("my", info)
            socket.emit('chat', info)
            inputM.value = ""
        }
    }
    sendBtn.onclick = send
    document.querySelector('.chat').addEventListener('keypress', (e) => {
        if (e.key == "Enter") {
            console.log('loged')
            send()
        }
    })

    socket.on('update', (update) => {
        render('update', update)
    })

    socket.on('chat', (message) => {
        render('other', message)
    })


    const render = (type, message) => {
        if (type == "my") {
            let elem = document.createElement('div')
            elem.setAttribute('class', 'my')
            elem.innerHTML =
                `
                <p>${message.mess}</p>
            `
            messageBox.appendChild(elem)
        } else if (type == "other") {
            let elem = document.createElement('div')
            elem.setAttribute('class', 'other')
            elem.innerHTML =
                `
                <p>${message.name}:${message.mess}</p>
            `
            messageBox.appendChild(elem)
        } else if (type == "update") {
            let elem = document.createElement('div')
            elem.setAttribute('class', 'update')
            elem.innerHTML =
                `
                <p>${message}</p>
            `
            messageBox.appendChild(elem)
        }
        messageBox.scrollTop = messageBox.scrollHeight - messageBox.clientHeight
    }
})()