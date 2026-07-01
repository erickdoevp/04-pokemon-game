<template>
  <section>
    <ul class="mt-5">
      <li v-for="pokemon in pokemonOptions" :key="pokemon.id">
        {{ pokemon.name }} {{ pokemon.id }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { usePokemonGame } from '../composables/usePokemonGame';

const { pokemonOptions } = usePokemonGame();
</script>

<style scoped>
@reference "../../../assets/styles.css";
li {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}
</style>
