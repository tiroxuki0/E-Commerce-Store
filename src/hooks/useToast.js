import { toast } from "react-toastify";

const useToast = () => {
  const toastOptions = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const notify = (type, message, options) => {
    if (type === "error") {
      toast.error(message, { ...toastOptions, ...options });
    } else if (type === "success") {
      toast.success(message, { ...toastOptions, ...options });
    } else {
      toast.info(message, { ...toastOptions, ...options });
    }
  };

  return { notify };
};

export default useToast;
