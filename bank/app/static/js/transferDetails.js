
window.addEventListener('load', () => {
    const footer = document.querySelector('footer');
    const notifications = new Notification(footer, 5);

    const updateTransferStatus = (accept) => {
        return () => {
            fetch(`${window.location}/${accept ? 'accept' : 'cancel'}`).then(response => {
                if (response.status === 200) {
                    notifications.notify('#08c552', `Transfer ${accept ? 'accepted' : 'cancelled'}!`);
                    setTimeout(() => document.location = '/account', 500);
                } else {
                    response.json().then(data => {
                        data.errors.forEach(error => notifications.notify('#c52337', error));
                    }).catch(err => {
                        notifications.notify('#c52337', 'There was an error when parsing response');
                        console.error(err);
                    });
                }
            }).catch(err => {
                notifications.notify('#c52337', 'There was an error when sending request');
                console.error(err);
            });
        }
    };

    document.getElementById('accept').addEventListener('click', updateTransferStatus(true));
    document.getElementById('cancel').addEventListener('click', updateTransferStatus(false));
});