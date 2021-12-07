const { Router } = require('express');
const awsver3Router = Router();
const mongoose = require('mongoose');
const { AwsVer3Data } = require('../models/awsVer3Data');
const {
  EC2Client,
  DescribeInstancesCommand,
  DescribeRegionsCommand,
  DescribeKeyPairsCommand,
  DescribeVpcsCommand,
  DescribeInternetGatewaysCommand,
  DescribeAddressesCommand,
  DescribeSubnetsCommand,
  DescribeRouteTablesCommand,
  DescribeNetworkAclsCommand,
} = require('@aws-sdk/client-ec2');

const {
  ElasticLoadBalancingV2Client,
  DescribeLoadBalancersCommand,
  DescribeTargetGroupsCommand,
} = require('@aws-sdk/client-elastic-load-balancing-v2');

const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3'); // CommonJS import

// 나중에 하자.
awsver3Router.post('/checkconnection', async (req, res) => {
  try {
    console.log(req.body);
    res.send('test checkconnection');
  } catch (err) {
    res.status(500).send(err);
  }
});

// 이건 credential 설정 시 사용
awsver3Router.post('/ec2regions', async (req, res) => {
  // req 를 보낼지말지 모름.
  try {
    console.log(req.body);

    // let config = {  // Optional
    //     credentials: {
    //         accessKeyId,
    //         secretAccessKey
    //     }
    // };
    let input = {
      AllRegions: false, // disabled 한거는 안나옴.
      DryRun: false, // check required permissions : 이렇게 해두면 config 는 뭐에 쓰나.
    };
    const client = new EC2Client();
    const command = new DescribeRegionsCommand(input);
    const response = await client.send(command);
    return res.send(response['Regions']); // Array
  } catch (err) {
    console.log(err);
  }
});

