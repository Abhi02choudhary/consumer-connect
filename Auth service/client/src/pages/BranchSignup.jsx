

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// import MapboxAutocomplete from 'react-mapbox-autocomplete';
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
    shortBio: "",
    longBio: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataToSend = new FormData();
  formDataToSend.append("branch_name", formData.branch_name);
  formDataToSend.append("email", formData.email);
  formDataToSend.append("password", formData.password);
  formDataToSend.append("idProof", formData.idProof); // File upload
  formDataToSend.append("location", formData.location);
  formDataToSend.append("phone", formData.phone);
  formDataToSend.append("privateID", formData.privateID);
  formDataToSend.append("orgID", formData.orgID);
  formDataToSend.append("shortBio", formData.shortBio);
  formDataToSend.append("longBio", formData.longBio);
  console.log("Sending Data:", formDataToSend);

  try {
    const response = await fetch("http://localhost:8080/Branchsignup", {
      method: "POST",
      body: formDataToSend, // No headers needed, browser sets them
    });

    const result = await response.json();
    if (response.status === 200) {
    console.log("Response from API:", result);
    window.location.href = "http://localhost:5179";  

    }else{
      setError(result.message || "Invalid credentials");
    }
  } catch (err) {
    console.error("Login Error:",result.message);
    setError(result.message || "Invalid credentials");
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
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <div className={cn("grid gap-6 grid-cols-2")}>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="branch_name">
                    Company Name
                  </Label>
                  <Input id="branch_name" name="branch_name" type="text" placeholder="Enter Company name" onChange={handleChange} required />
                </div>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="phone">
                    Contact
                  </Label>
                  <Input id="phone" name="phone" type="number" placeholder="Enter branch contact no." onChange={handleChange} required />
                </div>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="location">
                    Location
                  </Label>
                  
                  <Input id="location" name="location" type="location" placeholder="Enter Branch location" onChange={handleChange} required />
                  {/* <MyComponent setLocation={(loc) => setFormData({ ...formData, location: loc })}/> */}
                </div>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="email">
                    Email
                  </Label>
                  <Input id="email" name="email" type="email" placeholder="Enter Branch email" onChange={handleChange} required />
                </div>
               
              </div>

              <div className={cn("grid gap-6")}>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="idProof">
                    ID Proof
                  </Label>
                  <Input id="idProof" name="idProof" type="file" accept="application/pdf" onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="password">
                    Password
                  </Label>
                  <Input id="password" name="password" type="password" placeholder="Enter Password" onChange={handleChange} required />
                </div>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="privateID">
                    Private ID
                  </Label>
                  <Input id="privateID" name="privateID" type="text" placeholder="Enter Branch ID" onChange={handleChange} required />
                </div>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="shortBio">
                    Org ID
                  </Label>
                  <Input id="orgID" name="orgID" type="text" placeholder="Enter your OrgID" onChange={handleChange} required />
                </div>
              </div>
            </div>
            <br></br>
            <div className={cn("grid gap-6 grid-cols-1")}>
            <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="longBio">
                   Tag Line
                  </Label>
                  <Input id="shortBio" name="shortBio" type="text" placeholder="Enter your TagLine" onChange={handleChange} required />

                </div>
            </div>
            <br></br>
            <div className={cn("grid gap-6 grid-cols-1")}>
            <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="longBio">
                   Description
                  </Label>
                  <textarea id="longBio" 
                  name="longBio" 
                  type="text" 
                  placeholder="Enter your description" 
                   className="border-2 border-gray-150 focus:border-gray-400 p-2"
                  onChange={handleChange} 
                  required ></textarea>
                </div>
            </div>
            {/* <br />
            <div className="text-center">
              <Button type="submit" className="w-[60%]">
                Signup
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div> */}
   
              <br></br>
              <div className="grid gap-6">
                
              {error && <p className="text-red-500 mt-2 text-sm text-center">{error}</p>}
              <div className="flex items-center flex-col gap-4">
                <Button type="submit" className="w-[60%]" >
                  Signup
                </Button>
                </div>
              </div>
              <div className="text-center text-sm mt-7px">
                Already a user?{" "}
                <a href="http://localhost:5173/BranchLogin" className="underline underline-offset-4">
                  Login
                </a>
              </div>
          </form>
        </CardContent>
      </Card>
      <div
        className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

export default BranchSignup;