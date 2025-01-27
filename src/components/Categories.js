import styled from "styled-components";
export default function Categories({ categoryList, selectedPhrases, setSelectedPhrases }){

  console.log('selectedPhrases', selectedPhrases)

  const wordClicked = e => {
    if (selectedPhrases && selectedPhrases.includes(e.target.dataset.value)) {
      setSelectedPhrases(phrases => phrases.filter(r => r !== e.target.dataset.value));
    } else {
      setSelectedPhrases(phrases => [...phrases, e.target.dataset.value]);
    }
  }

  const addAllClick = e => {
    const categoryName = e.target.dataset.value;
    const category = categoryList.find(e => e.categoryName === categoryName);
    category.phrases.forEach(e => {
      if (!selectedPhrases.includes(e)) {
        setSelectedPhrases(phrases => [...phrases, e]);
      }
    })
  }
  const removeAllClick = e => {
    const categoryName = e.target.dataset.value;
    const category = categoryList.find(e => e.categoryName === categoryName);
    category.phrases.forEach(e => {
      setSelectedPhrases(phrases => phrases.filter(r => r !== e));
    })
  }

  return (
    <CategoryWrap>
      {
        categoryList &&
        categoryList.map((category, i) => {

          return (
            <Category key={i}>
              <CategoryHeaderWrap>
                <CategoryHeader>{category.categoryName}</CategoryHeader>
                <Div>
                  <SmallButton color={'green'} data-value={category.categoryName} onClick={addAllClick}>Add all</SmallButton>
                  <SmallButton color={'red'} data-value={category.categoryName} onClick={removeAllClick}>Remove all</SmallButton>
                </Div>

              </CategoryHeaderWrap>
              <CensorWordsWrap>
                {
                  category.phrases.map((phrase, i) => {
                    if (selectedPhrases && selectedPhrases.includes(phrase)) {
                      return (
                        <WordClicked key={i} data-value={phrase} onClick={wordClicked}>
                          {phrase}
                        </WordClicked>
                      )
                    }
                    else {
                      return (
                        <Word key={i} data-value={phrase} onClick={wordClicked}>
                          {phrase}
                        </Word>
                      )
                    }
                  })
                }
              </CensorWordsWrap>
            </Category>
          )

        })
      }
    </CategoryWrap>
  )
}

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;
`;

const Category = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: ${props => props.theme.colors.boxColor};
  border-radius: 10px;
  margin: 20px 0;
  padding: 20px;
  max-width: 1200px;
`;

const CategoryHeaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const CategoryHeader = styled.h2`
`;

const Div = styled.div`
  display: flex;
  gap: 15px;
`;

const SmallButton = styled.div`
  background-color: ${props => props.theme.colors.button};
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 14px;

  ${props => props.theme.shading.soft};
  :hover {
    background-color: ${props => props.theme.colors[props.color]};
    ${props => props.theme.shading.hard};
    color: ${props => props.color === 'green' && props.theme.colors.black}; 
  }
`;

const CensorWordsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Word = styled.div`
  background-color: ${props => props.theme.colors.button};
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 15px;

  ${props => props.theme.shading.soft};
  :hover {
    background-color: ${props => props.theme.colors.buttonHover};
  }
`;

const WordClicked = styled.div`
  background-color: ${props => props.theme.colors.green};
  color: ${props => props.theme.colors.black};
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 15px;

  ${props => props.theme.shading.soft};
  :hover {
    background-color: ${props => props.theme.colors.greenHover};
  }
`;