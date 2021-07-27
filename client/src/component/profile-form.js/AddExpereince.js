import React, { useState } from "react";
import { connect } from "react-redux";
import { addExpereince } from "../../actions/profile";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
const AddExpereince = ({ addExpereince }) => {
  var history = useHistory();
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addExpereince(formData, history);
  };
  return (
    <>
      <h1 class="large text-primary">Add An Experience</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={onSubmit}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            required
            onChange={onChange}
            value={title}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            required
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" onChange={onChange} value={from} />
        </div>
        <div class="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value=""
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
              value={current}
              checked={current}
            />{" "}
            Current Job
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            onChange={onChange}
            value={to}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            onChange={onChange}
            value={description}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

export default connect(null, { addExpereince })(AddExpereince);
