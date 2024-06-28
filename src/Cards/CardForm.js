import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CardForm({ card, submitCard, routeTo }) {
  const navigate = useNavigate();
  const initialFormState = { front: "", back: "" };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (card) {
      setFormData(card);
    }
  }, [card]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitCard(formData);
    setFormData(initialFormState);

    if (window.location.pathname.includes("edit")) {
      navigate(routeTo);
    }
  };

  const handleDone = () => {
    navigate(routeTo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">Front</label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          onChange={handleChange}
          value={formData.front || ""}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="back" className="form-label">Back</label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          onChange={handleChange}
          value={formData.back || ""}
          required
        ></textarea>
      </div>
      <button className="btn btn-secondary" onClick={handleDone} type="button">Done</button>
      <button className="btn btn-primary" type="submit">Submit</button>
    </form>
  );
}

export default CardForm;
