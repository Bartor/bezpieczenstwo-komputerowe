var mime_samples = [
  { 'mime': 'application/javascript', 'samples': [
    { 'url': 'http://localhost/account/transfer/0f87617e-6e39-449c-a42c-7bc553b86136/accept/', 'dir': '_m0/0', 'linked': 0, 'len': 2 },
    { 'url': 'http://localhost/static/js/transfer.js', 'dir': '_m0/1', 'linked': 2, 'len': 1156 },
    { 'url': 'http://localhost/static/js/transferDetails.js', 'dir': '_m0/2', 'linked': 2, 'len': 1376 } ]
  },
  { 'mime': 'application/xhtml+xml', 'samples': [
    { 'url': 'http://localhost/', 'dir': '_m1/0', 'linked': 2, 'len': 741 },
    { 'url': 'http://localhost/account/', 'dir': '_m1/1', 'linked': 5, 'len': 2382 },
    { 'url': 'http://localhost/account/transfer/', 'dir': '_m1/2', 'linked': 5, 'len': 978 },
    { 'url': 'http://localhost/account/transfer/0f87617e-6e39-449c-a42c-7bc553b86136/', 'dir': '_m1/3', 'linked': 2, 'len': 1039 } ]
  },
  { 'mime': 'text/css', 'samples': [
    { 'url': 'http://localhost/static/js/modules/Notification.js', 'dir': '_m2/0', 'linked': 2, 'len': 942 },
    { 'url': 'http://localhost/static/stylesheets/account.css', 'dir': '_m2/1', 'linked': 2, 'len': 190 },
    { 'url': 'http://localhost/static/stylesheets/header.css', 'dir': '_m2/2', 'linked': 2, 'len': 418 },
    { 'url': 'http://localhost/static/stylesheets/index.css', 'dir': '_m2/3', 'linked': 2, 'len': 99 },
    { 'url': 'http://localhost/static/stylesheets/transfer.css', 'dir': '_m2/4', 'linked': 2, 'len': 597 },
    { 'url': 'http://localhost/static/stylesheets/transferDetails.css', 'dir': '_m2/5', 'linked': 2, 'len': 437 } ]
  },
  { 'mime': 'text/plain', 'samples': [
    { 'url': 'http://localhost/account/', 'dir': '_m3/0', 'linked': 5, 'len': 28 },
    { 'url': 'http://localhost/static/stylesheets/main.css', 'dir': '_m3/1', 'linked': 2, 'len': 1007 } ]
  }
];

