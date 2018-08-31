var Notice = require('../models/notice.models.js');

exports.create = (req, res) => {

	if(!req.body.title) {
        return res.status(400).send({
            message: "Notice title can not be empty"
        });
    }

    // Create a Notice
    const notice = new Notice({
        title: req.body.title || "Untitled Notice", 
        dateNotice: req.body.dateNotice,
        bodyNotice: req.body.bodyNotice
    });

    // Save Notice in the database
    notice.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Notice."
        });
    });

}

exports.findAll = (req, res) => {
	Notice.find()
	.then(notices => {
		res.send(notices);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Algo deu errado ao buscar as noticias."
		});
	});
};

// Find a single Notice with a NoticeId
exports.findOne = (req, res) => {
    Notice.findById(req.params.NoticeId)
    .then(Notice => {
        if(!Notice) {
            return res.status(404).send({
                message: "Notice not found with id " + req.params.NoticeId
            });            
        }
        res.send(Notice);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Notice not found with id " + req.params.NoticeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Notice with id " + req.params.NoticeId
        });
    });
};

// Update a Notice identified by the NoticeId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.bodyNotice) {
        return res.status(400).send({
            message: "Notice body can not be empty"
        });
    }

    // Find Notice and update it with the request body
    Notice.findByIdAndUpdate(req.params.NoticeId, {
        title: req.body.title || "Untitled Notice",
        bodyNotice: req.body.bodyNotice
    }, {new: true})
    .then(Notice => {
        if(!Notice) {
            return res.status(404).send({
                message: "Notice not found with id " + req.params.NoticeId
            });
        }
        res.send(Notice);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Notice not found with id " + req.params.NoticeId
            });                
        }
        return res.status(500).send({
            message: "Error updating Notice with id " + req.params.NoticeId
        });
    });
};

// Delete a Notice with the specified NoticeId in the request
exports.delete = (req, res) => {
    Notice.findByIdAndRemove(req.params.NoticeId)
    .then(Notice => {
        if(!Notice) {
            return res.status(404).send({
                message: "Notice not found with id " + req.params.NoticeId
            });
        }
        res.send({message: "Notice deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Notice not found with id " + req.params.NoticeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Notice with id " + req.params.NoticeId
        });
    });
};