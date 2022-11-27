import './Register.css';
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom"

function Register() {
  const { register, handleSubmit, formState: {errors} } = useForm({mode: "onBlur"});
  const onSubmit = data => console.log(data);

  return (
      <div className="container">
        <div className="containerForm">
            <form onSubmit={handleSubmit(onSubmit)}>
            <h1>REGISTER</h1>
            <label>Name</label>
            <input {...register("name", {required: "This is required"})} placeholder="Name" />
            <p className="pWarning">{errors.name?.message}</p>
            <label>Email</label>
            <input type="email" {...register("email",{required: "This is required"})} placeholder="Email"/>
            <p className="pWarning">{errors.email?.message}</p>
            <label>Password</label>
            <input type="password" {...register("password",{required: "This is required.", minLength: {
                value: 6, message: "Require atleast 6 characters."}})} placeholder="Password"/>
            <p className="pWarning">{errors.password?.message}</p>
            <div className="center">
                <p className="pStyle">Already have an account?&nbsp;</p>
                <Link to="/login"> Login Here!</Link>
            </div>
            <input type="submit" value="Register"/>
        </form>
        <p className="center">May also register with</p>
        <div class="socmed-login">
                <a href="#g-plus" class="socmed-btn google-btn">
                    <i class="fa fa-google"></i>
                    <span>Register with Google</span>
                </a>
            </div>
        </div>
      </div>
  );
}

export default Register;
