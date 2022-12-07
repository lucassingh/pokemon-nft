import { FC } from "react"
import Head from "next/head"
import { Navbar } from "../ui"

interface Props {
    children: JSX.Element,
    title?: string
}

const origin = (typeof window === "undefined") ? '': window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {

    return (
        <>
            <Head>
                <title>{title || 'Pokemon - App'}</title>
                <meta name='author' content='Lucas Singh'></meta>
                <meta name='description' content={`Pokemon Info ${title} `}></meta>
                <meta name='keywords' content={`${title}, pokemon, pokedex`}></meta>
                <meta property="og:title" content={`info about ${title}`} />
                <meta property="og:description" content="This site show all Pokemons available in first generation." />
                <meta property="og:image" content={`${origin }/img/banner.png` } />
            </Head>

            <Navbar />

            <main style={{
                padding: '0px 20px'
            }}>
                {children}
            </main>
        </>
    )
}
