const router = require('express').Router();
const articleController = require('../controllers/articleController');

router
  .route('/api/articles')
  .post(articleController.create)
  .get(articleController.findAll);

router.route('/api/articles/:id').delete(articleController.delete);

module.exports = router;