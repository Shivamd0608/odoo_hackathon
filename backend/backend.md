## ✅ Features Implemented

### 👤 User & Profile

* User Registration & Login with JWT
* Profile fields: name, email, company, location, LinkedIn, social links, experiences (multiple), skills
* Add/Delete skills
* Upload profile photo (optional)
* Visibility toggle: Public/Private profiles

---

### 🔍 Explore & Skill Swap

* Browse/search users by skill
* Send swap requests (request-based system)
* Accept / Reject / Cancel swap
* Track swap status: pending, accepted, cancelled, delivered, confirmed
* Mark swap as delivered / confirmed
* Rating after swap delivery
* Skill level tracking (Beginner, Intermediate, etc.)

---

### 💬 Messaging

* Real-time chat via Socket.IO (swap-based)
* Store all messages by swap ID
* Threaded view per swap

---

### 🎖️ Badges & Recognition

* Badge assignment system based on activity:

  * Beginner, Starter, Professional, Expert (logic can be score or # swaps based)

---

### 🛡️ Admin Panel Features

* Ban user
* Reject inappropriate skills
* View swaps by status (all users)
* Download platform reports (users, swaps, feedback) in CSV
* Broadcast platform-wide messages
* View dashboard analytics:

  * Total users
  * Total swaps
  * Swap breakdown by status
  * Average rating
  * Top 5 most common skills

---

## 🧾 All Backend API Endpoints

---

### **🔐 Auth (`/api/auth`)**

| Method | Route     | Description      |
| ------ | --------- | ---------------- |
| POST   | /register | Register user    |
| POST   | /login    | Login user       |
| GET    | /me       | Get current user |

---

### **👤 User & Skills (`/api/user`)**

| Method | Route             | Description             |
| ------ | ----------------- | ----------------------- |
| GET    | /me               | Get logged-in user data |
| PATCH  | /me               | Update profile          |
| GET    | /\:id             | Get public profile      |
| POST   | /skills           | Add skill               |
| DELETE | /skills/\:skillId | Delete skill            |

---

### **🔍 Swap (`/api/swap`)**

| Method | Route         | Description                |
| ------ | ------------- | -------------------------- |
| GET    | /explore      | Browse/search users        |
| POST   | /request      | Send swap request          |
| PATCH  | /\:id/status  | Accept / Reject / Cancel   |
| PATCH  | /\:id/deliver | Mark swap as delivered     |
| PATCH  | /\:id/confirm | Confirm swap delivery      |
| GET    | /me           | View sent & received swaps |

---

### **💬 Chat (`/api/chat`)**

| Method | Route     | Description             |
| ------ | --------- | ----------------------- |
| POST   | /send     | Send message in a swap  |
| GET    | /\:swapId | Get messages for a swap |

---

### **🛠️ Admin (`/api/admin`)**

| Method | Route                    | Description                              |
| ------ | ------------------------ | ---------------------------------------- |
| PATCH  | /skills/\:skillId/reject | Reject a user’s skill                    |
| PATCH  | /users/\:userId/ban      | Ban a user                               |
| GET    | /swaps                   | View all swaps by status (optional ?q=)  |
| GET    | /report/\:type           | Download report (users, swaps, feedback) |
| POST   | /message                 | Send global platform message             |
| GET    | /analytics               | View dashboard analytics                 |

