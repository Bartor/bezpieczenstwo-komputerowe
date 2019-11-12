window.addEventListener('load', () => {
    document.getElementById('registerForm').addEventListener('submit', event => {
        console.log(event);
        event.preventDefault();
    });
});