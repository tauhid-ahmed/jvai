import { useAuthSession } from "./hooks/useAuthSession";
import { AppRouter } from "./routes";

function App() {
  const { isLoading } = useAuthSession();
  if (isLoading) return <div>Loading....</div>;
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
