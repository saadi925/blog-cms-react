import { ToastContainer } from "react-toastify";

// Function component to render toast notifications
const ToastNotifications = () => {
    return (
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            toastClassName="bg-red-500 rounded-md font-medium text-white"
            bodyClassName="p-4"
        />
    );
};

export default ToastNotifications;