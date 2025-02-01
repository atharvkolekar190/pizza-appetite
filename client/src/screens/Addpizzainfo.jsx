import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addPizza } from '../actions/pizzaAction'; // Uncomment this when you have the Redux action
import { toast } from "react-toastify";
import Loading from '../Components/Loading';
import Error from '../Components/Error';
function Addpizzainfo() {
  const dispatch = useDispatch();
  const addpizzastate=useSelector(state=>state.addPizzaReducer)
  const{success,error,loading}=addpizzastate
  // State to hold pizza information
  const [pizza, setPizza] = useState({
    name: '',
    category: 'veg',
    price: { smallSmall: '', small_Medium: '', medium_Medium: '', medium_Large: '', large: '' },
    sauces: '',
    cheeseType: '',
    image: '',
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'sauces') {
      // Split the input by commas, trim whitespace, and filter out empty values
      const saucesArray = value
        .split(',')
        .map((sauce) => sauce.trim())
        .filter((sauce) => sauce);
      
      setPizza((prev) => ({ ...prev, [name]: saucesArray }));
    } else if (name.startsWith('price_')) {
      if (value < 0) {
        setErrors((prev) => ({
          ...prev,
          [name]: 'Price cannot be negative.',
        }));
        return;
      }
      const size = name.replace('price_', ''); // Extract size from name
      setPizza((prev) => ({
        ...prev,
        price: { ...prev.price, [size]: value }, // Update the specific price
      }));
      setErrors((prev) => ({
        ...prev,
        [name]: '', // Clear error if valid
      }));
    } else if (name === 'image') {
      setPizza((prev) => ({ ...prev, [name]: value }));
  
      // Validate and update image preview
      const urlPattern = /^(https?:\/\/)[^\s]+$/; // Basic URL validation
      if (urlPattern.test(value)) {
        setImagePreview(value);
        setErrors((prev) => ({
          ...prev,
          [name]: '', // Clear error for valid URLs
        }));
      } else {
        setImagePreview('');
        setErrors((prev) => ({
          ...prev,
          [name]: 'Please enter a valid URL (must start with http:// or https://).',
        }));
      }
    } else {
      setPizza((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!pizza.name) newErrors.name = 'Pizza name is required.';
    if (!pizza.cheeseType) newErrors.cheeseType = 'Cheese type is required.';
    if (!pizza.image) newErrors.image = 'Image URL is required.';
    Object.keys(pizza.price).forEach((key) => {
      if (!pizza.price[key]) {
        newErrors[`price_${key}`] = `Price for ${key.replace('_', ' ')} is required.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(pizza)
      // dispatching the new pizza to add in database
      dispatch(addPizza(pizza));
      // alert('Pizza added successfully!');
      // toast.success("Pizza is Added Successfully!")
      setPizza({
        name: '',
        category: 'veg',
        price: { smallSmall: '', small_Medium: '', medium_Medium: '', medium_Large: '', large: '' },
        sauces: '',
        cheeseType: '',
        image: '',
      });
      setImagePreview('');
      setErrors({});
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-center text-3xl font-bold text-emerald-700 mb-5">Add Pizza Information</h2>
      {loading&&(<Loading name="Adding your pizza in database!!"/>)}
      {error&&(<Error title="Something Went Wrong" desc={error.toString()}/>)}
      {success&&(toast.success("Pizza is added succcessfully!!"))}
      <form className="max-w-3xl mx-auto bg-gray-100 p-8 rounded shadow" onSubmit={handleSubmit}>
        {/* Pizza Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Pizza Name</label>
          <input
            type="text"
            name="name"
            value={pizza.name}
            onChange={handleInputChange}
            className={`w-full border rounded p-2 ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Enter pizza name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <select
            name="category"
            value={pizza.category}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          >
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
          </select>
        </div>

        {/* Prices */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Prices (in ₹)</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(pizza.price).map((key) => (
              <div key={key}>
                <input
                  type="number"
                  name={`price_${key}`}
                  value={pizza.price[key]}
                  onChange={handleInputChange}
                  className={`w-full border rounded p-2 ${errors[`price_${key}`] ? 'border-red-500' : ''}`}
                  placeholder={key.replace('_', ' ')}
                />
                {errors[`price_${key}`] && <p className="text-red-500 text-sm">{errors[`price_${key}`]}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Sauces */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Sauces</label>
          <input
            type="text"
            name="sauces"
            value={pizza.sauces}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            placeholder="E.g., Tomato, Barbecue, Pesto (comma-separated)"
          />
        </div>

        {/* Cheese Type */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Cheese Type</label>
          <input
            type="text"
            name="cheeseType"
            value={pizza.cheeseType}
            onChange={handleInputChange}
            className={`w-full border rounded p-2 ${errors.cheeseType ? 'border-red-500' : ''}`}
            placeholder="Enter cheese type"
          />
          {errors.cheeseType && <p className="text-red-500 text-sm">{errors.cheeseType}</p>}
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Image URL</label>
          <input
            type="url"
            name="image"
            value={pizza.image}
            onChange={handleInputChange}
            className={`w-full border rounded p-2 ${errors.image ? 'border-red-500' : ''}`}
            placeholder="Enter image URL"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Image Preview</label>
            <img src={imagePreview} alt="Pizza Preview" className="max-w-full h-40 rounded shadow" />
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-emerald-700 text-white px-6 py-2 rounded shadow hover:bg-emerald-800"
          >
            Add Pizza
          </button>
        </div>
      </form>
    </div>
  );
}

export default Addpizzainfo;
