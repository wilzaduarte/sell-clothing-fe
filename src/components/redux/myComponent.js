import React from 'react';
import { useDispatch } from 'react-redux';
import { addNewProduct } from '../redux/slice/productsSlice';

const MyComponent = () => {
    const dispatch = useDispatch();

    const handleAddProductSubmit = (newProductData) => {
        dispatch(addNewProduct(newProductData))
            .unwrap() // Desempacota a ação do thunk para permitir o uso de then e catch
            .then((result) => {
                console.log('Product added successfully:', result);
            })
            .catch((error) => {
                console.error('Failed to add product:', error);
            });
    };

    return (
        <div>
            
            <form onSubmit={(e) => {
                e.preventDefault();
                const newProductData = {
                    name: e.target.name.value,
                    price: e.target.price.value
                };
                handleAddProductSubmit(newProductData);
            }}>
                <input type="text" name="name" placeholder="Product Name" required />
                <input type="number" name="price" placeholder="Product Price" required />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default MyComponent;