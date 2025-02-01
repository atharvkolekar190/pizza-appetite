import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';
import Userslist from './Userslist';
import Pizzaslist from './Pizzaslist';
import Addpizzainfo from './Addpizzainfo';
import Orderslist from './Orderslist';
import { ToastContainer } from 'react-toastify';
export default function Adminscreen() {
  const userState = useSelector(state => state.loginReducer);
  const currentUser = userState?.currentUser;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser?.isAdmin) {
      window.location.href = '/';
    }
  }, [currentUser]);

  return (
    <div className="m-2 text-center">
      <ToastContainer/>
      <div className="text-center text-4xl my-5 p-4 font-serif font-bold border-b-4 border-slate-500 mx-10 shadow-black shadow-xl rounded-xl">
        ADMIN PANEL
      </div>
      <br />
      <ul className="flex flex-wrap gap-16 bg-emerald-700 justify-center p-4 rounded m-4 shadow-black shadow">
        <li>
          <Link
            to="/admin/userslist"
            className="bg-emerald-600 hover:bg-slate-900 font-semibold hover:text-white py-2 px-4 border border-slate-900 hover:border-transparent rounded"
          >
            Users List
          </Link>
        </li>
        <li>
          <Link
            to="/admin/pizzaslist"
            className="bg-emerald-600 hover:bg-slate-900 font-semibold hover:text-white py-2 px-4 border border-slate-900 hover:border-transparent rounded"
          >
            Pizzas List
          </Link>
        </li>
        <li>
          <Link
            to="/admin/addpizza"
            className="bg-emerald-600 hover:bg-slate-900 font-semibold hover:text-white py-2 px-4 border border-slate-900 hover:border-transparent rounded"
          >
            Add New Pizzas
          </Link>
        </li>
        <li>
          <Link
            to="/admin/orderslist"
            className="bg-emerald-600 hover:bg-slate-900 font-semibold hover:text-white py-2 px-4 border border-slate-900 hover:border-transparent rounded"
          >
            Orders List
          </Link>
        </li>
      </ul>
      <Routes>
        <Route path="userslist" element={<Userslist />} />
        <Route path="pizzaslist" element={<Pizzaslist />} />
        <Route path="addpizza" element={<Addpizzainfo />} />
        <Route path="orderslist" element={<Orderslist />} />
      </Routes>
    </div>
  );
}
