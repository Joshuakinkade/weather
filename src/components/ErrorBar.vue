<template>
  <div id="error-bar" v-if="$store.state.error">
    <p class="error">
      {{$store.state.error.message}}
    </p>
    <div class="controls">
      <!-- <button @click="retryOperation">Retry</button> -->
      <button @click="dismissError">Dismiss</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  methods: {
    dismissError() {
      this.$store.commit('SET_ERROR',{error:null});
    },
    retryOperation() {
      const error = this.$store.state.error;
      if (!error.tries || error.tries < 3) {
        this.$store.dispatch('updateWeather');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #error-bar {
    display: flex;
    margin: .25em 0;
    padding: .25em .5em;
    background-color: orangered;
    border-radius: .25em;
    font-weight: bold;
  }

  p.error {
    margin: 0;
    flex: 1;
  }
</style>
