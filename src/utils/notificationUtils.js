import Swal from "sweetalert2";

// Function to show notification
const showNotification = (type, title, text) => {
  Swal.fire({
    icon: type,
    title,
    text,
  });
};

export default showNotification;
