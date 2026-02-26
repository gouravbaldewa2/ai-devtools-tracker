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

        {/* CTA Section */}
        <div className="glass p-8 mt-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Track Updates in Real-Time</h2>
          <p className="text-text-secondary mb-6">
            Get the latest updates from all four AI development tools in one place.
            Automated tracking every 24 hours.
          </p>
          <a
            href="/updates"
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-400/50 transition-all"
          >
            View All Updates
          </a>
        </div>
      </main>
    </div>
  );
}
