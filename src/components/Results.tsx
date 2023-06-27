import React from 'react'
import Card from './Card';
import { Pokemon } from '../interfaces/index';
import tw from 'twin.macro';
import PaginationButtons from './PaginationButtons';

interface ResultsProps {
    results?: Pokemon[];
  }

const Container = tw.div`
sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
2xl:grid-cols-5 max-w-6xl mx-auto py-4
`
const Results = ({results} : ResultsProps) => {

  return (
    <Container>
        {results?.map((result:Pokemon) => (
           <Card 
             key={result.id}
             {...result}
            />
        ))}
        <PaginationButtons />
    </Container>
  )
}

export default Results