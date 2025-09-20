

// fetch(API_URL, {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(data),
// })
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.error("Error:", err));


const bcrypt = require('bcrypt');

const plainPassword = "12345"; // Replace with the actual password you used
const storedHash = "$2b$10$IrfbinHN246UFnSF0Nfeb.DGFfo.cxqSWb03mSH8BPAJO5SmVvDcK"; // Your stored hash

async function checkPassword() {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(plainPassword, salt);
  console.log("🔹 Manually Hashed Password:", hash);

  const isMatch = await bcrypt.compare(plainPassword, storedHash);
  console.log("does the entered password match the stored hash?", isMatch);
}

checkPassword();