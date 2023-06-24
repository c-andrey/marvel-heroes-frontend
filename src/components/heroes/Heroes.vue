<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import HeroCardComponent from './HeroCard.vue';
import { RemoteHeroesInterface } from "@/interfaces/heroes/remote-heroes.types";
import { HeroesResponseType } from '@/interfaces/heroes/heroes.types';

const props = defineProps<{
    remoteHeroes: RemoteHeroesInterface;
}>()

const heroesList = ref<HeroesResponseType>();
const heroName = ref('');
const page = ref(1);
const perPage = ref(10);

const loading = ref(false);

const fetchItems = async () => {
    loading.value = true;
    const response = await props.remoteHeroes.loadHeroesList({ name: heroName.value, page: page.value, perPage: perPage.value });

    heroesList.value = response;
    loading.value = false;

}

const vote = async (action: string, hero_id: number) => {
    const response = await props.remoteHeroes.voteHero({ action, hero_id });

    if (response.voted) {
        fetchItems();
    }
}


onMounted(async () => {
    await fetchItems();
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