<template>
  <b-form>
    <b-form-group id="fieldset-1" label="Credential Name:" label-for="input-1">
      <b-form-input
        id="input-1"
        v-bind="rdbmsCredential"
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

    <b-button block type="button" @click="checkConnection">Check Connection</b-button>
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
import {
  checkRdbmsConnection,
  deleteCredential,
  insertCredential,
  updateCredential,
} from "../api/index";
export default {
  // name: "CredentialRdbms",
  props: ["rdbmsCredential"],
  data() {
    return {
      credentialForm: this.rdbmsCredential,
      dbtypeOptions: [
        { value: null, text: "Please select a DB type", disabled: true },
        { value: "mysql", text: "mysql" },
        { value: "sqlite", text: "sqlite" },
        { value: "postgres", text: "postgres" },
        { value: "mssql", text: "mssql" },
      ],
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
      this.$parent.showCredentialInfo();
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
      this.$parent.showCredentialInfo();
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
      console.log(this.rdbmsCredential);
    },
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
