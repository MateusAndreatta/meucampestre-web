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

  static showForPromise(promise, pending, success, error) {
    toast.promise(promise, {
      pending: pending || 'Promise is pending',
      success: success || 'Promise resolved 👌',
      error: error || 'Promise rejected 🤯',
    });
  }
}

export default Toaster;
