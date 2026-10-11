export default function StoryBridge() {
  return <section className="story-bridge" aria-label="From idea to impact" data-beat="0">
    <div className="story-bridge-frame">
      <div className="story-orbit" aria-hidden="true"><span /><span /><span /></div>
      <div className="story-copy">
        <p className="mono-label mb-8">One person. The whole picture.</p>
        <h2 className="font-wide font-extrabold uppercase">
          <span className="story-beat" data-index="0">First, a <em>spark.</em></span>
          <span className="story-beat" data-index="1">Then, the <em>craft.</em></span>
          <span className="story-beat" data-index="2">Finally, <em>impact.</em></span>
        </h2>
        <p className="story-note">Strategy, design, code, and growth.<br />Connected from the very beginning.</p>
      </div>
      <div className="story-coordinate mono-label" aria-hidden="true">01 — 02 / Turning ideas into outcomes</div>
    </div>
  </section>;
}
