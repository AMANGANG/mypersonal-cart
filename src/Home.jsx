

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Box,Container,Typography,TextField,Select,MenuItem,Button,Grid,Card,CardContent,CardActions,FormControl,InputLabel} from '@mui/material';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/products');
        setProducts(res.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setTotalAmount(totalAmount + product.price);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      product.price >= priceRange.min &&
      product.price <= priceRange.max
  );

  return (
    <Container maxWidth="lg">
      <Box my={3}>
        <Typography variant="h4">Online Store</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Search Products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            
            <Select
              value={`${priceRange.min}-${priceRange.max}`}
              onChange={(e) => {
                const [min, max] = e.target.value.split('-');
                setPriceRange({ min: parseInt(min), max: parseInt(max) });
              }}
            >
              <InputLabel>Select Price Range</InputLabel>
              <MenuItem value="0-100">0-100</MenuItem>
              <MenuItem value="101-200">101-200</MenuItem>
              <MenuItem value="201-300">201-300</MenuItem>
              <MenuItem value="301-400">301-400</MenuItem>
              <MenuItem value="401-500">401-500</MenuItem>
              <MenuItem value="501-1000">501-1000</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box my={3}>
        <Typography variant="h5">
          Cart: {cartItems.length} item(s) - Total: ${totalAmount.toFixed(2)}
        </Typography>
      </Box>
      <Box my={3} style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredProducts.map((product) => (
          <Card key={product.id} variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {product.title}
              </Typography>
              <img src={product.thumbnail} alt={product.title} style={{ maxWidth: '100%', height: 'auto' }} />
              <Typography variant="body2" color="textSecondary">
                {product.description}
              </Typography>
              <Typography variant="h6" color="textPrimary">
                Price: ${product.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      
    </Container>
  );
};

export default Home;
