import { useAppDispatch } from "../app/hooks";
import { toggleTheme } from "../features/app/configSlice";
import { Button } from "./button";

export default function ModeToggle() {
  const dispatch = useAppDispatch();
  return (
    <div>
      ModeToggle
      <Button onClick={() => dispatch(toggleTheme())}>toggle theme</Button>
    </div>
  );
}
