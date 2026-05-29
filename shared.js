/* Shared Nav, Social Sidebar, Footer for NTUTEC site */
const { useState, useEffect, useRef } = React;

/* ── Lucide icon wrapper (requires lucide-react UMD loaded before this file) ── */
function Icon({ name, size = 24, color = 'currentColor', strokeWidth = 1.5, style = {} }) {
  const LucideIcon = (typeof LucideReact !== 'undefined') ? LucideReact[name] : null;
  if (!LucideIcon) return null;
  return React.createElement(LucideIcon, { size, color, strokeWidth, style });
}

/* ── Inject mobile-safe CSS for shared components ── */
(function() {
  if (document.getElementById('shared-mobile-css')) return;
  const s = document.createElement('style');
  s.id = 'shared-mobile-css';
  s.textContent = `
    html { overflow-x: hidden; max-width: 100vw; scroll-behavior: smooth; }
    body { overflow-x: hidden; max-width: 100vw; }
    .shared-desktop-nav { display: flex !important; }
    .shared-hamburger { display: none !important; }
    @media (max-width: 768px) {
      .shared-desktop-nav { display: none !important; }
      .shared-hamburger { display: flex !important; }
    }
    .shared-drawer-overlay {
      position: fixed; inset: 0; z-index: 400;
      background: rgba(20,36,60,0.55); backdrop-filter: blur(4px);
      animation: sharedFadeIn 0.2s ease both;
    }
    .shared-drawer-panel {
      position: absolute; top: 0; right: 0; bottom: 0;
      width: min(340px, 88vw);
      background: #FAFAF8;
      display: flex; flex-direction: column;
      animation: sharedSlideIn 0.3s cubic-bezier(0.22,1,0.36,1) both;
      overflow-y: auto;
    }
    @keyframes sharedFadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes sharedSlideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
  `;
  document.head.appendChild(s);
})();

/* ── useIsMobile hook ── */
function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= bp : false);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth <= bp);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, [bp]);
  return mobile;
}

/* ── Shared social links ── */
const SHARED_SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/NTUTEC/', icon: <Icon name="Facebook" size={16} /> },
  { name: 'Instagram', href: '#', icon: <Icon name="Instagram" size={16} /> },
  { name: 'YouTube', href: '#', icon: <Icon name="Youtube" size={16} /> },
  { name: 'LinkedIn', href: '#', icon: <Icon name="Linkedin" size={16} /> },
];

/* ── NAV with mega menu ── */
const SHARED_MEGA = {
  '輔導計畫': {
    href: 'accelerator.html',
    featured: { label: '新創輔導計畫總覽', desc: '從孵化到加速，提供最完整的創業支援體系。', href: 'accelerator.html' },
    cols: [
      { heading: '計畫', links: [
        { label: '台大加速器', desc: '10 個月深度輔導，規模化驗證基地', href: 'accelerator.html' },
        { label: '台大車庫', desc: '早期孵化，從 0 到 1 的產品打造', href: 'garage.html' },
      ]},
      { heading: '資源', links: [
        { label: '代表校友', desc: '600+ 校友新創的精選成果', href: 'alumni.html' },
        { label: '歷屆輔導團隊', desc: '2026 年度全部新創名單', href: 'startups.html' },
      ]},
    ],
  },
  '企業合作': {
    href: 'corporate-partners.html',
    featured: { label: '企業合作方案', desc: '接軌新創生態圈，賦能企業創新力。', href: 'corporate-partners.html' },
    cols: [
      { heading: '合作模式', links: [
        { label: '合作總覽', desc: '了解所有企業合作方案', href: 'corporate-partners.html' },
        { label: '聯合活動', desc: 'Demo Day、論壇、競賽合辦', href: 'co-events.html' },
        { label: '諮詢服務', desc: '企業創新轉型一對一諮詢', href: 'consulting.html' },
      ]},
    ],
  },
  '台大天使會': {
    href: 'angels.html',
    featured: { label: '台大天使投資俱樂部', desc: '40+ 位天使會員共同佈局早期新創。', href: 'angels.html' },
    cols: [
      { heading: '關於', links: [
        { label: '台大天使會總覽', desc: '40+ 位天使共同佈局早期新創', href: 'angels.html' },
        { label: '申請入會', desc: '成為台大天使投資人', href: 'angel-apply.html' },
      ]},
      { heading: '加入', links: [
        { label: '新創投遞', desc: 'Pitch 你的新創給天使', href: 'pitch.html' },
      ]},
    ],
  },
  '關於我們': {
    href: 'about.html',
    featured: { label: '關於台大創創中心', desc: '從校園出發，引導每一段創業旅程。', href: 'about.html' },
    cols: [
      { heading: '組織', links: [
        { label: '關於 TEC', desc: '使命、願景與 13 年沿革', href: 'about.html' },
        { label: '團隊', desc: '創創中心執行團隊介紹', href: 'team.html' },
      ]},
      { heading: '人才', links: [
        { label: '業師', desc: '150+ 位業界導師陣容', href: 'mentors.html' },
        { label: '加入我們', desc: '職缺與實習機會', href: 'careers.html' },
      ]},
    ],
  },
  '最新動態': {
    href: 'news.html',
    featured: { label: '最新消息', desc: '活動公告、計畫徵件、創創大小事。', href: 'news.html' },
    cols: [
      { heading: '消息', links: [
        { label: '消息', desc: '活動公告與計畫徵件', href: 'news.html' },
        { label: '活動', desc: '近期與歷年活動紀錄', href: 'events.html' },
        { label: 'Demo Day', desc: '成果展示大會', href: 'demo-day.html' },
      ]},
      { heading: '媒體', links: [
        { label: '部落格', desc: '創創觀點與深度文章', href: 'blog.html' },
        { label: 'TEC Talk Podcast', desc: '創業者的對談與分享', href: 'podcast.html' },
      ]},
    ],
  },
};

