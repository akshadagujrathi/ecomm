import React from 'react';
import BannerSlider from '../Components/Home/BannerSlider';
import '../Components/Home/home.css'
import ProductList from '../Components/Home/ProductList';
import CollectionTab from '../Components/Home/CollectionTab';
import CategoryShop from '../Components/Home/CategoryShop';



const Home = () => {
    
    return (
        <div>
            <BannerSlider />
            <ProductList />
            <CategoryShop limit="2"/>
           <CollectionTab />
        
        </div>
    );
}

export default Home;
