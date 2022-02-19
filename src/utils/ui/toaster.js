import { toast } from 'react-toastify';

class Toaster {
  static showSuccess(message) {
    toast.success(message);
  }
  static showInfo(message) {
    toast.info(message);
  }
  static showWarning(message) {
    toast.warning(message);
  }

  static showError(message) {
    toast.error(message);
  }
}

export default Toaster;
