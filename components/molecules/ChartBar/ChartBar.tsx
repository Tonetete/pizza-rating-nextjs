import React from "react";
import { Bar } from "@reactchartjs/react-chart.js";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 50%;
  height: auto;
  margin: 0 auto;
`;

interface ChartBarProps {
  data: {
    labels: string[];
    values: number[];
  };
  titleChart: string;
}

const backgroundColor = ["rgba(255, 99, 132, 0.2)"];

const boderColor = ["rgba(255, 99, 132, 1)"];

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  maintainAspectRatio: false,
};

const ChartBar = ({ data, titleChart }: ChartBarProps) => {
  const dataConfig = {
    labels: data.labels,
    datasets: [
      {
        label: `${titleChart}`,
        data: data.values,
        backgroundColor: new Array(data.values.length).fill(backgroundColor[0]),
        borderColor: new Array(data.values.length).fill(boderColor[0]),
        borderWidth: 1,
      },
    ],
  };

  return (
    <Wrapper>
      <div className="header">
        <h1 className="title">{titleChart}</h1>
      </div>
      <Bar type="bar" data={dataConfig} options={options} />
    </Wrapper>
  );
};

export default ChartBar;
