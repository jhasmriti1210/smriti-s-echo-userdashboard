"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;

      try {
        const res = await fetch(
          `http://localhost:5000/api/verify-email?token=${token}`
        );
        const data = await res.json();

        if (data.success) {
          setMessage("✅ Email verified successfully! You can now log in.");
        } else {
          setMessage(`❌ Verification failed: ${data.message}`);
        }
      } catch (error) {
        setMessage("❌ An error occurred during verification.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="p-8 text-center">
      <h1 className="text-xl font-semibold">{message}</h1>
    </div>
  );
}
