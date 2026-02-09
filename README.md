Here is a concise and detailed README for your **HackConnect** frontend, structured to showcase the technical stack and features while providing clear placeholders for your images.

---

# 🚀 HackConnect: Find Your Dream Team

HackConnect is a modern full-stack platform designed to help students and developers find the perfect teammates for hackathons. It streamlines the collaboration process by matching skills, interests, and project goals.

---

### 📷 Preview
<img width="1900" height="860" alt="Screenshot 2026-02-09 121427" src="https://github.com/user-attachments/assets/ef096cce-ff7a-4380-84f0-01fee65e56a7" />
<img width="1894" height="858" alt="Screenshot 2026-02-09 121656" src="https://github.com/user-attachments/assets/52cabb03-e8fc-49f7-ba8d-a716890faaa4" />
<img width="1905" height="865" alt="Screenshot 2026-02-09 121634" src="https://github.com/user-attachments/assets/85cb61b1-1f22-4995-ab0e-22ae0b68969a" />
<img width="1880" height="861" alt="Screenshot 2026-02-09 121747" src="https://github.com/user-attachments/assets/1e4a670e-a657-45ff-96af-5d62b718c97b" />
<img width="1886" height="858" alt="Screenshot 2026-02-09 121726" src="https://github.com/user-attachments/assets/e6471078-e100-4645-97c2-0f36d2fe8641" />
<img width="1893" height="866" alt="Screenshot 2026-02-09 121559" src="https://github.com/user-attachments/assets/aecc642d-4ee8-477a-b9fc-5ff982fc0538" />



### ✨ Key Features

* **Intelligent Recommendations**: Discover potential teammates based on skill compatibility.
* **Interactive 3D Elements**: Enhanced UI/UX using `Three.js` and `React Three Fiber`.
* **Real-time Communication**: Integrated chat system powered by `Socket.io`.
* **Hackathon Management**: Browse, create, and manage hackathon listings seamlessly.
* **Dynamic Animations**: Smooth transitions and effects powered by `GSAP`.

---

### 🛠️ Tech Stack

* **Frontend**: React.js (v18.3)
* **Styling**: Tailwind CSS & Lucide Icons
* **State & Routing**: React Router DOM (v7.7)
* **3D Graphics**: Three.js & React Three Fiber
* **API Client**: Axios
* **Real-time**: Socket.io-client

---

### 🖼️ UI Walkthrough

| Dashboard | Team Recommendations |
| --- | --- |
|  |  |
| *Browse available events* | *Find compatible members* |

---

### 🚀 Getting Started

1. **Clone the repository**:
```bash
git clone <your-repo-url>
cd hackconnect-frontend

```


2. **Install dependencies**:
```bash
npm install

```


3. **Environment Setup**:
Create a `.env` file in the root directory and add your backend URL:
```env
REACT_APP_API_URL=http://localhost:5000

```


4. **Run the application**:
```bash
npm start

```



---
### 📁 Project Structure Highlights

* `/src/components`: Reusable UI elements like `StudentCard` and `Robot3D`.
* `/src/pages`: Main view logic (Auth, Team Maker, Hackathon Details).
* `/src/services`: API abstraction layers for Auth, Chat, and Hackathons.
* `/src/contexts`: Global state management for user authentication.
