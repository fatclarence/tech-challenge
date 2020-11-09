import AppRouter from './routes/AppRouter'
import UserProvider from './wrappers/UserProvider'
import { BrowserRouter, useHistory } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const history = useHistory();
  return (
    <div>
      <ToastContainer />
      <UserProvider>
        <BrowserRouter history={history}>
            <AppRouter />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
