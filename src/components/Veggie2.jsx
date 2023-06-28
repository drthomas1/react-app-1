import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Intersection } from "@splidejs/splide-extension-intersection"
import '@splidejs/react-splide/css';
import {Link} from 'react-router-dom';
import './veggie2.scss';

function Veggie2() {
  const [veggie2, setVeggie2] = useState([]);

  useEffect(()=> {
      getVeggie2();
  },[]);

  const getVeggie2 = async () => {
    const check = localStorage.getItem('veggie2');
    if(check){
      setVeggie2(JSON.parse(check));
    } else{
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=6&tags=summer`
      );
      const data = await api.json();

      localStorage.setItem('veggie2', JSON.stringify(data.recipes));
      setVeggie2(data.recipes);
      // console.log(data.recipes)
    }
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
            intersection: {
              inView: {
              autoplay: true,
              },
              },
            speed: 2000,
            drag: false,
            breakpoints: {
              992: {
                pagination: false,
              }
            }
          } } 
          extensions={{ Intersection }}
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
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  @media screen and (max-width: 992px) {
     flex-direction: column;
    }

  img{
    left: 0;
    width: 66.666666%;
    object-fit: cover;

    @media screen and (max-width: 992px) {
     height: 50%;
     width: 100%;
    }
  }
  div{
    width: 33.333333%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(35deg, #494949, #313131);

    @media screen and (max-width: 992px) {
     height: 50%;
     width: 100%;
     padding: 2rem 0rem;
    }

    h3{
        color: white;
        text-align: center;
        padding: 0 0.5rem;
    }

    p{
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 25px;
        padding: 0 0.5rem;
    }
    button{
        padding: 8.5px 15px;
        border-radius: 7.5px;
        font-weight: bold;
        background: black;
        border: 2px solid white;
        color: white;

        :hover {
        background: linear-gradient(to right, #f27121, #e94057);
    }
    }

}
`;

export default Veggie2