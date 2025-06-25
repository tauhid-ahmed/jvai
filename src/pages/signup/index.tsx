import { AuthCard, Input } from "../../components";
import { Button } from "../../components/button";
import { loginPath } from "../../paths";

export default function SignupPage() {
  return (
    <AuthCard
      title="Create account"
      subtitle="Enter The Email Address Associated With Your Account. We'll Send You An OTP To Your Email."
      backLink={loginPath()}
      backLinkName="Login"
      backLinkMessage="Already Have An Account?"
    >
      <form>
        <fieldset className="space-y-5">
          <Input label="Your Email" placeholder="Enter email" />
          <Input label="New Password" placeholder="Enter New password" />
          <Input
            label="Confirm Password"
            placeholder="Enter Confirm password"
          />
        </fieldset>
        <Button className="w-full mt-6">Signup</Button>
      </form>
    </AuthCard>
  );
}
