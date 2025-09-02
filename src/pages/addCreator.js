import React, { useState } from 'react'
import { supabase } from '../client'

const AddCreator = () => {
  const [creator, setCreator] = useState({
    name: "",
    url: "",         
    description: "",
    image: ""         
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreator(prev => ({ ...prev, [name]: value }));
  };

  const addCreator = async (event) => {
    event.preventDefault();

    const payload = {
      name: creator.name,
      url: creator.url,             
      description: creator.description,
      imageURL: creator.image       
    };

    const { data, error } = await supabase.from('creators').insert([payload]);

    if (error) {
      console.error('Insert error:', error);
      return;
    }

    window.location = "/";
  };

  return (
    <div className="AddEditCreator">
      <form id="addCreatorForm" onSubmit={addCreator}>
        <label>Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={creator.name}
          onChange={handleChange}
          required
        />

        <label>
          Image
          <p>Provide a link to an image of your creator. Be sure to include the http://</p>
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={creator.image}
          onChange={handleChange}
          required
        />

        <label>
          Description
          <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
        </label>
        <textarea
          name="description"
          rows="3"
          cols="50"
          id="description"
          value={creator.description}
          onChange={handleChange}
          required
        ></textarea>

        <label>
          URL
          <p>Provide the link to the creator’s main page (YouTube, Twitter, Instagram, etc.)</p>
        </label>
        <input
          type="text"
          id="url"
          name="url"
          value={creator.url}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCreator;
