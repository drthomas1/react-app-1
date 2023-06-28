import { useEffect, useState } from "react";
import styled from 'styled-components';
import { useParams } from "react-router-dom";


function Recipe() {

  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');
  
  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData);
  };

useEffect(() => {
  fetchDetails();
}, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src = {details.image} alt = "" />  
      </div>
      <Info>
          <h4>Serves {details.servings}</h4>
          <h4>Cooks in {details.readyInMinutes} minutes</h4>
            <div className="dietary">
              <h4>Dietary Info:</h4>
              <ul>
                {details.diets?.map((diet, index) => (
                <li key={index}>{diet}</li>
                ))}
              </ul>
            </div>
            <h4>Recipe via {details.sourceName}</h4>   
        <div>
          <Button 
            className={activeTab === 'instructions' ? 'active' : ''} 
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button 
            className={activeTab === 'ingredients' ? 'active' : ''} 
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
        </div>

        {activeTab === 'instructions' && (
          <div>
            <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
            <h4 dangerouslySetInnerHTML={{ __html: details.instructions }}></h4>
          </div>
        )}
        {activeTab === 'ingredients' &&(
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
        </ul>
        )}
        
      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;

  @media screen and (max-width: 1024px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        }
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  img{
    object-fit: cover;

    @media screen and (max-width: 1024px) {
        width: 100%;
        height: auto;
        }
  }

  h2{
    margin-bottom: 2rem;
  }
  h4{
    margin: 2rem 0;
    line-height: 1.75;
  }
  li{
    font-size: 1rem;
    line-height: 1.75;
  }
  ul{
    margin-top: 2rem;
  }
  p{
    margin: 2rem 0;
    line-height: 1.75;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 1rem;
  font-weight: 600;

  @media screen and (max-width: 1024px) {
    margin-top: 2rem;
        }

`;
const Info = styled.div`
  margin-left: 5rem;

  @media screen and (max-width: 1024px) {
    margin-left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
        }

        .dietary{
          display: flex;
          gap: 10px;

          ul {
            margin: 0;
          }

          li {
            display: flex;
            margin-bottom: 7.5px;
          }

          h4, p {
            margin: 0;
          }
        }
`;






export default Recipe