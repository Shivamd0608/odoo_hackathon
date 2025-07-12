# 📘 Skill Swap Platform – Public API Documentation

> Auth: Most routes require JWT token in `Authorization: Bearer <token>`

---

## 🔐 Auth Routes

### `POST /auth/register`

Register a new user.

**Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass"
}
```

---

### `POST /auth/login`

Login with email and password.

**Body**:

```json
{
  "email": "john@example.com",
  "password": "securepass"
}
```

---

### `GET /auth/me` *(Protected)*

Get current logged-in user profile.

---

## 👤 User & Skills

### `GET /user/me` *(Protected)*

Returns your complete profile.

---

### `PATCH /user/me` *(Protected)*

Update profile.

**Body Example**:

```json
{
  "company": "SkillLabs",
  "location": "Delhi",
  "linkedin": "https://linkedin.com/in/john",
  "experience": [
    { "title": "Frontend Dev", "years": 2 }
  ]
}
```

---

### `GET /user/:id`

Get public profile of a user.

---

### `POST /user/skills` *(Protected)*

Add a new skill.

```json
{
  "name": "Figma",
  "description": "UI Design work",
  "level": "Intermediate"
}
```

---

### `DELETE /user/skills/:skillId` *(Protected)*

Delete your skill.

---

## 🔍 Explore & Swaps

### `GET /swap/explore` *(Protected)*

Browse/search user profiles.

**Query Params**:

* `skill=React`
* `location=Delhi`

---

### `POST /swap/request` *(Protected)*

Send a swap request.

```json
{
  "toUser": "<userId>",
  "offeredSkill": "React",
  "requestedSkill": "Figma"
}
```

---

### `PATCH /swap/:id/status` *(Protected)*

Update swap status: accept, reject, cancel

```json
{
  "status": "accepted"
}
```

---

### `PATCH /swap/:id/deliver` *(Protected)*

Mark the swap as delivered.

---

### `PATCH /swap/:id/confirm` *(Protected)*

Confirm the delivery and leave rating.

```json
{
  "rating": 4,
  "feedback": "Great work!"
}
```

---

### `GET /swap/me` *(Protected)*

Get your sent and received swaps.

---

## 💬 Messaging

### `POST /chat/send` *(Protected)*

Send a message in swap chat.

```json
{
  "swapId": "<swapId>",
  "text": "Hey, can we start on Sunday?"
}
```

---

### `GET /chat/:swapId` *(Protected)*

Get chat thread for a swap.

---

## 🛡️ Admin Panel

### `PATCH /admin/skills/:skillId/reject` *(Admin)*

Reject a skill.

---

### `PATCH /admin/users/:userId/ban` *(Admin)*

Ban a user.

---

### `GET /admin/swaps?status=pending` *(Admin)*

Get all swaps by status.

---

### `POST /admin/message` *(Admin)*

Send global announcement.

```json
{
  "title": "New Feature!",
  "body": "We’ve launched the rating system 🚀"
}
```

---

### `GET /admin/analytics` *(Admin)*

Dashboard stats:

```json
{
  "totalUsers": 38,
  "totalSwaps": 94,
  "avgRating": 4.3,
  "swapStatusCount": {
    "pending": 12,
    "confirmed": 20
  },
  "topSkills": [{ "_id": "Figma", "count": 6 }]
}
```

---

### `GET /admin/report/:type` *(Admin)*

Download CSV report.
Allowed types:

* `users`
* `swaps`
* `feedback`

---

## 🛠️ Badges

*Badges are auto-assigned based on swap count or ratings*:

* **Beginner**: 0–2 swaps
* **Starter**: 3–5 swaps
* **Professional**: 6–9 swaps
* **Expert**: 10+ swaps
