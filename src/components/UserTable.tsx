import { motion } from "framer-motion";
import { FiMoreVertical, FiCopy } from "react-icons/fi";
import { useEffect, useState } from "react";

const UserTable = ({ users }) => {
  const [isMobileView, setIsMobileView] = useState(false);

  const onProfile = (id) => console.log(`${id} Profile Displaying`);
  const onDelete = (id) => console.log(`${id} Profile Deleted`);
  const onDisableAccount = (id) =>
    console.log(`Dear ${id} your account has been disabled`);

  const copySnippet = (uuid) => {
    navigator.clipboard.writeText(uuid);
    console.log(`Copied snippet: ${uuid}`);
  };

  const handleResize = () => {
    const isMobile = window.innerWidth < 640;
    setIsMobileView(isMobile);
  };

  // Attach resize event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial window size
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mx-4  my-4">
      <div className="overflow-x">
        <table className="max-w-xl table-fixed bg-white border rounded-xl border-gray-300">
          <thead className="text-md">
            <tr>
              <th className="w-1/2 sm:w-1/3 py-2 px-2 md:px-4 border-b">
                Identifier
              </th>
              {!isMobileView && (
                <>
                  <th className="w-1/4 py-2 px-2 md:px-4 border-b text-green-600">
                    Created
                  </th>
                  <th className="w-1/4 py-2 px-2 md:px-4 border-b text-red-600">
                    LastSignIn
                  </th>
                  {<th className="w-1/4 py-2 px-2 md:px-4 border-b ">UUID</th>}
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-50 "
              >
                <td className="w-1/2 sm:w-1/3 py-2 px-2 md:px-4 text-sm text-center border-b">
                  {user.email.substr(0, 10)}...
                </td>
                {!isMobileView && (
                  <>
                    <td className="w-1/4 py-2 px-2 md:px-4 text-sm text-center border-b">
                      {user.created}
                    </td>
                    <td className="w-1/4 py-2 px-2 md:px-4 text-sm text-center border-b">
                      {user.lastSignIn}
                    </td>
                  </>
                )}
                {
                  <td className="w-1/4 py-2 px-2 md:px-4 text-sm text-center border-b hover:bg-gray-200 cursor-pointer">
                    <div className="sm:flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
                      <span className="hidden sm:block">
                        {user.uuid.substr(0, 10)}...
                      </span>
                      <div className="flex items-center justify-end md:justify-end space-x-4">
                        <button
                          onClick={() => copySnippet(user.uuid)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <FiCopy size={18} />
                        </button>
                        {
                          <button
                            onClick={() => onProfile(user.id)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FiMoreVertical size={18} />
                          </button>
                        }
                      </div>
                    </div>
                  </td>
                }
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
