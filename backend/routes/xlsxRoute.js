const { Router } = require('express');
const xlsxRouter = Router();
const mongoose = require('mongoose');
const { XlsxData } = require('../models/xlsxData');

// 목록 가져오기
xlsxRouter.get('/getxlsxlist', async (req, res) => {
  try {
    console.log(req.body);
    const xlsxResult = await XlsxData.find({}, { credentialName: 1 });
    return res.send(xlsxResult);
  } catch (err) {
    console.log(err);
  }
});

// document 하나의 data 가져오기
xlsxRouter.post('/xlsxcontent', async (req, res) => {
  try {
    console.log(req.body);
    const { _id, credentialName } = req.body;
    const xlsxContent = await XlsxData.findOne({
      _id: _id,
      credentialName: credentialName,
    });
    return res.send(xlsxContent);
  } catch (err) {
    console.log(err);
  }
});

// 새로운 xlsx document 저장 : 이걸로 insert, update 모두 하는 것이 목표
xlsxRouter.post('/savexlsxcredential', async (req, res) => {
  try {
    console.log(req.body);
    const { credentialName, content, _id } = req.body;

    let doc = null;

    if (_id === undefined || _id === null) {
      // insert
      let insert = {
        _id: mongoose.Types.ObjectId(),
        credentialName: credentialName,
        owner: 'purpleduck',
        content: content,
      };

      var xlsxData = new XlsxData(insert);

      doc = await xlsxData.save(function (err) {
        if (err) console.log(err);
        return;
      });
    } else {
      // update
      let update = {
        $set: {
          credentialName: credentialName,
          owner: 'purpleduck',
          content: content,
        },
      };

      let options = { new: true, upsert: true };

      doc = await XlsxData.findByIdAndUpdate(
        _id,
        update,
        options,
        (err, doc) => {
          if (err) console.log('Something wrong when save xlsx data');
          console.log(doc);
        }
      ).clone();
    }

    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

// 보여줄 column update
xlsxRouter.post('/savexlsxcolumn', async (req, res) => {
  try {
    console.log(req.body);
    const { _id, selectedColumns } = req.body;

    // update
    let update = {
      $set: {
        selectedColumns
      },
    };

    let options = { new: true, upsert: true };  // upsert 에 대해서 더 알아봐야 함.

    let doc = await XlsxData.findByIdAndUpdate(_id, update, options, (err, doc) => {
      if (err) console.log('Something wrong when save xlsx data');
      console.log(doc);
    }).clone();

    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

xlsxRouter.post('/deletexlsxcredential', async (req, res) => {
  try {
    console.log(req.body);
    const { _id } = req.body;

    let doc = await XlsxData.findByIdAndDelete(_id, null, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log('Deleted : ', docs);
      }
    }).clone();

    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

module.exports = { xlsxRouter };
