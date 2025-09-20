
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CustomerLogin({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/check-session", { withCredentials: true })
      .then(response => {
        if (response.data.loggedIn) {
          console.log("success");
        }
      })
      .catch(error => console.log("Session check error:", error));
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/Costumerlogin", {
        email,
        password,
      }, { withCredentials: true });

      if (response.status === 200) {
        console.log("success");
        window.location.href=`http://localhost:5175/${email}`;
       
      }
    } catch (err) {
      console.log("Login Error:", err.response?.data);
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:8080/auth/google", "_self");

    setTimeout(async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/login/success", {
          withCredentials: true,
        });

        if (response.status === 200 && response.data.user) {
          console.log("success");
        } else {
          setError("User not registered. Please sign up first.");
        }
      } catch (error) {
        setError("Google login failed. Try again.");
      }
    }, 2000);
  };

  return (
    <div className={cn("w-650px h-350px flex flex-col gap-6 mt-10", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Login to access your profile!!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label className="text-lg" htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label className="text-lg" htmlFor="password">Password</Label>
                  <button 
                    type="button" 
                    onClick={() => navigate("/forgot-password")}
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >Forgot your password?</button>
                </div>
                <Input id="password" type="password" name="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {message && <p className="text-green-500 text-sm">{message}</p>}
              <Button type="submit" className="w-full">Login</Button>
            </div>
          </form>
          <div className="relative text-center text-sm mt-4">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
          <div className="grid gap-6 mt-4">
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="55" height="55" viewBox="0 0 43 43">
<path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
              Login with Google
            </Button>
          </div>
          <div className="text-center text-sm mt-4">
            Don&apos;t have an account? <a href="http://localhost:5173/customerSignup" className="underline underline-offset-4">Sign up</a>
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

export default CustomerLogin;