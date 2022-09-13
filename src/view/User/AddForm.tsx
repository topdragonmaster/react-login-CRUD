import React, { useState } from "react";
import { IBaseUser } from "../../types";
import validator, { noErrors, FormErrors } from "../../validator";

interface IProps {
  onAddUser: (user: IBaseUser) => void;
  toggle?: () => void;
}
const initUser = { name: "", email: "", gender: "", status: "inactive" };
const AddUserForm: React.FunctionComponent<IProps> = props => {
  const [formValue, setFormValue] = useState(initUser);
  const [errors, setErrors] = useState<FormErrors>({});
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rules = [
      { key: "name", required: true, label: "Name" },
      { key: "email", required: true, label: "Email" },
      { key: "gender", required: true, label: "Gender" },
      { key: "name", maxLength: 16, label: "name" },
      { key: "name", minLength: 4, label: "name" },
    ];
    validator(
      formValue,
      rules,
      (errors: any): any => {
        if (noErrors(errors)) {
          props.onAddUser(formValue);
          props.toggle()
          setFormValue(initUser);
          return false;
        }
        setErrors(errors);
      }
    );
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div className="user-form">
      <h1>add users</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            placeholder="please input name"
            name="name"
            value={formValue.name}
            onChange={onInputChange}
          />
          {errors["name"] && errors["name"].length > 0 && (
            <div className="form-error">{errors["name"].join(",")}</div>
          )}
        </div>
        <div className="form-row">
          <label>Email</label>
          <input
            type="text"
            placeholder="please input email"
            name="email"
            value={formValue.email}
            onChange={onInputChange}
          />
          {errors["email"] && errors["email"].length > 0 && (
            <div className="form-error">{errors["email"].join(",")}</div>
          )}
        </div>
        <div className="form-row">
          <label>Gender</label>
          <input
            type="text"
            placeholder="please input gender"
            name="gender"
            value={formValue.gender}
            onChange={onInputChange}
          />
          {errors["gender"] && errors["gender"].length > 0 && (
            <div className="form-error">{errors["gender"].join(",")}</div>
          )}
        </div>
        <div className="form-row">
          <button>Add new user</button>
        </div>
      </form>
    </div>
  );
};
export default AddUserForm;
