export const isLoggedIn = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
};