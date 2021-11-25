const { Router } = require('express');
const awsver3Router = Router();
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

// ec2 instances
awsver3Router.post('/ec2instances', async (req, res) => {
  try {
    const { accessKeyId, secretAccessKey } = req.body;
    const client = new EC2Client({
      credentials: {
        accessKeyId,
        secretAccessKey,
      }, // not preferred way
    });
    const command = new DescribeInstancesCommand({
      DryRun: false,
    });
    const response = await client.send(command);
    res.send(response);
  } catch (err) {
    console.log(err);
  }
});

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

awsver3Router.post('/ec2keypairs', async (req, res) => {
  try {
    let config = {};
    let input = {};
    const client = new EC2Client(config);
    const command = new DescribeKeyPairsCommand(input);
    const response = await client.send(command);
    return res.send(response);
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
    return res.send(response);
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
    return res.send(response);
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
    return res.send(response);
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
    return res.send(response);
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
    return res.send(response);
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
    return res.send(response);
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
    return res.send(response);
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
    return res.send(response);
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

    return res.send(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = { awsver3Router };
