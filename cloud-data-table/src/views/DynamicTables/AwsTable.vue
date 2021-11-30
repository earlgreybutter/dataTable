<template>
  <b-container>
    <b-row class="mt-5 mb-3">
      <b-col>
        <b-form-select
          class="shadow-sm"
          v-model="selectedAwsService"
          :options="awsServiceOptions"
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
            <b-button @click="getAwsData">Start</b-button>
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
        <b-button class="shadow-sm" variant="primary" @click="saveColumnInfo">Save Column Info</b-button>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col>
        <b-table class="shadow-sm" hover :fields="selectedColumn" :items="awsDataArr"></b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { saveAwsColumn, saveEc2Instance, showAwsTableData } from '../../api';
export default {
  data() {
    return {
      selectedAwsService: null,
      colSelectArr: [],
      selectedColumn: [],
      awsServiceOptions: [
        { value: null, text: "Please select a Service", disabled: true },
        { value: "ec2instances", text: "EC2 Instance" },
        { value: "ec2keypairs", text: "EC2 Keypair" },
        { value: "ec2vpcs", text: "EC2 VPC" },
      ],
      selectedAwsCredential: null,
      awsCredentialOptions: [
        { value: null, text: "Please select a Credential", disabled: true },
        { value: "myaws", text: "myaws" },
        { value: "mysql", text: "mysql" },
      ],
      awsDataArr: [],
      selectedIndexColumn: null,
    };
  },
  methods: {
    setTableData() {
      let me = this;
      console.log(this.selectedAwsService);
      // init
      me.colSelectArr = [];
      me.selectedColumn = [];
      me.awsDataArr = [];
      // DB find
      let params = {
        credentialName: this.selectedAwsService
      }
      showAwsTableData(params)
        .then((response) => {
          console.log(response.data);
          // string to value 
          let responseArr = JSON.parse(response.data.content);
          let instanceArr = [];
          for ( let i = 0; i < responseArr.length; i++){
            instanceArr.push(responseArr[i]['Instances'][0]);
          }
          console.log(instanceArr);
          // columnData set
          let colArr = Object.keys(instanceArr[0]);
          let tmpArr = [];
          for (let item of colArr) {
            let rowData = {text: item, value: item};
            tmpArr.push(rowData);
          }
          me.selectedColumn = response.data.selectedColumns;
          me.colSelectArr = tmpArr;
          // tableData set 
          me.awsDataArr = instanceArr;
        })
        .catch((err) => {
          console.log(err);
        })
    },
    getAwsData() {
      console.log();
      // DB insert & update
      saveEc2Instance()
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveColumnInfo() {
      console.log(this.selectedAwsService);
      console.log(this.selectedColumn);
      let params = {
        credentialName: this.selectedAwsService,
        selectedColumns: this.selectedColumn
      };
      saveAwsColumn(params)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style></style>
