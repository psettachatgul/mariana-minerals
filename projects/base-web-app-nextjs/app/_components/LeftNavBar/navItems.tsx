'use client';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import locale from '../../../_locale/en-US';
import { ThemeContextType } from '../../_contexts/ThemeContext';
import UploadFileDialog, { UploadFileDialogPropTypes } from '../UploadFileDialog';
import { NavItem } from './types';

export const getNavBarItems = (
  router: AppRouterInstance,
  uploadFileDialogProps: UploadFileDialogPropTypes,
  themeContext: ThemeContextType | undefined,
): NavItem[] => {

  return [
    {
      id: 'home',
      label: locale.nav.items.home,
      icon: <DashboardIcon />,
      onClick: () => {
        router.push('/home');
      },
    },
    {
      id: 'uploadFile',
      label: locale.nav.items.uploadFile,
      icon: <UploadFileDialog {...uploadFileDialogProps} />,
      onClick: () => {
        uploadFileDialogProps.setOpen(true);
      },
    },
    {
      id: 'logout',
      label: locale.nav.items.logout,
      icon: <LogoutRoundedIcon />,
      onClick: () => {
        router.push('/auth/logout');
      },
    },
    {
      id: 'darkMode',
      label: locale.nav.items.darkMode,
      icon: <DarkModeIcon />,
      onClick: themeContext?.toggleDarkMode,
    },
  ];
};
