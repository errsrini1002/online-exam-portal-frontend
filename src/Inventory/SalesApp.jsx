import SalesView from './SalesView';
import SalesForm from './SalesForm';
import './SalesStyles.css';

function SalesApp() {
  return (
    <div className="SalesApp">
      <h1>Sales Tracker</h1>
      <SalesForm />
      <SalesView />
    </div>
  );
}

export default SalesApp;
