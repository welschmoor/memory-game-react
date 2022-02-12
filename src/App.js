import React, { useState, useEffect } from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { IoIosSunny } from "react-icons/io"

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

const lightTheme = {
  bgCol: '#bbbbb8',
  tileBgCol: "#252424",
  textCol: "white",
  titleCol: "#252424",
  subtitleCol: "#252424",
}

const darkTheme = {
  bgCol: "#252424",
  tileBgCol: "grey",
  textCol: "white",
  titleCol: '#b9b9b9',
  subtitleCol: "#969696",
}


const mems = [
  { value: 1, name: "1a", open: false, match: false, clicked: false },
  { value: 1, name: "1b", open: false, match: false, clicked: false },
  { value: 1, name: "1c", open: false, match: false, clicked: false },

  { value: 2, name: "2a", open: false, match: false, clicked: false },
  { value: 2, name: "2b", open: false, match: false, clicked: false },
  { value: 2, name: "2c", open: false, match: false, clicked: false },

  { value: 3, name: "3a", open: false, match: false, clicked: false },
  { value: 3, name: "3b", open: false, match: false, clicked: false },
  { value: 3, name: "3c", open: false, match: false, clicked: false },

  { value: 4, name: "4a", open: false, match: false, clicked: false },
  { value: 4, name: "4b", open: false, match: false, clicked: false },
  { value: 4, name: "4c", open: false, match: false, clicked: false },

]


function App() {
  const [memState, setMemState] = useState([])
  const [timesClicked, setTimesClicked] = useState(0)
  const [moves, setMoves] = useState(0)
  console.log(localStorage.getItem("memDarkMode"))
  const [darkMode, setDarkMode] = useState( localStorage.getItem("memDarkMode") === "false" )
  console.log("darkMode", darkMode)

  useEffect(() => {
    newGameBtnHandler()
  }, [])

  const newGameBtnHandler = () => {
    function shuffle(array) {
      let currentIndex = array.length,  randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      return array;
    }

    const memsSorted = shuffle(mems)
    setMemState(memsSorted)
    setTimesClicked(0)
    setMoves(0)
  }

  // save dark mode in local storage
  // useEffect(() => {
  //   const darkModeValue = localStorage.getItem("memDarkMode")
  //   console.log(darkModeValue)
  //   if (darkModeValue) {
  //     setDarkMode(darkModeValue)
  //   }
  // }, [])

  const darkModeHandler = () => {
    setDarkMode(p=>!p)
    localStorage.setItem("memDarkMode", darkMode)
    
  }

  const clickHandler = (name) => {
    if (timesClicked === 3) return // this prevents the 4th tile from openening!
    if (memState.find(e => e.name === name).clicked) return; // this prevents from clicking the same tile twice or more times

    setMemState(p => {  // this code sets clicked to true to prevent double clicks on the same tile
      return p.map(e => {
        if (e.name === name) {
          return { ...e, clicked: true }
        } else {
          return e
        }
      })
    })

    setTimesClicked(p => p + 1)

    setMemState(p => {  // clicked tile has its open prop set to true
      return p.map(e => {
        if (e.name === name) {
          return { ...e, open: true }
        } else {
          return e
        }
      })
    })
  }

  // what do we do when three cards match
  useEffect(() => {
    
    if (timesClicked === 3) { // the reason 3 is we have three equal tiles
      setMoves(p=>p+1)
      let tempArr = [];
      memState.filter(e => e.open).forEach(e => {
        tempArr.push(e.value)
      })

      const won = tempArr.every(val => val === tempArr[0]);

      if (won) {
        console.log("Match!!!")
        setTimesClicked(0)
        setMemState(p => {
          return p.map(e => {
            if (e.open) {
              return { ...e, match: true, open: false }
            } else {
              return { ...e, open: false }
            }
          })
        })
      } else { //if won === false        
        setTimeout(() => {
          setMemState(p => {
            return p.map(e => {
              return { ...e, open: false, clicked: false }
            })
          })
          setTimesClicked(0)
        }, 1337)
      }
    }
  }, [timesClicked]) // /end useEffect



  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme} >
      <Wrapper>
        <GlobalStyle />
        <div>
          <Title>Memory Game</Title>
          <Subtitle>Find 3 matching numbers!</Subtitle>
        </div>
        <GRID >
          {memState && memState.map(e => {
            return (
              <Mem {...e} onClick={clickHandler} hidden={e.open} key={e.name} />
            )
          })}
        </GRID>
        <Moves>Moves: {moves}</Moves>
        <NewGameBtn onClick={newGameBtnHandler} >New Game</NewGameBtn>
        <DarkModeBtn onClick={darkModeHandler}><SunIcon /></DarkModeBtn>
      </Wrapper>
    </ThemeProvider>
  );
}


const Wrapper = styled.div`
  padding-top: 30px;
  margin: 0px auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: ${p => p.theme.bgCol};
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

const Title = styled.h2`
  color: ${p=>p.theme.titleCol};
  font-size: 2rem;
  display: flex;
  justify-content: center;
`

const Subtitle = styled(Title)`
  font-size: 1.1rem;
  color: ${p=>p.theme.subtitleCol};
`

const Moves = styled.h4`
  font-size: 1.3rem;
  color: ${p=>p.theme.subtitleCol};
`

const NewGameBtn = styled.button`
  border: 2px solid ${p=>p.theme.subtitleCol};
  cursor: pointer;
  background-color: ${p=>p.theme.bgCol};
  color: ${p=>p.theme.titleCol};
  padding: 10px 20px;
  font-size: 1rem;
  &:active {
    transform: scale(0.97);
  }
`

const DarkModeBtn = styled.button`
  position: fixed;
  top: 14px;
  left: 14px;
  background: none;
  border: none;
  cursor: pointer;
`

const SunIcon = styled(IoIosSunny)`
  font-size: 2rem;
  color: ${p=>p.theme.titleCol};
`
export default App;
