import { Grid } from '@nextui-org/react';
import type { GetStaticProps, NextPage } from 'next'
import { pokeApi } from '../api'
import { Layout } from '../components/layouts'
import { PokemonCard } from '../components/pokemon';
import { PokemonListResponse, SmallPokemon } from '../interfaces'

interface Props {
	pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({pokemons}) => {

	return (
		<Layout title='pokemon List'>
			<Grid.Container gap={2} justify='flex-start'>
				{
					pokemons.map((pokemon) => (
						<PokemonCard key={pokemon.id} pokemon={pokemon} />
					))
				}
			</Grid.Container>
		</Layout>
	)
}

//generacion estatica en el server de los 151 pokemones esto se ejecuta en el server 
//ya genera las 151 paginas con cada pokemon

export const getStaticProps: GetStaticProps = async (ctx) => {
	
	const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

	//añadir id y url de la imagen al objeto smallPokemon
	const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
		...poke,
		id: i + 1,
		img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`
	}))

	return {
		props: {
			pokemons
		}
	}
}

export default HomePage
