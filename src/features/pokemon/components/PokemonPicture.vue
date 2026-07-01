<template>
  <section>
    <img v-if="!showPokemon" class="brightness-0 h-[200px]" :src="pokemonImg" alt="pokemon" />
    <img v-else :src="pokemonImg" alt="pokemon" class="h-[200px] fade-in" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  pokemonId: number;
  img?: string;
  showPokemon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showPokemon: false,
});
const pokemonImg = computed(
  () =>
    props.img ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`,
);
</script>

<style scoped>
img {
  user-select: none;
}
</style>
