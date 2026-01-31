# BIG STEPPERS CLUB

Modern streetwear e-commerce platform built with Next.js, Tailwind CSS, and Prisma.

## 🚀 Getting Started

It seems Node.js is not currently available in your environment. To run this project, you need to have Node.js installed.

### 1. Install Node.js
Download and install the latest LTS version of Node.js from [nodejs.org](https://nodejs.org/).

### 2. Install Dependencies
Open your terminal (Command Prompt or PowerShell) in this project folder and run:
```bash
npm install
```

### 3. Setup Database
This project uses a local SQLite database. Initialize it with:
```bash
npx prisma db push
```

(Optional) Populate with sample data:
```bash
npx prisma db seed
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠 Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: SQLite (via Prisma ORM)
- **Icons**: Lucide React

## 📁 Project Structure
- `src/app`: Pages and layouts
- `src/components`: Reusable UI components
- `src/lib`: Utilities (Database client)
- `prisma`: Database schema and seed data
