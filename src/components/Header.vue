<template>
  <header id="page-header">
    <div class="top">
      <h1>Weather in {{location ? location.name : ''}}</h1>
      <div class="logo">
        <a href="https://www.wunderground.com/?apiref=2bb9b379fcf93b02">
          <img src="https://icons.wxug.com/logos/PNG/wundergroundLogo_4c_horz.png" alt="weather undergound">
        </a>
      </div>
    </div>
    <div class="bottom">
      <div class="sub-header">
        <p class="timestamp" v-if="displayUpdateDate">
          Last updated {{displayUpdateDate}}
        </p>
      </div>
      <div v-if="location">
        <button v-on:click="saveLocation" class="flat" :class="{saved: location.isSaved}">
          <span class="fa fa-star"></span>
        </button>
        <button v-on:click="setAsHome" class="flat" :class="{home: $store.state.defaultLocation == location.id}">
          <span class="fa fa-home"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import {DateTime} from 'luxon';

export default {
  props: ['updatedAt','location'],
  computed: {
    displayUpdateDate() {
      if (this.updatedAt) {
        return this.updatedAt.setZone(this.location.tz).setLocale('us').toLocaleString(DateTime.DATETIME_FULL);//format('dddd, MMMM Do, hh:mm a') || '';
      }
      return null;
    }
  },
  methods: {
    saveLocation() {
      if(!this.location.isSaved) {
        this.$store.dispatch('saveLocation',this.location);
      } else {
        this.$store.dispatch('unSaveLocation',this.location);
      }
    },
    setAsHome() {
      this.$store.dispatch('setLocationAsHome',this.location);
    }
  }
}
</script>

<style lang="scss" scoped>
    header {
      margin: 0 0;
      border-bottom: solid lightgray 2px;
    }

    .top {
      display: flex;
      margin: .5em 0;
      height: 3em;
    }

    .bottom {
      display: flex;
      margin: 0 .5em;
      height: 1.5em;
    }

    h1 {
      margin: 0;
      flex: 1;
    }

    .sub-header {
      flex: 1;
    }

    .timestamp {
      margin: 0;
      color: gray;
      font-size: .8em;
      flex: 1;
    }

    .logo {
      img {
        width: 8em;
      }
    }

    button.flat {
      background-color: transparent;
      border: solid lightgray 1px;
      border-radius: .5em;
      outline: none;
      font-size: 1.25em;
      padding: 0 .5em;
      color: gray;

      &.saved {
        color: gold;
      }

      &.home {
        color: steelblue;
      }
    }

</style>
