import { useState } from "react";
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
import MyComponent from "../components/ui/MyComponent";

const API_URL = "http://localhost:8080/Branchsignup";

export function BranchSignup({ className, ...props }) {
  const [formData, setFormData] = useState({
    branch_name: "",
    phone: "",
    location: "",
    email: "",
    idProof: null,
    password: "",
    privateID: "",
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Signup successful!");
      } else {
        alert("Signup failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred!");
    }
  };

  return (
    <div className={cn("w-650px h-350px flex flex-col gap-6 mt-10", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className={cn("text-2xl")}>Signup</CardTitle>
          <CardDescription>Signup to access your profile!!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className={cn("grid gap-6 grid-cols-2")}>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="branch_name">
                    Company Name
                  </Label>
                  <Input id="branch_name" name="branch_name" type="text" onChange={handleChange} required />
                </div>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="phone">
                    Contact
                  </Label>
                  <Input id="phone" name="phone" type="number" onChange={handleChange} required />
                </div>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="location">
                    Location
                  </Label>
                  <MyComponent />
                </div>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="email">
                    Email
                  </Label>
                  <Input id="email" name="email" type="email" onChange={handleChange} required />
                </div>
              </div>

              <div className={cn("grid gap-6")}>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="idProof">
                    ID Proof
                  </Label>
                  <Input id="idProof" name="idProof" type="file" onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="password">
                    Password
                  </Label>
                  <Input id="password" name="password" type="password" onChange={handleChange} required />
                </div>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="privateID">
                    Private ID
                  </Label>
                  <Input id="privateID" name="privateID" type="text" onChange={handleChange} required />
                </div>
              </div>
            </div>
            <br />
            <div className="text-center">
              <Button type="submit" className="w-[60%]">
                Signup
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default BranchSignup;