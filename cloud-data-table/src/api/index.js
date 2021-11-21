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
function saveXlsxDocument(params) {
  return axios.post(`${config.baseUrl}/xlsx/savexlsxcredential`, params);
}
function showXlsxInfo() {
  return axios.get(`${config.baseUrl}/xlsx/getxlsxlist`);
}
function showXlsxDetail(params) {
  return axios.post(`${config.baseUrl}/xlsx/xlsxcontent`, params);
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
  saveXlsxDocument,
  showXlsxInfo,
  showXlsxDetail
};
