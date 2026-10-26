/* Shared helpers: theme, number formats, Chart.js defaults that follow the theme. */
(function () {
  const root = document.documentElement;
  try { const t = localStorage.getItem('theme'); if (t) root.setAttribute('data-theme', t); } catch (e) {}

  const css = n => getComputedStyle(document.body.closest('[data-domain]') || root).getPropertyValue(n).trim() ||
    getComputedStyle(root).getPropertyValue(n).trim();
  const fmt = new Intl.NumberFormat('en-CA');
  window.V = {
    css,
    n0: v => v == null || v === '' ? '—' : fmt.format(Math.round(v)),
    n1: v => v == null || v === '' ? '—' : Number(v).toFixed(1),
    pct: (v, d = 1) => v == null ? '—' : (v * 100).toFixed(d) + '%',
    money: v => v == null ? '—' : '$' + fmt.format(Math.round(v)),
    moneyM: v => v == null ? '—' : '$' + (v / 1e6).toFixed(v >= 1e8 ? 0 : 1) + 'M',
    esc: s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])),
    charts: {},
    mk(id, cfg) {
      if (this.charts[id]) this.charts[id].destroy();
      const el = document.getElementById(id);
      if (!el || !window.Chart) return null;
      this.charts[id] = new Chart(el, cfg);
      return this.charts[id];
    },
    alpha(hex, a) {
      const h = hex.replace('#', '');
      if (h.length !== 6) return hex;
      const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
      return `rgba(${r},${g},${b},${a})`;
    },
    grid() { return { color: css('--line') }; },
  };

  function chartDefaults() {
    if (!window.Chart) return;
    Chart.defaults.font.family = css('--f-ui') || 'system-ui, sans-serif';
    Chart.defaults.font.size = 12.5;
    Chart.defaults.color = css('--muted');
    Chart.defaults.borderColor = css('--line');
    Chart.defaults.maintainAspectRatio = false;
    Chart.defaults.plugins.legend.display = false;
    Chart.defaults.plugins.tooltip.backgroundColor = css('--ink');
    Chart.defaults.plugins.tooltip.titleColor = css('--bg');
    Chart.defaults.plugins.tooltip.bodyColor = css('--bg');
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.animation.duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 450;
  }

  function render() { chartDefaults(); if (typeof window.renderPage === 'function') window.renderPage(); }
  window.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.theme-btn');
    const sync = () => { if (btn) btn.textContent = (root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark' ? '☀' : '☾'; };
    if (btn) btn.addEventListener('click', () => {
      const cur = root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = cur === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync(); render();
    });
    sync();
    const yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();
    render();
  });
  const mq = matchMedia('(prefers-color-scheme: dark)');
  if (mq.addEventListener) mq.addEventListener('change', render);
})();
