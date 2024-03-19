import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex   w-full justify-center  pt-20">
      <div className="text-center text-4xl">
        Page Not Found
        <div className={`py-4 text-red-600 text-center`}>404</div>
        <p className="text-center py-4 my-2 text-xl opacity-50">
          There might be something Wrong! Page Does not Exists!
        </p>
        <Link className="text-blue-600 underline" to="/">
          Go to App
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
