<template>
  <b-row class="mt-3">
    <b-col>
      <b-card>
        <b-card-body>
          <b-form>
            <b-form-group id="fieldset-1" label="Credential Name:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="credentialForm.credentialName"
                trim
              ></b-form-input>
            </b-form-group>

            <b-form-group id="fieldset-2" label="Selected File: " label-for="input-2">
              <b-form-file
                v-model="file1"
                :state="Boolean(file1)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                @change="xlsxImport"
              ></b-form-file>
              <div class="mt-3">{{ file1 ? file1.name : "" }}</div>
            </b-form-group>

            <b-form-group
              id="fieldset-3"
              label="Column Show And Hide: "
              label-for="input-3"
            >
              <b-form-select
                id="input-3"
                v-model="vmodelTest"
                :options="colSelectArr"
              ></b-form-select>
            </b-form-group>

            <div class="mt-3">
              <b-row>
                <b-col
                  ><b-button variant="danger" type="button" @click="remove"
                    >Remove
                  </b-button></b-col
                >
                <b-col>
                  <b-button-group class="float-right">
                    <b-button variant="primary" type="button" @click="clearForm"
                      >Clear
                    </b-button>
                    <b-button variant="success" type="button" @click="save"
                      >Save
                    </b-button>
                  </b-button-group>
                </b-col>
              </b-row>
            </div>
          </b-form>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col>
      <b-input-group>
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Search"
        ></b-form-input>

        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
      <div>
        <b-table
          hover
          :filter="filter"
          :fields="fields"
          :items="items"
          @row-clicked="setCredentialData"
        ></b-table>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import XLSX from "xlsx";
import {
  deleteXlsxDocument,
  saveXlsxDocument,
  showXlsxDetail,
  showXlsxInfo,
} from "../api/index";

export default {
  data() {
    return {
      vmodelTest: null,
      colSelectArr: [{ value: null, text: "Column Name", disabled: true }],
      filter: null,
      credentialForm: {
        credentialName: null,
        content: null,
      },

      file1: null,
      chosenXslxFile: null,
      // xlsx
      state: {
        data: [],
        headers: [],
      },

      // xlsxDataArr: null,
      items: [],
      fields: [],
      xlsxHeadArr: [
        { columnName: "sample", sampleData: "data" },
        { columnName: "sample1", sampleData: "data1" },
      ],
    };
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
    },
    remove() {
      console.log("Remove");
      deleteXlsxDocument(this.credentialForm)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      // 입력폼 초기화
      this.clearForm();
      // Todo. table 에 저장된 목록 보여주기
      this.setTable();
    },
    save() {
      console.log(this.credentialForm);
      // DB 저장
      saveXlsxDocument(this.credentialForm)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      // 입력폼 초기화
      this.clearForm();
      // Todo. table 에 저장된 목록 보여주기
      this.setTable();
    },
    clearForm() {
      this.credentialForm.credentialName = null;
      this.file1 = null;
    },
    xlsxImport: function (event) {
      var me = this;
      var input = event.target;
      this.chosenXslxFile = input;
      console.log(this.chosenXslxFile);

      var reader = new FileReader();

      reader.onload = function () {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, { type: "binary" });

        // sheet 가 여러개일 때 처리 가능
        wb.SheetNames.forEach(function (sheetName) {
          const ws = wb.Sheets[sheetName];
          var rowObj = XLSX.utils.sheet_to_json(ws);

          me.credentialForm.content = JSON.stringify(rowObj);
          me.xlsxDataArr = JSON.parse(me.credentialForm.content);
        });
        // select setting
        this.setColumnSelect();
      };
      reader.readAsBinaryString(input.files[0]);
    },
    setCredentialData(item, index, event) {
      let me = this;
      console.log("setCredentialData");
      showXlsxDetail(item)
        .then((response) => {
          console.log(response);
          me.credentialForm = response.data;
          me.xlsxDataArr = JSON.parse(me.credentialForm.content);
          console.log(me.xlsxDataArr);
          // select setting
          this.setColumnSelect();
        })
        .catch((err) => console.log(err));
    },
    // 1. xlsxDataArr[0] 을 가져와서 key 값을 select 에 data setting
    // 2. select 를 선택하면 form tag 추가
    setColumnSelect() {
      let me = this;
      // 1. Object 내에서 key 값만 가져온다.
      console.log(this.xlsxDataArr[0]);
      let colNameArr = Object.keys(this.xlsxDataArr[0]);
      console.log(colNameArr);
      // 2. select option 형태의 object 배열로 만든다.
      for (let item of colNameArr) {
        console.log(item);
        let tmpObj = { key: tmp, value: tmp };
        me.colSelectArr.push(tmpObj);
      }
    },
    // xlsx credential list 보여주는 tabel setting
    setTable() {
      let me = this;

      showXlsxInfo()
        .then((response) => {
          let resData = response.data;
          const tmpArr = [];

          for (let item of resData) {
            let data = {
              _id: item._id,
              credentialName: item.credentialName,
              credentialCategory: "EXCEL",
            };
            tmpArr.push(data);
          }
          me.fields = ["credentialName", "credentialCategory"];
          me.items = tmpArr;
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.setTable();
  },
};
</script>

<style></style>
