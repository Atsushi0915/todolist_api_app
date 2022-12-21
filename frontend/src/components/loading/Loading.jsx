import styled from "styled-components";
import React, { memo } from "react";
import ReactLoading from "react-loading";

export const Loading = memo((props) => {
  return (
    <RoadingDiv  >
      <ReactLoading
        type="spinningBubbles"
        color="#000000"
        height="100px"
        width="100px"
        className="mx-auto" />
      <SRoadingP>
        {props.children}
      </SRoadingP>
    </RoadingDiv>
  )
});

const RoadingDiv = styled.div`
  padding: 200px 0 100px;
  text-align: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: auto;
  min-height: 100%;
  font-style: italic;
`
const SReactLoading = styled(ReactLoading)`
  align-items: center;
  position: absolute;
`

const SRoadingP = styled.p`
  font-size: 20px;
  margin-top: 40px;
`
