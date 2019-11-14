window.addEventListener('load', () => {
    const footer = document.querySelector('footer');
    const notifications = new Notification(footer, 5);

    document.getElementById('registerForm').addEventListener('submit', event => {
        event.preventDefault();

        let response = {};
        for (let element of event.target) {
            response[element.id] = element.value;
        }

        fetch('/login/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(response)
        }).then(response => {
            if (response.status === 200) {
                notifications.notify('#08c552', 'Account was successfully created', () => {
                    window.location = '/login';
                });
            } else {
                response.json().then(message => message.errors.forEach(error => {
                    notifications.notify('#c52337', error);
                }));
            }
        }).catch(err => {
            console.error(err);
        });
    });
});