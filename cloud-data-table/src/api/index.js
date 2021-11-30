import axios from "axios";

const config = {
  baseUrl: "http://localhost:8888",
};

function validateEc2Certification(params) {
  return axios.post(`${config.baseUrl}/aws/ec2`, params);
}

// credential
function showCredentialInfoByCategory(categoryInfo) {
  return axios.post(`${config.baseUrl}/credential/categorycredential`, categoryInfo);
}

function showCredentialDetail(credentialInfo) {
  return axios.post(`${config.baseUrl}/credential/credentialdetail`, credentialInfo);
}

function insertCredential(credentialInfo) {
  return axios.post(`${config.baseUrl}/credential/insertcredential`, credentialInfo);
}

function updateCredential(credentialInfo) {
  return axios.put(`${config.baseUrl}/credential/updatecredential`, credentialInfo);
}

function deleteCredential(credentialInfo) {
  return axios.post(`${config.baseUrl}/credential/deletecredential`, credentialInfo);
}

// RDBMS
function checkRdbmsConnection(params) {
  return axios.post(`${config.baseUrl}/myclass/checkconnection`, params);
}

function checkTableData(params) {
  return axios.post(`${config.baseUrl}/myclass/checktabledata`, params);
}

function showCredentialInfo() {
  return axios.get(`${config.baseUrl}/myclass/showcredentialinfo`);
}

function showRdbmsTableData(params) {
  return axios.post(`${config.baseUrl}/myclass/rdbms`, params);
}

// XLSX
function showXlsxInfo() {
  return axios.get(`${config.baseUrl}/xlsx/getxlsxlist`);
}

function showXlsxDetail(params) {
  return axios.post(`${config.baseUrl}/xlsx/xlsxcontent`, params);
}

function saveXlsxDocument(params) {
  return axios.post(`${config.baseUrl}/xlsx/savexlsxcredential`, params);
}

function saveXlsxColumn(params) {
  return axios.post(`${config.baseUrl}/xlsx/savexlsxcolumn`, params);
}

function deleteXlsxDocument(params) {
  return axios.post(`${config.baseUrl}/xlsx/deletexlsxcredential`, params);
}

// AWS SDK JS V3
function saveEc2Instances() {
  return axios.post(`${config.baseUrl}/awsver3/ec2instances`);
} 

function saveEc2Keypairs() {
  return axios.post(`${config.baseUrl}/awsver3/ec2keypairs`);
}

function saveEc2Vpcs() {
  return axios.post(`${config.baseUrl}/awsver3/ec2vpcs`);
}

function saveEc2Internetgateways() {
  return axios.post(`${config.baseUrl}/awsver3/ec2internetgateways`);
}

function saveEc2Addresses() {
  return axios.post(`${config.baseUrl}/awsver3/ec2addresses`);
}

function saveEc2Subnets() {
  return axios.post(`${config.baseUrl}/awsver3/ec2subnets`);
}

function saveEc2Routetables() {
  return axios.post(`${config.baseUrl}/awsver3/ec2routetables`);
}

function saveEc2Networkacls() {
  return axios.post(`${config.baseUrl}/awsver3/ec2networkacls`);
}

function saveElbv2Loadbalancers() {
  return axios.post(`${config.baseUrl}/awsver3/elbv2loadbalancers`);
}

function saveElbv2Targetgroups() {
  return axios.post(`${config.baseUrl}/awsver3/elbv2targetgroups`);
}

function saveS3Bucketlist() {
  return axios.post(`${config.baseUrl}/awsver3/s3bucketslist`);
}

function showAwsTableData(params) {
  return axios.post(`${config.baseUrl}/awsver3/findawsdocument`, params);
} 

function showAwsApiList() {
  return axios.get(`${config.baseUrl}/awsver3/findawsapilist`);
}

function saveAwsColumn(params) {
  return axios.post(`${config.baseUrl}/awsver3/saveawscolumn`, params);
}

export {
  validateEc2Certification,
  showCredentialInfoByCategory,
  showCredentialDetail,
  insertCredential,
  updateCredential,
  deleteCredential,
  checkRdbmsConnection,
  checkTableData,
  showCredentialInfo,
  showRdbmsTableData,
  showXlsxInfo,
  showXlsxDetail,
  saveXlsxDocument,
  saveXlsxColumn,
  deleteXlsxDocument,
  saveEc2Instances,
  saveEc2Keypairs,
  saveEc2Vpcs,
  saveEc2Internetgateways,
  saveEc2Addresses,
  saveEc2Subnets,
  saveEc2Routetables,
  saveEc2Networkacls,
  saveElbv2Loadbalancers,
  saveElbv2Targetgroups,
  saveS3Bucketlist,
  showAwsTableData,
  showAwsApiList,
  saveAwsColumn
};
