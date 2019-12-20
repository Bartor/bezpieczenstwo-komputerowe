module.exports = {
    navLinks: (logged) => logged ? [
        {
            description: 'Account',
            url: '/account'
        },
        {
            description: 'Transfer',
            url: '/account/transfer'
        },
        {
            description: 'Logout',
            url: '/account/logout'
        }
    ] : [
        {
            description: 'Login',
            url: '/login'
        },
        {
            description: 'Register',
            url: '/login/register'
        }
    ],
    tokenTimeout: 3600,
    adminAccount: 'admin@example.com'
};