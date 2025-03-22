import React, {useState} from 'react';
import { Link } from "react-router-dom";
import "./css/AddProducts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BackArrowIcon from "./icons/backarrow.svg";
import AddImages from "../components/AddImages";
import CategoryBrandDropdown from '../components/CategoryBrandDropdown';

const AddProducts = () => {
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    category: '',
    short_description: '',
    description: '',
    slug: '',
    price: '',
    discount_price: '',
    connectivity: '',
    manufacturer: '',
    model_number: '',
    serial_number: ''
  });

  const [selectedConnectivity, setSelectedConnectivity] = useState("Select Connectivity");
  const [image, setImage] = useState(null);

  const connections = ['Select Connectivity', 'WiFi', 'Bluetooth'];

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConnectivityChange = (e) => {
    setSelectedConnectivity(e.target.value);
    setProductData({ ...productData, connectivity: e.target.value });
  };

  const handleImageChange = (ImageFiles) => {
    setImage(ImageFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    if (image) {
      formData.append("image",image);
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/api/products/add_products', {
            method: 'POST',
            body:formData,
        });

        const result = await response.json();

        if (response.ok) {
            alert('Product added successfully!');
            console.log('Response:', result);
        } else {
            alert(result.message || 'Failed to add product');
            console.error('Error:', response.status);
        }
    }
    catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the product.');
      }
  };

    return(
         <>
            <div className="container-fluid mt-3 p-4">
              <div className='header'>
                <div className="back-button">
                  <Link to="/seller/products">
                    <img src={BackArrowIcon} alt="Back arrow icon" width={21} height={21} className='pb-1'/>
                  </Link>
                </div>
                <div className="text-box">
                  <p>back to product list</p>
                  <h5 className='heading'>Add Products</h5>
                </div>  
              </div>
              <div className="row first-row">
                <div className="col-6 basic-info detail-box p-4 ">
                  <h6 className='mb-3'>Basic Information</h6>
                  <div className="input-box p-4">
                    <label htmlFor="p-name" className="form-label">Product Name</label>
                    <input type="text" name="name" className='form-control mb-3' id="p-name" />
                    <label htmlFor="short-desc" className="form-label">Short Description</label>
                    <textarea name="short_description" id="short-desc" className="form-control mb-3"></textarea>
                    <label htmlFor="desc" className="form-label">Description</label>
                    <textarea name="description" id="desc" className="form-control mb-3" rows={8}></textarea>
                    <label htmlFor="slug" className="form-label">Slug</label>
                    <input type="text" name="slug" id="slug" className="form-control" />
                  </div>
                </div>
                <div className="col-5" >
                  <div className="row detail-box product-img-container p-3 mb-3">
                    <h6 className='mb-3'>Product Image</h6>
                    <AddImages onImageChange={handleImageChange}/>
                  </div>
                  <div className="row detail-box p-4">
                    <h6 className='mb-3'>Category & Brand</h6>
                    <CategoryBrandDropdown
                      onCategoryChange={(value) => setProductData({ ...productData, category: value })} 
                      onBrandChange={(value) => setProductData({ ...productData, brand: value })}
                    />
                  </div>
                </div>
             </div>
             <div className="row second-row">
                <div className="col-6 additonal-info detail-box p-4 ">
                  <h6 className='mb-3'>Additional Information</h6>
                  <div className="input-box p-4">
                      <label htmlFor="connectivity" className="form-label mb">Connectivity</label>
                      <select
                          id="connectivity"
                          value={selectedConnectivity}
                          onChange={handleConnectivityChange}
                          className="dropdown-select mb-3">
                          {connections.map((connect) => (
                            <option key={connect} value={connect}>
                              {connect}
                            </option>
                          ))}
                      </select>
                      <label htmlFor="model-num" className="form-label">Model Number</label>
                      <input type="text" name="model_number" id="model-num" className="form-control mb-3" />
                      <label htmlFor="serial-num" className="form-label">Serial Number</label>
                      <input type="text" name="serial_number" id="serial-num" className="form-control mb-3" />
                      <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
                      <textarea name="manufacturer" id="manufacturer" className='form-control' rows={4}></textarea>
                    </div>
                </div>

                <div className="col-5 price-info_stock detail-box p-4">
                  <h6 className='mb-3'>Pricing & Stock</h6>
                  <div className="input-box p-4">
                      <label htmlFor="base-price" className="form-label mb">Base Price</label>
                      <input type="number" name="" className='form-control mb-3' id="base-price" />
                      <label htmlFor="disc-price" className="form-label">Discount Price</label>
                      <input type="number" name="" id="disc-price" className="form-control mb-3" />
                      <label htmlFor="stocks" className="form-label">Stocks</label>
                      <input type="number" name="" id="stocks" className="form-control mb-3" />
                    </div>
                </div>
              </div>
              <div className="row btn-box">
                  <button className='discard-btn'>Discard</button>
                  <button type='submit' className='add-product-btn'>Add Product</button>
              </div>
            </div>
         </>
    );
};

export default AddProducts;