<template>
  <b-container>
    <b-row class="mt-5 mb-3">
      <b-col>
        <b-form-select
          class="shadow-sm"
          v-model="selectedAwsService"
          :options="awsServiceOptions"
        ></b-form-select>
      </b-col>
      <b-col>
        <b-form-select
          class="shadow-sm"
          v-model="selectedAwsCredential"
          :options="awsCredentialOptions"
        ></b-form-select>
      </b-col>
      <b-col>
        <b-button class="shadow-sm" variant="primary">Load</b-button>
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
        <b-table class="shadow-sm" hover :items="items"></b-table>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col offset="7" cols="3">
        <b-form-select
          class="shadow-sm"
          v-model="selectedIndexColumn"
          :options="indexColumns"
        ></b-form-select>
      </b-col>
      <b-col>
        <b-button block class="shadow-sm" variant="success">Save</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      selectedAwsService: null,
      awsServiceOptions: [
        { value: null, text: "Please select a Service", disabled: true },
        { value: "ec2", text: "EC2" },
        { value: "rds", text: "RDS" },
        { value: "s3", text: "S3" },
      ],
      selectedAwsCredential: null,
      awsCredentialOptions: [
        { value: null, text: "Please select a Credential", disabled: true },
        { value: "myaws", text: "myaws" },
        { value: "mysql", text: "mysql" },
      ],
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
      selectedIndexColumn: null,
    };
  },
  computed: {
    indexColumns() {
      const options = [{ value: null, text: "Index Column", disabled: true }];
      for (let item of Object.keys(this.items[0])) {
        let data = { value: item, text: item };
        // let newData = _.mapKeys(data, (value, text) => _.camelCase(text));
        options.push(data);
      }
      return options;
    },
  },
};
</script>

<style>
</style>