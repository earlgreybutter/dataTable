<template>
  <b-container>
    <b-row class="mt-5">
      <b-col align-self="center">
        <div class="float-right">
          <b-icon-plus-circle v-b-modal.modalPopover class="ml-3" font-scale="2"></b-icon-plus-circle>
          <b-modal id="modalPopover" title="Add User Column">
            <b-row>
              <b-col>
                <b-button>Add</b-button>
              </b-col>
            </b-row>
          </b-modal>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-table class="shadow-sm" hover :fields="tableInfo" :items="tableDataArr">
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
import { showAwsApiList, showCredentialInfoByCategory, showXlsxInfo } from "../api";
export default {
  data() {
    return {
      tableInfo: ["credentialName", "credentialCategory", "_id"],
      tableDataArr: [],
    };
  },
  methods: {},
  created() {
    let me = this;
    showCredentialInfoByCategory({ credentialCategory: "rdbms" }).then((response) => {
      console.log(response.data);
      me.tableDataArr = response.data;
      showXlsxInfo().then((response) => {
        console.log(response.data);
        let tempArr1 = response.data;
        for (let i = 0; i < tempArr1.length; i++) {
          tempArr1[i]["credentialCategory"] = "EXCEL";
        }
        me.tableDataArr = me.tableDataArr.concat(response.data);
        showAwsApiList().then((response) => {
          console.log(response.data);
          let tempArr2 = response.data;
          for (let i = 0; i < tempArr2.length; i++) {
            tempArr2[i]["credentialCategory"] = "AWS";
          }
          me.tableDataArr = me.tableDataArr.concat(response.data);
        });
      });
    });
  },
};
</script>
