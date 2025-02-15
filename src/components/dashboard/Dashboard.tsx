import './DashboardStyle.css';
import { FaUsers, FaChartLine, FaDollarSign } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const App = () => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Revenue',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const cards = [
    {
      className: 'card-users',
      icon: FaUsers,
      title: 'Users',
      name:'MUTHUKUMARAN',
      task: 'IN-PROGRESS',
    },
    {
      className: 'card-traffic',
      icon: FaChartLine,
      title: 'Traffic',
      value: '8,500',
    },
    {
      className: 'card-revenue',
      icon: FaDollarSign,
      title: 'Revenue',
      value: '$34,000',
    },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="grid">
        {cards.map((card, index) => (
          <div key={index} className={`card ${card.className}`}>
            <card.icon size={40} />
            <h6>{card.title}</h6> <h5>{card.name}</h5>
            <h4>{card.task}</h4>
          </div>
        ))}
      </div>
      <div className="chart-container">
        <h6 className="chart-title">Monthly Revenue</h6>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default App;
