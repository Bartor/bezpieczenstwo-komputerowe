window.addEventListener('load', () => {
    const footer = document.querySelector('footer');
    const notifications = new Notification(footer, 5);

    document.getElementById('transferForm').addEventListener('submit', event => {
        event.preventDefault();

        let response = {};
        for (let element of event.target) {
            response[element.id] = element.value;
        }

        fetch('/account/transfer',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(response)
            }).then(response => {
            response.json().then(data => {
                if (response.status === 200) {
                    notifications.notify('#08c552', 'Transfer successful');
                    setTimeout(() => window.location = `/account/transfer/${data.transferId}`, 500);
                } else {
                    data.errors.forEach(error => notifications.notify('#c52337', error));
                }
            });
        }).catch(err => {
            console.error(err);
        });
    });
});