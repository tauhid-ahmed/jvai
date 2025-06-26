import { useAuthSession } from "./hooks/useAuthSession";
import { AppRouter } from "./routes";
import { useAppDispatch } from "./app/hooks";
import { initializeConfig } from "./features/app/configSlice";
import { useEffect } from "react";

function App() {
  const { isLoading } = useAuthSession();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeConfig());
  }, []);
  if (isLoading) return <div>Loading....</div>;
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
