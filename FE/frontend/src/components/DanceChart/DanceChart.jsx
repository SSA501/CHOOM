import styled from "styled-components";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      type: "line",
      label: "Dataset 1",
      borderColor: "rgb(54, 162, 235)",
      borderWidth: 2,
      data: [1, 2, 3, 4, 5],
    },
    {
      type: "bar",
      label: "Dataset 2",
      backgroundColor: "rgb(255, 99, 132)",
      data: [1, 2, 3, 4, 5, 6],
      borderColor: "red",
      borderWidth: 2,
    },
    {
      type: "bar",
      label: "Dataset 3",
      backgroundColor: "rgb(75, 192, 192)",
      data: [1, 2, 3, 4, 5, 6],
    },
  ],
};

const DanceChart = () => {
  return (
    <Container>
      <DanceChart data={data} />
    </Container>
  );
};

export default DanceChart;

const Container = styled.div`
  width: 90vw;
  max-width: 900px;
`;
