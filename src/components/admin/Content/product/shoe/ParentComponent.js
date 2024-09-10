import React, { useState } from 'react';
import TableShoe from './TableShoe';
import CompleteButton from './CompleteButton';

const ParentComponent = () => {
    const [products, setProducts] = useState([]);

    const handleComplete = (selectedProducts) => {
        setProducts(selectedProducts);
    };

    return (
        <div>
            <CompleteButton onComplete={handleComplete} />
            <TableShoe products={products} />
        </div>
    );
};

export default ParentComponent;
