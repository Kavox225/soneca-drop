import Link from "next/link";

export default function NeonHero({
  primaryCtaHref = "/",
  secondaryCtaHref = "#drops",
}) {
  return (
    <section className="soneca-hero">
      <div className="soneca-hero__inner">
        {/* Left */}
        <div>
          <h1 className="neon-title">
            <span className="neon-title__line">
              <span className="neon-word neon-word--cyan">
                SONECA{" "}
                <span className="broken-letter" aria-hidden="true">
                  D
                </span>
                ROPS
              </span>
            </span>
            <span className="neon-title__line">
              <span className="neon-word neon-word--pink">DROPS</span>
            </span>
          </h1>

          <p className="soneca-subtitle">
            <strong style={{ color: "rgba(255,255,255,0.92)" }}>
              86+ Specialty Coffee.
            </strong>{" "}
            Priced like supermarket trash.
          </p>

          <div className="soneca-ctaRow">
            <Link href={primaryCtaHref}>
              <a className="neon-btn neon-btn--primary">
                Shop the drops
              </a>
            </Link>
            <a href={secondaryCtaHref} className="neon-btn neon-btn--ghost">
              See what's inside
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="hero-card3d" aria-label="Drop highlight card">
          <div className="hero-card3d__glowline" />

          <div className="hero-card3d__inner">
            <div className="hero-card3d__badgeRow">
              <span className="hero-chip">
                <span className="hero-chip__dot" />
                Ultra limited drops
              </span>
              <span className="hero-chip">
                <span
                  className="hero-chip__dot"
                  style={{
                    background: "var(--neon-pink)",
                    boxShadow: "0 0 16px rgba(255,61,242,0.55)",
                  }}
                />
                Roasted in France
              </span>
              <span className="hero-chip">
                <span
                  className="hero-chip__dot"
                  style={{
                    background: "var(--acid-yellow)",
                    boxShadow: "0 0 16px rgba(255,233,92,0.55)",
                  }}
                />
                250g bags
              </span>
            </div>

            {/* Pack mock (SVG in /public/assets) */}
            <img
              className="hero-pack"
              src="/assets/pack-mock.svg"
              alt="SONECA DROPS pack mock"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
