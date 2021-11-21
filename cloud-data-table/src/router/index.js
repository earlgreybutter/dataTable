import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Credential from "../views/Credential.vue";
import AwsTable from "../views/DynamicTables/AwsTable.vue";
import RdbmsTable from "../views/DynamicTables/RdbmsTable.vue";
import NosqlTable from "../views/DynamicTables/NosqlTable.vue";
import StaticTable from "../views/StaticTable.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/credential",
    name: "Credential",
    component: Credential,
  },
  {
    path: "/dynamictables/aws",
    name: "AwsTable",
    component: AwsTable,
  },
  {
    path: "/dynamictables/rdbms",
    name: "RdbmsTable",
    component: RdbmsTable,
  },
  {
    path: "/dynamictables/nosql",
    name: "NosqlTable",
    component: NosqlTable,
  },
  {
    path: "/statictable",
    name: "StaticTable",
    component: StaticTable,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
