<template>
  <b-container>
    <b-row class="mt-5 mb-3">
      <b-col>
        <b-form-group
          id="fieldset-3"
          label="Table: "
          label-for="input-3"
          label-cols-md="4"
        >
          <b-form-select
            class="shadow-sm"
            v-model="selectedXlsx"
            :options="xlsxList"
            @change="xlsxDetail"
          ></b-form-select>
        </b-form-group>
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
          :fields="selectedColumn"
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
import { showXlsxInfo, showXlsxDetail, saveXlsxColumn } from "../api/index";

export default {
  data() {
    return {
      selectedXlsx: null,
      xlsxList: [],
      // table data
      xlsxDataArr: null,
      colSelectArr: [],
      selectedColumn: [],
      // table control
      modes: ["multi", "single"],
      selectMode: "multi",
      selected: [],
    };
  },
  methods: {
    // table control
    onRowSelected(xlsxDataArr) {
      this.selected = xlsxDataArr;
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
      // init
      me.colSelectArr = [];
      me.selectedColumn = [];

      showXlsxDetail(this.selectedXlsx)
        .then((response) => {
          console.log(response.data);

          me.xlsxDataArr = JSON.parse(response.data["content"]);  // data table 의 item setting
          console.log(me.xlsxDataArr[0]);
          let colArr = Object.keys(me.xlsxDataArr[0]);  // 전체 column 목록을 가져온다. 
          console.log(colArr);
          let tmpArr = [];
          // column show and hide setting
          for (let item of colArr) {
            let rowData = { text: item, value: item };
            tmpArr.push(rowData);
          }
          console.log(tmpArr);
          me.colSelectArr = tmpArr;

          // selectedColumns setting
          console.log(response.data["selectedColumns"]);
          me.selectedColumn = response.data["selectedColumns"];
          console.log(me.selectedColumn);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveColumnInfo() {
      // this.selectedColumn 을 xlsxData selectedColumns 에 저장
      let params = {};
      Object.assign(params, this.selectedXlsx);
      params['selectedColumns'] = this.selectedColumn;
      console.log(params);
      console.log(this.selectedXlsx);
      console.log(this.selectedColumn);
      saveXlsxColumn(params);
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
