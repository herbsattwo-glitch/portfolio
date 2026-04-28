// ============================================
// HERBERT ADOGO — BENTO PORTFOLIO
// Auto-counting, spotlight hover, curtain reveals
// ============================================

window.addEventListener('DOMContentLoaded', () => {

    // ── CURSOR ──
    const dot = document.querySelector('.cursor-dot'), outline = document.querySelector('.cursor-outline');
    let mx=0,my=0,ox=0,oy=0;
    document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});
    (function cl(){ox+=(mx-ox)*.12;oy+=(my-oy)*.12;outline.style.left=ox+'px';outline.style.top=oy+'px';requestAnimationFrame(cl)})();
    document.querySelectorAll('a,button,.btn-glow,.btn-outline-hero,.skill-card,.bento-card:not(.pf-coming-soon),.contact-card,.social-link-modern,.menu-toggle,.bento-btn-primary,.bento-btn-secondary,.bento-stack span,.pf-filter-btn,.pf-cta-btn').forEach(el=>{
        el.addEventListener('mouseenter',()=>{dot.classList.add('hover');outline.classList.add('hover')});
        el.addEventListener('mouseleave',()=>{dot.classList.remove('hover');outline.classList.remove('hover')});
    });

    // ── SIDEBAR ──
    const sidebar=document.getElementById('sidebar-wrapper'),toggle=document.querySelector('.menu-toggle');
    toggle.addEventListener('click',e=>{e.preventDefault();sidebar.classList.toggle('active');toggle.classList.toggle('active');const i=toggle.querySelector('i');i.classList.contains('fa-bars')?i.classList.replace('fa-bars','fa-xmark'):i.classList.replace('fa-xmark','fa-bars')});
    document.querySelectorAll('.sidebar-nav-item a').forEach(l=>{l.addEventListener('click',()=>{sidebar.classList.remove('active');toggle.classList.remove('active');const i=toggle.querySelector('i');if(i.classList.contains('fa-xmark'))i.classList.replace('fa-xmark','fa-bars')})});

    // ── SCROLL TO TOP ──
    const stBtn=document.querySelector('.scroll-to-top');
    window.addEventListener('scroll',()=>stBtn.classList.toggle('visible',window.pageYOffset>300));
    stBtn.addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})});

    // ── SCROLL ANIMATIONS ──
    const obs=new IntersectionObserver(ens=>{ens.forEach(en=>{if(en.isIntersecting){setTimeout(()=>en.target.classList.add('animated'),parseInt(en.target.dataset.delay||0));obs.unobserve(en.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('[data-animate]').forEach(el=>obs.observe(el));

    // ═══════════════════════════
    // PORTFOLIO SYSTEM
    // ═══════════════════════════

    const grid = document.querySelector('.bento-grid');
    const cards = document.querySelectorAll('.bento-card:not(.pf-coming-soon)');
    const allCards = document.querySelectorAll('.bento-card');
    const comingSoon = document.querySelectorAll('.pf-coming-soon');
    const filterBtns = document.querySelectorAll('.pf-filter-btn');
    const slider = document.querySelector('.pf-filter-slider');
    const countEl = document.querySelector('.pf-count-number');

    // AUTO-COUNT on load (only counts non-coming-soon cards)
    function updateCounts() {
        const active = document.querySelectorAll('.bento-card:not(.pf-coming-soon)');
        filterBtns.forEach(btn => {
            const f = btn.dataset.filter;
            const badge = btn.querySelector('.pf-filter-count');
            if (f === 'all') {
                badge.textContent = active.length;
            } else {
                badge.textContent = document.querySelectorAll(`.bento-card:not(.pf-coming-soon)[data-category="${f}"]`).length;
            }
        });
        // Hide empty filters
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === 'all') return;
            btn.style.display = parseInt(btn.querySelector('.pf-filter-count').textContent) > 0 ? '' : 'none';
        });
        if (countEl) countEl.textContent = active.length;
    }
    updateCounts();

    // SLIDER
    function posSlider(btn) { if (slider) { slider.style.left = btn.offsetLeft + 'px'; slider.style.width = btn.offsetWidth + 'px'; } }
    const activeBtn = document.querySelector('.pf-filter-btn.active');
    if (activeBtn) requestAnimationFrame(() => posSlider(activeBtn));

    // FILTER
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            posSlider(btn);
            const f = btn.dataset.filter;
            let vis = 0;

            // Active cards
            cards.forEach((c, i) => {
                if (f === 'all' || c.dataset.category === f) {
                    c.classList.remove('pf-hidden');
                    c.classList.remove('pf-visible');
                    c.style.position = ''; c.style.visibility = '';
                    setTimeout(() => c.classList.add('pf-visible'), vis * 100);
                    vis++;
                } else {
                    c.classList.add('pf-hidden');
                    c.classList.remove('pf-visible');
                }
            });

            // Coming soon cards — show only when "all" or matching category
            comingSoon.forEach(c => {
                if (f === 'all' || c.dataset.category === f) {
                    c.classList.remove('pf-hidden');
                    c.style.position = ''; c.style.visibility = '';
                    c.classList.add('pf-visible');
                } else {
                    c.classList.add('pf-hidden');
                    c.classList.remove('pf-visible');
                }
            });

            if (countEl) animNum(countEl, vis);
        });
    });

    window.addEventListener('resize', () => { const a = document.querySelector('.pf-filter-btn.active'); if (a) posSlider(a); });

    function animNum(el, target) {
        let cur = parseInt(el.textContent) || 0;
        if (cur === target) return;
        const dir = target > cur ? 1 : -1;
        (function step() { cur += dir; el.textContent = cur; if (cur !== target) requestAnimationFrame(step); })();
    }

    // CARD REVEAL ON SCROLL
    const pfObs = new IntersectionObserver(ens => {
        ens.forEach(en => {
            if (en.isIntersecting && !en.target.classList.contains('pf-hidden')) {
                const idx = parseInt(en.target.dataset.index) || 0;
                setTimeout(() => en.target.classList.add('pf-visible'), idx * 100);
                pfObs.unobserve(en.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    allCards.forEach(c => pfObs.observe(c));

    // SPOTLIGHT — dim siblings on hover
    if (grid) {
        grid.addEventListener('mouseenter', () => grid.classList.add('has-hover'));
        grid.addEventListener('mouseleave', () => grid.classList.remove('has-hover'));
    }

    // CARD 3D TILT + PARALLAX IMAGE
    cards.forEach(card => {
        const inner = card.querySelector('.bento-card-inner');
        const img = card.querySelector('.bento-img-link img');

        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = e.clientX - r.left, y = e.clientY - r.top;
            const cx = r.width / 2, cy = r.height / 2;
            const rx = ((y - cy) / cy) * -5, ry = ((x - cx) / cx) * 5;

            inner.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;

            // Parallax image movement
            if (img) {
                const mx = ((x - cx) / cx) * -8, my = ((y - cy) / cy) * -8;
                img.style.transform = `scale(1.12) translate(${mx}px, ${my}px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            inner.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
            if (img) img.style.transform = '';
        });
    });

    // WATERMARK SCRAMBLE
    cards.forEach(card => {
        const wm = card.querySelector('.bento-watermark');
        if (!wm) return;
        const orig = wm.textContent;
        const chars = '!@#$%&0123456789';
        card.addEventListener('mouseenter', () => {
            let t = 0;
            const s = setInterval(() => {
                wm.textContent = Array.from(orig).map((ch, i) => t > i * 3 ? ch : chars[Math.floor(Math.random() * chars.length)]).join('');
                t++;
                if (t > orig.length * 5) { clearInterval(s); wm.textContent = orig; }
            }, 30);
        });
    });

    // ── COUNTERS ──
    const counters=document.querySelectorAll('[data-count]');
    const cObs=new IntersectionObserver(ens=>{ens.forEach(en=>{if(en.isIntersecting){const t=parseInt(en.target.dataset.count);let c=0;const s=t/(1500/16);(function u(){c+=s;if(c<t){en.target.textContent=Math.ceil(c);requestAnimationFrame(u)}else en.target.textContent=t})();cObs.unobserve(en.target)}})},{threshold:.5});
    counters.forEach(c=>cObs.observe(c));

    // ── PARTICLES ──
    const canvas=document.getElementById('particleCanvas');
    if(canvas){const ctx=canvas.getContext('2d');let ps=[],aId;function rs(){canvas.width=canvas.offsetWidth;canvas.height=canvas.offsetHeight}rs();window.addEventListener('resize',rs);
    class P{constructor(){this.reset()}reset(){this.x=Math.random()*canvas.width;this.y=Math.random()*canvas.height;this.s=Math.random()*2+.5;this.sx=(Math.random()-.5)*.4;this.sy=(Math.random()-.5)*.4;this.o=Math.random()*.5+.1;this.os=(Math.random()-.5)*.005}update(){this.x+=this.sx;this.y+=this.sy;this.o+=this.os;if(this.o<=.05||this.o>=.6)this.os*=-1;if(this.x<0||this.x>canvas.width||this.y<0||this.y>canvas.height)this.reset()}draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.s,0,Math.PI*2);ctx.fillStyle=`rgba(14,165,233,${this.o})`;ctx.fill()}}
    const cnt=Math.min(70,Math.floor((canvas.width*canvas.height)/18000));for(let i=0;i<cnt;i++)ps.push(new P());
    function con(){for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const d=Math.hypot(ps[i].x-ps[j].x,ps[i].y-ps[j].y);if(d<140){ctx.beginPath();ctx.strokeStyle=`rgba(14,165,233,${(1-d/140)*.12})`;ctx.lineWidth=.5;ctx.moveTo(ps[i].x,ps[i].y);ctx.lineTo(ps[j].x,ps[j].y);ctx.stroke()}}}
    function an(){ctx.clearRect(0,0,canvas.width,canvas.height);ps.forEach(p=>{p.update();p.draw()});con();aId=requestAnimationFrame(an)}an();
    new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){if(!aId)an()}else{cancelAnimationFrame(aId);aId=null}})}).observe(canvas)}

    // ── SKILL TILT ──
    document.querySelectorAll('.skill-card').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();c.style.transform=`perspective(1000px) rotateX(${((e.clientY-r.top-r.height/2)/(r.height/2))*-5}deg) rotateY(${((e.clientX-r.left-r.width/2)/(r.width/2))*5}deg) translateY(-4px)`});c.addEventListener('mouseleave',()=>c.style.transform='')});

    // ── MAGNETIC ──
    document.querySelectorAll('.btn-glow,.social-link-modern').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.15}px,${(e.clientY-r.top-r.height/2)*.15}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')});

    // ── PARALLAX SHAPES ──
    const shapes=document.querySelectorAll('.shape');window.addEventListener('scroll',()=>{const s=window.pageYOffset;shapes.forEach((sh,i)=>sh.style.transform=`translateY(${s*(i+1)*.05}px)`)});

    // ── ACTIVE NAV ──
    const secs=document.querySelectorAll('section[id]');window.addEventListener('scroll',()=>{const p=window.pageYOffset+200;secs.forEach(s=>{const l=document.querySelector(`.sidebar-nav-item a[href="#${s.id}"]`);if(l){const a=p>=s.offsetTop&&p<s.offsetTop+s.offsetHeight;l.style.color=a?'#fff':'';l.style.background=a?'rgba(255,255,255,.05)':''}})});

    // ── HERO LOAD ──
    setTimeout(()=>{document.querySelectorAll('.hero-content [data-animate]').forEach(el=>{setTimeout(()=>el.classList.add('animated'),parseInt(el.dataset.delay||0))})},300);
});