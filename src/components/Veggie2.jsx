import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {Link} from 'react-router-dom';
import './veggie2.css';

function Veggie2() {
  const [veggie2, setVeggie2] = useState([]);

  useEffect(()=> {
      getVeggie2();
  },[]);

  const getVeggie2 = async () => {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=6&tags=summer`
        );
        const data = await api.json();
        setVeggie2(data.recipes);
        console.log(data.recipes);
      
    };

  return (
    <div>
         <Wrapper>
        <h3>Great Summer Recipes</h3>
        <Splide 
          options={ {
            perPage: 1,
            arrows: true,
            pagination: true,
            pauseOnHover: true,
            autoplay: true,
            rewind: true,
            type: "fade",
            interval: 5000,
            speed: 2000,
            drag: false,
          } } 
        >
          {veggie2.map((recipe) => {

            function determineHeading (arr, arr2, arr3) {
              let newArr = [];
            
              for(let i=0; i<arr.length; i++){
                if(arr[i] !== 'summer'){
                newArr.push(arr[i]);
                }
              }
              for(let j=0; j<arr2.length; j++){
                newArr.push(arr2[j]);
              }
              for(let k=0; k<arr3.length; k++){
                newArr.push(arr3[k]);
              }
              let random = Math.floor(Math.random() * newArr.length);
              // console.log(newArr);
              // console.log(newArr[random]);
              return newArr[random].toUpperCase();
            }
            

            return(
              <SplideSlide key={recipe.id}>
                <Card>
                    <img src={recipe.image} alt={recipe.title} />
                    <div>
                        <h3>{determineHeading(recipe.occasions, recipe.diets, recipe.dishTypes)}</h3>
                        <p> {recipe.title} </p>
                        <Link to={'/recipe/' + recipe.id}>
                            <button>Learn More</button>   
                        </Link>
                  </div>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>

    
  )
}

const Wrapper = styled.div`
  margin: 4rem 0rem;

    h3{
      text-align: center;
    }
`;
const Card = styled.div`
  display: flex;
  min-height: 25rem;
  overflow: hidden;
  position: relative;

  img{
    left: 0;
    width: 50%;
    object-fit: cover;
  }
  div{
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(35deg, #494949, #313131);

    h3{
        color: white;
        text-align: center;
    }

    p{
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 25px;
    }
    button{
        padding: 7.5px;
        border-radius: 7.5px;
        font-weight: bold;
    }
}
`;

export default Veggie2