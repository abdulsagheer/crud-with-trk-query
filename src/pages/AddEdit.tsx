import "./AddEdit.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddContactMutation,
  useContactQuery,
  useEditContactMutation,
} from "../services/contactsApi";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [edit, setEdit] = useState(false);
  const { name, email, contact } = formValue;
  const [addContact] = useAddContactMutation();
  const [editContact] = useEditContactMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, error } = useContactQuery(id!);

  useEffect(() => {
    if (error && id) {
      toast.error("Something went wrong");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (id) {
      setEdit(true);
      if (data) {
        setFormValue({ ...data });
      }
    } else {
      setEdit(false);
      setFormValue({ ...initialState });
    }
  }, [id, data]);

  const handleInputChange = (e: any) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name && !email && !contact) {
      toast.error("Please Enter all the details before submitting");
    } else {
      if (!edit) {
        await addContact(formValue);
        navigate("/");
        toast.success("Successfully added contact");
      } else {
        await editContact(formValue);
        navigate("/");
        setEdit(false);
        toast.success("Successfully updated contact");
      }
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          value={name}
          type="text"
          name="name"
          id="name"
          placeholder="Enter your Name"
          onChange={handleInputChange}
        />
        <label htmlFor="name">Email</label>
        <input
          value={email}
          type="email"
          name="email"
          id="email"
          placeholder="Enter your Email"
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          value={contact}
          type="number"
          name="contact"
          id="contact"
          placeholder="Enter your Contact"
          onChange={handleInputChange}
        />
        <input type="submit" value={edit ? "Edit" : "Add"} />
      </form>
    </div>
  );
};

export default AddEdit;
