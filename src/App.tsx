import { useAuthSession } from "./hooks/useAuthSession";
import { AppRouter } from "./routes";

function App() {
  useAuthSession();
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
