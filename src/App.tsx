import { useAuthSession } from "./hooks/useAuthSession";
import { AppRouter } from "./routes";

function App() {
  const r = useAuthSession();
  console.log(r);
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
