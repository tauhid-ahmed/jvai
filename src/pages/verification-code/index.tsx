import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthCard } from "../../components";
import { Button } from "../../components/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/input-otp";
import { useAppSelector } from "../../app/hooks";
import { selectVerifiedUser } from "../../features/auth/authSlice";
import { useResendOtpMutation, useVerifyOtpMutation } from "../../services/api";
import { chatPath, signupPath } from "../../paths";

interface OtpFormData {
  email: string;
  otp: string;
}

interface ResendOtpData {
  email: string;
}

const OTP_LENGTH = 4;
const EMAIL_STORAGE_KEY = "email";

export default function VerificationCodePage() {
  const [otp, setOtp] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const verifiedUser = useAppSelector(selectVerifiedUser);

  const [verifyOtp] = useVerifyOtpMutation();
  const [sendOtp] = useResendOtpMutation();

  const email = localStorage.getItem(EMAIL_STORAGE_KEY);

  useEffect(() => {
    if (verifiedUser?.is_verified) {
      navigate(chatPath());
    }
  }, [verifiedUser?.is_verified, navigate]);

  const getMaskedEmail = (email: string): string => {
    if (!email) return "";

    const [localPart, domain] = email.split("@");
    if (!localPart || !domain) return email;

    const maskedLocal =
      localPart.length > 3
        ? `${localPart.substring(0, 3)}${"*".repeat(localPart.length - 3)}`
        : localPart;

    return `${maskedLocal}@${domain}`;
  };

  /**
   * Handles OTP form submission
   */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!email) {
      setError("Email not found. Please try signing up again.");
      return;
    }

    if (otp.length !== OTP_LENGTH) {
      setError(`Please enter a ${OTP_LENGTH}-digit OTP code.`);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const otpData: OtpFormData = {
        email,
        otp,
      };

      await verifyOtp(otpData).unwrap();

      // Clear email from localStorage after successful verification
      localStorage.removeItem(EMAIL_STORAGE_KEY);

      navigate(chatPath());
    } catch (err) {
      console.error("OTP verification failed:", err);
      setError("Invalid OTP code. Please try again.");
      setOtp(""); // Clear OTP on error
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles OTP resend request
   */
  const handleResendOtp = async (): Promise<void> => {
    if (!email) {
      setError("Email not found. Please try signing up again.");
      return;
    }

    setIsResending(true);
    setError("");

    try {
      const resendData: ResendOtpData = { email };

      await sendOtp(resendData).unwrap();

      // Optional: Show success message
      console.log("OTP resent successfully");
    } catch (err) {
      console.error("Failed to resend OTP:", err);
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  /**
   * Handles OTP input change
   */
  const handleOtpChange = (value: string): void => {
    setOtp(value);

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  // Show loading state while checking verification status
  if (!verifiedUser) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <AuthCard
      title="OTP Verification"
      subtitle={`Enter the OTP sent to ${getMaskedEmail(email || "")}`}
      backLink={signupPath()}
      backLinkName="Back to Sign Up"
      footer={
        <div className="flex items-center justify-center">
          <span className="text-sm text-grey-400">
            Didn't receive the code?
          </span>
          <Button
            onClick={handleResendOtp}
            variant="link"
            className="text-blue-200"
            disabled={isResending}
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <InputOTP
            value={otp}
            onChange={handleOtpChange}
            maxLength={OTP_LENGTH}
            disabled={isSubmitting}
          >
            <InputOTPGroup className="mx-auto">
              {Array.from({ length: OTP_LENGTH }, (_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <div className="text-red-500 text-sm text-center" role="alert">
              {error}
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || otp.length !== OTP_LENGTH}
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </Button>
      </form>
    </AuthCard>
  );
}
