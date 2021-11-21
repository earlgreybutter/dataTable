<template>
  <b-container class="mb-5">
    <b-row class="mt-4">
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Credential Category:"
          label-for="credential-category-select"
          label-cols-md="4"
          label-align-md="right"
          class="mb-0"
        >
          <b-input-group>
            <b-form-select
              id="credential-category-select"
              v-model="selectedCategory"
              :options="categoryOptions"
              @change="showCredentialInfo"
            >
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="3" class="my-1">
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
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col>
        <b-card>
          <b-card-body>
            <CredentialAws
              v-if="selectedCategory == 'aws'"
              v-bind:awsCredential="awsCredential"
            />
            <CredentialRdbms
              v-if="selectedCategory == 'rdbms'"
              v-bind:rdbmsCredential="rdbmsCredential"
            />
            <CredentialXlsx
              v-if="selectedCategory == 'xlsx'"
              v-bind:xlsxCredential="xlsxCredential"
            />
          </b-card-body>
        </b-card>
      </b-col>
      <b-col>
        <div>
          <b-table
            hover
            :filter="filter"
            :items="items"
            @row-clicked="setCredentialData"
          ></b-table>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { showCredentialDetail, showCredentialInfoByCategory } from "../api";
import CredentialAws from "./CredentialAws.vue";
import CredentialRdbms from "./CredentialRdbms.vue";
import CredentialXlsx from "./CredentialXlsx.vue";
import { mapMutations } from "vuex";

export default {
  components: {
    CredentialAws,
    CredentialRdbms,
    CredentialXlsx
  },
  data() {
    return {
      filter: null,
      selectedCategory: "aws",
      categoryOptions: [
        { value: null, text: "Please select a Category", disabled: true },
        { value: "aws", text: "AWS" },
        { value: "rdbms", text: "RDBMS" },
        { value: "xlsx", text: "EXCEL"},
        { value: "nosql", text: "NOSQL" },
      ],
      // 이것도 DB 에서 찾아오도록 처리하면 좋은데, 현재 상태로는 메모리에 올려두는 것이 나음.
      items: [
        // { credential_name: "myaws", credential_category: "AWS" },
        // { credential_name: "mysql", credential_category: "RDBMS" },
        // { credential_name: "mypostgresql", credential_category: "RDBMS" },
        // { credential_name: "mymongo", credential_category: "NOSQL" },
      ],
      // Todo. credential category 에 따라서 items find() 다르게 해오도록 처리
      awsCredential: {},
      rdbmsCredential: {},
      xlsxCredential: {},
    };
  },
  methods: {
    showCredentialInfo() {
      let me = this;
      let param = { credentialCategory: me.selectedCategory };
      showCredentialInfoByCategory(param)
        .then((response) => {
          console.log(response);
          let resData = response.data;
          const tmpArr = [];

          for (let item of resData) {
            console.log(item);
            let data = {
              credential_name: item.credentialName,
              credential_category: item.credentialCategory,
            };
            tmpArr.push(data);
          }
          me.items = tmpArr;
        })
        .catch((err) => console.log(err));
    },
    setCredentialData(item, index, event) {
      // rowClick event
      console.log(this.selectedCategory);
      let me = this;
      let category = this.selectedCategory;
      console.log(item);
      console.log(index);
      console.log(event);

      showCredentialDetail(item)
        .then((response) => {
          console.log(response.data[0]);
          me.rdbmsCredential = response.data[0];
          // input box 에 값 전달
          // store 접근
          me.$store.commit("setCredentialForm", me.rdbmsCredential);
          console.log(me.$store.state.credentialForm);
        })
        .catch((err) => console.log(err));

      if (category == "aws") {
      }
      if (category == "rdbms") {
      }
      if (category == "nosql") {
        console.log(category);
      }
    },
  },
};
</script>

<style></style>
