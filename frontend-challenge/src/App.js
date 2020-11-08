import AppRouter from './routes/AppRouter'
import UserProvider from './wrappers/UserProvider'
import { BrowserRouter, useHistory } from 'react-router-dom';

function App() {
  const history = useHistory();
  return (
    <div>
      <BrowserRouter history={history}>
        <UserProvider>
          <AppRouter />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
