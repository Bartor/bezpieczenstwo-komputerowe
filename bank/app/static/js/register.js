window.addEventListener('load', () => {
    document.getElementById('registerForm').addEventListener('submit', event => {
        event.preventDefault();

        let response = {};
        for (let element of event.target) {
            response[element.id] = element.value;
        }
        console.log(response);

        fetch('/login/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(response)
        }).then(data => {
            console.log(data);
        }).catch(err => {
           console.log(err);
        });
    });
});