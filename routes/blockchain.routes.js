const express = require('express');
const router = express.Router();


const {getBlocks,mineblock,getblock,checkChainValidity} = require('../controllers/blockchain.controller.js');


router.get('/blocks', getBlocks);
router.post('/mine', mineblock);
router.get('/block/:height', getblock);
router.get('/validate', checkChainValidity);
module.exports = router;