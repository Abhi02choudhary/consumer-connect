// import React, { useState } from "react";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import PostImg from "../assets/Girl-Img.jpg";

// export default function PostCard() {
//   const [postText, setPostText] = useState("");
//   const [mentionResults, setMentionResults] = useState([]);

//   const handleTextChange = async (e) => {
//     const text = e.target.value;
//     setPostText(text);

//     // Extracting mention query (e.g., "@rel")
//     const match = text.match(/@(\w*)$/);
//     const query = match ? match[1] : "";

//     if (query.length > 0) {
//       console.log("Fetching mentions for:", query);
//       try {
//         const response = await fetch(`http://localhost:5000/mention-search?q=${encodeURIComponent(query)}`);
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         console.log("Received data:", data);
//         setMentionResults(data || []);
//       } catch (error) {
//         console.error("Error fetching mentions:", error);
//       }
//     } else {
//       setMentionResults([]);
//     }
//   };

//   const handleMentionClick = (mentionName) => {
//     setPostText(postText.replace(/@\w*$/, `@${mentionName} `));
//     setMentionResults([]);
//   };

//   return (
//     <Card className="ml-[25%] mt-[10%] w-full md:w-[70%] lg:w-[63%] max-w-[400px] shadow-lg border-2 border-gray-350">
//       <CardHeader className="p-0 pb-4">
//         <div className="flex items-center space-x-4">
//           <img src={PostImg} className="w-16 h-16 rounded-full" alt="User" />
//           <div>
//             <CardTitle className="text-base text-xl">Krisha Shah</CardTitle>
//             <CardDescription className="text-lg">Customer</CardDescription>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent>
//         <textarea
//           className="h-24 w-full border rounded-md p-3 text-left resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Write your complaint here.."
//           value={postText}
//           onChange={handleTextChange}
//         />

//         {/* Mention Suggestions Dropdown */}
//         {mentionResults.length > 0 && (
//           <div className="bg-white border rounded-md mt-2 shadow-md absolute z-10">
//             {mentionResults.map((mention, index) => (
//               <div 
//                 key={index} 
//                 className="p-2 cursor-pointer hover:bg-gray-100"
//                 onClick={() => handleMentionClick(mention.name)} // ✅ Fixed: Pass only the name
//               >
//                 {mention.name} {/* ✅ Fixed: Display only the name */}
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>

//       <CardFooter className="flex justify-end">
//         <Button className="bg-blue-600 text-white px-6 py-2 rounded-full">Post</Button>
//       </CardFooter>
//     </Card>
//   );
// }







// import React, { useState } from "react";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import PostImg from "../assets/Girl-Img.jpg";

// export default function PostCard() {
//   const [postText, setPostText] = useState("");
//   const [mentionResults, setMentionResults] = useState([]);

//   const handleTextChange = async (e) => {
//     const text = e.target.value;
//     setPostText(text);

//     // Extract last mention
//     const match = text.match(/@(\w*)$/);
//     const query = match ? match[1] : "";

//     if (query.length > 0) {
//       try {
//         const response = await fetch(`http://localhost:5000/mention-search?q=${encodeURIComponent(query)}`);
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         setMentionResults(data || []);
//       } catch (error) {
//         console.error("Error fetching mentions:", error);
//       }
//     } else {
//       setMentionResults([]);
//     }
//   };

//   const handleMentionClick = (mention) => {
//     setPostText(postText.replace(/@\w*$/, `@${mention.name}`));
//     setMentionResults([]);
//   };

//   // Extract and format mentions separately
  // const extractMentions = () => {
  //   const mentions = postText.match(/@\w+/g) || [];
  //   return mentions
  //     .map(
  //       (mention) =>
  //         `<a href="https://localhost:8080/brands/${mention.slice(1)}" target="_blank" class="text-blue-600 font-semibold">${mention}</a>`
  //     )
  //     .join(" ");
  // };

//   return (
//     <Card className="ml-[25%] mt-[10%] w-full md:w-[78%] lg:w-[66%] max-w-[480px] shadow-lg border-2 border-gray-350">
//       <CardHeader className="p-0 pb-4">
//         <div className="flex items-center space-x-4">
//           <img src={PostImg} className="w-16 h-16 rounded-full" alt="User" />
//           <div>
//             <CardTitle className="text-base text-xl">Krisha Shah</CardTitle>
//             <CardDescription className="text-lg">Customer</CardDescription>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent>
//         <textarea
//           className="h-24 w-full border rounded-md p-3 text-left resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Write your complaint here.."
//           value={postText}
//           onChange={handleTextChange}
//         />

