<template>
  <div class="wind-o-meter">
    <svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" font-size="16">
      <defs>
        <symbol id="segment" viewBox="0 0 200 200">
          <path d="M0 10 A 512 512 0 0 1 200 10 L 193.5 74 A 448 448 0 0 0 6.5 74 L 0 10"
                stroke="gray" stroke-width="1"/>
        </symbol>
        <symbol id="ring" viewBox="0 0 512 512">
          <circle cx="256" cy="256" r="255" fill="transparent" stroke="gray" stroke-width="1"/>
          <circle cx="256" cy="256" r="223" fill="transparent" stroke="gray" stroke-width="1"/>
          <line x1="256" x2="256" y1="0" y2="32" stroke="gray" stroke-width="1"/><!-- North -->
          <line x1="354.048" x2="341.79" y1="19.46" y2="49.04" stroke="gray" stroke-width="1"/>
          <line x1="436.992" x2="414.37" y1="75.01" y2="97.63" stroke="gray" stroke-width="1"/>
          <line x1="492.544" x2="462.976" y1="157.952" y2="170.208" stroke="gray" stroke-width="1"/>
          <line x1="512" x2="480" y1="256" y2="256" stroke="gray" stroke-width="1"/>
          <line x1="492.544" x2="462.976" y1="354.048" y2="341.792" stroke="gray" stroke-width="1"/>
          <line x1="436.992" x2="414.37" y1="436.992" y2="414.37" stroke="gray" stroke-width="1"/>
          <line x1="354.048" x2="341.79" y1="492.54" y2="462.96" stroke="gray" stroke-width="1"/>
          <line x1="256" x2="256" y1="512" y2="480" stroke="gray" stroke-width="1"/>
          <line x1="157.952" x2="170.21" y1="492.54" y2="462.96" stroke="gray" stroke-width="1"/>
          <line x1="19.46" x2="49.024" y1="354.048" y2="341.792" stroke="gray" stroke-width="1"/>
          <line x1="75.01" x2="97.63" y1="436.992" y2="414.37" stroke="gray" stroke-width="1"/>
          <line x1="0" x2="32" y1="256" y2="256" stroke="gray" stroke-width="1"/>
          <line x1="19.46" x2="49.024" y1="157.952" y2="170.208" stroke="gray" stroke-width="1"/>
          <line x1="75.01" x2="97.63" y1="75.01" y2="97.63" stroke="gray" stroke-width="1"/>
          <line x1="157.952" x2="170.21" y1="19.46" y2="49.04" stroke="gray" stroke-width="1"/>
        </symbol>
      </defs>
      <use href="#ring" transform="rotate(12.25 256 256)"/>
      <use id="direction" href="#segment" x="4" y="0" height="100" fill="#bef" transform="rotate(0 256 256)"/>
      <text x="256" y="28" text-anchor="middle" font-size="2em">N</text>
      <text x="256" y="508" text-anchor="middle" font-size="2em">S</text>
      <text x="2" y="268" text-anchor="start" font-size="2em">W</text>
      <text x="504" y="268" text-anchor="end" font-size="2em">E</text>
      <text x="256" y="132" text-anchor="middle" class="label">Wind Speed</text>
      <text x="256" y="248" text-anchor="middle">
        <tspan class="speed">{{speed}}</tspan>
        <tspan class="units">mph</tspan>
      </text>
      <text x="256" y="304" text-anchor="middle" class="label">Wind Gust</text>
      <text x="256" y="384" text-anchor="middle">
        <tspan class="gust">{{gust}}</tspan>
        <tspan class="units">mph</tspan>
      </text>
    </svg>
  </div>
</template>

<script>
import {normalizeAngle} from '../lib/helpers';

export default {
  props: ['speed','gust','direction'],
  mounted () {
    const guage = this.$el.querySelector('#direction');
    guage.transform.baseVal[0].setRotate(normalizeAngle(this.direction), 256, 256);
  },
  watch: {
    direction: {
      immediate: false,
      handler: function(newDirection) {
        if (this.$el) {
          const guage = this.$el.querySelector('#direction');
          guage.transform.baseVal[0].setRotate(normalizeAngle(newDirection), 256, 256);
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .wind-o-meter {
    position: relative;
    height: 100%;;
    width: 100%;

    svg {
      max-height: 100%;
      max-width: 100%;
    }

    .label {
      font-size: 1.25em;
    }

    .speed {
      font-size:8em;
    }

    .gust {
      font-size: 6em;
    }

    .units {
      font-size:4em;
      fill: gray;
    }
  }
</style>
