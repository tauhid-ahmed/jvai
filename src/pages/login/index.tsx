import { AuthCard, Input } from "../../components";
import { Button } from "../../components/button";
import { signupPath } from "../../paths";

export default function LoginPage() {
  return (
    <AuthCard
      title="Hello, Welcome!"
      subtitle="Please Enter Your Details Below To Continue"
      backLink={signupPath()}
      backLinkName="sign up"
      backLinkMessage="create account"
    >
      <form>
        <fieldset className="space-y-5">
          <Input label="Your Email" placeholder="Enter email" />
          <Input label="Password" placeholder="Enter password" />
        </fieldset>
        <Button className="w-full mt-6">Login</Button>
      </form>
    </AuthCard>
  );
}
