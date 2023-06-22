<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { HeroesResponseType } from './heroes.types';
import axios from 'axios';

const heroesList = ref<HeroesResponseType>();

const fetchItems = async () => {
    const { data } = await axios.get<HeroesResponseType>('http://localhost:8000/api/heroes');
    heroesList.value = data
}

onMounted(() => {
    fetchItems();
});

</script>

<template>
    <div v-for="item in heroesList?.heroes.results" :key="item.id" data-test="hero"> {{ item.name }}</div>
</template>