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
      switch(status) {
        case "loading":
          setToastId(toast.loading("Please wait..."));
          break;
        case "success":
          toast.success(message, { id: toastId });
          setToastId(null);
          break;
        case "fail":
          toast.error(message, { id: toastId });
          setToastId(null);
          break;
        case "remove":
          toast.dismiss(toastId);
          break;
        default:
          break;
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
