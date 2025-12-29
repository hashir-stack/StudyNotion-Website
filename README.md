📘 StudyNotion Website
A MERN stack learning platform that allows students to register, log in, purchase courses, and access additional features. Built with React + Vite for the frontend, Node.js/Express for the backend, and MongoDB for data persistence. Deployed on Vercel for seamless hosting.
🌐 Live Demo: study-notion-website-ruby.vercel.app

🚀 Features

- User Authentication: Register, log in, and manage profiles securely.
- Course Management: Browse, purchase, and access courses.
- Payment Gateway Integration:
- Integrated with Razorpay for secure course purchases.
- Backend generates Razorpay orders, frontend triggers checkout, and successful payments grant course access.
- Supports both test mode and live mode keys.
- Instructor Dashboard:
- Instructors can log in and create new courses.
- Manage course details, pricing, and content.
- Provides a streamlined interface for course creators.
- Analytics Dashboard for Instructors:
- Track student enrollments, revenue, and course performance.
- Visual insights into engagement and sales trends.
- Helps instructors optimize their teaching and marketing strategies.
- Responsive UI: Built with modern React and Tailwind CSS for cross-device compatibility.
- Backend APIs: Express controllers for handling authentication, courses, payments, and instructor workflows.
- Deployment Ready: Configured with vercel.json for cloud hosting.

📂 Project Structure
StudyNotion-Website/
│── public/              # Static assets
│── server/              # Backend (Express + MongoDB + Razorpay)
│── src/                 # Frontend (React + Vite + Razorpay checkout + Instructor & Analytics dashboards)
│── index.html           # Entry point
│── package.json         # Dependencies
│── vite.config.js       # Vite configuration
│── vercel.json          # Deployment configuration

⚙️ Installation & Setup
- Clone the repository
git clone https://github.com/hashir-stack/StudyNotion-Website.git
cd StudyNotion-Website
- Install dependencies
npm install
- Setup environment variables
- Create a .env file in the server/ directory.
- Add MongoDB connection string, JWT secret, and Razorpay keys:
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_SECRET=your_secret
- Run the development server
npm run dev

📦 Deployment
- Configured for Vercel using vercel.json.
- Ensure environment variables (including Razorpay keys) are set in Vercel dashboard before deployment.

🔮 Future Improvements
- Enhanced SEO optimization.
- Real-time chat support for students.
- Advanced analytics with AI-driven insights.

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

📜 License
This project is licensed under the MIT License.

