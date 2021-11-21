<template>
  <b-form>
    <b-form-group id="fieldset-1" label="Credential Name:" label-for="input-1">
      <b-form-input
        id="input-1"
        v-model="credentialForm.credentialName"
        trim
      ></b-form-input>
    </b-form-group>

    <b-form-group id="fieldset-2" label="Selected file: " label-for="input-2">
      <b-form-file
        v-model="file1"
        :state="Boolean(file1)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        @change="xlsxImport"
      ></b-form-file>
      <div class="mt-3">{{ file1 ? file1.name : "" }}</div>
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
            <b-button variant="success" type="button" @click="save">Save </b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </div>
  </b-form>
</template>

<script>
import XLSX from "xlsx";
import { saveXlsxDocument } from "../api/index";

export default {
  data() {
    return {
      credentialForm: {
        credentialName: null,
        content: null
      },

      file1: null,
      chosenXslxFile: null,
      // xlsx
      state: {
        data: [],
        headers: [],
      },

      xlsxDataArr: null,
    };
  },
  methods: {
    remove() {
      console.log("Remove");
    },
    save() {
      console.log("Save");
      console.log(this.credentialForm.credentialName);
      console.log(this.credentialForm.content);
      console.log(typeof this.credentialForm.content); // string

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
      // table 에 저장된 목록 보여주기
    },
    clearForm() {
      this.credentialForm.credentialName = null;
      this.file1 = null;
    },
    // getXslxFile(event) {
    //   let me = this;
    //   let input = event.target;
    //   this.chosenXslxFile = input;
    //   console.log(me.chosenXslxFile);
    // },
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
          var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);

          me.credentialForm.content = JSON.stringify(rowObj);
          me.xlsxDataArr = JSON.parse(me.credentialForm.content);
        });
      };
      reader.readAsBinaryString(input.files[0]);
    },
  },
};
</script>

<style></style>
