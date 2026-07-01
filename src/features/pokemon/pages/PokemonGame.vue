<template>
  <section
    v-if="isLoading || randomPokemon?.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1>Espere por favor</h1>
    <h3>Cargando pokemons</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Quién es este Pokemon?</h1>
    <h3 class="capitalize">{{ gameStatus }}</h3>
    <PokemonPicture
      :pokemon-id="randomPokemon?.id ?? 0"
      :img="randomPokemon?.image"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />
    <PokemonOptions
      :pokemon-options="pokemonOptions"
      @selected-option="checkAnswer"
      :block-selection="gameStatus !== GameStatus.Playing"
      :correct-answer="randomPokemon?.id ?? 0"
    />
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame.ts';
import { GameStatus } from '../interfaces/game-status.enum.ts';

const { isLoading, randomPokemon, gameStatus, pokemonOptions, checkAnswer } = usePokemonGame();
</script>

<style scoped></style>
