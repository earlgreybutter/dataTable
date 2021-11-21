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

            <b-form-group id="fieldset-2" label="Access Key:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="credentialForm.accessKeyId"
                autocomplete="off"
                trim
              ></b-form-input>
            </b-form-group>

            <b-form-group id="fieldset-3" label="Secret Key:" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="credentialForm.secretAccessKey"
                autocomplete="off"
                trim
              ></b-form-input>
            </b-form-group>

            <b-form-group id="fieldset-4" label="Default Region:" label-for="input-4">
              <b-form-select
                id="input-4"
                v-model="credentialForm.defaultRegion"
                :options="regionOptions"
              ></b-form-select>
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
  deleteCredential,
  insertCredential,
  updateCredential,
  validateEc2Certification,
} from "../api/index";
export default {
  data() {
    return {
      filter: null,
      credentialForm: {
        credentialName: null,
        accessKeyId: null,
        secretAccessKey: null,
        defaultRegion: null,
      },
      regionOptions: [
        { value: null, text: "Please select a Region" },
        { value: "us-east-1", text: "us-east-1 (US East - N. Virginia)" },
        { value: "us-east-2", text: "us-east-2 (US East - Ohio)" },
        { value: "us-west-1", text: "us-west-1 (US West - N. California)" },
        { value: "us-west-2", text: "us-west-2 (US West - Oregon)" },
        { value: "af-south-1", text: "af-south-1 (Africa - Cape Town)" },
        { value: "ap-east-1", text: "ap-east-1 (Asia Pacific - Hong Kong)" },
        { value: "ap-south-1", text: "ap-south-1 (Asia Pacific - Mumbai)" },
        { value: "ap-southeast-1", text: "ap-southeast-1 (Asia Pacific - Singapore)" },
        { value: "ap-southeast-2", text: "ap-southeast-2 (Asia Pacific - Sydney)" },
        { value: "ap-northeast-1", text: "ap-northeast-1 (Asia Pacific - Tokyo)" },
        { value: "ap-northeast-2", text: "ap-northeast-2 (Asia Pacific - Seoul)" },
        { value: "ca-central-1", text: "ca-central-1 (Canada - Central)" },
        { value: "eu-central-1", text: "eu-central-1 (Europe - Frankfurt)" },
        { value: "eu-west-1", text: "eu-west-1 (Europe - Ireland)" },
        { value: "eu-west-2", text: "eu-west-2 (Europe - London)" },
        { value: "eu-west-3", text: "eu-west-3 (Europe - Paris)" },
        { value: "eu-north-1", text: "eu-north-1 (Europe - Stockholm)" },
        { value: "me-south-1", text: "me-south-1 (Middle East - Bahrain)" },
        { value: "sa-east-1", text: "sa-east-1 (South America - São Paulo)" },
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
      this.credentialForm.credentialCategory = "aws";

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
      validateEc2Certification(this.credentialForm)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    },
    clearForm() {
      this.credentialForm._id = null;
      this.credentialForm.credentialName = null;
      this.credentialForm.accessKeyId = null;
      this.credentialForm.secretAccessKey = null;
      this.credentialForm.defaultRegion = null;
    },
    showCredentialInfo() {
      let me = this;
      let param = { credentialCategory: "aws" };
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
