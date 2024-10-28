import { ThreeDots } from "react-loader-spinner";


const Loader = () => {
  return (
    <div className=" h-screen w-screen flex items-center justify-center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#F2D161"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loader