import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"

const Read = () => {
  const [data, setData] = useState();
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE",
    });
    const result1 = await response.json();
    if (!response.ok) {
      setError(result1.error);
    }
    if (response.ok) {
      console.log("deleted", response.ok);
      setError("Deleted Successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
  }

  const getData = async () => {
    const res = await fetch("http://localhost:4000");
    const result = await res.json();

    if (!res.ok) {
      console.log(result);
      setError(result.error);
    }

    if (res.ok) {
      console.log(result);
      setData(result);
      setError("");
  }
}

  useEffect(() => {
    getData();
  }, []);
  console.log(data);

  return (
    <div className="container my-3">
      {error && <div class="alert alert-danger"> {error} </div>}
      <h2 className="text-center">All Posts</h2>
      <div className="row">
        {data?.map((e) => (
          <div key={e._id} className="col-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{e.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{e.email}</h6>
              <h6 className="card-subtitle mb-2 text-muted">{e.age}</h6>
              <span className="card-link" onClick={() => handleDelete(e._id)}>
                Delete
              </span>
              <Link to={`/${e._id}`} className="card-link">
                Edit
              </Link>
            </div>
          </div>
        </div>
        ))} 
      </div>
    </div>
  );
};

export default Read;
