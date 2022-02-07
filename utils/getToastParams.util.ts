import { ToastOptions } from 'react-toastify';

export const toastParams = (): ToastOptions<{}> => ({
	position: 'bottom-right',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'dark',
});
