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

    console.log(JSON.stringify(response['Reservations']));  // value to string

    
    // DB 
    let insert = {
      _id: mongoose.Types.ObjectId(),
      credentialName: 'ec2instances',
      owner: 'purpleduck',
      content: JSON.stringify(response['Reservations'])
    }

    let awsVer3Data = new AwsVer3Data(insert);

    let doc = await awsVer3Data.save(function (err) {
      if (err) console.log(err);
      return;
    });
    

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
    return res.send(response['KeyPairs']);
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
    return res.send(response['Vpcs']);
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
    return res.send(response['InternetGateways']);
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
    return res.send(response['Addresses']);
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
    return res.send(response['Subnets']);
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
    return res.send(response['RouteTables']);
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
    return res.send(response['NetworkAcls']);
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
    return res.send(response['LoadBalancers']);
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
    return res.send(response['TargetGroups']);
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

    return res.send(response['Buckets']);
  } catch (err) {
    console.log(err);
  }
});

// DB find 
awsver3Router.post('/findawsdocument', async (req, res) => {
  try {
    console.log(req.body); // req 로 credential name 받아오기
    const { credentialName } = req.body;
    const awsResult = await AwsVer3Data.findOne({
      credentialName: credentialName
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
    const { credentialName, selectedColumns } = req.body;

    let filter = {
      credentialName
    }

    let update = {
      $set: {
        credentialName,
        selectedColumns
      }
    }

    let options = {};

    let doc = await AwsVer3Data.findOneAndUpdate(filter, update, options, (err, doc) => {
      if (err) console.log('Something wrong when save aws column data')
      console.log(doc);
    }).clone();
    return res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

module.exports = { awsver3Router };
