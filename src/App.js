import ApplicationRoutes from './applicationRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <ApplicationRoutes />
    </div>
  );
}

export default App;
