import React from "react"
import styled from "styled-components"


const Mem = ({ value, name, open, match, onClick }) => {

  return (
    <>
      <ValueWrapper onClick={() => onClick(name)} >
        <div style={ { transform: open || match ? `rotateY(0deg)` : `rotateY(90deg)` } }>{value}</div>
        <HidePlane />
      </ValueWrapper>
    </>
  )
}

const ValueWrapper = styled.div`
  height: 160px;
  width: 160px;
  background-color: ${p=>p.theme.tileBgCol};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p=>p.theme.textCol};
  font-size: 5rem;
  cursor: pointer;
`

const HidePlane = styled.div`
  height: 160px;
  width: 160px;
  background-color: ${p=>p.theme.tileBgCol};
  position: absolute;
  z-index: -1;
`

export default Mem