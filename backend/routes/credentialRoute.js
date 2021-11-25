const { Router } = require('express');
const credentialRouter = Router();
const mongoose = require('mongoose');
const { Certification } = require('../models/Certification');

// 카테고리별 credential 목록 find (AWS, RDBMS) : 분리 필요
credentialRouter.post('/categorycredential', async (req, res) => {
  try {
    console.log(req.body);
    const { credentialCategory } = req.body;
    const certificationResult = await Certification.find({
      credentialCategory: credentialCategory,
      owner: 'purpleduck',
    });
    return res.send(certificationResult);
  } catch (err) {
    return res.status(500).send('Error');
  }
});

// credential document find
credentialRouter.post('/credentialdetail', async (req, res) => {
  try {
    console.log(req.body);
    const { credential_name, credential_category } = req.body;
    const certificationResult = await Certification.find({
      credentialName: credential_name,
      credentialCategory: credential_category,
      owner: 'purpleduck',
    });
    console.log(certificationResult);
    return res.send(certificationResult);
  } catch (err) {
    return res.status(500).send('Error');
  }
});

// credentail document insert
credentialRouter.post('/insertcredential', async (req, res) => {
  try {
    console.log(req.body);
    const {
      dbname,
      ip,
      password,
      port,
      selectedDB,
      username,
      credentialCategory,
      credentialName,
      defaultRegion,
      accessKeyId,
      secretAccessKey,
      owner,
    } = req.body;

    let insert = {
      _id: mongoose.Types.ObjectId(),
      credentialName: credentialName,
      credentialCategory: credentialCategory,
      owner: 'purpleduck',
      selectedDB: selectedDB,
      ip: ip,
      port: port,
      dbname: dbname,
      username: username,
      password: password,
      defaultRegion: defaultRegion,
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    };

    var certification = new Certification(insert);

    let doc = await certification.save(function (err) {
      if (err) console.log(err);
      return;
    });

    console.log(doc);
    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

credentialRouter.put('/updatecredential', async (req, res) => {
  try {
    console.log(req.body);
    const {
      _id,
      dbname,
      ip,
      password,
      port,
      selectedDB,
      username,
      credentialCategory,
      credentialName,
      defaultRegion,
      accessKeyId,
      secretAccessKey,
      owner,
    } = req.body;

    let update = {
      $set: {
        credentialName: credentialName,
        credentialCategory: credentialCategory,
        owner: owner,
        selectedDB: selectedDB,
        ip: ip,
        port: port,
        dbname: dbname,
        username: username,
        password: password,
        defaultRegion: defaultRegion,
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    };

    let options = { new: true, upsert: true };

    let doc = await Certification.findByIdAndUpdate(
      _id,
      update,
      options,
      (err, doc) => {
        if (err) console.log('Something wrong when save certification data');
        console.log(doc);
      }
    ).clone();

    console.log(doc);
    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

credentialRouter.post('/deletecredential', async (req, res) => {
  try {
    console.log(req);
    const { _id } = req.body;

    let doc = await Certification.findByIdAndDelete(
      _id,
      null,
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log('Deleted : ', docs);
        }
      }
    ).clone();

    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

module.exports = { credentialRouter };
