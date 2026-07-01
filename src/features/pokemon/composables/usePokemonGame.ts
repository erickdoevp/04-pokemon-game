import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemon.api';
import confetti from 'canvas-confetti';

const gameStatus = ref<GameStatus>(GameStatus.Playing);
const pokemonOptions = ref<Pokemon[]>([]);
const pokemons = ref<Pokemon[]>([]);

const isLoading = computed(() => pokemons.value.length === 0);
const randomPokemon = computed(() => {
  const randomNumber = Math.floor(Math.random() * pokemonOptions.value.length);
  return pokemonOptions.value[randomNumber];
});

export const usePokemonGame = () => {
  const getPokemons = async () => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');
    const pokemonArray: Pokemon[] = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      return {
        name: pokemon.name,
        id: Number(urlParts[urlParts.length - 2]),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${urlParts[urlParts.length - 2]}.svg`,
      };
    });

    return pokemonArray.sort(() => Math.random() - 0.5);
  };

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (id: number) => {
    const hasWon = id === randomPokemon.value?.id;
    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });
      return;
    }

    gameStatus.value = GameStatus.Lost;
  };

  onMounted(async () => {
    const allPokemons = await getPokemons();
    pokemons.value = allPokemons;

    getNextRound();
  });

  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    getNextRound,
    randomPokemon,
    checkAnswer,
  };
};
