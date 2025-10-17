import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
    };

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <Button onClick={handleLogout} className="flex items-center gap-2 bg-white">
                        <LogOut className="h-4 w-4" />
                        Cerrar Sesión
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header;