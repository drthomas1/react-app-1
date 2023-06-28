import { useEffect, useState } from "react";
import styled from "styled-components";
import '@splidejs/react-splide/css';
import {Link} from 'react-router-dom';

function Dessert() {
  const [dessert, setDessert] = useState([]);

  useEffect(()=> {
      getDessert();
  },[]);

  const getDessert = async () => {
      const check = localStorage.getItem('dessert');
      if(check){
        setDessert(JSON.parse(check));
      } else{
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=18&tags=dessert`
        );
        const data = await api.json();

        localStorage.setItem('dessert', JSON.stringify(data.recipes));
        setDessert(data.recipes);
        console.log(data.recipes)
      }
    };

  return (
    <Wrapper>
      <h3>Our Dessert Picks</h3>
      <Grid>
          {dessert.map((item) => {
              return(
                  <Card key={item.id}>
                      <Link to={'/recipe/' + item.id}>
                          <img src={item.image} alt="" />
                          <h5>{item.cuisines[0]? item.cuisines[0] : item.dishTypes[0]}</h5>
                          <h4>{item.title}</h4>
                      </Link> 
                  </Card>
              )
          })} 
      </Grid>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0rem;

  h3{
    text-align: center;
  }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`

    img {
        width: 100%;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4, h5 {
        text-align: left;
        padding: 4px;
    }
    h5{
      color: #e94057;
      text-transform: uppercase;
    }
`;

export default Dessert