import { useEffect, useState } from 'react';
import { Layout } from '../../components/layouts'
import { FavoritesPokemons } from '../../components/pokemon';
import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';


export const Favorites = () => {

    const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

    useEffect(() => {
        setFavoritePokemons(localFavorites.pokemons())
    }, [])


    return (
        <Layout title='Favorites Pokemons'>
            {
                favoritePokemons.length === 0
                    ? <NoFavorites />
                    : (
                        <FavoritesPokemons favoritePokemons={favoritePokemons} />
                    )
            }
        </Layout>
    )
}

export default Favorites;