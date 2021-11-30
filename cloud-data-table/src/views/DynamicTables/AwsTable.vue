<template>
  <b-container>
    <b-row class="mt-5 mb-3">
      <b-col>
        <b-form-select
          class="shadow-sm"
          v-model="selectedAwsDoc"
          :options="awsApiList"
          @change="setTableData"
        ></b-form-select>
      </b-col>
      <!-- <b-col>
        <b-form-select
          class="shadow-sm"
          v-model="selectedAwsCredential"
          :options="awsCredentialOptions"
        ></b-form-select>
      </b-col> -->
      <b-col align-self="center">
        <div class="float-right">
          <b-icon-gear class="" font-scale="2" v-b-modal.modalPopover></b-icon-gear>
          <b-modal id="modalPopover" title="AWS API Management">
            <p>Get AWS API</p>
            <b-row>
              <b-col>
                <b-form-select
                  class="shadow-sm"
                  v-model="selectedAwsService"
                  :options="awsServiceOptions"
                ></b-form-select>
              </b-col>
              <b-col>
                <b-button @click="getAwsData">Get</b-button>
              </b-col>
            </b-row>
          </b-modal>
          <b-icon-plus-circle class="ml-3" font-scale="2"></b-icon-plus-circle>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col>
        <b-form-group
          id="fieldset-3"
          label="Column Show And Hide: "
          label-for="input-3"
        >
          <b-form-tags
            input-id="tags-separators"
            v-model="selectedColumn"
            separator=" ,;"
            placeholder="Enter new tags separated by space, comma or semicolon"
            no-add-on-change
            no-outer-focus
          >
            <template v-slot="{ tags, disabled, removeTag }">
              <b-form-select
                class="mb-3"
                id="input-3"
                v-model="selectedColumn"
                :options="colSelectArr"
                multiple
              >
              </b-form-select>
              <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                <li v-for="tag in tags" :key="tag" class="list-inline-item">
                  <b-form-tag
                    @remove="removeTag(tag)"
                    :title="tag"
                    :disabled="disabled"
                    variant="info"
                    >{{ tag }}</b-form-tag
                  >
                </li>
              </ul>
            </template>
          </b-form-tags>
        </b-form-group>
      </b-col>
      <b-col>
        <b-button class="shadow-sm" variant="primary" @click="saveColumnInfo"
          >Save Column Info</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col>
        <b-table
          class="shadow-sm"
          hover
          :fields="selectedColumn"
          :items="awsDataArr"
        ></b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  saveAwsColumn,
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
} from "../../api";
export default {
  data() {
    return {
      colSelectArr: [],
      selectedColumn: [],

      selectedAwsService: null,
      awsServiceOptions: [
        { value: null, text: "Please select a Service", disabled: true },
        { value: "ec2instances", text: "EC2 Instance" },
        { value: "ec2keypairs", text: "EC2 Keypair" },
        { value: "ec2vpcs", text: "EC2 VPC" },
        { value: "ec2internetgateways", text: "ec2internetgateways" },
        { value: "ec2addresses", text: "ec2addresses" },
        { value: "ec2subnets", text: "ec2subnets" },
        { value: "ec2routetables", text: "ec2routetables" },
        { value: "ec2networkacls", text: "ec2networkacls" },
        { value: "elbv2loadbalancers", text: "elbv2loadbalancers" },
        { value: "elbv2targetgroups", text: "elbv2targetgroups" },
        { value: "s3bucketslist", text: "s3bucketslist" },
      ],
      selectedAwsCredential: null,
      awsCredentialOptions: [
        { value: null, text: "Please select a Credential", disabled: true },
        { value: "myaws", text: "myaws" },
        { value: "mysql", text: "mysql" },
      ],
      awsDataArr: [],
      selectedIndexColumn: null,

      selectedAwsDoc: null,
      awsApiList: [],
    };
  },
  methods: {
    setTableData() {
      let me = this;
      console.log(this.selectedAwsDoc);
      // init
      me.colSelectArr = [];
      me.selectedColumn = [];
      me.awsDataArr = [];
      // DB find
      showAwsTableData(this.selectedAwsDoc)
        .then((response) => {
          console.log(response.data);
          // string to value
          let responseArr = JSON.parse(response.data.content); // 실제 DATA
          console.log(responseArr);
          let instanceArr = [];

          if (this.selectedAwsDoc.credentialName == "ec2instances") {
            // ec2 instances 일때 - Todo. 이것도 case 별로 하나하나 customizing 할건가?

            for (let i = 0; i < responseArr.length; i++) {
              instanceArr.push(responseArr[i]["Instances"][0]);
            }
          } else {
            instanceArr = responseArr;
          }
          console.log(instanceArr);
          me.awsDataArr = instanceArr;
          // Todo. 뭐라고 코드를 꼬아 놓은건지 해석을 해봐야 함.

          // columnData set
          let colArr = Object.keys(instanceArr[0]);
          let tmpArr = [];
          for (let item of colArr) {
            let rowData = { text: item, value: item };
            tmpArr.push(rowData);
          }
          me.selectedColumn = response.data.selectedColumns;
          me.colSelectArr = tmpArr;
          // tableData set
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAwsData: async function () {
      // DB insert & update
      switch (this.selectedAwsService) {
        case "ec2instances":
          await saveEc2Instances();
          break;
        case "ec2keypairs":
          await saveEc2Keypairs();
          break;
        case "ec2vpcs":
          await saveEc2Vpcs();
          break;
        case "ec2internetgateways":
          await saveEc2Internetgateways();
          break;
        case "ec2addresses":
          await saveEc2Addresses();
          break;
        case "ec2subnets":
          await saveEc2Subnets();
          break;
        case "ec2routetables":
          await saveEc2Routetables();
          break;
        case "ec2networkacls":
          await saveEc2Networkacls();
          break;
        case "elbv2loadbalancers":
          await saveElbv2Loadbalancers();
          break;
        case "elbv2targetgroups":
          await saveElbv2Targetgroups();
          break;
        case "s3bucketslist":
          await saveS3Bucketlist();
          break;
      }
    },
    saveColumnInfo() {
      console.log(this.selectedAwsDoc);
      console.log(this.selectedColumn);
      let params = {
        selectedColumns: this.selectedColumn
      };
      Object.assign(params, this.selectedAwsDoc);
      saveAwsColumn(params)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    showAwsApiList()
      .then((response) => {
        let selectData = response.data;
        let selectArr = [{ value: null, text: "Credential Info", disabled: true }];

        for (let item of selectData) {
          let data = { text: item.credentialName, value: item };
          selectArr.push(data);
        }
        this.awsApiList = selectArr;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style></style>