// ec2 instances
awsver3Router.post('/ec2instances', async (req, res) => {
  try {
    // const { accessKeyId, secretAccessKey } = req.body;
    let config = {
      // credentials: {
      //   accessKeyId,
      //   secretAccessKey,
      // }, // not preferred way
    };
    const client = new EC2Client(config);
    const command = new DescribeInstancesCommand({
      DryRun: false,
    });
    const response = await client.send(command);

    // DB insert & update
    let doc = await AwsVer3Data.findOneAndUpdate(
      { TableType: 'ec2instances' },
      {
        $set: {
          TableType: 'ec2instances',
          owner: 'purpleduck',
          content: JSON.stringify(response['Reservations']),
        },
      },
      {
        upsert: true,
        new: true,
      },
      function (err, results) {
        if (err) throw err;
        console.log(1);
      }
    ).clone();

    // 이런식으로 되어야 한다
    // try {
    //   let result = await AwsVer3Data.findOneAndUpdate({}).exec();
    //   if (result) {

    //   }
    // } catch(e) {

    // }
    
    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

awsver3Router.post('/ec2keypairs', async (req, res) => {
  try {
    let config = {};
    let input = {};
    const client = new EC2Client(config);
    const command = new DescribeKeyPairsCommand(input);
    const response = await client.send(command);

    // DB insert & update
    let doc = await AwsVer3Data.findOneAndUpdate(
      { TableType: 'ec2keypairs' },
      {
        $set: {
          TableType: 'ec2keypairs',
          owner: 'purpleduck',
          content: JSON.stringify(response['Keypairs']),
        },
      },
      {
        upsert: true,
        new: true,
      },
      function (err, results) {
        if (err) throw err;
        console.log(2);
      }
    ).clone();

    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

awsver3Router.post('/ec2vpcs', async (req, res) => {
  try {
    let config = {};
    let input = {};
    const client = new EC2Client(config);
    const command = new DescribeVpcsCommand(input);
    const response = await client.send(command);

    // DB insert & update
    let doc = await AwsVer3Data.findOneAndUpdate(
      { TableType: 'ec2vpcs' },
      {
        $set: {
          TableType: 'ec2vpcs',
          owner: 'purpleduck',
          content: JSON.stringify(response['Vpcs']),
        },
      },
      {
        upsert: true,
        new: true,
      },
      function (err, results) {
        if (err) throw err;
        console.log(3);
      }
    ).clone();

    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

awsver3Router.post('/ec2internetgateways', async (req, res) => {
  try {
    let config = {};
    let input = {};
    const client = new EC2Client(config);
    const command = new DescribeInternetGatewaysCommand(input);
    const response = await client.send(command);

    // DB insert & update
    let doc = await AwsVer3Data.findOneAndUpdate(
      { TableType: 'ec2internetgateways' },
      {
        $set: {
          TableType: 'ec2internetgateways',
          owner: 'purpleduck',
          content: JSON.stringify(response['InternetGateways']),
        },
      },
      {
        upsert: true,
        new: true,
      },
      function (err, results) {
        if (err) throw err;
        console.log(4);
      }
    ).clone();

    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

awsver3Router.post('/ec2addresses', async (req, res) => {
  try {
    let config = {};
    let input = {};
    const client = new EC2Client(config);
    const command = new DescribeAddressesCommand(input);
    const response = await client.send(command);

    // DB insert & update
    let doc = await AwsVer3Data.findOneAndUpdate(
      { TableType: 'ec2addresses' },
      {
        $set: {
          TableType: 'ec2addresses',
          owner: 'purpleduck',
          content: JSON.stringify(response['Addresses']),
        },
      },
      {
        upsert: true,
        new: true,
      },
      function (err, results) {
        if (err) throw err;
        console.log(5);
      }
    ).clone();

    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

awsver3Router.post('/ec2subnets', async (req, res) => {
  try {
    let config = {};
    let input = {};
    const client = new EC2Client(config);
    const command = new DescribeSubnetsCommand(input);
    const response = await client.send(command);

    // DB insert & update
    let doc = await AwsVer3Data.findOneAndUpdate(
      { TableType: 'ec2subnets' },
      {
        $set: {
          TableType: 'ec2subnets',
          owner: 'purpleduck',
          content: JSON.stringify(response['Subnets']),
        },
      },
      {
        upsert: true,
        new: true,
      },
      function (err, results) {
        if (err) throw err;
        console.log(6);
      }
    ).clone();

    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

awsver3Router.post('/ec2routetables', async (req, res) => {
  try {
    let config = {};
    let input = {};
    const client = new EC2Client(config);
    const command = new DescribeRouteTablesCommand(input);
    const response = await client.send(command);

    // DB insert & update
    let doc = await AwsVer3Data.findOneAndUpdate(
      { TableType: 'ec2routetables' },
      {
        $set: {
          TableType: 'ec2routetables',
          owner: 'purpleduck',
          content: JSON.stringify(response['RouteTables']),
        },
      },
      {
        upsert: true,
        new: true,
      },
      function (err, results) {
        if (err) throw err;
        console.log(7);
      }
    ).clone();

    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

awsver3Router.post('/ec2networkacls', async (req, res) => {
  try {
    let config = {};
    let input = {};
    const client = new EC2Client(config);
    const command = new DescribeNetworkAclsCommand(input);
    const response = await client.send(command);

    // DB insert & update
    let doc = await AwsVer3Data.findOneAndUpdate(
      { TableType: 'ec2networkacls' },
      {
        $set: {
          TableType: 'ec2networkacls',
          owner: 'purpleduck',
          content: JSON.stringify(response['NetworkAcls']),
        },
      },
      {
        upsert: true,
        new: true,
      },
      function (err, results) {
        if (err) throw err;
        console.log(8);
      }
    ).clone();

    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

// elastic load balancer v2
awsver3Router.post('/elbv2loadbalancers', async (req, res) => {
  try {
    let config = {};
    let input = {};
    const client = new ElasticLoadBalancingV2Client(config);
    const command = new DescribeLoadBalancersCommand(input);
    const response = await client.send(command);

    // DB insert & update
    let doc = await AwsVer3Data.findOneAndUpdate(
      { TableType: 'elbv2loadbalancers' },
      {
        $set: {
          TableType: 'elbv2loadbalancers',
          owner: 'purpleduck',
          content: JSON.stringify(response['LoadBalancers']),
        },
      },
      {
        upsert: true,
        new: true,
      },
      function (err, results) {
        if (err) throw err;
        console.log(9);
      }
    ).clone();

    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

awsver3Router.post('/elbv2targetgroups', async (req, res) => {
  try {
    let config = {};
    let input = {};
    const client = new ElasticLoadBalancingV2Client(config);
    const command = new DescribeTargetGroupsCommand(input);
    const response = await client.send(command);

    // DB insert & update
    let doc = await AwsVer3Data.findOneAndUpdate(
      { TableType: 'elbv2targetgroups' },
      {
        $set: {
          TableType: 'elbv2targetgroups',
          owner: 'purpleduck',
          content: JSON.stringify(response['TargetGroups']),
        },
      },
      {
        upsert: true,
        new: true,
      },
      function (err, results) {
        if (err) throw err;
        console.log(10);
      }
    ).clone();

    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

// s3
awsver3Router.post('/s3bucketslist', async (req, res) => {
  try {
    // credential 정보를 안넣었는데, 뭐가 나오고 있는지 모르겠다.
    let config = {};
    let input = {};
    const client = new S3Client(config);
    const command = new ListBucketsCommand(input);
    const response = await client.send(command);

    // DB insert & update
    let doc = await AwsVer3Data.findOneAndUpdate(
      { TableType: 's3bucketslist' },
      {
        $set: {
          TableType: 's3bucketslist',
          owner: 'purpleduck',
          content: JSON.stringify(response['Buckets']),
        },
      },
      {
        upsert: true,
        new: true,
      },
      function (err, results) {
        if (err) throw err;
        console.log(11);
      }
    ).clone();

    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

// Todo. aws 목록 가져오는 거
awsver3Router.get('/findawsapilist', async (req, res) => {
  try {
    const awsResult = await AwsVer3Data.find({}, { TableType: 1 });
    return res.send(awsResult);
  } catch (err) {
    console.log(err);
  }
});

// DB find
awsver3Router.post('/findawsdocument', async (req, res) => {
  try {
    console.log(req.body); // req 로 credential name 받아오기
    const { TableType } = req.body;
    const awsResult = await AwsVer3Data.findOne({
      TableType
    });

    return res.send(awsResult);
  } catch (err) {
    console.log(err);
  }
});

// save column data
awsver3Router.post('/saveawscolumn', async (req, res) => {
  try {
    console.log(req.body);
    const { TableType, selectedColumns } = req.body;

    let filter = {
      TableType,
    };

    let update = {
      $set: {
        TableType,
        selectedColumns
      },
    };

    let options = {};

    let doc = await AwsVer3Data.findOneAndUpdate(
      filter,
      update,
      options,
      (err, doc) => {
        if (err) console.log('Something wrong when save aws column data');
        console.log(doc);
      }
    ).clone();
    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

module.exports = { awsver3Router };
