import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPassword({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/orgforgot-password", { email });
      console.log("frontend work");
      if (response.status === 200) {
        setMessage("Reset link sent to your email.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset link. Try again.");
    }
  };

  return (
    <div className={cn("w-650px h-250px flex flex-col gap-6 mt-10", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>Enter your email to receive a password reset link.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetRequest}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label className="text-lg" htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {message && <p className="text-green-500 text-sm">{message}</p>}
              <Button type="submit" className="w-full">Send Reset Link</Button>
            </div>
          </form>
          <div className="text-center text-sm mt-4">
            <button onClick={() => navigate("/login")} className="underline underline-offset-4">
              Back to Login
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPassword;