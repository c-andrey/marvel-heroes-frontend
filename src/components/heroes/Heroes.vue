<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import HeroCardComponent from './HeroCard.vue';
import { RemoteHeroesInterface } from "@/interfaces/heroes/remote-heroes.types";
import { HeroesResponseType } from '@/interfaces/heroes/heroes.types';
import { PageState } from 'primevue/paginator';

const props = defineProps<{
    remoteHeroes: RemoteHeroesInterface;
}>()

const heroesList = ref<HeroesResponseType>();
const heroName = ref('');
const page = ref(1);
const perPage = ref(10);
const overflow = ref<null | HTMLDivElement>(null);

const loading = ref(false);

const handlePageChange = async (pageState: PageState) => {
    page.value = pageState.page + 1;
    await fetchItems();
}

const handlePerPageChange = async (value: number) => {
    perPage.value = value;
}

const fetchItems = async () => {
    loading.value = true;

    if (loading.value) {
        const response = await props.remoteHeroes.loadHeroesList({ name: heroName.value, page: page.value, perPage: perPage.value });

        heroesList.value = response;
        loading.value = false;

        if (overflow?.value) {
            overflow.value.scrollTop = 0;
        }
    }
}

const vote = async (action: string, hero_id: number) => {
    const response = await props.remoteHeroes.voteHero({ action, hero_id });
    page.value = 1

    if (response.voted) {
        await fetchItems();
    }
}


onMounted(async () => {
    await fetchItems();
});

</script>

<template>
    <div class="heroes-list">

        <div class="heroes-list__header">
            <div class="p-card">
                <div class="p-content">
                    <h1>Marvel Heroes</h1>
                    <p>Aqui você pode escolher seu herói favorito!</p>
                    <form @submit.prevent="fetchItems" class="heroes-list__form">

                        <div class="p-inputgroup flex-1">
                            <input class="p-inputtext p-component" type="text" id="filter" data-test="input-filter"
                                placeholder="Digite o nome..." v-model="heroName" :loading="loading" />
                            <Button icon="pi pi-search" data-test="button-filter" @click="fetchItems" type="submit"
                                :loading="loading" label="Pesquisar" />
                        </div>

                    </form>
                </div>
            </div>
        </div>



        <Transition>
            <div class="heroes-list__overflow" ref="overflow">

                <div v-for="item in heroesList?.heroes.results" data-test="hero" :data-test-id="item.id" class="p-card">
                    <div class="p-content">
                        <div style="display: flex; justify-content: left;">
                            #{{ item.id }}
                        </div>
                        <HeroCardComponent :key="item.id" :data="item" @vote="vote" />
                    </div>
                </div>
            </div>
        </Transition>

        <Paginator :totalRecords="heroesList?.heroes.total" :rows="perPage" :rowsPerPageOptions="[10, 20, 30]"
            template="PrevPageLink PageLinks NextPageLink RowsPerPageDropdown" @page="handlePageChange" :page-link-size="10"
            @update:rows="handlePerPageChange" :alwaysShow="false" v-if="heroesList?.heroes.results" />
    </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.heroes-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    flex: 1;
}

.heroes-list__filter {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 30%;
}

.heroes-list__filter .p-card {
    width: 100%;
}

.heroes-list__header {
    width: 90%;
    padding: 0 5px;
}

.heroes-list__header .p-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.heroes-list__header h1,
.heroes-list__header p {
    margin: 0;
}


.heroes-list__form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
}

.heroes-list__overflow {
    display: block;
    overflow: auto;
    padding: 0 5px;
    margin-bottom: 10px;
    width: 90%;
}

.heroes-list__overflow .p-card .p-card-body {
    padding: 0;
}

.heroes-list__overflow .p-card .p-card-content {
    padding: 0;
}

.p-card {
    margin-bottom: 10px;
    padding: 1rem;

}
</style>