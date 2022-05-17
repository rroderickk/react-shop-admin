import { Chart as ChartJS, CategoryScale, 
  LinearScale, BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, 
  Title, Tooltip, Legend,
);

const options = {
  title: { display: true,
    text: 'Category',
    fontSize: 20,
  },
  plugins: {
    legend: { display: true,
      position: 'top',
      labels: { color: 'rgb(255, 99, 132)' },
    },
  },
};

export const ChartComponent =({ charData })=>
  <Bar className="mb-8 mt-2" data={charData} options={options}/>