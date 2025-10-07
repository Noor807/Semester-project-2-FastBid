# ⚡ FastBid – Auction Platform  

![Project Screenshot](https://github.com/user-attachments/assets/e445f5a0-a17d-4b34-b285-d9459775a9fe)  

---

## 🎯 Goal  

To showcase the skills learned over the past three semesters by developing a **fully functional auction website** with authentication, CRUD functionality, and API integration.  

---

## 🌍 FastBid Overview  

**FastBid** is an auction platform where users can:  

- List items for bidding  
- Place bids on other users’ listings  
- Start with **1000 credits** to use for bidding or earn by selling items  

The platform is:  
✔️ User-friendly  
✔️ Accessible  
✔️ Fully responsive  

This project was developed as part of **Semester Project 2 at Noroff**, demonstrating **front-end development with API integration**.  

---

## 🛠️ Tech Stack  

<p align="center">

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)  
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)  
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)  
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)  
[![REST API](https://img.shields.io/badge/REST%20API-4CAF50?style=for-the-badge)](https://docs.noroff.dev/docs/v2/auction-house/listings)

</p>


---

## ✨ Features  

### 🔑 User Authentication  
- Secure login & registration (restricted to `stud.noroff.no` email accounts)  
- Login/logout functionality  

### 📦 Listing Management  
- Create, Read, Update, and Delete (CRUD) listings  
- Add descriptions, media, and deadlines  

### 💰 Bidding System  
- Place bids, view highest bid & total bids  
- Bid history with avatars and usernames  
- Prevents self-bidding  

### 👤 User Profiles  
- View seller information  
- Display bid history  

### 👀 Non-Users  
- Can browse listings & single listings but **cannot place bids**  

### 🛠️ Dynamic UI Elements  
- 🔎 **Search bar** for filtering listings  
- 🏷️ **Tag bar** for categories  
- 🔄 Different views for logged-in and logged-out users  
- 📱 **Responsive design** for all screen sizes  

### ⚙️ Admin Functionality  
- Secure profile editing and listing management  

### ♿ Accessibility  
- Semantic HTML for screen readers  
- WCAG contrast checks using **WAVE**  
- Responsive UI optimized for all devices  

---

## 🚀 Setup & Installation  

 
### 🔹 Clone Repository 


To get a copy of this project, you can **clone** or **fork** the repository:

```bash
https://github.com/Noor807/Semester-project-2-FastBid.git
```

Alternatively, download the ZIP file and extract it.

### 🔹 Install Dependencies

```bash
npm install
```

> **Installed dependencies:**
>
> - Tailwind
> - Vite

### 🔹 Run the Development Server

```bash
npm run dev
```

---

### Environment Variables

This project requires an **API key** for restricted actions.

1. Get your API key from [Noroff API Key Tool](https://docs.noroff.dev/docs/v2/auth/api-key#api-key-tool).
2. Create a `.env` file in the root directory.
3. Add the following line:

```bash
VITE_API_KEY=<your_api_key>
```

Replace `<your_api_key>` with the actual API key.

4. Add `.env` in `.gitignore` to stop it from being pushed publicly.

---

## API Reference

This project interacts with the **Noroff Auction House API**, which provides endpoints for managing auction listings.  
For detailed documentation, visit: [Noroff Auction House API](https://docs.noroff.dev/docs/v2/auction-house/listings).


### Base URL:
```
https://api.noroff.dev/api/v2
``` 
⚠️ Some of the endpoints requires authenticated keys to use.
Read more in the link above about which requires authentication and more on url parameters.

-------------

## 📐 Project Overview  

- 🎨 **Style Guide (Figma):** [View here](https://www.figma.com/design/P8weVmQxqUT9icjv6VSS6D/Untitled?node-id=133-90&p=f&t=nSyFys9EUMC8aSfJ-0)  
- 🎨 **Design (Figma):** [View here](https://www.figma.com/design/P8weVmQxqUT9icjv6VSS6D/Untitled?node-id=117-182&t=qOna8GC5meNuaSMI-1)  
- 💻 **GitHub Repository:** [Semester Project 2 – FastBid](https://github.com/Noor807/Semester-project-2-FastBid)  
- 🌐 **Live Website (Netlify):** [Visit FastBid](https://2fast2bid.netlify.app)  

---

## 📬 Contact  

- 🐙 **GitHub:** [Noor807](https://github.com/Noor807)  


















 


 
