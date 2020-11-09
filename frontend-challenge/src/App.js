import AppRouter from './routes/AppRouter'
import UserProvider from './wrappers/UserProvider'
import { BrowserRouter, useHistory } from 'react-router-dom';

function App() {
  const history = useHistory();
  return (
    <div>
      <UserProvider>
        <BrowserRouter history={history}>
            <AppRouter />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
