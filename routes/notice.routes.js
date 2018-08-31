module.exports = (app) => {
    const Notices = require('../controllers/Notice.controllers.js');

    // Create a new Notice
    app.post('/Notices', Notices.create);

    // Retrieve all Notices
    app.get('/Notices', Notices.findAll);

    // Retrieve a single Notice with NoticeId
    app.get('/Notices/:NoticeId', Notices.findOne);

    // Update a Notice with NoticeId
    app.put('/Notices/:NoticeId', Notices.update);

    // Delete a Notice with NoticeId
    app.delete('/Notices/:NoticeId', Notices.delete);
}