import axios from 'axios';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { BASE_URL } from '../../util/requests';

export const action = async({ params }: ActionFunctionArgs) => {
    await axios.delete(`${BASE_URL}/api/products/${ params.id }`);
    return redirect('/admin/products');
}
