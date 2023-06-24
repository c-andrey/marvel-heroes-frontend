<script lang="ts" setup>
import { HeroType } from '@/interfaces/heroes/heroes.types';
import { computed } from 'vue';


const props = defineProps<{ data: HeroType }>();
const heroImg = computed(() => {
    return props.data.thumbnail?.path && props.data.thumbnail.extension ?
        props.data.thumbnail.path + '.' + props.data.thumbnail.extension : '';
});
const seriesList = computed(() => {
    return props.data.series?.items ? props.data.series.items.map(i => i.name).join(', ') : '';
});

const emit = defineEmits<{
    'vote': [action: string, id: number]
}>()

const vote = (action: string) => {
    emit('vote', action, props.data.id);
}

</script>
<template>
    <div class="hero-card">
        <img :src="heroImg" alt="" srcset="" style="max-width: 250px;">

        <div class="hero-card__info">
            <h2 class="hero-card__name">{{ data.name }}</h2>
            <p class="hero-card__description">{{ data.description }}</p>
            <div class="hero-card__series-list" v-if="seriesList" :title="seriesList">
                <span style="font-weight: bold; margin-right: 2px;">Series: </span>
                <span class="hero-card__series-list__ellipsed">
                    {{ seriesList }}
                </span>
            </div>
        </div>

        <div class="hero-card__actions">
            <p class="hero-card__votes" :data-test="data.votes">Votes: {{ data.votes || 0 }}</p>
            <Button class="hero-card__vote" data-test="button-up-vote" @click="vote('up')">
                <i class="pi pi-arrow-up" />
            </Button>
            <Button class="hero-card__vote" data-test="button-down-vote" @click="vote('down')">
                <i class="pi pi-arrow-down" />
            </Button>
        </div>
    </div>
</template>

<style scoped>
.hero-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 10px;
}

.hero-card__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin: 5px;

}

.hero-card__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.hero-card__name {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0;
}

.hero-card__description {
    font-size: 1rem;
}

.hero-card__votes {
    font-size: 1rem;
    margin: 5px 0;
}

.hero-card__vote {
    margin: 5px;
}

.hero-card__series-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.hero-card__series-list__ellipsed {
    display: block;
    width: 600px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
}
</style>