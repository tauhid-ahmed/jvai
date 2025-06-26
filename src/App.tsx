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
  if (isLoading)
    return (
      <div className="flex items-center justify-center dark:bg-grey-900 dark:text-grey-100 text-lg h-screen">
        Loading....
      </div>
    );
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
