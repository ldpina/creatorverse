import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import Modal from 'react-modal';

const EditCreator = ({ data }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  // local form state matches your DB columns (imageURL, not image)
  const [creator, setCreator] = useState({
    id: null,
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });

  useEffect(() => {
    // If parent passed creators via props, hydrate from there
    const result = data?.find(item => String(item.id) === id);
    if (result) {
      setCreator({
        id: result.id,
        name: result.name ?? '',
        url: result.url ?? '',
        description: result.description ?? '',
        imageURL: result.imageURL ?? ''
      });
    } else {
      // Fallback: fetch directly from Supabase (handles refresh/direct link)
      (async () => {
        const { data: row, error } = await supabase
          .from('creators')
          .select('id,name,url,description,imageURL')
          .eq('id', id)
          .single();
        if (!error && row) {
          setCreator({
            id: row.id,
            name: row.name ?? '',
            url: row.url ?? '',
            description: row.description ?? '',
            imageURL: row.imageURL ?? ''
          });
        }
      })();
    }
  }, [data, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreator(prev => ({ ...prev, [name]: value }));
  };

  const updateCreator = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('creators')
      .update({
        name: creator.name,
        url: creator.url,
        description: creator.description,
        imageURL: creator.imageURL,
      })
      .eq('id', id);

    if (error) {
      console.error(error);
      return;
    }
    window.location = '/';
  };

  const deleteCreator = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('creators').delete().eq('id', id);
    if (error) {
      console.error(error);
      return;
    }
    window.location = '/';
  };

  return (
    <div className="AddEditCreator">
      <form onSubmit={updateCreator}>
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
          Image URL
          <p>Provide a link to an image of your creator. Include http(s)://</p>
        </label>
        <input
          type="text"
          id="imageURL"
          name="imageURL"
          value={creator.imageURL}
          onChange={handleChange}
          required
        />

        <label>
          Description
          <p>Who are they? What makes them interesting?</p>
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
          <p>Link to the creator’s main page (YouTube/Twitter/Instagram/etc.).</p>
        </label>
        <input
          type="text"
          id="url"
          name="url"
          value={creator.url}
          onChange={handleChange}
          required
        />

        <div className="submit-or-delete">
          <button type="submit">Submit</button>
          <button type="button" className="delete-button" onClick={() => setIsOpen(true)}>
            Delete
          </button>
        </div>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Delete"
        className="delete-modal"
        overlayClassName="overlay"
      >
        <h2>⚠️ WAIT!!!! ⚠️</h2>
        <p>Are you sure you want to delete {creator.name}?</p>
        <button onClick={() => setIsOpen(false)}>Nah, never mind</button>
        <button onClick={deleteCreator}>YES! Totally sure</button>
      </Modal>
    </div>
  );
};

export default EditCreator;
