import { useState } from 'react';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import confetti from 'canvas-confetti';
import { Layout } from '../../components/layouts'
import { PokemonResponse } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';

interface Props {
    pokemon: PokemonResponse;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

    const [isInFavorites, setisInFavorites] = useState(localFavorites.existInFavorites(pokemon.id));

    const onToggleFavorite = () => {
        localFavorites.toggleFavorites(pokemon.id);
        setisInFavorites(!isInFavorites);

        if(isInFavorites) return;

        confetti({
            zIndex: 100,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: { x: 1, y: 0 }
        })
    }

    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card hoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={pokemon.name}
                                width='100%'
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', alignItems:'flex-start', flexDirection:'column'}}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>
                            <Button 
                                onClick={onToggleFavorite} 
                                color='gradient' 
                                ghost={!isInFavorites}
                            >
                            {isInFavorites ? 'Is in favorites' : 'Add to favorites'}       
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container display='flex' direction='row' gap={3}>
                                <Card.Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Card.Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Card.Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Card.Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`)

    return {
        paths: pokemons151.map(id => ({
            params: { id }
        })),
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id } = params as { id: string };

    const pokemon = await getPokemonInfo(id);

    if (!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    } //incremental static  regeneration: es cuando se añade un nuevo producto y no tener qu buildear a cada rato y crea una pag nueva despues del build

    return {
        props: {
            pokemon
        },
        revalidate: 86400 // 1 day-- 60 * 60 * 24 seg/min/hs va a buidear de nuevo para generar un nuevo cache
    }
}

//revalidate es static props regeneration

export default PokemonPage;
