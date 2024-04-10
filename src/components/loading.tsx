export const AppLoading = () => {
    return (
      <div className="w-full h-[calc(100vh-7rem)]   flex flex-col justify-center items-center">
        <div className="sm:px-5 h-20 w-11/12   opacity-50 flex gap-2 justify-center items-center   rounded-md ">
          <div className="w-6 h-6 bg-dark dark:bg-white transition-all delay-500 duration-200 animate-ping  rounded-full "></div>
          <div className="w-6 h-6 bg-dark dark:bg-white animate-ping transition-all delay-500 duration-500 rounded-full "></div>
          <div className="w-6 h-6 bg-dark dark:bg-white animate-ping transition-all  duration-700 rounded-full "></div>
        </div>
        <div className="text-dark dark:text-white/30   text-xl">
          Loading
          <span className="animate-pulse duration-100 transition-all text-3xl">
            .
          </span>
          <span className="animate-pulse duration-100 transition-all text-3xl">
            .
          </span>
          <span className="animate-pulse duration-100 transition-all text-3xl">
            .
          </span>
        </div>
      </div>
    );
  };
  