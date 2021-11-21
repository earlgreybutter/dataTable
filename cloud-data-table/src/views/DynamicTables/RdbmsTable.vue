<template>
  <b-container>
    <b-row class="mt-5 mb-3">
      <b-col>
        <b-form-select
          class="shadow-sm"
          v-model="selectedRdbmsCredential"
          :options="rdbmsCredentialInfo"
          @change="getTableByCredential"
        ></b-form-select>
      </b-col>
      <b-col>
        <b-form-select
          class="shadow-sm"
          v-model="selectedCredentialTable"
          :options="credentialTableInfo"
          @change="getTableData"
        ></b-form-select>
      </b-col>
      <b-col align-self="center">
        <div class="float-right">
          <b-icon-gear class="" font-scale="2"></b-icon-gear>
          <b-icon-plus-circle class="ml-3" font-scale="2"></b-icon-plus-circle>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group
          label="Columns in Selected Table"
          v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            v-model="checkedColumn"
            :options="columnInSelectedTable"
            :aria-describedby="ariaDescribedby"
            name="flavour-1a"
            stacked>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
      <b-col>
        <b-button class="shadow-sm" variant="primary">Load</b-button>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col>
        <b-table class="shadow-sm" hover :items="items"></b-table>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col offset="7" cols="3">
        <b-form-select
          class="shadow-sm"
          v-model="selectedIndexColumn"
          :options="indexColumns"
        ></b-form-select>
      </b-col>
      <b-col>
        <b-button block class="shadow-sm" variant="success">Save</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { checkRdbmsConnection, checkTableData, showCredentialInfo } from "../../api/index";

export default {
  data() {
    return {
      selectedRdbmsCredential: null,
      rdbmsCredentialInfo: [],
      selectedCredentialTable: null,
      credentialTableInfo: [{ value: null, text: "Table Info", disabled: true }],
      checkedColumn: [],
      columnInSelectedTable: [],
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
      selectedIndexColumn: null,
    };
  },
  methods: {
    // first select change 시 실행 
    getTableByCredential() {
      console.log(this.selectedRdbmsCredential);

      // sub select 초기화 
      this.selectedCredentialTable = null;
      this.credentialTableInfo = [{ value: null, text: "Table Info", disabled: true }];
      
      // 접속 정보에 해당하는 table list 를 가져오기 위한 api 호출
      checkRdbmsConnection(this.selectedRdbmsCredential)
        .then((response) => {
          let data = response.data[1];
          let selectArr = [];

          for (let item of data) {
            console.log(Object.values(item).toString());
            let tableName = Object.values(item).toString();
            let data = {text: tableName, value: tableName};
            selectArr.push(data);
            }

          this.credentialTableInfo = this.credentialTableInfo.concat(selectArr);
          console.log(this.credentialTableInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // sub select change 시 실행 
    getTableData() {
      const newObj = Object.assign({}, this.selectedRdbmsCredential, {selectedTable: this.selectedCredentialTable});
      console.log(newObj);
      
      // table 데이터 가져와서 data table 에 보여주기 
      checkTableData(newObj)
        .then((response) => {
          let columnData = response.data;
          const columnName = Object.keys(columnData);
          console.log(columnName);
          // response.data 를 checkbox group 에 setting
          // index column 이 무엇인지 보여준다.
          let selectArr = [];
          for (let item in columnName) {
            let data = {text: columnName[item], value: columnName[item]}
            selectArr.push(data);
          }
          this.columnInSelectedTable = selectArr;
          console.log(this.columnInSelectedTable);

        })
        .catch((err) => {
          console.log(err);
        })
    }

  },
  created() {
    showCredentialInfo()
      .then((response) => {
        let selectData = response.data;

        let selectArr = [{ value: null, text: "Credential Info", disabled: true }];

        for (let item of selectData) {
          let data = { text: item.credentialName, value: item };
          selectArr.push(data);
        }

        this.rdbmsCredentialInfo = selectArr;
      })
      .catch((err) => console.log(err));
  },
  computed: {
    indexColumns() {
      const options = [{ value: null, text: "Index Column", disabled: true }];
      for (let item of Object.keys(this.items[0])) {
        let data = { value: item, text: item };
        // let newData = _.mapKeys(data, (value, text) => _.camelCase(text));
        options.push(data);
      }
      return options;
    },
  },
};
</script>

<style></style>
