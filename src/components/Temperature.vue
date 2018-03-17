<template>
  <div id="temperature">
    <div class="actual" :style="{'border-color': tempColor}">
      <h3 class="sr-only">Temperature</h3>
      <span class="value">{{Math.round(current)}}</span>
      <span class="unit">ºf</span>
    </div>
    <div class="extras">
      <div class="feelslike extras-pane">
        <h3>Feels Like</h3>
        <span class="value">{{Math.round(feelsLike)}}</span>
        <span class="unit">ºf</span>
      </div>
      <div class="forecast extras-pane">
        <h3>High / Low</h3>
        <span class="high">{{high}}</span> / <span class="low">{{low}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['current','feelsLike','high','low'],
  data() {
    return {
      tempColors: ['lightcyan','cyan','blue','deepskyblue','mediumblue','teal','forestgreen','gold','orange','red','firebrick']
    }
  },
  computed: {
    temperature() {
      return Math.round(this.current);
    },
    tempColor() {
      let index = 0;
      if (this.current >= 10 && this.current <= 100) {
        index = Math.floor(Math.round(this.current) / this.tempColors.length);
      } else if (this.current > 100) {
        index = 9;
      }
      return this.tempColors[index];
    }
  }
}
</script>

<style lang="scss" scoped>
  #temperature {
    margin: 1em 2em;
  }

  .actual {
    font-size: 8em;
    line-height: 1em;
    border-bottom-style: solid;
    border-bottom-width: 1rem;
    margin-bottom: .125em;
    text-align: center;
  }

  .feelslike {
    font-size: 2em;
    line-height: 2em;
    border-right: solid gray 1px;

    h3 {
      font-size: .5em;
    }
  }

  .forecast {
    font-size: 2em;
    line-height: 2em;

    .high {
      color: firebrick;
    }

    .low {
      color: mediumblue;
    }

    h3 {
      font-size: .5em;
    }
  }

  .extras-pane {
    flex: 1;
    text-align: center;

    h3 {
      margin: 0;
      line-height: 1em;
      text-align: center;
      color: gray;
    }
  }

  .extras {
    display: flex;
  }

  .value {
    margin-right: -.25em;
  }

  .unit {
    color: gray;
    font-weight: 100;
    // font-size: .5em;
    // vertical-align: text-top;
  }
</style>
