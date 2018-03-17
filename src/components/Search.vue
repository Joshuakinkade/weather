<template>
  <div class="search">
    <input type="search"
           placeholder="Find a location"
           v-model="term"
           @blur="handleBlur()"
           @keydown.down="goDown()"
           @keydown.up="goUp($event)"
           @keydown.enter="selectLocation()"
           @keyup="search()"/>
    <ul>
      <li v-for="possibility in possibleCities"
          :key="possibility.zmw"
          :class="{focused: possibility.zmw == focusedId }"
          @click="addLocation(possibility)">
        <router-link class="nav-button" :to="`/${possibility.zmw}`">
          {{possibility.name}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {PUSH_LOCATION} from '../lib/store/types';
import {searchLocations} from '../lib/api';

export default {
  data() {
    return {
      possibilities: [],
      term: '',
      focusedId: null
    };
  },
  computed: {
    possibleCities() {
      return this.possibilities
        .filter(possiblility => possiblility.type == 'city')
        .slice(0,10);
    }
  },
  methods: {
    addLocation(location) {
      this.$store.commit(PUSH_LOCATION,location);
      this.possibilities = [];
      this.term = '';
    },
    search() {
      if (this.term.trim().length > 0) {
        searchLocations(this.term)
          .then( results => {
            this.possibilities = results;
          });
      } else {
        this.possibilities = [];
        this.focusedId = null;
      }
    },
    handleBlur() {
      this.focusedId = null;
    },
    goDown() {
      if (this.possibleCities.length > 0) {
        if (this.focusedId == null) {
          this.focusedId = this.possibleCities[0].zmw;
        } else {
          const currentIndex = this.possibleCities.findIndex( possibility => possibility.zmw == this.focusedId);
          if (currentIndex > -1 && currentIndex < 9) {
            this.focusedId = this.possibleCities[currentIndex + 1].zmw;
          }
        }
      }
    },
    goUp(ev) {
      ev.preventDefault();
      if (this.possibleCities.length > 0 && this.focusedId !== null) {
        const currentIndex = this.possibleCities.findIndex( possibility => possibility.zmw == this.focusedId);
        if (currentIndex < 1) {
          this.focusedId = null;
        } else {
          this.focusedId = this.possibleCities[currentIndex - 1].zmw;
        }
      }
    },
    selectLocation() {
      const location = this.possibleCities.find( possibility => possibility.zmw == this.focusedId);
      console.log(location);
      if (location) {
        this.addLocation(location);
        this.$router.push({path: `/${this.focusedId}`});
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .search {
    padding: 0 .5em;
  }

  ul {
    margin: 0;
  }

  li {
    display: block;
    padding: .5em;
    margin: 0;

    &.focused {
      background-color: lightsteelblue;
    }
  }
</style>
