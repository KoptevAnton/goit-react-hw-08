import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const ErrorMessage = ({ errorContact, errorAuth }) => {
  useEffect(() => {
    if (errorContact) {
      toast.error(errorContact);
    }
  }, [errorContact]);

  useEffect(() => {
    if (errorAuth) {
      toast.error(errorAuth);
    }
  }, [errorAuth]);

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
      }}
    />
  );
};

export default ErrorMessage;
