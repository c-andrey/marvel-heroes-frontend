<script lang="ts" setup>
import { HeroType } from './heroes.types';

defineProps<{ data: HeroType }>();

const emit = defineEmits<{
    'up-vote': [id: number]
    'down-vote': [id: number]
}>()

const upVote = (id: number) => {
    emit('up-vote', id);
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
            <button class="hero-card__vote" data-test="button-up-vote" @click="(upVote)">Vote</button>
        </div>
    </div>
</template>
<style></style>