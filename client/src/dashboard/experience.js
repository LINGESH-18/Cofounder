import React, { Fragment } from "react";
import Moment from "moment";
import { connect } from "react-redux";

const Experience = ({ experience }) => {
  const expereince = experience.map((exp) => {
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">
        <Moment format="yyyy/mm/dd">{exp.from}</Moment>
      </td>{" "}
      -{" "}
      {(exp.to = null ? "Now" : <Moment format="yyyy/mm/dd">{exp.to}</Moment>)}
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>;
  });
  return (
    <>
      <h2 className="my-2">Expereince credential</h2>
      <table className="head">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">title</th>
            <th className="hide-sm">Company</th>
            <th />
          </tr>
        </thead>
        <tbody>{experience}</tbody>
      </table>
    </>
  );
};

export default connect()(Experience);
