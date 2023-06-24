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
    <Card class="heroes-list__header">
        <template #content>
            <h1>Marvel Heroes</h1>
            <p>Aqui você pode escolher seu herói favorito!</p>
            <div class="heroes-list__filter">
                <form @submit.prevent="fetchItems" class="heroes-list__form">

                    <div class="p-inputgroup flex-1">
                        <InputText type="text" id="filter" data-test="input-filter" placeholder="Digite o nome..."
                            v-model="heroName" :loading="loading" />
                        <Button icon="pi pi-search" data-test="button-filter" @click="fetchItems" type="submit"
                            :loading="loading" label="Pesquisar" />
                    </div>

                </form>
            </div>
        </template>
    </Card>


    <ScrollPanel class="heroes-list__overflow custombar1">
        <Card v-for="item in heroesList?.heroes.results" data-test="hero">
            <template #content>
                <HeroCardComponent :key="item.id" :data="item" @vote="vote" />
            </template>
        </Card>

    </ScrollPanel>
</template>

<style>
.heroes-list__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.heroes-list__filter {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.heroes-list__form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 700px;
}

.heroes-list__overflow {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 70%;
}

.p-card {
    margin-bottom: 20px;
    padding: 0 10px;
}
</style>