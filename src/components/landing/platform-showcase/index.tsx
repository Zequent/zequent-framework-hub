'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Drone from './atoms/Drone';
import GroundVehicle from './atoms/GroundVehicle';
import DockStation from './atoms/DockStation';
import SensorNode from './atoms/SensorNode';
import HudFrame from './atoms/HudFrame';
import InfraLabel from './atoms/InfraLabel';

gsap.registerPlugin(ScrollTrigger);


// Satellite-view field operation

const VW = 1600;
const VH = 900;

// Fixed infrastructure positions
const dock1 = { x: 1250, y: 690 };
const dock2 = { x: 320,  y: 720 };
const sensor1 = { x: 100,  y: 350 };
const sensor2 = { x: 1500, y: 280 };
const sensor3 = { x: 800,  y: 100 };
const edgeHub = { x: 800,  y: 450 };

// Mesh links
const infra = [dock1, dock2, sensor1, sensor2, sensor3, edgeHub];
const meshLinks: [typeof dock1, typeof dock1][] = [
  [edgeHub, dock1], [edgeHub, dock2],
  [edgeHub, sensor1], [edgeHub, sensor2], [edgeHub, sensor3],
  [dock1, sensor2], [dock2, sensor1],
  [sensor1, sensor3], [sensor3, sensor2],
  [dock1, dock2],
];

// UGV waypoint route
const ugvWaypoints = [
  { x: 400, y: 620 },
  { x: 700, y: 500 },
  { x: 1100, y: 520 },
  { x: 1150, y: 680 },
];

// Drone1 sruvey
const surveyLegs = [
  { x: 350, y: 200 },
  { x: 350, y: 550 },
  { x: 550, y: 550 },
  { x: 550, y: 200 },
  { x: 750, y: 200 },
  { x: 750, y: 550 },
  { x: 950, y: 550 },
  { x: 950, y: 200 },
  { x: 1150, y: 200 },
  { x: 1150, y: 550 },
];

// Drone2 orbit points
const orbitPoints = Array.from({ length: 32 }, (_, i) => {
  const a = (i / 32) * Math.PI * 2;
  return { x: 800 + 580 * Math.cos(a), y: 420 + 300 * Math.sin(a) };
});

const PlatformShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !sceneRef.current) return;

    const ctx = gsap.context(() => {
      const scene = sceneRef.current!;
      const svg = scene.querySelector<SVGSVGElement>('.field-svg')!;

      // Heading reveal
      if (headingRef.current) {
        gsap.from(headingRef.current.children, {
          opacity: 0, y: 30, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%', once: true },
        });
      }

      // Scene reveal
      gsap.from(scene, {
        opacity: 0, scale: 1.4, duration: 2, ease: 'expo.out',
        scrollTrigger: { trigger: scene, start: 'top 88%', once: true },
      });

      // Grid fade-in
      gsap.from('.sat-grid line', {
        opacity: 0, duration: 0.8, stagger: 0.008, ease: 'power2.out',
        scrollTrigger: { trigger: scene, start: 'top 85%', once: true },
      });

      // Infrastructure stagger
      gsap.from('.infra-node', {
        opacity: 0, scale: 0.5, duration: 0.6, stagger: 0.1, ease: 'back.out(1.6)',
        scrollTrigger: { trigger: scene, start: 'top 82%', once: true },
      });

      // Mesh lines
      svg.querySelectorAll<SVGLineElement>('.mesh-line').forEach((line, i) => {
        gsap.set(line, { strokeDasharray: '8 6', strokeDashoffset: 0 });
        gsap.to(line, {
          strokeDashoffset: -28,
          duration: 3 + i * 0.15,
          repeat: -1,
          ease: 'none',
        });
      });

      // Data packets flowing along mesh
      svg.querySelectorAll<SVGCircleElement>('.mesh-packet').forEach((pkt) => {
        const li = parseInt(pkt.dataset.link || '0');
        const link = meshLinks[li];
        if (!link) return;
        gsap.fromTo(pkt,
          { attr: { cx: link[0].x, cy: link[0].y }, opacity: 0 },
          {
            attr: { cx: link[1].x, cy: link[1].y },
            opacity: 0.7,
            duration: 2.5 + Math.random() * 2,
            repeat: -1,
            repeatDelay: 1.5 + Math.random() * 4,
            ease: 'power1.inOut',
            onRepeat() { gsap.set(pkt, { opacity: 0 }); },
          },
        );
      });

      // UAV-01
      const uav01 = scene.querySelector<HTMLElement>('.uav-01');
      const uav01Shadow = svg.querySelector<SVGEllipseElement>('.uav01-shadow');
      const uav01Trail = svg.querySelector<SVGPolylineElement>('.uav01-trail');
      if (uav01) {
        // Build motion path from survey legs
        const surveyTl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

        // Start at dock1, fly to first survey point
        surveyTl.set(uav01, {
          left: `${(dock1.x / VW) * 100}%`,
          top: `${(dock1.y / VH) * 100}%`,
        });
        surveyTl.to(uav01, {
          left: `${(surveyLegs[0].x / VW) * 100}%`,
          top: `${(surveyLegs[0].y / VH) * 100}%`,
          duration: 3, ease: 'power2.inOut',
          onStart: () => {
            const dk = scene.querySelector<HTMLElement>('.dock-01');
            if (dk) gsap.fromTo(dk, { scale: 1 }, { scale: 1.12, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.out', transformOrigin: 'center center' });
          },
        });

        // Raster pattern
        surveyLegs.forEach((pt, i) => {
          if (i === 0) return;
          surveyTl.to(uav01, {
            left: `${(pt.x / VW) * 100}%`,
            top: `${(pt.y / VH) * 100}%`,
            duration: i % 2 === 0 ? 1.2 : 3.5,
            ease: 'none',
          });
        });

        // Return to dock
        surveyTl.to(uav01, {
          left: `${(dock1.x / VW) * 100}%`,
          top: `${(dock1.y / VH) * 100}%`,
          duration: 3, ease: 'power2.inOut',
          onComplete: () => {
            const dk = scene.querySelector<HTMLElement>('.dock-01');
            if (dk) gsap.fromTo(dk, { scale: 1 }, { scale: 1.12, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.out', transformOrigin: 'center center' });
          },
        });
        surveyTl.to({}, { duration: 1 }); // pause at dock
      }

      // UAV-02
      const uav02 = scene.querySelector<HTMLElement>('.uav-02');
      const uav02Shadow = svg.querySelector<SVGEllipseElement>('.uav02-shadow');
      if (uav02) {
        const orbitTl = gsap.timeline({ repeat: -1 });
        // Launch from dock-02
        orbitTl.to(uav02, {
          left: `${(orbitPoints[0].x / VW) * 100}%`,
          top: `${(orbitPoints[0].y / VH) * 100}%`,
          duration: 3, ease: 'power2.inOut',
          onStart: () => {
            const dk = scene.querySelector<HTMLElement>('.dock-02');
            if (dk) gsap.fromTo(dk, { scale: 1 }, { scale: 1.12, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.out', transformOrigin: 'center center' });
          },
        });
        orbitPoints.forEach((pt) => {
          orbitTl.to(uav02, {
            left: `${(pt.x / VW) * 100}%`,
            top: `${(pt.y / VH) * 100}%`,
            duration: 1.6,
            ease: 'none',
          });
        });
      }

      // UAV-03
      const uav03 = scene.querySelector<HTMLElement>('.uav-03');
      if (uav03) {
        const chargeTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
        // Sit at dock for 15secs
        chargeTl.set(uav03, {
          left: `${(dock1.x / VW) * 100}%`,
          top: `${(dock1.y / VH) * 100}%`,
        });
        chargeTl.to({}, { duration: 15 });
        // Quick patrol sortie
        chargeTl.to(uav03, { left: '55%', top: '30%', duration: 4, ease: 'power2.inOut' });
        chargeTl.to(uav03, { left: '35%', top: '25%', duration: 5, ease: 'none' });
        chargeTl.to(uav03, { left: '20%', top: '45%', duration: 4, ease: 'none' });
        // Return to dock
        chargeTl.to(uav03, {
          left: `${(dock1.x / VW) * 100}%`,
          top: `${(dock1.y / VH) * 100}%`,
          duration: 3, ease: 'power2.inOut',
        });
      }

      // UGV-01
      const ugv = scene.querySelector<HTMLElement>('.ugv-01');
      if (ugv) {
        const ugvTl = gsap.timeline({ repeat: -1 });
        ugvWaypoints.forEach((wp, i) => {
          const next = ugvWaypoints[(i + 1) % ugvWaypoints.length];
          const dx = next.x - wp.x;
          const dy = next.y - wp.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);

          // Pivot in place first
          ugvTl.to(ugv, { rotation: angle, duration: 0.5, ease: 'power2.inOut' });
          // Then drive forward
          ugvTl.to(ugv, {
            left: `${(next.x / VW) * 100}%`,
            top: `${(next.y / VH) * 100}%`,
            duration: dist / 40,
            ease: 'power1.inOut',
          });
          ugvTl.to({}, { duration: 1.5 });
        });
      }

      // Signal pulses
      svg.querySelectorAll<SVGCircleElement>('.sig-pulse').forEach((ring, i) => {
        gsap.fromTo(ring,
          { attr: { r: 6 }, opacity: 0.35 },
          {
            attr: { r: 80 + i * 15 },
            opacity: 0,
            duration: 3.5 + i * 0.5,
            repeat: -1,
            repeatDelay: 0.5,
            ease: 'power1.out',
          },
        );
      });

      // Edge hub concentric rings
      gsap.to('.edge-ring', {
        scale: 1.3, opacity: 0, duration: 2.5,
        repeat: -1, ease: 'power1.out',
        transformOrigin: 'center', stagger: 0.7,
      });

      // HUD overlay pulse
      gsap.to('.hud-corner', {
        opacity: 0.3, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut',
      });

      // Infra labels stagger
      gsap.from('.infra-tag', {
        opacity: 0, y: 6, duration: 0.4, stagger: 0.04, delay: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: scene, start: 'top 82%', once: true },
      });

      // Pillar cards reveal
      gsap.from('.pillar-card', {
        opacity: 0, y: 24, duration: 0.6, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.pillar-grid', start: 'top 92%', once: true },
      });

      // Terrain parallax
      gsap.to('.sat-grid', {
        yPercent: 3, ease: 'none',
        scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // Survey, scan beam, headlights, shadows, trail, tracks, minimap, clock, latency, event log — single RAF
      const surveyFillEl = svg.querySelector<SVGRectElement>('.survey-fill');
      const scanBeamEl = svg.querySelector<SVGRectElement>('.scan-beam');
      const scanH = svg.querySelector<SVGLineElement>('.scan-cross-h');
      const scanV = svg.querySelector<SVGLineElement>('.scan-cross-v');
      const hlCone = svg.querySelector<SVGPolygonElement>('.ugv-headlight');
      const hlWide = svg.querySelector<SVGPolygonElement>('.ugv-headlight-wide');
      const ugvTracksEl = svg.querySelector<SVGPolylineElement>('.ugv-tracks');
      const clockEl = scene.querySelector<HTMLElement>('.live-clock');
      const frameEl = scene.querySelector<HTMLElement>('.frame-count');
      const latencyEl = scene.querySelector<HTMLElement>('.latency-readout');
      const eventLogEl = scene.querySelector<HTMLElement>('.event-log');
      const mmUav01 = scene.querySelector<SVGCircleElement>('.mm-uav01');
      const mmUav02 = scene.querySelector<SVGCircleElement>('.mm-uav02');
      const mmUgv01 = scene.querySelector<SVGCircleElement>('.mm-ugv01');

      let frameNum = 0;
      let inSurvey = false;
      let fadingSurvey = false;
      const uav01TrailPts: string[] = [];
      const ugvTrackPts: string[] = [];
      const eventMessages = [
        '> UAV-01 SURVEY LEG 3/10',
        '> MESH LINK STABLE 14ms',
        '> UGV-01 WAYPOINT B REACHED',
        '> SENSOR-W MOTION DETECTED',
        '> UAV-02 ORBIT SECTOR 4/8',
        '> EDGE HUB SYNC 1.2TB/s',
        '> THERMAL ANOMALY ZONE-C',
        '> DOCK-01 UAV-03 CHARGED',
        '> PERIMETER CLEAR',
        '> UGV-01 WAYPOINT C REACHED',
        '> UAV-01 SURVEY LEG 7/10',
        '> SENSOR-E CONTACT LOGGED',
        '> DOCK-02 READY',
        '> MESH REROUTE VIA SENSOR-N',
      ];
      let evtIdx = 0;

      const getPos = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        const sr = scene.getBoundingClientRect();
        return {
          x: ((r.left + r.width / 2 - sr.left) / sr.width) * VW,
          y: ((r.top + r.height / 2 - sr.top) / sr.height) * VH,
        };
      };

      gsap.ticker.add(() => {
        frameNum++;

        // UAV-01 shadow + trail
        if (uav01) {
          const p = getPos(uav01);

          if (uav01Shadow) {
            uav01Shadow.setAttribute('cx', String(p.x));
            uav01Shadow.setAttribute('cy', String(p.y + 18));
          }

          if (uav01Trail) {
            uav01TrailPts.push(`${p.x.toFixed(0)},${p.y.toFixed(0)}`);
            if (uav01TrailPts.length > 120) uav01TrailPts.shift();
            uav01Trail.setAttribute('points', uav01TrailPts.join(' '));
          }

          // Survey coverage fill
          if (surveyFillEl) {
            const inZone = p.y >= 180 && p.y <= 570 && p.x >= 330 && p.x <= 1200;
            if (inZone) {
              fadingSurvey = false;
              inSurvey = true;
              const w = Math.max(0, p.x - 350);
              const cur = parseFloat(surveyFillEl.getAttribute('width') || '0');
              if (w > cur) surveyFillEl.setAttribute('width', String(w));
              gsap.set(surveyFillEl, { opacity: 1 });
            } else if (inSurvey && !fadingSurvey && p.y > 600) {
              fadingSurvey = true;
              gsap.to(surveyFillEl, { opacity: 0, duration: 2, onComplete: () => {
                surveyFillEl.setAttribute('width', '0');
                inSurvey = false;
                fadingSurvey = false;
              }});
            }
          }

          // Scan beam
          if (scanBeamEl) {
            const inZone = p.y >= 180 && p.y <= 570 && p.x >= 330;
            if (inZone) {
              scanBeamEl.setAttribute('x', String(p.x - 25));
              scanBeamEl.setAttribute('y', String(p.y - 10));
              gsap.set(scanBeamEl, { opacity: 1 });
              if (scanH) { scanH.setAttribute('x1', String(p.x - 25)); scanH.setAttribute('y1', String(p.y + 30)); scanH.setAttribute('x2', String(p.x + 25)); scanH.setAttribute('y2', String(p.y + 30)); gsap.set(scanH, { opacity: 1 }); }
              if (scanV) { scanV.setAttribute('x1', String(p.x)); scanV.setAttribute('y1', String(p.y - 10)); scanV.setAttribute('x2', String(p.x)); scanV.setAttribute('y2', String(p.y + 60)); gsap.set(scanV, { opacity: 1 }); }
            } else {
              gsap.set([scanBeamEl, scanH, scanV].filter(Boolean), { opacity: 0 });
            }
          }
        }

        // UAV-02 shadow
        if (uav02 && uav02Shadow) {
          const p = getPos(uav02);
          uav02Shadow.setAttribute('cx', String(p.x));
          uav02Shadow.setAttribute('cy', String(p.y + 18));
        }

        // UGV headlights + tracks
        if (ugv) {
          const r = ugv.getBoundingClientRect();
          const sr = scene.getBoundingClientRect();
          const cx = ((r.left + r.width / 2 - sr.left) / sr.width) * VW;
          const cy = ((r.top + r.height / 2 - sr.top) / sr.height) * VH;
          const rot = ((gsap.getProperty(ugv, 'rotation') as number) || 0) * Math.PI / 180;

          if (hlCone) {
            const len = 70, spread = 0.18;
            hlCone.setAttribute('points',
              `${cx},${cy} ${cx + Math.cos(rot - spread) * len},${cy + Math.sin(rot - spread) * len} ${cx + Math.cos(rot + spread) * len},${cy + Math.sin(rot + spread) * len}`);
          }
          if (hlWide) {
            const wLen = 45, wSpread = 0.45;
            hlWide.setAttribute('points',
              `${cx},${cy} ${cx + Math.cos(rot - wSpread) * wLen},${cy + Math.sin(rot - wSpread) * wLen} ${cx + Math.cos(rot + wSpread) * wLen},${cy + Math.sin(rot + wSpread) * wLen}`);
          }

          // Tire tracks
          if (ugvTracksEl && frameNum % 3 === 0) {
            ugvTrackPts.push(`${cx.toFixed(0)},${cy.toFixed(0)}`);
            if (ugvTrackPts.length > 200) ugvTrackPts.shift();
            ugvTracksEl.setAttribute('points', ugvTrackPts.join(' '));
          }
        }

        // Minimap
        [
          { el: mmUav01, src: uav01 },
          { el: mmUav02, src: uav02 },
          { el: mmUgv01, src: ugv },
        ].forEach(({ el, src }) => {
          if (!el || !src) return;
          const p = getPos(src);
          el.setAttribute('cx', String(p.x));
          el.setAttribute('cy', String(p.y));
        });

        // Clock + frame counter
        if (clockEl && frameNum % 60 === 0) {
          const now = new Date();
          clockEl.textContent = `${now.getUTCHours().toString().padStart(2, '0')}:${now.getUTCMinutes().toString().padStart(2, '0')}:${now.getUTCSeconds().toString().padStart(2, '0')} UTC`;
        }
        if (frameEl && frameNum % 3 === 0) {
          frameEl.textContent = `F${frameNum.toString().padStart(5, '0')}`;
        }

        // Latency jitter
        if (latencyEl && frameNum % 120 === 0) {
          latencyEl.textContent = `${12 + Math.floor(Math.random() * 5)}ms`;
        }

        // Event log — rotate messages every ~4s
        if (eventLogEl && frameNum % 240 === 0) {
          const msg = eventMessages[evtIdx % eventMessages.length];
          evtIdx++;
          eventLogEl.textContent = '';
          let ci = 0;
          const typeChar = () => {
            if (ci <= msg.length) {
              eventLogEl.textContent = msg.slice(0, ci);
              ci++;
              setTimeout(typeChar, 18);
            }
          };
          typeChar();
        }
      });

      // Detection event pings
      const detPings = svg.querySelectorAll<SVGGElement>('.detection-ping');
      const detSpots = [
        { x: 600, y: 320 }, { x: 1100, y: 200 }, { x: 400, y: 650 },
        { x: 920, y: 720 }, { x: 200, y: 200 }, { x: 1350, y: 480 },
        { x: 700, y: 150 }, { x: 1050, y: 580 },
      ];
      const detLabels = ['MOTION', 'THERMAL', 'CONTACT', 'ANOMALY'];
      let detIdx = 0;
      detPings.forEach((ping, i) => {
        const label = ping.querySelector('text');
        gsap.timeline({ repeat: -1, delay: 8 + i * 7 })
          .call(() => {
            const spot = detSpots[detIdx % detSpots.length];
            detIdx++;
            ping.setAttribute('transform', `translate(${spot.x},${spot.y})`);
            if (label) label.textContent = detLabels[detIdx % detLabels.length];
          })
          .to(ping, { opacity: 0.9, duration: 0.1 })
          .to(ping, { opacity: 0, duration: 2, delay: 2, ease: 'power2.in' });
      });

      // Hardware launch sequence on scroll entry
      gsap.set(['.uav-01', '.uav-02', '.uav-03', '.ugv-01'], { opacity: 0, scale: 0.4 });
      ScrollTrigger.create({
        trigger: scene,
        start: 'top 78%',
        once: true,
        onEnter: () => {
          const ltl = gsap.timeline({ delay: 1.2 });
          ltl.to('.ugv-01', { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' });
          ltl.to('.uav-03', { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }, '-=0.3');
          ltl.to('.uav-01', { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)' }, '-=0.2');
          ltl.to('.uav-02', { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)' }, '-=0.4');
        },
      });

      // UAV-03 charge ring
      const chargeRing = svg.querySelector<SVGCircleElement>('.charge-ring');
      if (chargeRing) {
        const circumference = 113.1;
        const uav03LabelText = scene.querySelector<HTMLElement>('.uav-03 .infra-tag span:last-child');
        const uav03Dot = scene.querySelector<HTMLElement>('.uav-03 .infra-tag span:first-child');

        gsap.timeline({ repeat: -1 })
          .call(() => {
            if (uav03LabelText) uav03LabelText.textContent = 'UAV-03 · CHARGING';
            if (uav03Dot) uav03Dot.style.backgroundColor = '#E6C332';
          })
          .set(chargeRing, { attr: { 'stroke-dashoffset': circumference }, opacity: 0.6 })
          .to(chargeRing, {
            attr: { 'stroke-dashoffset': 0 },
            duration: 15,
            ease: 'none',
          })
          .call(() => {
            if (uav03LabelText) uav03LabelText.textContent = 'UAV-03 · READY';
            if (uav03Dot) uav03Dot.style.backgroundColor = '#22C55E';
          })
          .to(chargeRing, { opacity: 0, duration: 0.5 })
          .to({}, { duration: 18.5 }); // wait for patrol + return ≈ 34s cycle
      }

      // CRT scan line
      const crtLine = svg.querySelector<SVGRectElement>('.crt-scanline');
      if (crtLine) {
        gsap.to(crtLine, {
          attr: { y: VH },
          duration: 5,
          repeat: -1,
          ease: 'none',
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0A0A0A] py-24 sm:py-32 px-4 overflow-hidden">
      <div ref={headingRef} className="max-w-5xl mx-auto mb-10 sm:mb-14">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-primary uppercase block mb-3">
          Infrastructure
        </span>
        <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
          The autonomy layer your<br />hardware runs on
        </h2>
        <p className="font-mono text-xs sm:text-sm text-[#555] max-w-xl leading-relaxed">
          Edge SDK on every device. Mesh networking between nodes.
          Telemetry pipelines to your infrastructure. All orchestrated.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div
          ref={sceneRef}
          className="relative border border-[#1A1A1A] bg-[#050505] overflow-hidden"
          style={{ aspectRatio: '16 / 9' }}
        >
          <svg
            className="field-svg absolute inset-0 w-full h-full"
            viewBox={`0 0 ${VW} ${VH}`}
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter id="grain" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <filter id="water-shimmer" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="turbulence" baseFrequency="0.02 0.08" numOctaves="2" seed="3">
                  <animate attributeName="seed" values="1;5;1" dur="6s" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" scale="2" />
              </filter>

              <pattern id="crop-rows-ns" width="8" height="8" patternUnits="userSpaceOnUse">
                <line x1="4" y1="0" x2="4" y2="8" stroke="#090909" strokeWidth="0.4" />
              </pattern>
              <pattern id="crop-rows-ew" width="8" height="8" patternUnits="userSpaceOnUse">
                <line x1="0" y1="4" x2="8" y2="4" stroke="#090909" strokeWidth="0.4" />
              </pattern>
              <pattern id="crop-rows-diag" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
                <line x1="0" y1="4" x2="8" y2="4" stroke="#080808" strokeWidth="0.5" />
              </pattern>
              <pattern id="pasture-tex" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="5" r="0.6" fill="#080A08" />
                <circle cx="10" cy="11" r="0.5" fill="#070907" />
                <circle cx="7" cy="2" r="0.4" fill="#080908" />
              </pattern>
              <pattern id="orchard-grid" width="18" height="18" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="2.2" fill="#050705" />
                <circle cx="14" cy="14" r="2" fill="#050705" />
              </pattern>
              <pattern id="plowed-tex" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
                <line x1="0" y1="3" x2="6" y2="3" stroke="#080706" strokeWidth="0.8" />
              </pattern>

              <radialGradient id="hill-nw" cx="20%" cy="25%" r="45%">
                <stop offset="0%" stopColor="#090909" />
                <stop offset="100%" stopColor="#060606" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="valley-se" cx="75%" cy="70%" r="35%">
                <stop offset="0%" stopColor="#050505" />
                <stop offset="100%" stopColor="#060606" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width={VW} height={VH} fill="#060606" />
            <rect width={VW} height={VH} fill="url(#hill-nw)" />
            <rect width={VW} height={VH} fill="url(#valley-se)" />

            <path d="M0 0 L410 0 L420 175 L435 385 L0 385 Z" fill="#080807" />
            <path d="M0 0 L410 0 L420 175 L435 385 L0 385 Z" fill="url(#crop-rows-ns)" opacity="0.35" />

            <path d="M410 0 L920 0 L925 190 L435 385 L420 175 Z" fill="#080706" />
            <path d="M410 0 L920 0 L925 190 L435 385 L420 175 Z" fill="url(#plowed-tex)" opacity="0.3" />

            <path d="M920 0 L1600 0 L1600 375 L925 390 Z" fill="#060807" />
            <path d="M920 0 L1600 0 L1600 375 L925 390 Z" fill="url(#crop-rows-ew)" opacity="0.25" />

            <path d="M0 385 L435 385 L925 390 L1600 375 L1600 430 L935 440 L445 435 L0 435 Z" fill="#080808" />

            <path d="M0 435 L445 435 L455 660 L290 710 L0 710 Z" fill="#070907" />
            <path d="M0 435 L445 435 L455 660 L290 710 L0 710 Z" fill="url(#pasture-tex)" opacity="0.5" />

            <path d="M445 435 L935 440 L945 685 L455 660 Z" fill="#070806" />
            <path d="M445 435 L935 440 L945 685 L455 660 Z" fill="url(#orchard-grid)" opacity="0.3" />

            <path d="M935 440 L1600 430 L1600 900 L955 900 L945 685 Z" fill="#070807" />
            <path d="M935 440 L1600 430 L1600 900 L955 900 L945 685 Z" fill="url(#crop-rows-diag)" opacity="0.2" />

            <path d="M0 710 L290 710 L310 900 L0 900 Z" fill="#070706" />
            <path d="M0 710 L290 710 L310 900 L0 900 Z" fill="url(#plowed-tex)" opacity="0.15" />

            <path d="M290 710 L455 660 L945 685 L955 900 L310 900 Z" fill="#070907" />
            <path d="M290 710 L455 660 L945 685 L955 900 L310 900 Z" fill="url(#crop-rows-ns)" opacity="0.2" />

            <line x1="215" y1="0" x2="225" y2="385" stroke="#090909" strokeWidth="0.8" />
            <line x1="670" y1="0" x2="680" y2="390" stroke="#090909" strokeWidth="0.7" />
            <line x1="1250" y1="0" x2="1260" y2="375" stroke="#090909" strokeWidth="0.7" />
            <line x1="0" y1="190" x2="420" y2="185" stroke="#090909" strokeWidth="0.6" />
            <line x1="420" y1="185" x2="925" y2="195" stroke="#090909" strokeWidth="0.5" />
            <line x1="925" y1="195" x2="1600" y2="185" stroke="#090909" strokeWidth="0.6" />
            <line x1="700" y1="440" x2="690" y2="680" stroke="#080808" strokeWidth="0.6" />
            <line x1="1250" y1="430" x2="1260" y2="900" stroke="#080808" strokeWidth="0.6" />

            <path d="M435 0 Q438 100 440 200 Q442 300 445 390" fill="none" stroke="#040504" strokeWidth="3" />
            <path d="M920 0 Q923 95 926 195 Q928 295 930 395" fill="none" stroke="#040504" strokeWidth="2.5" />
            <path d="M0 385 Q200 388 445 390 Q680 392 935 395 Q1200 385 1600 378" fill="none" stroke="#050605" strokeWidth="4" />
            <path d="M445 430 Q446 540 452 650 Q456 680 458 670" fill="none" stroke="#040504" strokeWidth="2" />
            <path d="M935 435 Q938 520 942 620 Q944 660 948 690" fill="none" stroke="#040504" strokeWidth="2" />
            <path d="M0 710 Q140 712 290 715 Q320 718 310 900" fill="none" stroke="#040504" strokeWidth="2.5" />

            {[
              { x: 440, y: 180, r: 6 },{ x: 445, y: 250, r: 5 },{ x: 438, y: 330, r: 6 },
              { x: 930, y: 120, r: 5 },{ x: 925, y: 250, r: 6 },{ x: 928, y: 310, r: 5 },
            ].map((t, i) => (
              <circle key={`ht-${i}`} cx={t.x} cy={t.y} r={t.r} fill="#040604" opacity="0.5" />
            ))}

            <path d="M0 280 Q80 270 160 285 Q260 310 340 290 Q440 265 520 295 Q620 340 700 320 Q780 305 850 330 Q950 375 1050 360 Q1150 340 1250 370 Q1380 410 1500 395 Q1560 385 1600 400" fill="none" stroke="#06070E" strokeWidth="14" strokeLinecap="round" />
            <path d="M0 280 Q80 270 160 285 Q260 310 340 290 Q440 265 520 295 Q620 340 700 320 Q780 305 850 330 Q950 375 1050 360 Q1150 340 1250 370 Q1380 410 1500 395 Q1560 385 1600 400" fill="none" stroke="#050610" strokeWidth="6" strokeLinecap="round" />
            <g filter="url(#water-shimmer)">
              <path d="M0 280 Q80 270 160 285 Q260 310 340 290 Q440 265 520 295 Q620 340 700 320 Q780 305 850 330 Q950 375 1050 360 Q1150 340 1250 370 Q1380 410 1500 395 Q1560 385 1600 400" fill="none" stroke="rgba(80,90,140,0.08)" strokeWidth="8" strokeLinecap="round" />
            </g>

            <path d="M20 268 Q120 255 200 272 Q300 295 380 275 Q470 248 560 280 Q660 325 740 305" fill="none" stroke="#040604" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
            <path d="M40 295 Q130 288 210 300 Q310 325 390 305 Q480 280 570 310 Q670 355 750 335" fill="none" stroke="#040604" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
            <path d="M740 308 Q830 290 900 315 Q1000 360 1100 345 Q1200 325 1300 358 Q1420 400 1540 385 Q1580 378 1600 385" fill="none" stroke="#040604" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
            <path d="M760 340 Q850 345 920 350 Q1020 390 1120 375 Q1220 355 1320 385 Q1440 425 1560 410 Q1580 405 1600 415" fill="none" stroke="#040604" strokeWidth="4" strokeLinecap="round" opacity="0.6" />

            <g filter="url(#water-shimmer)">
              <ellipse cx="1400" cy="800" rx="75" ry="40" fill="#050610" stroke="#070818" strokeWidth="0.8" opacity="0.85" />
            </g>
            <ellipse cx="1400" cy="800" rx="55" ry="28" fill="none" stroke="#060712" strokeWidth="0.4" opacity="0.5" />
            <path d="M1330 790 Q1350 775 1390 770 Q1430 768 1460 778" fill="none" stroke="#040604" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
            <path d="M1345 815 Q1380 830 1430 832 Q1465 828 1475 818" fill="none" stroke="#040604" strokeWidth="3" strokeLinecap="round" opacity="0.5" />

            <path d="M80 85 Q130 50 200 65 Q260 80 270 130 Q265 175 220 190 Q160 200 110 180 Q60 155 55 120 Q55 95 80 85 Z" fill="#040604" stroke="#050705" strokeWidth="0.5" />
            {[{ x: 120, y: 100, r: 12 },{ x: 160, y: 90, r: 14 },{ x: 200, y: 105, r: 11 },{ x: 150, y: 140, r: 13 },{ x: 190, y: 155, r: 10 },{ x: 110, y: 150, r: 11 },{ x: 230, y: 130, r: 9 }].map((t, i) => (
              <circle key={`tw-${i}`} cx={t.x} cy={t.y} r={t.r} fill="#030503" opacity="0.6" />
            ))}

            <path d="M1340 60 Q1400 35 1470 55 Q1520 80 1510 130 Q1490 165 1430 175 Q1370 170 1340 140 Q1320 110 1325 80 Z" fill="#040604" stroke="#050705" strokeWidth="0.5" />
            {[{ x: 1380, y: 80, r: 14 },{ x: 1430, y: 65, r: 12 },{ x: 1470, y: 90, r: 11 },{ x: 1410, y: 120, r: 13 },{ x: 1460, y: 140, r: 10 },{ x: 1370, y: 140, r: 9 }].map((t, i) => (
              <circle key={`te-${i}`} cx={t.x} cy={t.y} r={t.r} fill="#030503" opacity="0.6" />
            ))}

            <path d="M40 540 Q90 510 150 525 Q185 555 170 595 Q140 625 90 630 Q45 615 30 580 Q30 555 40 540 Z" fill="#040604" stroke="#050705" strokeWidth="0.5" />
            {[{ x: 80, y: 545, r: 12 },{ x: 130, y: 540, r: 10 },{ x: 150, y: 570, r: 11 },{ x: 110, y: 590, r: 13 },{ x: 65, y: 585, r: 10 }].map((t, i) => (
              <circle key={`ts-${i}`} cx={t.x} cy={t.y} r={t.r} fill="#030503" opacity="0.6" />
            ))}

            <path d="M0 405 L1600 405" stroke="#0D0D0D" strokeWidth="14" />
            <path d="M0 405 L1600 405" stroke="#0F0F0F" strokeWidth="0.6" strokeDasharray="16 10" />
            <path d="M0 398 L1600 398" stroke="#0A0A0A" strokeWidth="0.5" />
            <path d="M0 412 L1600 412" stroke="#0A0A0A" strokeWidth="0.5" />

            <rect x="442" y="0" width="10" height={VH} fill="#0B0B0B" />
            <line x1="447" y1="0" x2="447" y2={VH} stroke="#0D0D0D" strokeWidth="0.4" strokeDasharray="8 6" />
            <rect x="932" y="0" width="10" height={VH} fill="#0B0B0B" />
            <line x1="937" y1="0" x2="937" y2={VH} stroke="#0D0D0D" strokeWidth="0.4" strokeDasharray="8 6" />

            <rect x="1246" y="405" width="7" height="290" fill="#0A0A0A" />
            <rect x="316" y="405" width="7" height="320" fill="#0A0A0A" />

            <path d="M320 720 Q500 650 680 550 Q860 450 1000 400" fill="none" stroke="#090909" strokeWidth="3.5" strokeDasharray="12 2" />
            <path d="M0 190 Q100 188 220 190 Q350 192 435 190" fill="none" stroke="#090909" strokeWidth="2.5" />
            <path d="M930 195 Q1050 193 1200 195 Q1400 198 1600 190" fill="none" stroke="#090909" strokeWidth="2.5" />
            <path d="M700 440 Q710 530 695 640 Q690 680 695 700" fill="none" stroke="#090909" strokeWidth="2" />

            <line x1="100" y1="0" x2="110" y2="280" stroke="#070708" strokeWidth="0.8" opacity="0.5" />
            <line x1="300" y1="0" x2="310" y2="280" stroke="#070708" strokeWidth="0.8" opacity="0.5" />
            <line x1="600" y1="0" x2="610" y2="290" stroke="#070708" strokeWidth="0.7" opacity="0.4" />
            <line x1="1100" y1="0" x2="1110" y2="290" stroke="#070708" strokeWidth="0.7" opacity="0.4" />
            <line x1="1400" y1="0" x2="1410" y2="290" stroke="#070708" strokeWidth="0.7" opacity="0.4" />

            <rect x="835" y="415" width="48" height="34" fill="#0D0D0D" stroke="#1A1A1A" strokeWidth="0.5" />
            <rect x="883" y="418" width="5" height="28" fill="#050505" opacity="0.5" />
            <rect x="835" y="449" width="48" height="4" fill="#050505" opacity="0.4" />
            <rect x="842" y="420" width="16" height="8" fill="none" stroke="#141414" strokeWidth="0.3" />
            <rect x="860" y="420" width="18" height="12" fill="none" stroke="#141414" strokeWidth="0.3" />

            <rect x="255" y="675" width="32" height="22" fill="#0D0D0D" stroke="#1A1A1A" strokeWidth="0.5" />
            <rect x="287" y="678" width="4" height="18" fill="#050505" opacity="0.4" />
            <rect x="250" y="697" width="40" height="15" fill="none" stroke="#0D0D0D" strokeWidth="0.4" strokeDasharray="2 2" />

            <rect x="826" y="75" width="22" height="18" fill="#0C0C0C" stroke="#181818" strokeWidth="0.4" />
            <rect x="848" y="77" width="3" height="16" fill="#050505" opacity="0.3" />

            <rect x="1286" y="665" width="38" height="25" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.5" />
            <rect x="1288" y="667" width="16" height="21" fill="none" stroke="#141414" strokeWidth="0.3" />
            <rect x="1306" y="667" width="16" height="21" fill="none" stroke="#141414" strokeWidth="0.3" />
            <rect x="1286" y="690" width="38" height="4" fill="#050505" opacity="0.4" />

            <rect x="454" y="432" width="14" height="10" fill="#0B0B0B" stroke="#161616" strokeWidth="0.3" />
            <rect x="938" y="435" width="12" height="9" fill="#0B0B0B" stroke="#161616" strokeWidth="0.3" />

            <rect x="18" y="18" width="1564" height="864" rx="4" fill="none" stroke="#0D0D0D" strokeWidth="1.2" strokeDasharray="5 3" />
            <rect x="440" y="16" width="16" height="4" fill="#0D0D0D" />
            <rect x="930" y="16" width="16" height="4" fill="#0D0D0D" />

            <path d="M0 130 Q200 100 500 140 Q800 180 1100 130 Q1350 90 1600 120" fill="none" stroke="#0A0A0A" strokeWidth="0.4" opacity="0.6" />
            <path d="M0 260 Q250 230 550 270 Q850 310 1150 260 Q1400 220 1600 250" fill="none" stroke="#0A0A0A" strokeWidth="0.35" opacity="0.5" />
            <path d="M0 500 Q300 480 600 520 Q900 560 1200 510 Q1450 470 1600 500" fill="none" stroke="#090909" strokeWidth="0.35" opacity="0.5" />
            <path d="M0 680 Q350 660 700 700 Q1050 740 1350 690 Q1500 670 1600 680" fill="none" stroke="#090909" strokeWidth="0.3" opacity="0.4" />
            <path d="M0 820 Q400 800 800 840 Q1200 870 1600 830" fill="none" stroke="#090909" strokeWidth="0.3" opacity="0.35" />


            <rect width={VW} height={VH} filter="url(#grain)" opacity="0.03" />

            <g className="sat-grid" opacity="0.035">
              {Array.from({ length: 33 }, (_, i) => (
                <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2={VH} stroke="#999" strokeWidth="0.4" />
              ))}
              {Array.from({ length: 19 }, (_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 50} x2={VW} y2={i * 50} stroke="#999" strokeWidth="0.4" />
              ))}
            </g>


            {meshLinks.map(([from, to], i) => (
              <line
                key={`ml-${i}`}
                className="mesh-line"
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke="rgba(255,96,68,0.06)"
                strokeWidth="1.2"
              />
            ))}

            {meshLinks.map((_, i) => (
              <circle key={`mp-${i}`} className="mesh-packet" data-link={i} r="2" fill="#FF6044" opacity="0" />
            ))}

            <ellipse className="uav01-shadow" cx={dock1.x} cy={dock1.y + 18} rx="8" ry="3" fill="rgba(0,0,0,0.35)" />
            <ellipse className="uav02-shadow" cx="800" cy="438" rx="6" ry="2.5" fill="rgba(0,0,0,0.25)" />


            <polyline className="uav01-trail" points="" fill="none" stroke="rgba(255,96,68,0.12)" strokeWidth="1.5" />


            <rect className="survey-fill" x="350" y="200" width="0" height="350" rx="2" fill="rgba(255,96,68,0.025)" stroke="rgba(255,96,68,0.05)" strokeWidth="0.5" opacity="0" />


            <rect className="scan-beam" x="0" y="0" width="50" height="70" rx="2" fill="rgba(255,96,68,0.04)" stroke="rgba(255,96,68,0.08)" strokeWidth="0.5" strokeDasharray="4 3" opacity="0" />
            <line className="scan-cross-h" x1="0" y1="0" x2="0" y2="0" stroke="rgba(255,96,68,0.06)" strokeWidth="0.3" opacity="0" />
            <line className="scan-cross-v" x1="0" y1="0" x2="0" y2="0" stroke="rgba(255,96,68,0.06)" strokeWidth="0.3" opacity="0" />

            <ellipse cx="800" cy="420" rx="580" ry="300" fill="none" stroke="rgba(255,96,68,0.03)" strokeWidth="1" strokeDasharray="6 10" />

            {ugvWaypoints.map((wp, i) => (
              <g key={`wp-${i}`} opacity="0.2">
                <rect x={wp.x - 5} y={wp.y - 5} width="10" height="10" fill="none" stroke="#555" strokeWidth="0.8" />
                <text x={wp.x} y={wp.y - 8} textAnchor="middle" fontSize="8" fill="#444" fontFamily="monospace">
                  {String.fromCharCode(65 + i)}
                </text>
              </g>
            ))}

            <polyline
              points={ugvWaypoints.map(wp => `${wp.x},${wp.y}`).join(' ') + ` ${ugvWaypoints[0].x},${ugvWaypoints[0].y}`}
              fill="none" stroke="rgba(163,163,163,0.08)" strokeWidth="1.5" strokeDasharray="4 3"
            />

            <polygon className="ugv-headlight" points="0,0 0,0 0,0" fill="rgba(255,240,200,0.05)" />
            <polygon className="ugv-headlight-wide" points="0,0 0,0 0,0" fill="rgba(255,240,200,0.025)" />

            <polyline className="ugv-tracks" points="" fill="none" stroke="rgba(160,140,100,0.06)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

            {[0, 1, 2].map(i => (
              <g key={`det-${i}`} className="detection-ping" opacity="0" transform="translate(0,0)">
                <rect x="-30" y="-14" width="60" height="28" fill="rgba(239,68,68,0.03)" stroke="none" rx="1" />
                <text x="0" y="3" textAnchor="middle" fontSize="8" fill="#EF4444" fontFamily="monospace" letterSpacing="0.8">DETECTED</text>
                <line x1="-30" y1="-14" x2="-23" y2="-14" stroke="#EF4444" strokeWidth="1" />
                <line x1="-30" y1="-14" x2="-30" y2="-7" stroke="#EF4444" strokeWidth="1" />
                <line x1="23" y1="-14" x2="30" y2="-14" stroke="#EF4444" strokeWidth="1" />
                <line x1="30" y1="-14" x2="30" y2="-7" stroke="#EF4444" strokeWidth="1" />
                <line x1="-30" y1="14" x2="-23" y2="14" stroke="#EF4444" strokeWidth="1" />
                <line x1="-30" y1="14" x2="-30" y2="7" stroke="#EF4444" strokeWidth="1" />
                <line x1="23" y1="14" x2="30" y2="14" stroke="#EF4444" strokeWidth="1" />
                <line x1="30" y1="14" x2="30" y2="7" stroke="#EF4444" strokeWidth="1" />
              </g>
            ))}

            <rect x={dock1.x - 28} y={dock1.y - 28} width="56" height="56" fill="#090909" stroke="#151515" strokeWidth="0.6" />

            <rect x={dock2.x - 24} y={dock2.y - 24} width="48" height="48" fill="#090909" stroke="#151515" strokeWidth="0.6" />

            {[sensor1, sensor2, sensor3].map((s, si) => (
              <circle key={`sp-fence-${si}`} cx={s.x} cy={s.y} r="20" fill="none" stroke="#121212" strokeWidth="0.6" strokeDasharray="3 2" />
            ))}

            <rect x={edgeHub.x - 22} y={edgeHub.y - 16} width="44" height="32" fill="#080808" stroke="#181818" strokeWidth="0.6" />

            {[sensor1, sensor2, sensor3, edgeHub].map((pos, i) => (
              <circle key={`sp-${i}`} className="sig-pulse" cx={pos.x} cy={pos.y} r="6" fill="none" stroke={i < 3 ? 'rgba(255,96,68,0.15)' : 'rgba(255,96,68,0.1)'} strokeWidth="0.8" />
            ))}

            <circle className="edge-ring" cx={edgeHub.x} cy={edgeHub.y} r="20" fill="none" stroke="#FF6044" strokeWidth="0.5" opacity="0.25" />
            <circle className="edge-ring" cx={edgeHub.x} cy={edgeHub.y} r="32" fill="none" stroke="#FF6044" strokeWidth="0.4" opacity="0.12" />
            <circle className="edge-ring" cx={edgeHub.x} cy={edgeHub.y} r="44" fill="none" stroke="#FF6044" strokeWidth="0.3" opacity="0.06" />

            {[
              { pos: sensor1, dur: 12, start: 0 },
              { pos: sensor2, dur: 15, start: 180 },
              { pos: sensor3, dur: 18, start: 90 },
            ].map(({ pos, dur, start }, i) => (
              <g key={`fov-${i}`} transform={`translate(${pos.x},${pos.y})`}>
                <path d="M0,0 L69,-40 A80,80 0 0,1 69,40 Z" fill="rgba(255,96,68,0.02)" stroke="rgba(255,96,68,0.05)" strokeWidth="0.5" />
                <animateTransform attributeName="transform" type="rotate" from={`${start}`} to={`${start + 360}`} dur={`${dur}s`} repeatCount="indefinite" additive="sum" />
              </g>
            ))}

            <circle className="charge-ring" cx={dock1.x} cy={dock1.y} r="18" fill="none" stroke="#E6C332" strokeWidth="1.5" strokeDasharray="113.1" strokeDashoffset="113.1" opacity="0" strokeLinecap="round" />

            <rect className="crt-scanline" x="0" y="-6" width={VW} height="6" fill="rgba(255,255,255,0.015)" />
          </svg>

          <div className="absolute inset-0">

            <div
              className="uav-01 hw-node absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(dock1.x / VW) * 100}%`, top: `${(dock1.y / VH) * 100}%` }}
            >
              <Drone id="d1" className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-[0_0_4px_rgba(255,96,68,0.3)]" />
              <InfraLabel
                label="UAV-01 · SURVEY"
                color="#777" dotColor="#22C55E"
                className="infra-tag absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
              />
            </div>

            <div
              className="uav-02 hw-node absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(dock2.x / VW) * 100}%`, top: `${(dock2.y / VH) * 100}%` }}
            >
              <Drone id="d2" className="w-5 h-5 sm:w-7 sm:h-7 drop-shadow-[0_0_3px_rgba(255,96,68,0.25)]" />
              <InfraLabel
                label="UAV-02 · PATROL"
                color="#777" dotColor="#22C55E"
                className="infra-tag absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
              />
            </div>

            <div
              className="uav-03 hw-node absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(dock1.x / VW) * 100}%`, top: `${(dock1.y / VH) * 100}%` }}
            >
              <Drone id="d3" className="w-4 h-4 sm:w-6 sm:h-6 opacity-50" />
              <InfraLabel
                label="UAV-03 · CHARGING"
                color="#555" dotColor="#E6C332"
                className="infra-tag absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
              />
            </div>

            <div
              className="ugv-01 hw-node absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(ugvWaypoints[0].x / VW) * 100}%`, top: `${(ugvWaypoints[0].y / VH) * 100}%` }}
            >
              <GroundVehicle id="ugv1" className="w-6 h-4 sm:w-9 sm:h-5" />
              <InfraLabel
                label="UGV-01 · PATROL"
                color="#777" dotColor="#22C55E"
                className="infra-tag absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
              />
            </div>

            <div className="infra-node dock-01 absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(dock1.x / VW) * 100}%`, top: `${(dock1.y / VH) * 100}%` }}>
              <DockStation id="dk1" className="w-10 h-10 sm:w-14 sm:h-14" />
              <InfraLabel label="DOCK-01" color="#666" dotColor="#22C55E" className="infra-tag absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap" />
            </div>

            <div className="infra-node dock-02 absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(dock2.x / VW) * 100}%`, top: `${(dock2.y / VH) * 100}%` }}>
              <DockStation id="dk2" className="w-8 h-8 sm:w-12 sm:h-12" />
              <InfraLabel label="DOCK-02" color="#666" dotColor="#22C55E" className="infra-tag absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap" />
            </div>

            <div className="infra-node absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(sensor1.x / VW) * 100}%`, top: `${(sensor1.y / VH) * 100}%` }}>
              <SensorNode id="sn1" className="w-6 h-6 sm:w-8 sm:h-8" />
              <InfraLabel label="SENSOR-W" color="#555" className="infra-tag absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap" />
            </div>

            <div className="infra-node absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(sensor2.x / VW) * 100}%`, top: `${(sensor2.y / VH) * 100}%` }}>
              <SensorNode id="sn2" className="w-6 h-6 sm:w-8 sm:h-8" />
              <InfraLabel label="SENSOR-E" color="#555" className="infra-tag absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap" />
            </div>

            <div className="infra-node absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(sensor3.x / VW) * 100}%`, top: `${(sensor3.y / VH) * 100}%` }}>
              <SensorNode id="sn3" className="w-6 h-6 sm:w-8 sm:h-8" />
              <InfraLabel label="SENSOR-N" color="#555" className="infra-tag absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap" />
            </div>

            <div className="infra-node absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${(edgeHub.x / VW) * 100}%`, top: `${(edgeHub.y / VH) * 100}%` }}>
              <span className="font-mono text-[7px] sm:text-[9px] text-primary tracking-widest font-medium">EDGE HUB</span>
              <span className="font-mono text-[5px] sm:text-[7px] text-[#444] tracking-wider">ORCHESTRATING</span>
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <InfraLabel label="EDGE SDK" color="#FF6044" className="infra-tag absolute" style={{ left: '47%', top: '41%' }} />
            <InfraLabel label="MESH NETWORK" color="#2A2A2A" className="infra-tag absolute" style={{ left: '28%', top: '22%' }} />
            <InfraLabel label="TELEMETRY" color="#2A2A2A" className="infra-tag absolute" style={{ left: '65%', top: '58%' }} />
            <InfraLabel label="MISSION CTRL" color="#2A2A2A" className="infra-tag absolute" style={{ left: '12%', top: '55%' }} />
            <InfraLabel label="DEVICE REGISTRY" color="#2A2A2A" className="infra-tag absolute" style={{ right: '6%', top: '72%' }} />
          </div>

          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-[72px] h-[40px] sm:w-[96px] sm:h-[54px] bg-[#030303]/90 border border-[#1A1A1A] overflow-hidden pointer-events-none z-10">
            <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <rect width={VW} height={VH} fill="#040404" />
              <rect x="20" y="20" width="1560" height="860" fill="none" stroke="#1A1A1A" strokeWidth="8" />
              <rect x="0" y="394" width={VW} height="12" fill="#0A0A0A" />
              <rect x="444" y="0" width="8" height={VH} fill="#090909" />
              <rect x="936" y="0" width="8" height={VH} fill="#090909" />
              <rect x={dock1.x - 8} y={dock1.y - 8} width="16" height="16" fill="#1A1A1A" />
              <rect x={dock2.x - 7} y={dock2.y - 7} width="14" height="14" fill="#1A1A1A" />
              <circle cx={edgeHub.x} cy={edgeHub.y} r="8" fill="#FF6044" opacity="0.3" />
              {[sensor1, sensor2, sensor3].map((s, i) => (
                <circle key={`mm-s${i}`} cx={s.x} cy={s.y} r="6" fill="#333" />
              ))}
              <circle className="mm-uav01" cx={dock1.x} cy={dock1.y} r="10" fill="#FF6044" opacity="0.9">
                <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle className="mm-uav02" cx={dock2.x} cy={dock2.y} r="9" fill="#FF6044" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
              </circle>
              <circle className="mm-ugv01" cx={ugvWaypoints[0].x} cy={ugvWaypoints[0].y} r="9" fill="#22C55E" opacity="0.9">
                <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
            <span className="absolute bottom-0 left-0 right-0 bg-[#050505]/80 text-center font-mono text-[4px] sm:text-[5px] text-[#333] tracking-wider py-px">TACTICAL MAP</span>
          </div>

          <HudFrame />

          <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 sm:gap-4 px-3 py-1.5 bg-[#050505]/90 border-t border-[#111]">
            <InfraLabel label="11 NODES" dotColor="#22C55E" color="#555" />
            <span className="font-mono text-[7px] text-[#1A1A1A]">|</span>
            <InfraLabel label="MESH OK" dotColor="#22C55E" color="#555" />
            <span className="font-mono text-[7px] text-[#1A1A1A]">|</span>
            <span className="latency-readout font-mono text-[7px] sm:text-[9px] tracking-widest uppercase" style={{ color: '#444' }}>14ms</span>
            <span className="font-mono text-[7px] text-[#1A1A1A]">|</span>
            <InfraLabel label="SURVEY ACTIVE" dotColor="#FF6044" color="#444" />
            <span className="font-mono text-[7px] text-[#1A1A1A]">|</span>
            <InfraLabel label="UGV PATROLLING" dotColor="#22C55E" color="#444" />
            <span className="font-mono text-[7px] text-[#1A1A1A]">|</span>
            <span className="live-clock font-mono text-[7px] text-[#333] tracking-wider">00:00:00 UTC</span>
            <span className="font-mono text-[7px] text-[#1A1A1A]">|</span>
            <span className="frame-count font-mono text-[7px] text-[#222] tracking-wider">F00000</span>
            <span className="font-mono text-[7px] text-[#1A1A1A]">|</span>
            <span className="event-log font-mono text-[7px] text-[#333] tracking-wider truncate max-w-[140px] sm:max-w-[200px]">&gt; SYSTEM READY</span>
            <span className="ml-auto font-mono text-[7px] text-[#222]">EU-WEST-1 · ALT 120M</span>
          </div>
        </div>

        <div className="pillar-grid grid grid-cols-1 sm:grid-cols-3 gap-px mt-px bg-[#111]">
          {[
            { title: 'Edge-native compute', desc: 'SDK runs on the device. Adapters normalize hardware. Platform handles routing, not your code.', tag: 'EDGE SDK' },
            { title: 'Mesh-grade networking', desc: 'Peer-to-peer between hardware, uplink to your infrastructure. Disconnection-tolerant by design.', tag: 'NETWORKING' },
            { title: 'Deploy on your terms', desc: 'EU cloud, on-premise rack, or fully air-gapped. Same containers, same config, your compliance.', tag: 'DEPLOYMENT' },
          ].map((p) => (
            <div key={p.tag} className="pillar-card bg-[#080808] p-5 sm:p-6">
              <span className="font-mono text-[9px] text-primary tracking-widest uppercase mb-2 block">{p.tag}</span>
              <h3 className="font-heading text-sm sm:text-base text-foreground mb-2">{p.title}</h3>
              <p className="font-mono text-[11px] sm:text-xs text-[#555] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformShowcase;
