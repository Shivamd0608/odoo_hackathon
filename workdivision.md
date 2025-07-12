## 👥 Team Members

| Member | Role                |
| ------ | ------------------- |
| You    | Backend + Team Lead |
| Dev 1  | Frontend Developer  |
| Dev 2  | Frontend Developer  |
| Dev 3  | UI Designer         |

---

## ⏰ Overall Time Breakdown (Total: 5 Hours)

| Phase               | Time         | Focus                                             |
| ------------------- | ------------ | ------------------------------------------------- |
| ⏳ Planning & Setup  | 0 – 0.5 hr   | Architecture, task division, boilerplate setup    |
| 🚀 Core Development | 0.5 – 3.5 hr | Core features: profile, swap, explore, chat, auth |
| 🎨 UI & Integration | 3.5 – 4.5 hr | UI linking, polish, validations, responsiveness   |
| ✅ Testing & Deploy  | 4.5 – 5 hr   | Testing flows, resolving bugs, deploy & demo prep |

---

## 📦 Task Division with Timeline

### 🔴 **YOU – Backend + Lead (Node + Express + MongoDB)**

#### 0 – 0.5 hr

* Setup project repo with folders: `routes`, `controllers`, `models`
* Configure MongoDB Atlas
* Setup Express server and auth middleware

#### 0.5 – 3.5 hr

* Create models: `User`, `Skill`, `SwapRequest`, `Message`, `Feedback`
* Setup routes:

  * `/auth/login`, `/auth/register`
  * `/profile`, `/skills`
  * `/swap/send`, `/swap/update`, `/swap/deliver`, `/swap/confirm`
  * `/chat/send`, `/chat/:swapId`
  * `/feedback`
  * (optional) `/friends/add`

#### 3.5 – 4.5 hr

* Add validations (Joi or custom)
* Central error handling
* Test all endpoints with Postman

#### 4.5 – 5 hr

* Deploy on Railway/Render
* Help frontend with any last-minute integration

---

### 🟢 **Frontend Dev 1 – Auth + Dashboard + Profile**

#### 0 – 0.5 hr

* Setup Vite + Tailwind
* Setup folder structure: `components`, `pages`, `utils`

#### 0.5 – 3.5 hr

* Auth pages: Login, Register
* Profile Page:

  * Form (photo, name, skills, availability)
  * Skill tags with type selector (offered/wanted)
* Dashboard layout (sidebar + route switching)

#### 3.5 – 4.5 hr

* Form validations
* Responsive layout (mobile & desktop)
* Save profile to backend

#### 4.5 – 5 hr

* Test login > profile > explore > swap flow

---

### 🟢 **Frontend Dev 2 – Explore + Swap Flow + Chat**

#### 0 – 0.5 hr

* Help with Tailwind layout setup
* Plan reusable components (UserCard, SkillTag, Modal)

#### 0.5 – 3.5 hr

* Explore Page:

  * Skill-based search
  * Profile Card + click → detailed profile
* Request Swap Modal:

  * Select offered + requested skill
* Swap Dashboard:

  * Sent & received requests
  * Accept / Reject / Cancel
* Chat UI (mock or real-time)

  * Per-swap chat with user ID matching

#### 3.5 – 4.5 hr

* Add delivery confirmation toggles
* Add rating modal after confirmation

#### 4.5 – 5 hr

* End-to-end testing of chat & swap flow

---

### 🔵 **UI Designer – Figma + Assets + Integration Support**

#### 0 – 0.5 hr

* Design wireframes for:

  * Landing, Login, Profile, Explore, Swap Request Modal
* Share Figma or PNGs to frontend team

#### 0.5 – 3.5 hr

* Add visual assets:

  * Icons (stars, chat, profile photos)
  * Dark/light theme suggestions
* Deliver responsive variations
* UI feedback to frontend

#### 3.5 – 4.5 hr

* Support with spacing, alignments, typography
* Optimize color contrast and usability

#### 4.5 – 5 hr

* Final design review & tweaks for demo polish

---

## ✅ MVP Checklist by 4th Hour

| Feature                   | Status |
| ------------------------- | ------ |
| Auth                      | ✅      |
| Create Profile            | ✅      |
| Add Skills                | ✅      |
| Browse/Search Profiles    | ✅      |
| Request Skill Swap        | ✅      |
| Accept/Reject/Cancel Swap | ✅      |
| Messaging per swap        | ✅      |
| Delivery Tracking         | ✅      |
| Feedback/Ratings          | ✅      |
| Responsive UI             | ✅      |
| Deployment                | ✅      |

---