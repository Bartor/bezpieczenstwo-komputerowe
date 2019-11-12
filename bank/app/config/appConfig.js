module.exports = {
  navLinks: (logged) => logged ? [
      {
          description: 'Account',
          url: '/account'
      },
      {
          description: 'Transfer',
          url: '/account/transfer'
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
};