const { Router } = require('express');
const xlsxRouter = Router();
const mongoose = require('mongoose');
const { XlsxData } = require('../models/xlsxData');

// 새로운 xlsx document 저장
xlsxRouter.post('/savexlsxcredential', async (req, res) => {
  try {
    console.log(req.body);
    const { credentialName, content } = req.body;

    let insert = {
      _id: mongoose.Types.ObjectId(),
      credentialName: credentialName,
      content: content,
    };

    var xlsxData = new XlsxData(insert);

    let doc = await xlsxData.save(function (err) {
      if (err) console.log(err);
      return;
    });
    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

xlsxRouter.get('/getxlsxlist', async (req, res) => {
  try {
    console.log(req.body);
    const xlsxResult = await XlsxData.find({}, { credentialName: 1 });
    return res.send(xlsxResult);
  } catch (err) {
    console.log(err);
  }
});

xlsxRouter.post('/xlsxcontent', async (req, res) => {
  try {
    console.log(req.body);
    const { _id, credentialName } = req.body;
    const xlsxContent = await XlsxData.findOne(
      {
        _id: _id,
        credentialName: credentialName,
      },
      { _id: 0, content: 1 }
    );
    return res.send(xlsxContent);
  } catch (err) {
    console.log(err);
  }
});

module.exports = { xlsxRouter };
