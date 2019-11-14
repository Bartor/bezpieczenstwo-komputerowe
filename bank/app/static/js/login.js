window.addEventListener('load', () => {
    const footer = document.querySelector('footer');
    const notifications = new Notification(footer, 5);

    document.getElementById('loginForm').addEventListener('submit', event => {
        event.preventDefault();

        let response = {};
        for (let element of event.target) {
            response[element.id] = element.value;
        }

        fetch('/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(response)
            }).then(response => {
                response.json().then(data => {
                    if (response.status === 200) {
                        notifications.notify('#08c552', 'Logged in');
                        setTimeout(() => document.location = '/account', 2000);
                    } else {
                        notifications.notify('#c52337', data.error);
                    }
                });
        }).catch(err => {
            console.error(err);
        })
    });
});