var issue_samples = [
  { 'severity': 2, 'type': 30701, 'samples': [
    { 'url': 'http://localhost/static/js/modules/Notification.js', 'extra': 'conflicting \x27Cache-Control\x27 data', 'sid': '0', 'dir': '_i0/0' },
    { 'url': 'http://localhost/static/js/transfer.js', 'extra': 'conflicting \x27Cache-Control\x27 data', 'sid': '0', 'dir': '_i0/1' },
    { 'url': 'http://localhost/static/js/transferDetails.js', 'extra': 'conflicting \x27Cache-Control\x27 data', 'sid': '0', 'dir': '_i0/2' },
    { 'url': 'http://localhost/static/stylesheets/account.css', 'extra': 'conflicting \x27Cache-Control\x27 data', 'sid': '0', 'dir': '_i0/3' },
    { 'url': 'http://localhost/static/stylesheets/header.css', 'extra': 'conflicting \x27Cache-Control\x27 data', 'sid': '0', 'dir': '_i0/4' },
    { 'url': 'http://localhost/static/stylesheets/index.css', 'extra': 'conflicting \x27Cache-Control\x27 data', 'sid': '0', 'dir': '_i0/5' },
    { 'url': 'http://localhost/static/stylesheets/main.css', 'extra': 'conflicting \x27Cache-Control\x27 data', 'sid': '0', 'dir': '_i0/6' },
    { 'url': 'http://localhost/static/stylesheets/transfer.css', 'extra': 'conflicting \x27Cache-Control\x27 data', 'sid': '0', 'dir': '_i0/7' },
    { 'url': 'http://localhost/static/stylesheets/transferDetails.css', 'extra': 'conflicting \x27Cache-Control\x27 data', 'sid': '0', 'dir': '_i0/8' } ]
  },
  { 'severity': 0, 'type': 10901, 'samples': [
    { 'url': 'http://localhost/account/transfer/0f87617e-6e39-449c-a42c-7bc553b86136/', 'extra': '', 'sid': '0', 'dir': '_i1/0' },
    { 'url': 'http://localhost/account/transfer/1b348ad3-1c76-478f-b2e8-43a8c20d6155/', 'extra': '', 'sid': '0', 'dir': '_i1/1' } ]
  },
  { 'severity': 0, 'type': 10802, 'samples': [
    { 'url': 'http://localhost/account/', 'extra': 'text/plain', 'sid': '0', 'dir': '_i2/0' },
    { 'url': 'http://localhost/account/transfer/', 'extra': 'text/plain', 'sid': '0', 'dir': '_i2/1' },
    { 'url': 'http://localhost/account/transfer/0f87617e-6e39-449c-a42c-7bc553b86136/', 'extra': 'text/plain', 'sid': '0', 'dir': '_i2/2' },
    { 'url': 'http://localhost/account/transfer/0f87617e-6e39-449c-a42c-7bc553b86136/accept/', 'extra': 'text/plain', 'sid': '0', 'dir': '_i2/3' },
    { 'url': 'http://localhost/account/transfer/1b348ad3-1c76-478f-b2e8-43a8c20d6155/', 'extra': 'text/plain', 'sid': '0', 'dir': '_i2/4' },
    { 'url': 'http://localhost/static/', 'extra': 'text/plain', 'sid': '0', 'dir': '_i2/5' },
    { 'url': 'http://localhost/static/js/', 'extra': 'text/plain', 'sid': '0', 'dir': '_i2/6' },
    { 'url': 'http://localhost/static/js/modules/', 'extra': 'text/plain', 'sid': '0', 'dir': '_i2/7' },
    { 'url': 'http://localhost/static/stylesheets/', 'extra': 'text/plain', 'sid': '0', 'dir': '_i2/8' },
    { 'url': 'http://localhost/login', 'extra': 'text/plain', 'sid': '0', 'dir': '_i2/9' } ]
  },
  { 'severity': 0, 'type': 10801, 'samples': [
    { 'url': 'http://localhost/static/js/modules/Notification.js', 'extra': 'text/css', 'sid': '0', 'dir': '_i3/0' } ]
  },
  { 'severity': 0, 'type': 10601, 'samples': [
    { 'url': 'http://localhost/account/transfer/', 'extra': '', 'sid': '0', 'dir': '_i4/0' } ]
  },
  { 'severity': 0, 'type': 10405, 'samples': [
    { 'url': 'http://localhost/account/transfer/0f87617e-6e39-449c-a42c-7bc553b86136/accept/', 'extra': '', 'sid': '0', 'dir': '_i5/0' },
    { 'url': 'http://localhost/login', 'extra': '', 'sid': '0', 'dir': '_i5/1' } ]
  },
  { 'severity': 0, 'type': 10403, 'samples': [
    { 'url': 'http://localhost/account/transfer/sfi9876', 'extra': '', 'sid': '0', 'dir': '_i6/0' } ]
  },
  { 'severity': 0, 'type': 10205, 'samples': [
    { 'url': 'http://localhost/sfi9876', 'extra': '', 'sid': '0', 'dir': '_i7/0' },
    { 'url': 'http://localhost/account/transfer/sfi9876', 'extra': '', 'sid': '0', 'dir': '_i7/1' },
    { 'url': 'http://localhost/account/transfer/0f87617e-6e39-449c-a42c-7bc553b86136/sfi9876', 'extra': '', 'sid': '0', 'dir': '_i7/2' },
    { 'url': 'http://localhost/account/transfer/1b348ad3-1c76-478f-b2e8-43a8c20d6155/sfi9876', 'extra': '', 'sid': '0', 'dir': '_i7/3' } ]
  },
  { 'severity': 0, 'type': 10204, 'samples': [
    { 'url': 'http://localhost/', 'extra': 'X-Powered-By', 'sid': '0', 'dir': '_i8/0' } ]
  },
  { 'severity': 0, 'type': 10201, 'samples': [
    { 'url': 'http://localhost/account/logout/', 'extra': 'token', 'sid': '0', 'dir': '_i9/0' } ]
  }
];