//         {/* Mention Suggestions */}
//         {mentionResults.length > 0 && (
//           <div className="bg-white border rounded-md mt-2 shadow-md absolute z-10">
//             {mentionResults.map((mention, index) => (
//               <div 
//                 key={index} 
//                 className="p-2 cursor-pointer hover:bg-gray-100"
//                 onClick={() => handleMentionClick(mention)}
//               >
//                 {mention.name}
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>

//       {/* Render ONLY Mentions as Clickable Links */}
//       <CardContent>
//         <p className="mt-2 text-lg font-semibold" dangerouslySetInnerHTML={{ __html: extractMentions() }} />
//       </CardContent>

//       <CardFooter className="flex justify-end">
//         <Button className="bg-blue-600 text-white px-6 py-2 rounded-full">Post</Button>
//       </CardFooter>
//     </Card>
//   );
// }



// import React, { useState } from "react";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import PostImg from "../assets/Girl-Img.jpg";
// import { UploadCloud, XCircle } from "lucide-react";

// export default function PostCard() {
//   const [postText, setPostText] = useState("");
//   const [mentionResults, setMentionResults] = useState([]);
//   const [attachments, setAttachments] = useState([]);

//   const handleTextChange = async (e) => {
//     const text = e.target.value;
//     setPostText(text);

//     const match = text.match(/@(\w*)$/);
//     const query = match ? match[1] : "";

//     if (query.length > 0) {
//       try {
//         const response = await fetch(`http://localhost:5000/mention-search?q=${encodeURIComponent(query)}`);
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         setMentionResults(data || []);
//       } catch (error) {
//         console.error("Error fetching mentions:", error);
//       }
//     } else {
//       setMentionResults([]);
//     }
//   };

//   const handleMentionClick = (mention) => {
//     setPostText(postText.replace(/@\w*$/, `@${mention.name}`));
//     setMentionResults([]);
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setAttachments([...attachments, ...files]);
//   };

//   const removeAttachment = (index) => {
//     setAttachments(attachments.filter((_, i) => i !== index));
//   };
//   const extractMentions = () => {
//     const mentions = postText.match(/@\w+/g) || [];
//     return mentions
//       .map(
//         (mention) =>
//           `<a href="https://localhost:8080/brands/${mention.slice(1)}" target="_blank" class="text-blue-600 font-semibold">${mention}</a>`
//       )
//       .join(" ");
//   };
//   return (
//     <Card className="ml-[25%] mt-[10%] w-full md:w-[78%] lg:w-[66%] max-w-[480px] shadow-lg border-2 border-gray-350">
//       <CardHeader className="p-0 pb-4">
//         <div className="flex items-center space-x-4">
//           <img src={PostImg} className="w-16 h-16 rounded-full" alt="User" />
//           <div>
//             <CardTitle className="text-base text-xl">Krisha Shah</CardTitle>
//             <CardDescription className="text-lg">Customer</CardDescription>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent>
//         <textarea
//           className="h-24 w-full border rounded-md p-3 text-left resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Write your complaint here.."
//           value={postText}
//           onChange={handleTextChange}
//         />
//          <p className="mt-2 text-lg font-semibold" dangerouslySetInnerHTML={{ __html: extractMentions() }} />

//         {/* Mention Suggestions */}
//         {mentionResults.length > 0 && (
//           <div className="bg-white border rounded-md mt-2 shadow-md absolute z-10">
//             {mentionResults.map((mention, index) => (
//               <div 
//                 key={index} 
//                 className="p-2 cursor-pointer hover:bg-gray-100"
//                 onClick={() => handleMentionClick(mention)}
//               >
//                 {mention.name}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* File Attachments */}
//         <div className="mt-4 flex items-center space-x-4">
//           <label className="flex items-center cursor-pointer space-x-2 p-2 border rounded-md bg-gray-100 hover:bg-gray-200 transition">
//             <UploadCloud className="w-5 h-5 text-gray-600" />
//             <span className="text-gray-700 text-sm">Attach Bill</span>
//             <input type="file" multiple className="hidden" onChange={handleFileChange} />
//           </label>
//         </div>

