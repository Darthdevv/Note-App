

const Card = () => {
  return (
    <div className="flex flex-col w-[25%] bg-[#F7F18A] border shadow-sm rounded-xl dark:bg-neutral-900 border-[#F2D161] dark:shadow-neutral-700/70">
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          Card title
        </h3>
        <p className="mt-2 text-gray-500 dark:text-neutral-400">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio nihil
          culpa blanditiis. Non reprehenderit iste aperiam saepe voluptates
          accusamus culpa? A, iure voluptatem? Aut totam quia nobis. Ex, dolorum
          dignissimos.
        </p>
      </div>
      <div className="bg-[#F2D161] border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-neutral-900 border-[#F2D161]">
        <p className="mt-1 text-sm dark:bg-neutral-900">
          Last updated 5 mins ago
        </p>
      </div>
    </div>
  );
}

export default Card