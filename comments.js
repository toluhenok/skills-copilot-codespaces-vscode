// Create web server
// -----------------

// Import express
const express = require('express');
// Import comment controller
const commentController = require('../controllers/commentController');
// Import auth controller
const authController = require('../controllers/authController');

// Create router
const router = express.Router({ mergeParams: true });

// Restrict all routes after this point to logged in users
router.use(authController.protect);

// Routes
// -----------------

// CRUD
router
  .route('/')
  .get(commentController.getAllComments)
  .post(commentController.setPostUserIds, commentController.createComment);

router
  .route('/:id')
  .get(commentController.getComment)
  .patch(
    authController.restrictTo('user', 'admin'),
    commentController.updateComment
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    commentController.deleteComment
  );

// Export router
module.exports = router;