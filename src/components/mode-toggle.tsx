import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleTheme, selectTheme } from "../features/app/configSlice";
import { Button } from "./button";

export default function ModeToggle() {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectTheme);
  return (
    <Button className="w-full" onClick={() => dispatch(toggleTheme())}>
      <strong className="text-lg">{currentTheme}</strong> toggle theme
    </Button>
  );
}
