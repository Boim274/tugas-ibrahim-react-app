import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, password, fname, lname } = formData;

    // Validasi input
    if (!fname || !lname) {
      toast.error("First name and Last name are required!", {
        position: "top-center",
      });
      return;
    }

    try {
      setLoading(true);

      // Mendaftar pengguna baru
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Menyimpan data pengguna ke Firestore
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
      });

      toast.success("User Registered Successfully!", {
        position: "top-center",
      });

      // Pengalihan ke halaman login setelah registrasi berhasil
      setTimeout(() => {
        navigate("/login"); // Pengalihan dilakukan setelah sedikit penundaan
      }, 1000); // Delay agar toast bisa ditampilkan

      setFormData({ email: "", password: "", fname: "", lname: "" });
    } catch (error) {
      const errorMessage = error.message.includes("auth/email-already-in-use")
        ? "Email is already in use. Please use a different email."
        : error.message.includes("auth/weak-password")
        ? "Password should be at least 6 characters."
        : "Failed to register. Please try again.";

      toast.error(errorMessage, {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          name="fname"
          className="form-control"
          placeholder="First name"
          value={formData.fname}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          name="lname"
          className="form-control"
          placeholder="Last name"
          value={formData.lname}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </button>
      </div>

      <p className="forgot-password text-right">
        Already registered <a href="/login">Login</a>
      </p>
    </form>
  );
}

export default Register;
