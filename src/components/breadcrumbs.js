import React from 'react';
import { Link } from 'react-router-dom'; 
import '../App.css';
import { Container} from '@mui/material';

export default function Breadcrumb({ items }) {
    
  return (
    <Container> 
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index < items.length - 1 ? (
              <Link to={item.path}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
    </Container>
  );
}