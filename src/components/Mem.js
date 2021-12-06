import React from "react"

import styled from "styled-components"



const Mem = ({ value, name, open, match, onClick }) => {




  return (
    <>
      <ValueWrapper onClick={() => onClick(name)} >
        <div style={ { transform: open || match ? `rotateY(0deg)` : `rotateY(70deg)` } }>{value}</div>

        <HidePlane />
      </ValueWrapper>
    </>
  )
}



const ValueWrapper = styled.div`
  height: 160px;
  width: 160px;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 5rem;
  cursor: pointer;
`

const HidePlane = styled.div`
  height: 160px;
  width: 160px;
  background-color: grey;
  position: absolute;
  z-index: -1;
`


export default Mem