import { useEffect, useState } from "react";
import { AuthCard, Input } from "../../components";
import { Button } from "../../components/button";
import { chatPath, signupPath, verificationCodePath } from "../../paths";
import {
  useLoginMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../../services/api";
import { useAppDispatch } from "../../app/hooks";
import { setCredentials } from "../../features/auth/authSlice";
import { useNavigate } from "react-router";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/input-otp";

export default function VerificationCodePage() {
  const [otp, setOtp] = useState("");
  const dispatch = useAppDispatch();
  const [sendOtp] = useResendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const parsedEmail = localStorage.getItem("email") as string;

  useEffect(() => {
    const init = async () => {
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
    init();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (parsedEmail) {
        const data = await verifyOtp({
          email: parsedEmail,
          otp: otp,
        }).unwrap();
        // dispatch();
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