//         {/* Attachment Preview */}
//         {attachments.length > 0 && (
//           <div className="mt-3 space-y-2">
//             {attachments.map((file, index) => (
//               <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
//                 <span className="truncate max-w-[80%]">{file.name}</span>
//                 <button onClick={() => removeAttachment(index)} className="text-red-600">✖</button>
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>

//       <CardFooter className="flex justify-end">
//         <Button className="bg-blue-600 text-white px-6 py-2 rounded-full">Post</Button>
//       </CardFooter>
//     </Card>
//   );
// }




// import React, { useState } from "react";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import PostImg from "../assets/Girl-Img.jpg";
// import { UploadCloud } from "lucide-react";

// export default function PostCard() {
//   const [postText, setPostText] = useState("");
//   const [mentionResults, setMentionResults] = useState([]);
//   const [attachments, setAttachments] = useState([]);
//   const [privateID, setPrivateID] = useState(""); // 🔹 Store privateID

//   const handleTextChange = async (e) => {
//     const text = e.target.value;
//     setPostText(text);

//     const match = text.match(/@(\w*)$/);
//     const query = match ? match[1] : "";

//     if (query.length > 0) {
//       try {
//         const response = await fetch(`http://localhost:5000/mention-search?q=${encodeURIComponent(query)}`);
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         setMentionResults(data || []);
//         console.log("Mention API Response:", data); // Debugging

//         if (data.privateID) {
//           setPrivateID(data.privateID); // ✅ Update privateID
//         }
//       } catch (error) {
//         console.error("Error fetching mentions:", error);
//       }
//     } else {
//       setMentionResults([]);
//     }
//   };

//   const handleMentionClick = (mention) => {
//     setPostText(postText.replace(/@\w*$/, `@${mention.name}`));
//     setMentionResults([]);
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setAttachments([...attachments, ...files]);
//   };

//   const removeAttachment = (index) => {
//     setAttachments(attachments.filter((_, i) => i !== index));
//   };

//   const extractMentions = () => {
//     return (postText.match(/@\w+/g) || [])
//       .map(
//         (mention) =>
//           `<a href="https://localhost:8080/brands/${mention.slice(1)}" target="_blank" class="text-blue-600 font-semibold">${mention}</a>`
//       )
//       .join(" ");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("postText", postText);
//     formData.append("privateID", privateID || ""); // ✅ Ensure privateID is included
//     attachments.forEach((file) => formData.append(`attachments`, file));

//     try {
//       console.log("Submitting with privateID:", privateID); // Debugging
//       const response = await fetch("http://localhost:5000/post-data", {
//         method: "POST",
//         body: formData,
//       });
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//       alert("Post submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting post:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Card className="ml-[25%] mt-[10%] w-full md:w-[78%] lg:w-[66%] max-w-[480px] shadow-lg border-2 border-gray-350">
//         <CardHeader className="p-0 pb-4">
//           <div className="flex items-center space-x-4">
//             <img src={PostImg} className="w-16 h-16 rounded-full" alt="User" />
//             <div>
//               <CardTitle className="text-base text-xl">Krisha Shah</CardTitle>
//               <CardDescription className="text-lg">Customer</CardDescription>
//             </div>
//           </div>
//         </CardHeader>

//         <CardContent>
//           <textarea
//             className="h-24 w-full border rounded-md p-3 text-left resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Write your complaint here.."
//             value={postText}
//             onChange={handleTextChange}
//           />
//           <p className="mt-2 text-lg font-semibold" dangerouslySetInnerHTML={{ __html: extractMentions() }} />

//           {mentionResults.length > 0 && (
//             <div className="bg-white border rounded-md mt-2 shadow-md absolute top-[40%] right-90 z-10">
//               {mentionResults.map((mention, index) => (
//                 <div key={index} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleMentionClick(mention)}>
//                   {mention.name}
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="mt-4 flex items-center space-x-4">
//             <label className="flex items-center cursor-pointer space-x-2 p-2 border rounded-md bg-gray-100 hover:bg-gray-200 transition">
//               <UploadCloud className="w-5 h-5 text-gray-600" />
//               <span className="text-gray-700 text-sm">Attach Bill</span>
//               <input type="file" multiple className="hidden" onChange={handleFileChange} />
//             </label>
//           </div>

