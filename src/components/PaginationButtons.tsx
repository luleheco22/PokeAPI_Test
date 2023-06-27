import React from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import usePokemon from '../hooks/usePokemon';
import tw from 'twin.macro';


const Container = tw.div`
text-orange-700 
flex 
items-center
px-10 
pb-4 
justify-between
sm:justify-center
sm:space-x-44 
sm:px-0
`


const PaginationButtons: React.FC = () => {

    const { fetchNextPage, fetchPreviousPage, startIndex, count } = usePokemon();
    const pageSize = 10;
    const totalPages = Math.ceil(count / pageSize);
    
    return (
        <Container>
            {startIndex >= 10 && (
                <div
                    className="flex flex-col cursor-pointer items-center hover:underline"
                    onClick={fetchPreviousPage}
                >
                    <BsChevronLeft className="h-5" />
                    <p>Previous</p>
                </div>
            )}
            <div>
            Total Pages: {totalPages}
            </div>
            {startIndex <= 2000 && (
                <div
                    className="flex flex-col cursor-pointer items-center hover:underline"
                    onClick={fetchNextPage}
                >
                    <BsChevronRight className="h-5" />
                    <p>Next</p>
                </div>
            )}
        </Container>
    );
};

export default PaginationButtons;