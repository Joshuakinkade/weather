<template>
  <div id="locations">
    <header>
      <h2>Locations</h2>
    </header>
    <nav class="saved">
      <ul v-if="savedLocations">
        <li v-for="location in savedLocations" v-bind:key="location.id">
          <router-link class="nav-button" :to="`/${location.id}`">
            {{location.name}}
          </router-link>
        </li>
      </ul>
      <p v-else>
        No saved locations. Use the field below to find one.
      </p>
    </nav>
    <search/>
  </div>
</template>

<script>
import Search from './Search.vue';

export default {
  props: ['locations'],
  components: {
    search: Search
  },
  computed: {
    savedLocations() {
      return this.locations ? this.locations.filter(location => location.isSaved) : null;
    }
  },
  methods: {
    changeLocation(location) {
      this.$emit('location-changed',location);
    }
  }
}
</script>

<style lang="scss" scoped>
  #locations {
    margin-right: 1em;
  }

  header {
    margin: 1em 0;
    height: 4.5em;
    border-bottom: solid lightgray 1px;
    display: flex;
    flex-direction: columns;
    align-items: flex-end;
  }

  h2 {
    margin: 0;
  }

  .nav-button {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 1em;
    text-align: left;
    border-radius: .5em;
  }

  .nav-button:hover {
    text-decoration: underline;
  }

  .nav-button:active {
    background-color: lightgray;
  }

  input {
    width: 100%;
  }

  ul {
    margin: 0;
  }

  li {
    display: block;
    padding: .5em;
    margin: 0;
  }
</style>

