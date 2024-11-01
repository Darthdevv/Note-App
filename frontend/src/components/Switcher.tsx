import React from "react";

interface ThemeSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  checked,
  onChange,
  id = "darkSwitch",
}) => {
  return (
    <input
      data-hs-theme-switch=""
      type="checkbox"
      id={id}
      className="relative w-[3.25rem] h-7 bg-[#F2D161] checked:bg-none checked:bg-[#0E141C] border-2 border-[#F2D161] dark:border-[#1f2533] rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:border-[#F2D161] focus:ring-transparent focus:outline-none appearance-none
        before:inline-block before:size-6 dark:before:bg-white before:bg-[cornsilk] checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200
        after:absolute after:end-1.5 after:top-[calc(50%-0.40625rem)] after:w-[.8125rem] after:h-[.8125rem] after:bg-no-repeat after:bg-[right_center] after:bg-[length:.8125em_.8125em] after:transform after:transition-all after:ease-in-out after:duration-200 after:opacity-70 checked:after:start-1.5 checked:after:end-auto"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
};

export default ThemeSwitch;
