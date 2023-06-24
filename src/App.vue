<script setup lang="ts">
import HeroesVue from './components/heroes/Heroes.vue';
import { makeRemoteHeroes } from '@/factories/usecases/remote-heroes-factory'


</script>

<template>
  <HeroesVue :remote-heroes="makeRemoteHeroes()" />
</template>
