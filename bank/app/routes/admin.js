module.exports = (router, refs) => {
    router.get('/', (req, res) => {
        refs.db.getAllTransfers().then(transfers => {
            res.render('admin', {
                title: 'Adminpanel - Banco Epico',
                navLinks: refs.config.navLinks(req.authentication.passed),
                transfers: transfers
            });
        }).catch(err => {
            // this is an admin panel, they can see internal errors for this project
            res.status(500).json({error: err});
        });
    });

    router.get('/transfer/:id', (req, res) => {
        refs.db.getTransfer(req.params.id).then(transfers => {
            if (transfers.length === 1) {
                res.render('transferDetails', {
                    title: 'Transfer details - Banco Epico',
                    navLinks: refs.config.navLinks(req.authentication.passed),
                    admin: true,
                    transfer: transfers[0],
                    canAccept: transfers[0].sender === req.authentication.user && transfers[0].status === 'pending'
                });
            } else {
                res.status(500).json({error: 'Found multiple transfers', transfers: transfers});
            }
        });
    });

    router.get('/transfer/:id/accept', (req, res) => {
       refs.db.acceptTransfer(0, req.params.id, true).then(_ => {
           res.json({});
       }).catch(err => {
          res.status(500).json({error: err});
       });
    });

    router.get('/transfer/:id/cancel', (req, res) => {
        refs.db.cancelTransfer(0, req.params.id, true).then(_ => {
            res.json({});
        }).catch(err => {
            res.status(500).json({error: err});
        });
    });

    return router;
};