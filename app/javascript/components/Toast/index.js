import React, { useState } from "react";
import { isEqual } from "lodash";
import { useEffect } from "react";
import toast, { dispatch, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { resetToast } from "../../redux/toast/toast.action";

const NotificationToast = () => {
  const noti = useSelector((state) => state.toasts.data);
  const [toastId, setToastId] = useState(null);

  useEffect(() => {
    if (!isEqual(noti, {})) {
      const { message, status } = noti;
      if (status === "loading") {
        setToastId(toast.loading("Please wait..."));
      } else if (status === "success") {
        toast.success(message, { id: toastId });
        setToastId(null);
      } else {
        toast.error(message, { id: toastId });
        setToastId(null);
      }
    }
  }, [noti]);

  return (
    <div>
      <Toaster />
    </div>
  );
};

export default NotificationToast;
