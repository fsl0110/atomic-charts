import React, { FC } from "react";
import styled from "styled-components";
import { FetchDispatch } from "../../components";
import { axiosOpenFDA, openFDA } from "../../data/rest/openFDA";
import { Chart } from "./chart";

const StyledDiv = styled.div`
  width: 100%;
`;

type Data = (Date | number)[];

export const LineChart: FC = () => {
  return (
    <StyledDiv>
      <FetchDispatch fetch={axiosOpenFDA(openFDA.foodEnforcementReports(""))}>
        {(data: Data) => <Chart data={data} />}
      </FetchDispatch>
    </StyledDiv>
  );
};
