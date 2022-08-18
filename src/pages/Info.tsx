import "./Info.css";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useContactQuery } from "../services/contactsApi";

const Info = () => {
  const { id } = useParams();
  const { data, error } = useContactQuery(id!);
  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
        </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name:</strong>
          <span>{data && data.name}</span>
          <br />
          <br />
          <strong>Email:</strong>
          <span>{data && data.email}</span>
          <br />
          <br />
          <strong>Contact:</strong>
          <span>{data && data.contact}</span>
        </div>
          <Link to="/">
            <button className="btn btn-edit">Go Back</button>
          </Link>
      </div>
    </div>
  );
};

export default Info;
