import { ImageResponse } from 'next/og';
import { projects, personalInfo } from '@/data/portfolio';

export const runtime = 'nodejs';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  const title = project ? project.title : personalInfo.name;
  const tagline = project ? project.tagline : personalInfo.tagline;
  const category = project
    ? project.categoryLabel || (project.category === 'frontend' ? 'Frontend Craft' : 'MERN Stack Projects')
    : 'Selected Work';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          backgroundColor: '#08090D',
          backgroundImage:
            'radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.25) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)',
          color: '#FFFFFF',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(99, 102, 241, 0.25)',
                border: '1.5px solid rgba(99, 102, 241, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: '800',
                color: '#A5B4FC',
              }}
            >
              {personalInfo.initials}
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#F8FAFC' }}>
              {personalInfo.name}
            </div>
          </div>
          <div
            style={{
              padding: '8px 20px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '16px',
              fontWeight: '600',
              color: '#818CF8',
            }}
          >
            {category}
          </div>
        </div>

        {/* Center Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: '900',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#FFFFFF',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#94A3B8',
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            {tagline}
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
            fontSize: '18px',
            color: '#64748B',
          }}
        >
          <div>Case Study &amp; Technical Breakdown</div>
          <div>ayush-portfolio.dev</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
