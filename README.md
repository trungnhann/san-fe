# San Blog - Frontend

San Blog is a modern, full-stack blog and social platform built with Next.js 16, TypeScript, and Tailwind CSS. It features a sleek UI with dark mode support, user authentication, profile management, and blog post functionality.

## 🚀 Features

*   **Authentication**: Secure login, registration, and OTP verification flows.
*   **User Profiles**: comprehensive profile management with avatar uploads and bio editing.
*   **Blog Posts**: View, create, and manage blog posts with a rich reading experience.
*   **Modern UI**: Built with Tailwind CSS v4 and Radix UI primitives for accessible, high-performance components.
*   **Dark Mode**: Fully supported light/dark theme toggle.
*   **Responsive Design**: Mobile-first approach ensuring a great experience on all devices.
*   **Portfolio/About Page**: Dedicated "About Me" section showcasing professional experience and projects.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
*   **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) Validation
*   **State Management**: React Context (Auth)
*   **API Client**: Custom fetch wrapper with interceptors for token handling.

## 📦 Getting Started

### Prerequisites

*   Node.js 18+ (LTS recommended)
*   npm or yarn or pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/san-fe.git
    cd san-fe
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  Set up environment variables:
    Create a `.env.local` file in the root directory and add the following:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:80/api/v1
    ```
    *Note: Adjust the API URL if your backend is running on a different port.*

4.  Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
san-fe/
├── public/              # Static assets (images, icons)
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── (auth)/      # Authentication routes (login, register)
│   │   ├── about/       # About page
│   │   ├── profile/     # User profile page
│   │   └── page.tsx     # Home page
│   ├── components/      # Reusable UI components
│   │   ├── layout/      # Header, Footer
│   │   └── ui/          # Base UI components (Button, Input, Card, etc.)
│   ├── context/         # React Context (AuthContext)
│   ├── lib/             # Utilities and API client
│   └── services/        # API service layer (Auth, Post, User)
├── .env.local           # Environment variables (create this)
├── next.config.ts       # Next.js configuration
├── package.json         # Project dependencies and scripts

```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
