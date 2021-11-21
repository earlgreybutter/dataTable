<template>
  <b-container>
    <b-row class="mt-5 mb-3">
      <b-col>
        <b-form-select
          class="shadow-sm"
          v-model="selectedXlsx"
          :options="xlsxList"
        ></b-form-select>
      </b-col>
      <b-col>
        <b-button class="shadow-sm" variant="primary" @click="xlsxDetail"
          >Load</b-button
        >
      </b-col>
      <b-col align-self="center">
        <div class="float-right">
          <b-icon-gear class="" font-scale="2"></b-icon-gear>
          <b-icon-plus-circle class="ml-3" font-scale="2"></b-icon-plus-circle>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col>
        <b-form-group
          label="Selection mode:"
          label-for="table-select-mode-select"
          label-cols-md="4"
        >
          <b-form-select
            id="table-select-mode-select"
            v-model="selectMode"
            :options="modes"
            class="mb-3"
          ></b-form-select>
        </b-form-group>
        <p>
          <b-button size="sm" @click="selectAllRows">Select all</b-button>
          <b-button size="sm" @click="clearSelected">Clear selected</b-button>
        </p>
        <b-table
          ref="xlsxDataTable"
          class="shadow-sm"
          hover
          :items="xlsxDataArr"
          :select-mode="selectMode"
          responsive="sm"
          selectable
          @row-selected="onRowSelected"
        ></b-table>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col offset="7" cols="3"> </b-col>
      <b-col>
        <b-button block class="shadow-sm" variant="success" @click="saveXlsxToDb"
          >Save</b-button
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { showXlsxInfo, showXlsxDetail } from "../api/index";

export default {
  data() {
    return {
      selectedXlsx: null,
      xlsxList: [],
      // table data
      xlsxDataArr: null,
      // table control
      modes: ["multi", "single"],
      selectMode: "multi",
      selected: [],
    };
  },
  methods: {
    // table control
    onRowSelected(xlsxDataArr) {
        this.selected = xlsxDataArr
      },
    selectAllRows() {
      this.$refs.xlsxDataTable.selectAllRows();
    },
    clearSelected() {
      this.$refs.xlsxDataTable.clearSelected();
    },
    // xlsx
    xlsxDetail() {
      let me = this;
      showXlsxDetail(this.selectedXlsx)
        .then((response) => {
          me.xlsxDataArr = JSON.parse(response.data["content"]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveXlsxToDb() {
      console.log("saveXlsxToDb");
    },
  },
  created() {
    showXlsxInfo()
      .then((response) => {
        let selectData = response.data;
        let selectArr = [{ value: null, text: "Credential Info", disabled: true }];

        for (let item of selectData) {
          let data = { text: item.credentialName, value: item };
          selectArr.push(data);
        }
        this.xlsxList = selectArr;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style></style>
