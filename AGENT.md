# AGENT.md - NNB-Front

## Project Overview
**NNB-Front** (Node Notebook Frontend) is a web-based learning platform for Node.js. It aims to provide a "notebook" experience (similar to Jupyter or VS Code `.nnb` files) in the browser, allowing users to learn JavaScript/Node.js without local installation.

The project is based on the [JS-Introduction-Notebook](file:///d:/Documents/JS-Introduction-Notebook) project.

## Primary Goals
1. **Interactive Learning**: Users can read educational content (Markdown) and interact with code.
2. **In-Browser Execution**: Provide a way to edit and run Node.js code blocks directly in the browser and see real-time output.
3. **Notebook Structure**: Implement a multi-part tutorial based on existing `.nnb` files, starting with "Basic Syntax".

## Tech Stack
- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Markdown Rendering**: `react-markdown` (or similar)
- **Code Editor**: `monaco-editor` or `react-simple-code-editor`
- **Code Execution**: [WebContainer API](https://webcontainers.io/) (for full Node.js support) or a safe `eval()`-based sandbox for basic syntax.

## Development Rules
- **Aesthetics**: Premium, modern design. Use glassmorphism and smooth transitions.
- **Components**: Use shadcn/ui for UI elements.
- **State Management**: React hooks (Context/State) for notebook progress and execution results.
- **Responsiveness**: Ensure the notebook is usable on both desktop and mobile.

## Workflow for AI Agent
- Always prioritize the user's learning path.
- When implementing a new part of the notebook, ensure it matches the source `.nnb` file accurately.
- Keep the `AGENT.md` updated as the project evolves.
