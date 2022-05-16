import { Chart as ChartJS, CategoryScale, 
  LinearScale, BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
);

const ChartComponent =({ charData })=> { return (<>
  <Bar data={charData}
    options={{
      title: {
        display: true,
        text: 'Category',
        fontSize: 20,
      },
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: { color: 'rgb(255, 99, 132)' },
      },
    },
  }}
  />
</> ) }; export { ChartComponent };