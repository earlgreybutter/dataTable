const { Router } = require('express');
const awsRouter = Router();
const { EC2Client, DescribeInstancesCommand } = require('@aws-sdk/client-ec2');

const { Certification } = require('../models/Certification');
const { Column } = require('../models/Column');
const { AwsData } = require('../models/AwsData');

awsRouter.post('/ec2', async (req, res) => {
  const { accessKeyId, secretAccessKey } = req.body;
  try {
    const client = new EC2Client({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
    const command = new DescribeInstancesCommand({
      DryRun: false,
    });
    const response = await client.send(command);
    res.send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

// 수정 필요
awsRouter.post('/save', async (req, res) => {
  try {
    const { tableName, accessKeyId, secretAccessKey, region, service } =
      req.body.data.formData;

    const certification = new Certification(req.body.data.formData);
    await certification.save();

    await Column.insertMany(req.body.data.tableData);
    await AwsData.insertMany(req.body.data.awsData);

    return res.send('success');
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

// 수정 필요
awsRouter.get('/tables', async (req, res) => {
  const tableName = req.query.tableName;
  try {
    if (!tableName) {
      const tableListResult = await Certification.find({}).select('tableName');
      res.send(tableListResult);
    } else {
      const dataResult = await AwsData.find()
        .where('tableName')
        .equals(tableName);

      const columnResult = await Column.find()
        .where('tableName')
        .equals(tableName)
        .select('selected edited');

      res.send({ columns: columnResult, data: dataResult });
    }
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

// 수정 필요
awsRouter.post('/columns', async (req, res) => {
  const { newColumnName, tableName } = req.body;

  const addNewColumnParams = {
    selected: newColumnName,
    edited: newColumnName,
    tableName,
  };

  const result = await Column.insertMany(addNewColumnParams);
  return res.send(result);
});

module.exports = { awsRouter };
