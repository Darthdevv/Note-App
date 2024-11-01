// DarkModeContext.tsx

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Define the shape of the context
interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Create the context
const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

// Create a provider component
export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Toggle function to switch dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode)); // Save to local storage
      return newMode;
    });
  };

  // Effect to apply dark mode styles
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom hook for using the context
// eslint-disable-next-line react-refresh/only-export-components
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
