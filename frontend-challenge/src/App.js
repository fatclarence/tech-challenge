import AppRouter from './routes/AppRouter'
import UserProvider from './wrappers/UserProvider'

function App() {
  return (
    <div>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </div>
  );
}

export default App;
