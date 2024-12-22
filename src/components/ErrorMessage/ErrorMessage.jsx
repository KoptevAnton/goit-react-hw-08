import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const ErrorMessage = ({ error }) => {
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return <Toaster />;
};

export default ErrorMessage;
