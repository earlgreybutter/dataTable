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
            >
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <CredentialXlsx
      v-if="selectedCategory == 'xlsx'"
      v-bind:xlsxCredential="xlsxCredential"
    />
    <CredentialAws
      v-if="selectedCategory == 'aws'"
      v-bind:awsCredential="awsCredential"
    />
    <CredentialRdbms
      v-if="selectedCategory == 'rdbms'"
      v-bind:rdbmsCredential="rdbmsCredential"
    />
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
    CredentialXlsx,
  },
  data() {
    return {
      filter: null,
      selectedCategory: "aws",
      categoryOptions: [
        { value: null, text: "Please select a Category", disabled: true },
        { value: "aws", text: "AWS" },
        { value: "rdbms", text: "RDBMS" },
        { value: "xlsx", text: "EXCEL" },
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
    
  },
};
</script>

<style></style>
