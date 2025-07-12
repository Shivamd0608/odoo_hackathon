## ✅ 1. **Tech Stack**

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (with Mongoose ORM)
* **Auth:** JWT-based
* **Hosting:** Railway or Render

---

## ✅ 2. **Directory Structure**

```
/backend
├── controllers/
│   └── userController.js
│   └── swapController.js
│   └── chatController.js
│   └── feedbackController.js
├── models/
│   └── User.js
│   └── Skill.js
│   └── SwapRequest.js
│   └── Message.js
│   └── Feedback.js
├── routes/
│   └── auth.js
│   └── user.js
│   └── swap.js
│   └── chat.js
│   └── feedback.js
├── middlewares/
│   └── authMiddleware.js
│   └── errorHandler.js
├── utils/
│   └── validators.js
├── config/
│   └── db.js
├── .env
├── app.js
└── server.js
```

---

## ✅ 3. **Database Schema (Mongoose Models)**

### 🧑 `User.js`

```js
{
  name: String,
  email: String,
  password: String, // hashed
  location: String,
  photoUrl: String,
  availability: [String], // e.g., ["weekends", "evenings"]
  isPublic: Boolean,
  isBanned: Boolean,
  friends: [ObjectId], // other user IDs
  createdAt: Date
}
```

### 🎯 `Skill.js`

```js
{
  userId: ObjectId,
  name: String,
  type: "offered" | "wanted"
}
```

### 🤝 `SwapRequest.js`

```js
{
  senderId: ObjectId,
  receiverId: ObjectId,
  offeredSkill: String,
  requestedSkill: String,
  status: "pending" | "accepted" | "rejected" | "cancelled",
  deliveryStatus: "none" | "delivered" | "confirmed",
  message: String,
  createdAt: Date
}
```

### 💬 `Message.js`

```js
{
  swapId: ObjectId,
  from: ObjectId,
  to: ObjectId,
  text: String,
  timestamp: Date
}
```

### ⭐ `Feedback.js`

```js
{
  swapId: ObjectId,
  fromUserId: ObjectId,
  toUserId: ObjectId,
  rating: Number,
  comment: String
}
```

---

## ✅ 4. **API Routes Plan**

### 🔐 Auth (`/auth`)

| Method | Route     | Description        |
| ------ | --------- | ------------------ |
| POST   | /register | Register new user  |
| POST   | /login    | Login + return JWT |

---

### 👤 User & Profile (`/user`)

| Method | Route             | Description              |
| ------ | ----------------- | ------------------------ |
| GET    | /me               | Get current user profile |
| PATCH  | /me               | Update profile           |
| GET    | /\:id             | Get public profile       |
| POST   | /skills           | Add skill                |
| DELETE | /skills/\:skillId | Delete skill             |

---

### 🔍 Explore + Swap (`/swap`)

| Method | Route         | Description                   |
| ------ | ------------- | ----------------------------- |
| GET    | /explore      | Browse/search user profiles   |
| POST   | /request      | Create swap request           |
| PATCH  | /\:id/status  | Accept / Reject / Cancel swap |
| PATCH  | /\:id/deliver | Mark as delivered             |
| PATCH  | /\:id/confirm | Confirm delivery              |
| GET    | /me           | Get my swaps (sent/received)  |

---

### 💬 Chat (`/chat`)

| Method | Route     | Description                  |
| ------ | --------- | ---------------------------- |
| POST   | /send     | Send message                 |
| GET    | /\:swapId | Get message thread by swapId |

---

### ⭐ Feedback (`/feedback`)

| Method | Route     | Description                   |
| ------ | --------- | ----------------------------- |
| POST   | /         | Leave feedback after delivery |
| GET    | /\:userId | View feedback for a user      |

---

## ✅ 5. **Middlewares & Utilities**

### `authMiddleware.js`

* Decodes JWT
* Attaches `req.user` to request

### `errorHandler.js`

* Handles errors and sends formatted responses

### `validators.js`

* Validates user input using `Joi` or custom schema

---

## ✅ 6. **Environment Variables (.env)**

```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
```

---

## ✅ 7. **Task List for You (Backend Lead)**

| Task                               | Time Est. |
| ---------------------------------- | --------- |
| Set up Express server + MongoDB    | 10 min    |
| Create Mongoose Models             | 20 min    |
| Build Auth Routes + JWT middleware | 20 min    |
| Build Profile & Skill Routes       | 20 min    |
| Build Swap Routes (main flow)      | 30 min    |
| Add Chat, Delivery, Feedback APIs  | 30 min    |
| Add error handler + validators     | 15 min    |
| Test APIs with Postman             | 30 min    |
| Deploy on Render/Railway           | 15 min    |

---

✅ Once you approve this plan, I’ll help you scaffold the code step by step.

**Shall we start with the basic Express + MongoDB setup?**
