<script setup lang="ts">
import HeroesVue from './components/heroes/Heroes.vue';
import { makeRemoteHeroes } from '@/factories/usecases/remote-heroes-factory'


</script>

<template>
  <div class="container">
    <HeroesVue :remote-heroes="makeRemoteHeroes()" />
  </div>
</template>

<style scoped></style>
