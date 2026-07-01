<template>
  <section class="mt-5 flex flex-col">
    <button
      @click="$emit('selectedOption', pokemon.id)"
      v-for="pokemon in pokemonOptions"
      :key="pokemon.id"
      :disabled="blockSelection"
      :class="[
        'capitalize disabled:shadow-none disabled:bg-gray-100',
        {
          correct: pokemon.id === correctAnswer && blockSelection,
          incorrect: pokemon.id !== correctAnswer && blockSelection,
        },
      ]"
    >
      {{ pokemon.name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';

//import { usePokemonGame } from '../composables/usePokemonGame';

//const { pokemonOptions } = usePokemonGame();
defineProps<{ pokemonOptions: Pokemon[]; blockSelection: boolean; correctAnswer: number }>();

defineEmits<{
  selectedOption: [id: number];
}>();
</script>

<style scoped>
@reference "../../../assets/styles.css";
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}

.correct {
  @apply bg-blue-500 text-white;
}

.incorrect {
  @apply bg-red-100 opacity-70;
}
</style>
