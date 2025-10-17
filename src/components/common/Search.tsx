import React from 'react';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

const SearchProducts: React.FC<{
    searchTerm: string;
    onSearchChange: (term: string) => void;
}> = ({ searchTerm, onSearchChange }) => {
    const [inputValue, setInputValue] = useState(searchTerm);

    useEffect(() => {
        setInputValue(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearchChange(inputValue);
        }, 1000);

        return () => clearTimeout(timer);
    }, [inputValue, onSearchChange]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
    };

    return (
        <div>
            <h1>Products</h1>
            <Input
                type="text"
                value={inputValue}
                placeholder="Search for products..."
                onChange={handleSearch}
            />
        </div>
    );
}

export default SearchProducts;