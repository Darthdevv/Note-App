import { ThreeDots } from "react-loader-spinner";
import { useDarkMode } from "../context/DarkModeContext";


const Loader = () => {
  // Use the dark mode context
  const { isDarkMode } = useDarkMode();
  return (
    <div className=" h-screen w-screen flex items-center justify-center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color={isDarkMode ? "#ffffff" : "#F2D161"}
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loader