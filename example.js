const express = require("express");
const app = express();
app.use(express.json());

const DatabaseService = {
  save: (user) => console.log(`User ${user.name} saved to DB`),
};



function registerUser(req, res) {
  const user = req.body;

  // ❌ **SRP Violation** (Multiple responsibilities in one function)
  console.log(`Logging user: ${user.name}`); // Logging (should be separate)
  DatabaseService.save(user); // Database logic
  sendEmail(user.email, "Welcome!", "Thanks for signing up!"); // Email logic (should be separate)

  res.json({ message: `User ${user.name} registered` });
}

// ❌ **OCP Violation** (Direct modification required for new notification methods)
function sendEmail(email, subject, body) {
  console.log(`Email sent to ${email}: ${subject} - ${body}`);
}

app.post("/register", registerUser);

app.listen(3000, () => console.log("Server running on port 3000"));
