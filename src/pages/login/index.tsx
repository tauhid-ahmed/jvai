import { useState } from "react";
import { AuthCard, Input } from "../../components";
import { Button } from "../../components/button";
import { chatPath, signupPath } from "../../paths";
import { useLoginMutation } from "../../services/api";
import { useAppDispatch } from "../../app/hooks";
import { setCredentials } from "../../features/auth/authSlice";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const handleInputChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData((prev) => ({ ...prev, [name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await login(formData).unwrap();
      console.log(userData);
      dispatch(setCredentials(userData));
      navigate(chatPath());
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };
  return (
    <AuthCard
      title="Hello, Welcome!"
      subtitle="Please Enter Your Details Below To Continue"
      backLink={signupPath()}
      backLinkName="sign up"
      backLinkMessage="create account"
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
            label="Password"
            placeholder="Enter password"
          />
        </fieldset>
        <Button className="w-full mt-6">Login</Button>
      </form>
    </AuthCard>
  );
}
