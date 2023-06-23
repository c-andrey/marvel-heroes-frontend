<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { HeroesResponseType } from './heroes.types';
import axios from 'axios';
import HeroCardComponent from './HeroCard.vue';


const heroesList = ref<HeroesResponseType>();
const heroName = ref('');
const fetchItems = async () => {
    if (heroName.value) {
        console.log(`http://localhost:8000/api/heroes?name=${heroName.value}`)
        const { data } = await axios.get<HeroesResponseType>(`http://localhost:8000/api/heroes?name=${heroName.value}`);
        heroesList.value = data
        return;
    }
    const { data } = await axios.get<HeroesResponseType>('http://localhost:8000/api/heroes');
    heroesList.value = data
}

onMounted(() => {
    fetchItems();
});

</script>

<template>
    <div class="header">
        <h1>Heroes</h1>
        <p>Here you can vote for your favorite hero!</p>
    </div>

    <div class="heroes-list__filter">
        <label for="filter">Filter by name:</label>
        <input type="text" id="filter" data-test="input-filter" v-model="heroName" />
    </div>

    <HeroCardComponent v-for="item in heroesList?.heroes.results" :key="item.id" data-test="hero" :data="item" />
</template>