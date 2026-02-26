export default function Home() {
  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <header className="glass glass-hover max-w-6xl mx-auto p-6 mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          AI Dev Tools Tracker
        </h1>
        <p className="text-center text-text-secondary mt-2">
          Track the latest updates from Antigravity, Cursor, Warp, and Claude Code
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto">
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Antigravity Card */}
          <div className="glass glass-hover p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-antigravity)] flex items-center justify-center text-xl font-bold">
                A
              </div>
              <div>
                <h2 className="text-xl font-bold">Antigravity</h2>
                <p className="text-sm text-text-secondary">Google AI IDE</p>
              </div>
            </div>
            <p className="text-text-secondary">
              AI-powered integrated development environment by Google
            </p>
          </div>

          {/* Cursor Card */}
          <div className="glass glass-hover p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-cursor)] flex items-center justify-center text-xl font-bold">
                C
              </div>
              <div>
                <h2 className="text-xl font-bold">Cursor</h2>
                <p className="text-sm text-text-secondary">AI Code Editor</p>
              </div>
            </div>
            <p className="text-text-secondary">
              AI-first code editor with powerful agent capabilities
            </p>
          </div>

          {/* Warp Card */}
          <div className="glass glass-hover p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-warp)] flex items-center justify-center text-xl font-bold">
                W
              </div>
              <div>
                <h2 className="text-xl font-bold">Warp</h2>
                <p className="text-sm text-text-secondary">Agentic Terminal</p>
              </div>
            </div>
            <p className="text-text-secondary">
              The agentic development environment built for AI workflows
            </p>
          </div>

          {/* Claude Code Card */}
          <div className="glass glass-hover p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-claude)] flex items-center justify-center text-xl font-bold">
                C
              </div>
              <div>
                <h2 className="text-xl font-bold">Claude Code</h2>
                <p className="text-sm text-text-secondary">AI Terminal Tool</p>
              </div>
            </div>
            <p className="text-text-secondary">
              Agentic coding tool by Anthropic that lives in your terminal
            </p>
          </div>
        </div>

        {/* Status Banner */}
        <div className="glass p-6 mt-8 text-center">
          <p className="text-text-secondary">
            🚧 Coming Soon: Real-time updates tracking every 24 hours
          </p>
        </div>
      </main>
    </div>
  );
}
