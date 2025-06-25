import { useState } from "react";
import { AuthCard } from "../../components";
import { Button } from "../../components/button";
import { chatPath, signupPath } from "../../paths";
import { useResendOtpMutation, useVerifyOtpMutation } from "../../services/api";
import { useNavigate } from "react-router";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/input-otp";

export default function VerificationCodePage() {
  const [otp, setOtp] = useState("");
  const [sendOtp] = useResendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const navigate = useNavigate();
  const parsedEmail = localStorage.getItem("email") as string;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (parsedEmail) {
        await verifyOtp({
          email: parsedEmail,
          otp: otp,
        }).unwrap();
        navigate(chatPath());
      }
    } catch (err) {
      console.log("otp", err);
    }
  };

  const handleResendOtp = async () => {
    try {
      if (parsedEmail) {
        const data = await sendOtp({
          email: parsedEmail,
        }).unwrap();
        console.log(data);
      }
    } catch (err) {
      console.log("otp", err);
    }
  };
  return (
    <AuthCard
      title="OTP Verification"
      subtitle="Enter OTP Sent To hif*******@iridales.com"
      backLink={signupPath()}
      backLinkName="Resend OTP"
      backLinkMessage="Didn't receive the code?"
      footer={
        <div className="flex items-center justify-center">
          <span className="text-sm text-grey-400">
            Didn't receive the code?
          </span>
          <Button
            onClick={handleResendOtp}
            variant="link"
            className="text-blue-200"
          >
            Resend OTP
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <InputOTP value={otp} onChange={setOtp} maxLength={4}>
          <InputOTPGroup className="mx-auto">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <Button className="w-full mt-6">Submit</Button>
      </form>
    </AuthCard>
  );
}
