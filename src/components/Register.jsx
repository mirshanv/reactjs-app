import React, { useState } from 'react';
import { Input, Button, message } from 'antd';

export default function AddItem() {
    const { TextArea } = Input;
    const [item, setItem] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        rating_rate: '',
        rating_count: '',
    });

    const handleInputChange = (field, value) => {
        setItem({ ...item, [field]: value });
    };

    const handleAddItem = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/add-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            setItem({
                title: '',
                price: '',
                description: '',
                category: '',
                image: '',
                rating_rate: '',
                rating_count: '',
            })

            if (response.ok) {
                message.success('Item added successfully');
            } else {
                message.error('Failed to add item');
            }
        } catch (error) {
            console.error('Error adding item:', error);
            message.error('Internal Server Error');
        }
    };

    return (
        <div style={{ width: '300px', margin: 'auto', marginTop: '20px' }}>
            <TextArea
                placeholder="Title"
                value={item.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextArea
                placeholder="Description"
                value={item.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextArea
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextArea
                placeholder="Category"
                value={item.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextArea
                placeholder="Image URL"
                value={item.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextArea
                placeholder="Rating"
                value={item.rating_rate}
                onChange={(e) => handleInputChange('rating_rate', e.target.value)}
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextArea
                placeholder="Rating Count"
                value={item.rating_count}
                onChange={(e) => handleInputChange('rating_count', e.target.value)}
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <Button type="primary" onClick={handleAddItem} style={{ marginTop: '10px', width: '100%' }}>
                Add Item
            </Button>
        </div>
    );
}
