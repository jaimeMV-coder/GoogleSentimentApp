const verify = require('./verifyToken');
const router = require('express').Router();
const {
    consultTextByUser,
    deleteTextById,
    editTextById,
    addNewText,
    consultTextSortDescendentScore,
    consultTextSortAscendentScore,
    consultTextSortAscendentDate,
    consultTextSortDescendentDate
} = require('../controllers/textController');

router.get('/listText',verify,consultTextByUser);
router.post('/addText',verify,addNewText);
router.post('/deleteText', verify, deleteTextById);
router.post('/editText', verify, editTextById);
router.get('/SortDescendentScore', verify, consultTextSortDescendentScore);
router.get('/SortAscendentScore', verify, consultTextSortAscendentScore);
router.get('/SortDescendentDate', verify, consultTextSortDescendentDate);
router.get('/SortAscendentDate', verify, consultTextSortAscendentDate);
module.exports = router;