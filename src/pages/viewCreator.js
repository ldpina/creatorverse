// src/pages/viewCreator.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import '../pages/viewCreator.css'

function ensureHttps(u) {
  if (!u) return "";
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('id, name, url, description, imageURL')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setCreator(data);
      }
    })();
  }, [id]);

  const deleteCreator = async () => {
    const { error } = await supabase.from('creators').delete().eq('id', id);
    if (error) console.error(error);
    else navigate('/');
  };

  if (!creator) return <p>Loading…</p>;

  const safeUrl = ensureHttps(creator.url);

  return (
    <div className="ViewCreator">
      {/* Actions row above the photo */}
      <div className="vc-actions">
        <Link to={`/creators/${creator.id}/edit`} className="btn vc-edit">Edit</Link>
        <button onClick={deleteCreator} className="btn vc-delete">Delete</button>
      </div>

      {/* Flex row: image + info side by side */}
      <div className="vc-main">
        <section className="creator-image">
          {creator.imageURL && (
            <img src={ensureHttps(creator.imageURL)} alt={creator.name} />
          )}
        </section>

        <section className="creator-info">
          <h2>{creator.name}</h2>
          <p>{creator.description}</p>
          {creator.url && (
            <div className="social-links">
              <a href={safeUrl} target="_blank" rel="noreferrer">
                {creator.url}
              </a>
            </div>
          )}
        </section>
      </div>
  </div>

  );
};

export default ViewCreator;
