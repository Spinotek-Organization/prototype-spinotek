# Implementation Plan: BDC Static Prototype

This plan outlines the steps to build a static web prototype for Bali Discount Club (BDC) using HTML, Tailwind CSS, and JavaScript. This prototype will simulate the core workflows for Customers, Merchants, and Admins to validate the concept for foreign users (expats/tourists).

## 🧭 Overview
Build a single unified dashboard page that can switch roles (view-switching) to demonstrate the premium experience of the BDC platform without complex backend infrastructure in the early stages.

**Language Configuration**: English (Targeting "Bule" audience).

## 🔑 Core Deliverables

### 1. 🎨 Design System (Tailwind)
*   Using Tailwind CSS CDN for rapid prototyping.
*   **Palette**: Dark mode with neon/emerald green accents for an exclusive & modern feel.
*   **Font**: Inter/Outfit from Google Fonts.
*   **Icons**: Lucide Icons for minimalist aesthetics.

### 2. 🏠 Frontend Architecture
*   **Single File Dashboard** (`dashboard.html`): Using Vanilla JS to manage state (tab switching).
*   **Persistent Layout**: Sidebar navigation to switch between Customer, Merchant, and Admin views.

### 3. 👥 User View Implementation

#### Customer View
*   **Member Card**: Digital discount card with a refreshable QR Code.
*   **Savings Tracker**: Large $ numerical widget motivating savings.
*   **Merchant Directory**: Searchable and filterable grid list (Cafe, Spa, Activity).

#### Merchant View
*   **Scanner Mockup**: Simulated camera interface to verify QR codes.
*   **Transaction Form**: Rapid input form for total spending and automatic discount preview.

#### Admin View
*   **Analytics Graph**: Dummy behavior analytics data visualization using SVG or simple CSS bars.
*   **User Stats**: Counter for active users and simulated total revenue.

## 🛠️ Step-by-Step Implementation

| Step | Task | Description |
| :--- | :--- | :--- |
| **1** | **Base Scaffold** | Create `index.html` and `dashboard.html` with Tailwind & Fonts boilerplate. |
| **2** | **Navigation Logic** | Implement simple JS logic to switch between views (Cust/Merc/Admin). |
| **3** | **UI Components** | Build Member Card, Savings Widget, and Merchant Cards. |
| **4** | **Scanning Flow** | Create "Scan Success" pop-up animations for merchant simulation. |
| **5** | **Polish & PWA** | Add manifest file for mobile "Install" capability during demo. |

## 📐 Success Metrics for Prototype
*   **Speed**: Instant loading (static).
*   **Feel**: Interface feels responsive and "alive" with micro-animations.
*   **Clarity**: Users understand the QR scan workflow and how to view savings.

---

> [!TIP]
> I will use **Tailwind CSS Utility First** to ensure the design feels premium without writing extensive manual CSS.

> [!IMPORTANT]
> **Language**: All interface text and mock data will be in **English**.
