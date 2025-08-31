// src/pages/viewCreator.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

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
      <section className="creator-image">
        {creator.imageURL ? (
          <img src={ensureHttps(creator.imageURL)} alt={creator.name} />
        ) : null}
      </section>

      <section className="creator-info">
        <h2>{creator.name}</h2>
        <p>{creator.description}</p>

        {/* Single link (since schema only has one url) */}
        {creator.url && (
          <div className="social-links">
            <a href={safeUrl} target="_blank" rel="noreferrer">
              {/* show a context icon if you want, else plain text */}
              <i className="fa-solid fa-link" style={{ marginRight: 8 }}></i>
              {creator.url}
            </a>
          </div>
        )}
      </section>

      <section className="modify-creator">
        <Link to={`/creators/${creator.id}/edit`}><button>Edit</button></Link>
        <button onClick={deleteCreator} className="delete-button">Delete</button>
      </section>
    </div>
  );
};

export default ViewCreator;
