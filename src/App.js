import React, { useState, useEffect } from "react"
import styled, { createGlobalStyle } from "styled-components";
import Mem from "./components/Mem";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  html {
    font-size: 125%;
  }
  body {
    background-color: #252424;
  }
`


const mems = [
  { value: 1, name: "1a", open: false, match: false },
  { value: 1, name: "1b", open: false, match: false },
  { value: 1, name: "1c", open: false, match: false },

  { value: 2, name: "2a", open: false, match: false },
  { value: 2, name: "2b", open: false, match: false },
  { value: 2, name: "2c", open: false, match: false },

  { value: 3, name: "3a", open: false, match: false },
  { value: 3, name: "3b", open: false, match: false },
  { value: 3, name: "3c", open: false, match: false },

  { value: 4, name: "4a", open: false, match: false },
  { value: 4, name: "4b", open: false, match: false },
  { value: 4, name: "4c", open: false, match: false },

]


function App() {
  const [memState, setMemState] = useState()
  const [firstState, setFirstState] = useState(false)
  const [secondState, setSecondState] = useState(false)
  const [thirdState, setThirdState] = useState(false)

  useEffect(()=> {
    const memsSorted = [...mems].sort(()=> Math.random()-0.5)
    setMemState(memsSorted)
  }, [])


  const clickHandler = (name) => {

    const clickedMem = memState.filter(e=> e.name===name)
    console.log("clickedMem", clickedMem)
    setMemState(p=>{ 
      console.log(p)
      const stateWithoutOne = p.filter( e => e.name !== name )

      return [...clickedMem, ...stateWithoutOne]
    })
  }

  return (
    <Wrapper>
      <GlobalStyle />
      <GRID >
        {memState && memState.map(e => {
          return (
            <Mem {...e} onClick={clickHandler} hidden={e.open} key={e.name}/>
          )
        })}
      </GRID>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  margin: 80px auto;

`

const GRID = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 160px);
  align-content:center;
  justify-content: center;
  align-items: center;
  justify-items: center;
  position: relative;
`

export default App;
