<template>
  <div id="wind">
    <div class="pane">
      <h3>Wind Speed</h3>
      <span class="value">{{Math.round(speed)}}</span>
      <span class="units">mph</span>
    </div>
    <div class="pane" :title="`${direction}º`">
      <h3>Wind Direction</h3>
      <span class="wi wi-wind direction" :class="`from-${direction}-deg`"></span>
      <span class="direction-text">{{textDirection}}</span>
    </div>
    <div class="pane">
      <h3>Wind Gust</h3>
      <span class="value">{{Math.round(gust)}}</span>
      <span class="units">mph</span>
    </div>
  </div>
</template>

<script>

export default {
  props: ['speed','gust','direction'],
  data() {
    return {
      directions: ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SWS','SW','WSW','W','WNW','NW','NNW']
    }
  },
  computed: {
    textDirection() {
      const index = Math.round(this.direction / 22.5);
      return this.directions[index];
    }
  }
}
</script>

<style lang="scss" scoped>
  #wind {
    display: flex;
    margin-bottom: 1em;
  }

  .pane {
    font-size: 2em;
    text-align: center;
    flex: 1;
    border-right: solid gray 1px;

    &:last-child {
      border-right: none;
    }

    h3 {
      font-size: .5em;
      margin: 0;
      color: gray;
    }

    .direction {
      font-size: 1.5em;
      vertical-align: middle;
    }

    .direction-text {
      text-align: center;
      font-size: .75em;
    }
  }
</style>
