<template>
  <!-- <h1>hi</h1> -->
  <b-navbar toggleable="sm" type="dark" variant="info">
    <b-navbar-brand :to="{ name: 'Home' }">Hybrix</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" exact-active-class="active">My Tables</b-nav-item>
        <b-nav-item :to="{ name: 'Credential' }" exact-active-class="active"
          >Credential</b-nav-item
        >
        <b-nav-item-dropdown text="Dynamic Tables" left>
          <b-dropdown-item :to="{ name: 'AwsTable' }" exact-active-class="active"
            >AWS</b-dropdown-item
          >
          <b-dropdown-item :to="{ name: 'RdbmsTable' }" exact-active-class="active"
            >RDBMS</b-dropdown-item
          >
          <b-dropdown-item :to="{ name: 'NosqlTable' }" exact-active-class="active"
            >NoSQL</b-dropdown-item
          >
        </b-nav-item-dropdown>
        <b-nav-item :to="{ name: 'StaticTable' }" exact-active-class="active">Static Tables</b-nav-item>
        <b-nav-item href="#" exact-active-class="active">Big Tables</b-nav-item>
        <b-nav-item-dropdown text="Admin" left>
          <b-dropdown-item href="#" exact-active-class="active"
            >columns</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style scoped>
</style>