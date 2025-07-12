![branch-mate](https://socialify.git.ci/muraterennar/branch-mate/image?language=1&name=1&owner=1&theme=Light)

<h1 align="center">🌿 BranchMate</h1>

<p align="center">
  <strong>AI-Powered Git Branch Name & Commit Message Generator</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-19-red?style=for-the-badge&logo=angular" alt="Angular 19">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/.NET_Core-9.0-512BD4?style=for-the-badge&logo=dotnet" alt=".NET Core">
  <img src="https://img.shields.io/badge/Gemini-2.0_Flash-4285F4?style=for-the-badge&logo=google" alt="Gemini AI">
</p>

<h2>🚀 Demo</h2>

[https://branch-mate.vercel.app/](https://branch-mate.vercel.app/)

<h2>✨ Features</h2>

- 🤖 **AI-Powered Generation**: Uses Google Gemini 2.0 Flash for intelligent suggestions
- 🎯 **Professional Standards**: Follows GitHub best practices for naming
- 🎨 **Beautiful UI**: Modern design with smooth animations
- 📱 **Responsive Design**: Works perfectly on all devices
- ⚡ **Real-time Generation**: Instant AI-powered suggestions
- 🌙 **Dark Mode**: Eye-friendly dark theme support

<h2>🛠️ Installation Steps</h2>

<p>1. Clone the repository</p>

```bash
git clone https://github.com/muraterennar/branch-mate.git
cd branch-mate
```

<p>2. Install dependencies</p>

```bash
npm install
```

<p>3. Configure environment</p>

```bash
# Copy environment template
cp src/environments/environment.ts src/environments/environment.local.ts

```bash
# Edit environment.local.ts and add your API configuration
# API_BASE_URL: 'https://localhost:5001'  # .NET Core API URL
```
```

<p>4. Start the application</p>

```bash
npm run start
```


The API will be available at `https://localhost:5001` or `http://localhost:5000`


<h2>💻 Built with</h2>

### Frontend Technologies

- **Angular 19** - Modern web framework
- **TypeScript 5.0** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **RxJS** - Reactive programming library
- **SCSS** - Enhanced CSS with animations

### Backend Technologies

- **.NET Core 9.0** - Cross-platform web framework
- **ASP.NET Core Web API** - RESTful API framework
- **C#** - Type-safe programming language
- **HttpClient** - HTTP communication
- **Google Gemini 2.0 Flash** - AI language model

### Development Tools

- **Angular CLI** - Project scaffolding
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vercel** - Frontend deployment
- **.NET CLI** - Backend development tools
- **Swagger UI** - API documentation
- **Visual Studio/VS Code** - Development environment

<h2>📁 Project Structure</h2>

```
branch-mate/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── generate-info/          # Main form component
│   │   ├── core/
│   │   │   ├── components/
│   │   │   │   ├── ai/                 # AI button component
│   │   │   │   └── custom-button/      # Reusable button
│   │   │   ├── services/
│   │   │   │   ├── ai.service.ts       # AI API integration
│   │   │   │   ├── git.service.ts      # Git operations
│   │   │   │   └── theme.service.ts    # Theme management
│   │   │   └── models/
│   │   │       └── branch-data.ts      # Data models
│   │   └── environments/               # Environment configs
│   └── styles/                         # Global styles
```

<h2>🌟 Contributing</h2>

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<h2>📝 Environment Configuration</h2>

### Frontend (.env)

```env
API_BASE_URL=https://localhost:5001
```

<h2>🚀 Deployment</h2>

### Frontend (Vercel)

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```


<h2>📊 Performance</h2>

- ⚡ **Fast Response Times**: AI generation in ~2-3 seconds
- 📱 **Mobile Optimized**: Responsive design for all devices
- 🎨 **Smooth Animations**: 60fps UI interactions

<h2>🛡️ License</h2>

This project is licensed under the MIT License - see the [LICENSE](https://github.com/muraterennar/branch-mate/blob/prod/LICENSE) file for details.

<h2>👨‍💻 Author</h2>

**Murat Eren Nar**

- GitHub: [@muraterennar](https://github.com/muraterennar)
- LinkedIn: [muraterennar](https://linkedin.com/in/muraterennar)

<h2>⭐ Show your support</h2>

Give a ⭐️ if this project helped you!

---

<p align="center">Made with ❤️ for the developer community</p>