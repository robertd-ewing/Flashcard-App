import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DeckForm({ deck, submitDeck, routeTo }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(deck);

  useEffect(() => {
    setFormData(deck);
  }, [deck]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitDeck(formData);
    navigate(routeTo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          placeholder="Deck Name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          placeholder="Brief description of the deck"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <button type="button" className="btn btn-secondary mr-2" onClick={() => navigate(routeTo)}>
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default DeckForm;