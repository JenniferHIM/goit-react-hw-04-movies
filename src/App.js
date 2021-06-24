import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navigation from './components/Navigation';
import Loader from 'react-loader-spinner';
import styles from './App.module.css';


const HomeView = lazy(() => {
import ('./')
});