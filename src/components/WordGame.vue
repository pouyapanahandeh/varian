<template>
  <div>
    <Helper @updateEvent="$emit('updateEvent', { type: 'playerGuessed', multi: 1 })"/>
  </div>
</template>

<script>
import Helper from './Helper';

export default {
	name: "WordGame",
	components: { Helper },
};
</script>

<style scoped>

</style>