/* ── Mobile Drawer ── */
function SharedMobileDrawer({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);
  if (!open) return null;
  return (
    <div className="shared-drawer-overlay" onClick={onClose}>
      <div className="shared-drawer-panel" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E0E0DC', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <a href="index.html">
            <img src="uploads/Asset 6NTUTEC C+E.png" alt="NTUTEC" style={{ height: 28, width: 'auto' }} />
          </a>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: '#1A2E4A' }}>
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Nav accordion */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {Object.keys(SHARED_MEGA).map(key => {
            const menu = SHARED_MEGA[key];
            const isOpen = expanded === key;
            const allLinks = menu.cols.flatMap(col => col.links);
            return (
              <div key={key} style={{ borderBottom: '1px solid #E0E0DC' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', cursor: 'pointer' }}
                  onClick={() => setExpanded(isOpen ? null : key)}
                >
                  <a href={menu.href}
                    onClick={e => e.stopPropagation()}
                    style={{ fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 500, color: '#1A2E4A', textDecoration: 'none' }}>
                    {key}
                  </a>
                  <Icon name="ChevronDown" size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
                </div>
                {isOpen && (
                  <div style={{ background: '#F5F5F2', paddingBottom: 8 }}>
                    {allLinks.map((lk, i) => (
                      <a key={i} href={lk.href || '#'}
                        style={{ display: 'block', padding: '10px 36px', fontFamily: 'var(--sans)', fontSize: 14, color: '#1A2E4A', textDecoration: 'none' }}>
                        {lk.label}
                        <span style={{ display: 'block', fontSize: 12, color: '#888884', fontWeight: 300, marginTop: 2 }}>{lk.desc}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Social links */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid #E0E0DC', display: 'flex', gap: 12, flexShrink: 0 }}>
          {SHARED_SOCIAL_LINKS.map(s => (
            <a key={s.name} href={s.href} target="_blank" rel="noreferrer" title={s.name}
              style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A2E4A', border: '1px solid rgba(26,46,74,0.15)', textDecoration: 'none' }}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function SharedNav({ activeKey, alwaysSolid = false }) {
  const [scrolled, setScrolled] = useState(alwaysSolid);
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const navKeys = Object.keys(SHARED_MEGA);

  useEffect(() => {
    if (alwaysSolid) return;
    const h = () => setScrolled(window.scrollY > 60);
    h();
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, [alwaysSolid]);

  // close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const solid = scrolled || !!open;
  const bg = solid ? 'rgba(250,250,248,0.97)' : 'rgba(20,36,60,0.2)';
  const borderCol = solid ? 'var(--rule)' : 'rgba(255,255,255,0.1)';
  const textCol = solid ? 'var(--navy)' : '#fff';
  const activeCol = solid ? 'var(--teal)' : 'var(--mint)';

  return (
    <>
      <div ref={navRef} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300 }}>

        {/* ── Bar ── */}
        <div style={{
          background: bg, backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${open ? 'transparent' : borderCol}`,
          transition: 'background 0.35s, border-color 0.2s',
          height: 64, display: 'flex', alignItems: 'center',
          padding: '0 56px', justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}>
          <a href="index.html" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }}>
            <img src="uploads/Asset 6NTUTEC C+E.png" alt="NTUTEC 臺大創創中心"
              style={{ height: 36, width: 'auto', filter: solid ? 'none' : 'brightness(0) invert(1)', transition: 'filter 0.35s' }} />
          </a>

          {/* Desktop links */}
          <div className="shared-desktop-nav" style={{ alignItems: 'center', gap: 0, height: 64 }}>
            {navKeys.map(key => {
              const isOpen = key === open;
              return (
                <button key={key}
                  onClick={() => setOpen(isOpen ? null : key)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--sans)', fontSize: 15,
                    fontWeight: isOpen ? 500 : 400,
                    color: isOpen ? 'var(--teal)' : textCol,
                    padding: '0 16px', letterSpacing: '0.02em',
                    height: '100%', display: 'inline-flex', alignItems: 'center',
                    position: 'relative', whiteSpace: 'nowrap', transition: 'color 0.15s',
                  }}>
                  {key}
                  <Icon name="ChevronDown" size={12} style={{ marginLeft: 5, opacity: 0.55, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  {isOpen && <span style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 20, height: 2, background: 'var(--teal)', borderRadius: 1 }} />}
                </button>
              );
            })}
          </div>

          {/* Hamburger */}
          <button className="shared-hamburger"
            onClick={() => setMobileOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none', alignItems: 'center', justifyContent: 'center', color: solid ? 'var(--navy)' : '#fff' }}>
            <Icon name="Menu" size={22} />
          </button>
        </div>

        {/* ── Mega menu panel — fixed full-width, starts exactly at bar bottom, no gap ── */}
        {open && (() => {
          const menu = SHARED_MEGA[open];
          return (
            <div style={{
              background: '#fff',
              borderBottom: '1px solid var(--rule)',
              boxShadow: '0 20px 60px rgba(26,46,74,0.12)',
              padding: '0 56px',
              display: 'grid',
              gridTemplateColumns: `280px ${menu.cols.map(() => '1fr').join(' ')}`,
            }}>
              {/* Featured */}
              <div style={{ padding: '36px 40px 36px 0', borderRight: '1px solid var(--rule)' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', color: 'var(--teal)', marginBottom: 14, textTransform: 'uppercase' }}>Featured</div>
                <a href={menu.featured.href} onClick={() => setOpen(null)} style={{
                  display: 'block', textDecoration: 'none',
                  background: 'linear-gradient(135deg, rgba(88,168,160,0.08), rgba(88,168,160,0.02))',
                  border: '1px solid rgba(88,168,160,0.18)',
                  borderRadius: 10, padding: '20px 22px',
                }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 600, color: 'var(--navy)', marginBottom: 8, lineHeight: 1.4 }}>{menu.featured.label}</div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 300, color: 'var(--muted)', lineHeight: 1.75 }}>{menu.featured.desc}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--teal)', marginTop: 14, fontWeight: 500, letterSpacing: '0.08em' }}>MORE DETAIL →</div>
                </a>
              </div>
              {/* Columns */}
              {menu.cols.map((col, ci) => (
                <div key={ci} style={{ padding: '36px 32px', borderRight: ci < menu.cols.length - 1 ? '1px solid var(--rule)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', color: 'var(--muted)', marginBottom: 18, textTransform: 'uppercase' }}>{col.heading}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {col.links.map((lk, li) => (
                      <a key={li} href={lk.href || '#'} onClick={() => setOpen(null)}
                        style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '11px 13px', borderRadius: 8, textDecoration: 'none', transition: 'background 0.1s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F7F5F1'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <span style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>{lk.label}</span>
                        <span style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 300, color: 'var(--muted)' }}>{lk.desc}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      <SharedMobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

/* ── SOCIAL SIDEBAR ── */
function SharedSocialSidebar() {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return (
    <div style={{
      position: 'fixed', right: 0, top: 0, bottom: 0, width: 80,
      background: 'var(--white)', borderLeft: '1px solid rgba(26,46,74,0.1)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 16, zIndex: 150,
    }}>
      {SHARED_SOCIAL_LINKS.map(s => (
        <a key={s.name} href={s.href} target="_blank" rel="noreferrer" title={s.name} style={{
          width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--navy)', background: 'transparent', border: '1px solid rgba(26,46,74,0.15)',
          transition: 'background 0.2s, color 0.2s, transform 0.2s, border-color 0.2s', textDecoration: 'none',
        }}
        onMouseEnter={e => { e.currentTarget.style.background='var(--teal)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='var(--teal)'; e.currentTarget.style.transform='scale(1.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--navy)'; e.currentTarget.style.borderColor='rgba(26,46,74,0.15)'; e.currentTarget.style.transform=''; }}>
          {s.icon}
        </a>
      ))}
    </div>
  );
}

/* ── FOOTER ── */
function SharedFooter() {
  const isMobile = useIsMobile();
  const cols = [
    { heading: '輔導計畫', items: [['台大加速器', 'accelerator.html'], ['台大車庫', 'garage.html'], ['代表校友', 'alumni.html'], ['歷屆輔導團隊', 'startups.html']] },
    { heading: '企業合作', items: [['合作總覽', 'corporate-partners.html'], ['聯合活動', 'co-events.html'], ['諮詢服務', 'consulting.html']] },
    { heading: '台大天使會', items: [['天使會總覽', 'angels.html'], ['申請入會', 'angel-apply.html'], ['新創投遞', 'pitch.html']] },
    { heading: '關於我們', items: [['關於 TEC', 'about.html'], ['執行團隊', 'team.html'], ['業師陣容', 'mentors.html'], ['加入我們', 'careers.html']] },
  ];
  return (
    <footer style={{ background: 'var(--navy)', padding: isMobile ? '48px 6% 28px' : '64px 10% 32px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : '1.3fr repeat(4, 1fr)',
        gap: isMobile ? '32px 24px' : 48,
        marginBottom: 48,
      }}>
        {/* Brand col */}
        <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
          <img src="uploads/Asset 6NTUTEC C+E.png" alt="NTUTEC" style={{ height: 36, filter: 'brightness(0) invert(1)', opacity: 0.85, marginBottom: 20 }} />
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 2 }}>
            <div>ntutec@ntutec.com</div>
            <div>台北市中正區思源街 18 號</div>
            <div>卓越研究大樓 7 樓</div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            {[
              { href: 'https://www.facebook.com/NTUTEC/', svg: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/> },
              { href: '#', svg: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1"/></> },
              { href: '#', svg: <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/> },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer" style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background='var(--teal)'; e.currentTarget.style.borderColor='var(--teal)'; e.currentTarget.style.color='#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'; e.currentTarget.style.color='rgba(255,255,255,0.6)'; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">{s.svg}</svg>
              </a>
            ))}
          </div>
        </div>
        {cols.map(col => (
          <div key={col.heading}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)', marginBottom: 18, textTransform: 'uppercase' }}>{col.heading}</div>
            {col.items.map(([label, href]) => (
              <a key={label} href={href} style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: 13.5, fontWeight: 300, color: 'rgba(255,255,255,0.55)', marginBottom: 11, transition: 'color 0.12s' }}
                onMouseEnter={e => e.currentTarget.style.color='rgba(255,255,255,0.9)'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.55)'}>{label}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 12 : 0 }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>© 2026 台大創創中心 NTUTEC. All Rights Reserved.</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#" style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Privacy Policy</a>
          <a href="#" style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Site Map</a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { SharedNav, SharedSocialSidebar, SharedFooter, useIsMobile });
