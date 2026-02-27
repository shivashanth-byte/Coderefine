# CodeRefine AI

This is a Next.js application powered by Firebase and Genkit, designed to provide AI-driven code reviews and optimisations.

## Features

- **AI Code Review**: Get feedback on bugs, security, and best practices.
- **Code Optimisation**: Automatically refactor snippets for better performance.
- **History**: Keep track of your previous reviews.
- **Profile**: Monitor your progress and "Language Mastery" stats.
- **Theme Support**: Full dark and light mode toggle.

## Hosting on Firebase App Hosting

This app is optimized for deployment via **Firebase App Hosting**.

### Prerequisites
- A GitHub repository containing this code.
- A Firebase Project.

### First-Time Git Setup (Fixing "Nothing to commit")

If you are seeing "nothing to commit" or having trouble pushing, follow these exact steps:

1. **Check your folder**: Run `ls` in your terminal. You should see `package.json` and `src`. If you don't, you need to `cd` into the correct project folder.
2. **Force Re-initialize Git**:
   ```bash
   rm -rf .git
   git init
   ```
3. **Stage all files**: (This tells Git to pay attention to your code)
   ```bash
   git add -A
   ```
4. **Verify staging**:
   ```bash
   git status
   ```
   *You should now see many files listed in GREEN.*
5. **Commit the files**:
   ```bash
   git commit -m "Initial commit of CodeRefine AI"
   ```
6. **Connect to GitHub**:
   ```bash
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git push -u origin main
   ```

### Connecting to Firebase

1. Navigate to your project in the [Firebase Console](https://console.firebase.google.com/).
2. Select **Build > App Hosting** from the sidebar.
3. Click **Get Started** and connect your GitHub repository.
4. Follow the prompts to configure your rollout.

### Environment Variables
- In the App Hosting dashboard, navigate to your backend settings.
- Add any necessary secrets or environment variables (e.g., `GOOGLE_GENAI_API_KEY`).

## Development

To run the development server locally:

```bash
npm run dev
```