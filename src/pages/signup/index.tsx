import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { AuthCard, Input } from "../../components";
import { Button } from "../../components/button";
import { loginPath, verificationCodePath } from "../../paths";
import { useState } from "react";
import { setCredentials } from "../../features/auth/authSlice";
import { useSignupMutation } from "../../services/api";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const dispatch = useAppDispatch();
  const [signUp] = useSignupMutation();
  const navigate = useNavigate();

  const handleInputChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData((prev) => ({ ...prev, [name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await signUp({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      // save user email for verification code send
      localStorage.setItem("email", formData.email);
      dispatch(setCredentials({ userData }));

      // Re-enabled navigation to the next step
      navigate(verificationCodePath());
    } catch (err: any) {
      // Corrected the error message to be more specific
      console.error("Failed to signup:", err);
      // You can also set API errors to the state to display them in the UI
    }
  };
  return (
    <AuthCard
      title="Create account"
      subtitle="Enter The Email Address Associated With Your Account. We'll Send You An OTP To Your Email."
      backLink={loginPath()}
      backLinkName="Login"
      backLinkMessage="Already Have An Account?"
    >
      <form onSubmit={handleSubmit}>
        <fieldset className="space-y-5">
          <Input
            value={formData.email}
            onChange={handleInputChange("email")}
            label="Your Email"
            placeholder="Enter email"
          />
          <Input
            value={formData.password}
            onChange={handleInputChange("password")}
            label="New Password"
            placeholder="Enter New password"
          />
          <Input
            value={formData.confirm_password}
            onChange={handleInputChange("confirm_password")}
            label="Confirm Password"
            placeholder="Enter Confirm password"
          />
        </fieldset>
        <Button className="w-full mt-6">Signup</Button>
      </form>
    </AuthCard>
  );
}
