import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";
import styleCustom from "../../assets/css/pages/login.module.scss";
import { registerApi } from "../../redux/reducers/userReducer";
const Register = () => {
  const dispatch = useDispatch();
  const [isShown, setShown] = useState(false);
  const [isShownConfirm, setShownConfirm] = useState(false);

  const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      phone: "",
      gender: "1",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email cannot be blank!")
        .email("Email is invalid"),
      password: yup.string().required("Password cannot be blank!"),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
      name: yup.string().required("Name cannot be blank!"),
      phone: yup
        .string()
        .required("Phone number cannot be blank!")
        .matches(phoneRegExp, "Phone number is invalid"),
    }),
    onSubmit: (values) => {
      if (values.gender === "1") {
        values.gender = true;
      }
      if (values.gender === "0") {
        values.gender = false;
      }
      delete values.passwordConfirm;
      const action = registerApi(values);
      dispatch(action);
    },
  });
  return (
    <div className="container py-5 h-100">
      <div className="row">
        <div className="col-12 col-lg-9 col-xl-7 mx-auto">
          <div
            className="card shadow-2-strong card-registration"
            style={{ borderRadius: 15 }}
          >
            <div className="card-body p-4 p-md-5">
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
              <form onSubmit={form.handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        name="email"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        placeholder="name@example.com"
                      />
                      <label htmlFor="emailInput">Email address</label>
                      {form.errors.email && (
                        <p className="text-danger">{form.errors.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="nameInput"
                        name="name"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        placeholder="name"
                      />
                      <label htmlFor="nameInput">Name</label>
                      {form.errors.name && (
                        <p className="text-danger">{form.errors.name}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4 pb-2">
                    <div
                      className="form-floating mb-3"
                      style={{ position: "relative" }}
                    >
                      <input
                        type={isShown ? "text" : "password"}
                        className="form-control"
                        name="password"
                        id="passwordInput"
                        placeholder="Password"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      <span
                        className={`${
                          !isShown
                            ? styleCustom["p-password__display"]
                            : styleCustom["p-password__display__invisible"]
                        }`}
                        onClick={() => setShown(!isShown)}
                      ></span>
                      <label htmlFor="passwordInput">Password</label>
                      {form.errors.password && (
                        <p className="text-danger">{form.errors.password}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mb-4 pb-2">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="phoneInput"
                        name="phone"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        placeholder="0396244169"
                      />
                      <label htmlFor="phoneInput">Phone Number</label>
                      {form.errors.phone && (
                        <p className="text-danger">{form.errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4 pb-2">
                    <div
                      className="form-floating mb-3"
                      style={{ position: "relative" }}
                    >
                      <input
                        type={isShownConfirm ? "text" : "password"}
                        className="form-control"
                        name="passwordConfirm"
                        id="passwordConfirmInput"
                        placeholder="Password"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      <span
                        className={`${
                          !isShownConfirm
                            ? styleCustom["p-password__display"]
                            : styleCustom["p-password__display__invisible"]
                        }`}
                        onClick={() => setShownConfirm(!isShownConfirm)}
                      ></span>
                      <label htmlFor="passwordConfirmInput">
                        Password Confirmation
                      </label>
                      {form.errors.passwordConfirm && (
                        <p className="text-danger">
                          {form.errors.passwordConfirm}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <h6 className="mb-2 pb-1">Gender: </h6>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="femaleGender"
                        value="1"
                        defaultChecked
                        onChange={form.handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="femaleGender"
                      >
                        Male
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="maleGender"
                        value="0"
                        onChange={form.handleChange}
                      />
                      <label className="form-check-label" htmlFor="maleGender">
                        Female
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-2">
                  <button className="btn btn-primary btn-lg" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
