[...document.querySelectorAll('body > main > table > tbody > tr > td:nth-child(4)')].forEach(node => {
	if (node.textContent === 'bad@guy.net') {
		node.textContent = 'good@guy.net';
	}
	return node;
})