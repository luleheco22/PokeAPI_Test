import React from 'react'
import { Pokemon } from '../interfaces/index';
import { LiaHashtagSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

const Container = tw.div`
cursor-pointer sm:p-3 sm:hover:shadow-slate-400 sm:shadow-md rounded-lg
    sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200
`
const Image = tw.img`
rounded-t-lg
sm:rounded-t-lg group-hover:opacity-80 transition-opacity duration-200
`

const ContainerInfo = tw.div`
p-5
`
const Title = tw.h2`
mb-2 text-2xl font-bold 
tracking-tight text-orange-600
`
const ContainerImage = tw.div`
  relative
  inline-block
  text-center
`
const Type = tw.p`
text-white
text-lg
px-5 py-1
absolute bottom-0 left-0
 `

const Weigth = tw.p`
inline-flex items-center px-3 py-2 text-xs font-medium text-center text-white rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-orange-300 
absolute bottom-1 right-5
border border-white
`

const ContainerAbilities = tw.div`
 flex flex-wrap justify-start space-x-2
 items-center
`

const Ability = tw.p`
text-orange-400 font-semibold text-sm
`
const Card = (result: Pokemon) => {
    
    const { name, id, weight, abilities, types } = result;

    const getBackgroundColor = (type: string) => {
        switch (type) {
            case 'grass':
                return 'green';
            case 'fire':
                return 'red';
            case 'water':
                return 'blue';
            case 'electric':
                return 'yellow';
            case 'bug':
                return 'lime';
            case 'poison':
                return 'purple';
            case 'normal':
                return 'gray';
            case 'flying':
                return 'skyblue';
            case 'fighting':
                return 'orange';
            case 'psychic':
                return 'pink';
            case 'rock':
                return 'brown';
            case 'ground':
                return 'sandybrown';
            default:
                return 'gray';
        }
    };

    const backgroundColor = getBackgroundColor(types[0].type.name)

    return (
        <Container>
            <Link to={`/pokemons/${id}`}>
                <ContainerImage>
                    <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                        placeholder='blur'
                        style={{ backgroundColor }}
                    />
                    <Type>
                        {types[0].type.name}
                    </Type>
                    <Weigth
                        style={{ backgroundColor }}
                    >
                        weight: {weight}
                    </Weigth>


                </ContainerImage>
                <ContainerInfo>
                    <Title>
                        {name}
                    </Title>
                    <ContainerAbilities>

                        {abilities.map((ability, index) => (
                            <React.Fragment key={index}>
                                <LiaHashtagSolid className='h-5' />
                                <Ability>
                                    {ability.ability.name}
                                </Ability>
                            </React.Fragment>
                        ))}
                    </ContainerAbilities>
                </ContainerInfo>
            </Link>
        </Container>
    )
}

export default Card