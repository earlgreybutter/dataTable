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

            <b-form-group id="fieldset-2" label="DB Type: " label-for="input-2">
              <b-form-select
                id="input-2"
                v-model="credentialForm.selectedDB"
                :options="dbtypeOptions"
              ></b-form-select>
            </b-form-group>

            <b-form-group id="fieldset-3" label="IP:" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="credentialForm.ip"
                autocomplete="off"
                trim
              ></b-form-input>
            </b-form-group>

            <b-form-group id="fieldset-4" label="Port:" label-for="input-4">
              <b-form-input
                id="input-4"
                v-model="credentialForm.port"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="fieldset-5" label="DB Name:" label-for="input-5">
              <b-form-input
                id="input-5"
                v-model="credentialForm.dbname"
                autocomplete="off"
                trim
              ></b-form-input>
            </b-form-group>

            <b-form-group id="fieldset-6" label="Username:" label-for="input-6">
              <b-form-input
                id="input-6"
                v-model="credentialForm.username"
                autocomplete="off"
                trim
              ></b-form-input>
            </b-form-group>

            <b-form-group id="fieldset-7" label="Password:" label-for="input-7">
              <b-form-input
                id="input-7"
                v-model="credentialForm.password"
                autocomplete="off"
                trim
              ></b-form-input>
            </b-form-group>

            <b-button block type="button" @click="checkConnection"
              >Check Connection</b-button
            >
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
import {
  showCredentialDetail,
  showCredentialInfoByCategory,
  checkRdbmsConnection,
  deleteCredential,
  insertCredential,
  updateCredential,
} from "../api/index";
export default {
  // name: "CredentialRdbms",
  data() {
    return {
      filter: null,
      credentialForm: {},
      dbtypeOptions: [
        { value: null, text: "Please select a DB type", disabled: true },
        { value: "mysql", text: "mysql" },
        { value: "sqlite", text: "sqlite" },
        { value: "postgres", text: "postgres" },
        { value: "mssql", text: "mssql" },
      ],
      items: [],
      fields: [],
    };
  },
  methods: {
    remove() {
      console.log("remove");
      console.log(this.credentialForm);
      deleteCredential(this.credentialForm)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      this.clearForm();
      this.showCredentialInfo();
    },
    save() {
      this.credentialForm.credentialCategory = "rdbms";

      // insert or update
      if (this.credentialForm._id) {
        console.log("update");
        updateCredential(this.credentialForm)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("insert");
        insertCredential(this.credentialForm)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      this.clearForm();
      this.showCredentialInfo();
    },
    checkConnection() {
      checkRdbmsConnection(this.credentialForm)
        .then((response) => {
          console.log(response);
          alert(response.data[0].customMsg);
        })
        .catch((err) => console.log(err));
    },
    clearForm() {
      // 되긴 되는데, 이게 맞는지는 모르겠다.
      this.credentialForm._id = null;
      this.credentialForm.credentialName = null;
      this.credentialForm.selectedDB = null;
      this.credentialForm.ip = null;
      this.credentialForm.port = null;
      this.credentialForm.dbname = null;
      this.credentialForm.username = null;
      this.credentialForm.password = null;
      console.log(this.credentialForm);
    },
    showCredentialInfo() {
      let me = this;
      let param = { credentialCategory: "rdbms" };
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
          me.fields = ["credential_name", "credential_category"];
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
          me.credentialForm = response.data[0];
          // input box 에 값 전달
          // store 접근
          me.$store.commit("setCredentialForm", me.credentialForm);
          // console.log(me.$store.state.credentialForm);
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.showCredentialInfo();
  },
  updated() {
    this.$nextTick(function () {
      let me = this;
      me.credentialForm = me.$store.state.credentialForm;
      // console.log(me.credentialForm);
    });
  },
};
</script>

<style></style>
