import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const setToast = (type, message) => {
  toast[type](message);
};

export default setToast;