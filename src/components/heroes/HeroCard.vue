<script lang="ts" setup>
import { HeroType } from './heroes.types';

const props = defineProps<{ data: HeroType }>();

const emit = defineEmits<{
    'vote': [action: string, id: number]
}>()

const vote = (action: string) => {
    emit('vote', action, props.data.id);
}

</script>
<template>
    <div class="hero-card">
        <div class="hero-card__info">
            <h3 class="hero-card__name">{{ data.name }}</h3>
            <p class="hero-card__description">{{ data.description }}</p>
            <p class="hero-card__votes">Votes: {{ data.votes }}</p>
        </div>

        <div class="hero-card__actions">
            <button class="hero-card__vote" data-test="button-up-vote" @click="vote('up')">Up</button>
            <button class="hero-card__vote" data-test="button-down-vote" @click="vote('down')">Down</button>
        </div>
    </div>
</template>
<style></style>