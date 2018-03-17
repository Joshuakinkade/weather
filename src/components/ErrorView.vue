<template>
  <div id="error-page">
    <header>
      <h2>{{error.name}}</h2>
    </header>
    <main>
      <p>{{error.message}}</p>
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    error() {
      const error = this.$store.state.error;
      if (!error) {
        console.log('hello');
        return {
          name: 'Unknown Error',
          code: 0,
          message: 'An unknown error has occured'
        }
      }
      return error;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
