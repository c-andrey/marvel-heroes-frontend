<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { HeroesResponseType, VoteHeroResponse } from './heroes.types';
import axios from 'axios';
import HeroCardComponent from './HeroCard.vue';


const heroesList = ref<HeroesResponseType>();
const heroName = ref('');
const fetchItems = async () => {
    if (heroName.value) {
        const { data } = await axios.get<HeroesResponseType>(`http://localhost:8000/api/heroes?page=1&perPage=5&name=${heroName.value}`);
        heroesList.value = data
        return;
    }
    const { data } = await axios.get<HeroesResponseType>('http://localhost:8000/api/heroes?page=1&perPage=5');
    heroesList.value = data
}

const vote = async (action: string, id: number) => {
    const { data } = await axios.post<VoteHeroResponse>(`http://localhost:8000/api/vote`, { action, hero_id: id });

    if (data.voted) {
        fetchItems();
    }
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
        <button data-test="button-filter" @click="fetchItems">Filter</button>
    </div>

    <HeroCardComponent v-for="item in heroesList?.heroes.results" :key="item.id" :data="item" @vote="vote"
        data-test="hero" />
</template>