//           {attachments.length > 0 && (
//             <div className="mt-3 space-y-2">
//               {attachments.map((file, index) => (
//                 <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
//                   <span className="truncate max-w-[80%]">{file.name}</span>
//                   <button onClick={() => removeAttachment(index)} className="text-red-600">✖</button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>

//         <CardFooter className="flex justify-end">
//           <Button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-full">Post</Button>
//         </CardFooter>
//       </Card>
//     </form>
//   );
// }




import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import PostImg from "../assets/Girl-Img.jpg";
import { UploadCloud } from "lucide-react";
import {useParams} from 'react-router-dom'
export default function PostCard() {
  const {email} = useParams();
  const [postText, setPostText] = useState("");``
  const [mentionResults, setMentionResults] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [privateID, setPrivateID] = useState(""); // 🔹 Store privateID

  const handleTextChange = async (e) => {
    const text = e.target.value;
    setPostText(text);
    
    const match = text.match(/@(\w*)$/);
    const query = match ? match[1] : "";
    
    if (query.length > 0) {
      try {
        const response = await fetch(`http://localhost:5000/mention-search?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        console.log("🔍 Mention API Response:", data); // ✅ Debug log

      console.log(data.privateID);
      setPrivateID(data.privateID); // ✅ Debug log
        setMentionResults(data || []);
      } catch (error) {
        console.error("Error fetching mentions:", error);
      }
    } else {
      setMentionResults([]);
    }
  };

  const handleMentionClick = (mention) => {
    setPostText(postText.replace(/@\w*$/, `@${mention.name}`));
    setMentionResults([]);
    setPrivateID(mention.privateID); // ✅ Update privateID
    console.log(mention.privateID)
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const extractMentions = () => {
    return (postText.match(/@\w+/g) || [])
      .map(
        (mention) =>
          `<a href="https://localhost:8080/brands/${mention.slice(1)}" target="_blank" class="text-blue-600 font-semibold">${mention}</a>`
      )
      .join(" ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🚀 Submitting Post...");
    console.log("🔍 privateID Before Submit:", privateID);
    console.log("📝 Post Text:", postText);
    console.log("📎 Attachments:", attachments.map(file => file.name));

    if (!privateID) {
      alert("Error: privateID is missing!");
      return;
    }

    const formData = new FormData();
    formData.append("postText", postText);
    formData.append("privateID", privateID);
    attachments.forEach((file) => formData.append(`attachments`, file));
    formData.append("email",email);
    try {
      const response = await fetch("http://localhost:5000/post-data", {
        method: "POST",
        body: formData,
      })
      .then(response => response.json())  // Convert response to JSON
      .then(data => {
          if (data.success) {
              alert("✅ Post Successful!");
          } else {
              alert("❌ Authentication Failed!");
          }
      })
    } catch (error) {
      console.error("❌ Error submitting post:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="ml-[25%] mt-[10%] w-full md:w-[78%] lg:w-[66%] max-w-[480px] shadow-lg border-2 border-gray-350">
        <CardHeader className="p-0 pb-4">
          <div className="flex items-center space-x-4">
            <img src={PostImg} className="w-16 h-16 rounded-full" alt="User" />
            <div>
              <CardTitle className="text-base text-xl">Krisha Shah</CardTitle>
              <CardDescription className="text-lg">Customer</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <textarea
            className="h-24 w-full border rounded-md p-3 text-left resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your complaint here.."
            value={postText}
            onChange={handleTextChange}
          />
          <p className="mt-2 text-lg font-semibold" dangerouslySetInnerHTML={{ __html: extractMentions() }} />

          {mentionResults.length > 0 && (
            <div className="bg-white border rounded-md mt-2 shadow-md absolute top-[40%] right-90 z-10">
            {mentionResults.map((mention, index) => (
              <div key={index} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleMentionClick(mention)}>
                {mention.name}
              </div>
            ))}
          </div>
          )}

          <div className="mt-4 flex items-center space-x-4">
            <label className="flex items-center cursor-pointer space-x-2 p-2 border rounded-md bg-gray-100 hover:bg-gray-200 transition">
              <UploadCloud className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 text-sm">Attach Bill</span>
              <input type="file" multiple className="hidden" onChange={handleFileChange} />
            </label>
          </div>

          {attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                  <span className="truncate max-w-[80%]">{file.name}</span>
                  <button onClick={() => removeAttachment(index)} className="text-red-600">✖</button>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-full">Post</Button>
        </CardFooter>
      </Card>
    </form>
  );
}