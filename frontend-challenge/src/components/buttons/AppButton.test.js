import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import AppButton from './AppButton';
import ExitToAppIcon from '@material-ui/icons/ExitToAppOutlined';

test('app button can set states', () => {
    let isAuthenticated = true;
    const handleClickEvent = () => {
        isAuthenticated = false;
    }
    const { getByText } = render(<AppButton handleOnClick={handleClickEvent} startIcon={<ExitToAppIcon />} label={'Logout'} color={'red'}  />);
    const logout = getByText('Logout');
    fireEvent.click(logout);
});

