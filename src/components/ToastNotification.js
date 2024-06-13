import  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { notification } from 'antd';
import { hideNotification } from '../redux/actions/notificationActions';

const ToastNotification = () => {
  const { message, type, visible } = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      notification[type]({
        message: message,
        duration: 3,
        onClose: () => dispatch(hideNotification()),
      });
    }
  }, [visible, message, type, dispatch]);

  return null;
};

export default ToastNotification;
