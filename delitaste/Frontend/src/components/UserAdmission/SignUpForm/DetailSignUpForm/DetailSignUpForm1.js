import PropTypes from "prop-types";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChevronRight,
  faExclamationCircle,
  faCheckCircle,
} from "@fortawesome/fontawesome-free-solid";
import { validateSignUpForm1 } from "utils/FormUtils/form-validate";
//scss
import "./DetailSignUpForm.scss";
import "style/Common.scss";
//store
import {
  setRegisterStep,
  setRegisterFormData,
} from "store/actions/UserAdmission/registerActions";
import { loadRegisterForm } from "store/actions/UserAdmission/formActions";
//components
import FormError from "components/Commons/ErrorHandlers/FormError/FormError";

function DetailSignUpForm1({
  setRegisterStep,
  setRegisterFormData,
  loadRegisterForm,
}) {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password1: "",
    password2: "",
  };

  const handleSubmitForm = (values) => {
    setRegisterStep(["finished", "active", "default", "default"]);
    const formData = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      phone: values.phone,
      password: values.password1,
    };
    setRegisterFormData(formData);
    const msg = "Check your email to get code.";
    loadRegisterForm("email_verification", msg);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSignUpForm1}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        return (
          <Form className="sign-up-form-input-wrapper">
            <div className="form-title-wrapper">
              <FontAwesomeIcon className="form-icon" icon={faUser} />
              <span className="form-title">Account Registration</span>
            </div>
            <div className="sign-up-fullname-wrapper">
              <div className="label-sign-up form-label">Full name</div>
              <div className="fullname-wrapper">
                <Field
                  name="fullname"
                  className={
                    errors.firstname && touched.firstname
                      ? "sign-up-firstname form-text-field error"
                      : "sign-up-firstname form-text-field"
                  }
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  maxLength={50}
                  autoComplete="on"
                />
                {errors.firstname && touched.firstname && (
                  <FontAwesomeIcon
                    style={{ color: "#c74b4b" }}
                    className="alert-icon alert-icon-position-type0"
                    icon={faExclamationCircle}
                  />
                )}

                {!errors.firstname && touched.firstname ? (
                  <FontAwesomeIcon
                    style={{ color: "#00683d" }}
                    className="alert-icon alert-icon-position-type0"
                    icon={faCheckCircle}
                  />
                ) : null}
                <Field
                  className={
                    errors.lastname && touched.lastname
                      ? "sign-up-lastname form-text-field error"
                      : "sign-up-lastname form-text-field"
                  }
                  type="text"
                  name="lastname"
                  placeholder={"Last Name"}
                  maxLength={50}
                  autoComplete="on"
                />

                {errors.lastname && touched.lastname && (
                  <FontAwesomeIcon
                    style={{ color: "#c74b4b" }}
                    className="alert-icon alert-icon-position-type1"
                    icon={faExclamationCircle}
                  />
                )}
                {!errors.lastname && touched.lastname ? (
                  <FontAwesomeIcon
                    style={{ color: "#00683d" }}
                    className="alert-icon alert-icon-position-type1"
                    icon={faCheckCircle}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <FormError
              err={
                (errors.firstname || errors.lastname) &&
                (touched.firstname || touched.lastname)
                  ? errors.firstname
                  : ""
              }
              align="left"
              margin="0% 0% 0% 22%"
            />
            {touched.firstname}
            <div className="sign-up-email-wrapper">
              <div className="label-sign-up form-label">Email</div>
              <Field
                className={
                  errors.email && touched.email
                    ? "sign-up-email form-text-field error"
                    : "sign-up-email form-text-field"
                }
                type="text"
                name="email"
                placeholder="Email"
                maxLength={50}
                autoComplete="on"
              />

              {errors.email && touched.email && (
                <FontAwesomeIcon
                  style={{ color: "#c74b4b" }}
                  className="alert-icon alert-icon-position-type2"
                  icon={faExclamationCircle}
                />
              )}
              {!errors.email && touched.email ? (
                <FontAwesomeIcon
                  style={{ color: "#00683d" }}
                  className="alert-icon alert-icon-position-type2"
                  icon={faCheckCircle}
                />
              ) : (
                <></>
              )}
            </div>
            <FormError
              err={errors.email && touched.email ? errors.email : ""}
              align="left"
              margin="0% 0% 0% 22%"
            />
            <div className="sign-up-phonenumber-wrapper">
              <div className="label-sign-up form-label">Phone number</div>
              <Field
                className={
                  errors.phone && touched.phone
                    ? "sign-up-phonenumber form-text-field error"
                    : "sign-up-phonenumber form-text-field"
                }
                type="tel"
                name="phone"
                // value={phone}
                // onChange={(e) => onChangeRegistrationForm(e)}
                placeholder={
                  errors.phone && touched.phone ? errors.phone : "Mobile number"
                }
                maxLength={15}
                autoComplete="on"
              />

              {errors.phone && touched.phone && (
                <FontAwesomeIcon
                  style={{ color: "#c74b4b" }}
                  className="alert-icon alert-icon-position-type2"
                  icon={faExclamationCircle}
                />
              )}
              {!errors.phone && touched.phone ? (
                <FontAwesomeIcon
                  style={{ color: "#00683d" }}
                  className="alert-icon alert-icon-position-type2"
                  icon={faCheckCircle}
                />
              ) : (
                <></>
              )}
            </div>
            <FormError
              err={errors.phone && touched.phone ? errors.phone : ""}
              align="left"
              margin="0% 0% 0% 22%"
            />
            <div className="password-wrapper">
              <div className="label-sign-up form-label">Password</div>
              <Field
                className={
                  errors.password1 && touched.password1
                    ? "sign-up-password form-text-field error"
                    : "sign-up-password form-text-field"
                }
                type="password"
                name="password1"
                // value={password1}
                // onChange={(e) => onChangeRegistrationForm(e)}
                placeholder="Password"
                maxLength={50}
                autoComplete="on"
              />

              {errors.password1 && touched.password1 && (
                <FontAwesomeIcon
                  style={{ color: "#c74b4b" }}
                  className="alert-icon alert-icon-position-type2"
                  icon={faExclamationCircle}
                />
              )}
              {!errors.password1 && touched.password1 ? (
                <FontAwesomeIcon
                  style={{ color: "#00683d" }}
                  className="alert-icon alert-icon-position-type2"
                  icon={faCheckCircle}
                />
              ) : (
                <></>
              )}
            </div>
            <FormError
              err={
                errors.password1 && touched.password1 ? errors.password1 : ""
              }
              align="left"
              margin="0% 0% 0% 22%"
            />
            <div className="password-recheck-wrapper">
              <div className="label-sign-up form-label">Re-enter Password</div>
              <Field
                className={
                  errors.password2 && touched.password2
                    ? "sign-up-password-recheck form-text-field error"
                    : "sign-up-password-recheck form-text-field"
                }
                type="password"
                name="password2"
                // value={password2}
                // onChange={(e) => onChangeRegistrationForm(e)}
                placeholder="Re-enter password"
                maxLength={50}
                autoComplete="on"
              />

              {errors.password2 && touched.password2 && (
                <FontAwesomeIcon
                  style={{ color: "#c74b4b" }}
                  className="alert-icon alert-icon-position-type2"
                  icon={faExclamationCircle}
                />
              )}
              {!errors.password2 && touched.password2 ? (
                <FontAwesomeIcon
                  style={{ color: "#00683d" }}
                  className="alert-icon alert-icon-position-type2"
                  icon={faCheckCircle}
                />
              ) : (
                <></>
              )}
            </div>
            <FormError
              err={
                errors.password2 && touched.password2 ? errors.password2 : ""
              }
              align="left"
              margin="0% 0% 0% 22%"
            />
            <br />
            <div className="policy-check">
              Delitaste may use your phone number to call or send text messages
              with information regarding your account.
            </div>
            <div className="policy-check">
              By clicking Sign Up, you are indicating that you have read and
              acknowledge the <a className="policy-link">Terms of Service</a>{" "}
              and <a className="policy-link">Privacy Notice</a>.
            </div>
            <br />
            <div className="btn-form-wrapper">
              <button className="btn-form btn-sign-up-position" type="submit">
                <div className="none-icon"></div>
                Sign Up
                <FontAwesomeIcon
                  className="chevron-icon"
                  icon={faChevronRight}
                />
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

DetailSignUpForm1.propTypes = {
  setRegisterStep: PropTypes.func.isRequired,
  setRegisterFormData: PropTypes.func.isRequired,
  loadRegisterForm: PropTypes.func.isRequired,
};

export default connect(null, {
  setRegisterStep,
  setRegisterFormData,
  loadRegisterForm,
})(DetailSignUpForm1);

//Styling
