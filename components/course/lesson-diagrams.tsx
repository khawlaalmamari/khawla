// Simplified, labeled schematic diagrams for the built lessons — not
// attempts at realistic/photographic anatomy (which would need a real
// licensed illustration or 3D asset this project doesn't have). These are
// the same kind of simple line diagrams used in introductory textbooks to
// teach a concept, not a substitute for the 3D Anatomy Explorer.

const T_PRIMARY = "#0f766e";
const T_PRIMARY_LIGHT = "#99f6e4";
const T_ACCENT = "#f59e0b";
const T_NEUTRAL = "#94a3b8";
const T_NEUTRAL_DARK = "#334155";
const T_TEXT = "#1e293b";

function DiagramFrame({ children, viewBox = "0 0 400 220" }: { children: React.ReactNode; viewBox?: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4" dir="ltr">
      <svg
        viewBox={viewBox}
        className="mx-auto h-auto w-full max-w-md"
        role="img"
        style={{ direction: "ltr" }}
      >
        {children}
      </svg>
    </div>
  );
}

function Label({ x, y, children, size = 11, anchor = "middle", weight = "600", fill = T_TEXT }: {
  x: number; y: number; children: React.ReactNode; size?: number; anchor?: "start" | "middle" | "end"; weight?: string; fill?: string;
}) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} textAnchor={anchor} fill={fill}>
      {children}
    </text>
  );
}

// 1. Levels of structural organization
function LevelsOfOrganizationDiagram({ locale }: { locale: string }) {
  const levels = locale === "ar"
    ? ["كيميائي", "خلوي", "نسيجي", "عضوي", "أجهزة", "كائني"]
    : ["Chemical", "Cellular", "Tissue", "Organ", "Organ System", "Organismal"];
  const boxW = 340, boxH = 24, gap = 8, startY = 15;
  return (
    <DiagramFrame viewBox={`0 0 400 ${startY + levels.length * (boxH + gap) + 10}`}>
      {levels.map((label, i) => {
        const y = startY + i * (boxH + gap);
        return (
          <g key={label}>
            <rect x={30} y={y} width={boxW} height={boxH} rx={6} fill={i === levels.length - 1 ? T_PRIMARY : T_PRIMARY_LIGHT} stroke={T_PRIMARY} strokeWidth={1.5} />
            <Label x={200} y={y + boxH / 2 + 4} fill={i === levels.length - 1 ? "#fff" : T_TEXT}>{label}</Label>
            {i < levels.length - 1 && (
              <path d={`M200 ${y + boxH + 1} L200 ${y + boxH + gap - 1}`} stroke={T_NEUTRAL_DARK} strokeWidth={2} markerEnd="url(#arrow)" />
            )}
          </g>
        );
      })}
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={T_NEUTRAL_DARK} />
        </marker>
      </defs>
    </DiagramFrame>
  );
}

// 2. Anatomical position, directional terms, and body planes
function TerminologyPlanesDiagram({ locale }: { locale: string }) {
  const t = locale === "ar"
    ? { sup: "علوي", inf: "سفلي", med: "إنسي", lat: "وحشي", sag: "سهمي", front: "جبهي", trans: "مستعرض" }
    : { sup: "Superior", inf: "Inferior", med: "Medial", lat: "Lateral", sag: "Sagittal", front: "Frontal", trans: "Transverse" };
  return (
    <DiagramFrame viewBox="0 0 400 260">
      {/* Simple stick figure in anatomical position */}
      <circle cx={100} cy={40} r={14} fill="none" stroke={T_NEUTRAL_DARK} strokeWidth={2} />
      <line x1={100} y1={54} x2={100} y2={110} stroke={T_NEUTRAL_DARK} strokeWidth={2} />
      <line x1={100} y1={65} x2={75} y2={100} stroke={T_NEUTRAL_DARK} strokeWidth={2} />
      <line x1={100} y1={65} x2={125} y2={100} stroke={T_NEUTRAL_DARK} strokeWidth={2} />
      <line x1={100} y1={110} x2={82} y2={160} stroke={T_NEUTRAL_DARK} strokeWidth={2} />
      <line x1={100} y1={110} x2={118} y2={160} stroke={T_NEUTRAL_DARK} strokeWidth={2} />

      <line x1={100} y1={20} x2={100} y2={5} stroke={T_PRIMARY} strokeWidth={2} markerEnd="url(#arrow2)" />
      <Label x={100} y={0} size={10} fill={T_PRIMARY}>{t.sup}</Label>
      <line x1={100} y1={165} x2={100} y2={185} stroke={T_PRIMARY} strokeWidth={2} markerEnd="url(#arrow2)" />
      <Label x={100} y={198} size={10} fill={T_PRIMARY}>{t.inf}</Label>

      <line x1={95} y1={80} x2={100} y2={80} stroke={T_ACCENT} strokeWidth={2} markerEnd="url(#arrow2)" />
      <Label x={60} y={83} size={10} fill={T_ACCENT}>{t.med}</Label>
      <line x1={105} y1={80} x2={135} y2={80} stroke={T_ACCENT} strokeWidth={2} markerEnd="url(#arrow2)" />
      <Label x={160} y={83} size={10} fill={T_ACCENT}>{t.lat}</Label>

      {/* Body planes */}
      <g transform="translate(210,10)">
        <rect x={0} y={0} width={80} height={120} rx={8} fill="#f1f5f9" stroke={T_NEUTRAL} />
        <line x1={40} y1={0} x2={40} y2={120} stroke={T_PRIMARY} strokeWidth={2.5} />
        <Label x={40} y={135} size={10} fill={T_PRIMARY}>{t.sag}</Label>

        <rect x={100} y={0} width={80} height={120} rx={8} fill="#f1f5f9" stroke={T_NEUTRAL} />
        <line x1={100} y1={60} x2={180} y2={60} stroke={T_ACCENT} strokeWidth={2.5} />
        <Label x={140} y={135} size={10} fill={T_ACCENT}>{t.front}</Label>
      </g>
      <g transform="translate(210,160)">
        <rect x={0} y={0} width={80} height={50} rx={8} fill="#f1f5f9" stroke={T_NEUTRAL} />
        <ellipse cx={40} cy={25} rx={38} ry={8} fill="none" stroke={T_PRIMARY} strokeWidth={2.5} strokeDasharray="4 2" />
        <Label x={40} y={70} size={10} fill={T_PRIMARY}>{t.trans}</Label>
      </g>

      <defs>
        <marker id="arrow2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
        </marker>
      </defs>
    </DiagramFrame>
  );
}

// 3. Body cavities and abdominal quadrants
function CavitiesRegionsDiagram({ locale }: { locale: string }) {
  const t = locale === "ar"
    ? { dorsal: "التجويف الظهري", ventral: "التجويف البطني", thoracic: "صدري", abdpel: "بطني حوضي", ruq: "علوي أيمن", luq: "علوي أيسر", rlq: "سفلي أيمن", llq: "سفلي أيسر" }
    : { dorsal: "Dorsal Cavity", ventral: "Ventral Cavity", thoracic: "Thoracic", abdpel: "Abdominopelvic", ruq: "RUQ", luq: "LUQ", rlq: "RLQ", llq: "LLQ" };
  return (
    <DiagramFrame viewBox="0 0 400 220">
      <g transform="translate(20,10)">
        <rect x={0} y={0} width={30} height={190} rx={10} fill="#fde68a" stroke={T_ACCENT} />
        <text x={15} y={100} fontSize={10} fontWeight="600" fill={T_TEXT} textAnchor="middle" transform="rotate(-90 15 100)">{t.dorsal}</text>

        <rect x={40} y={0} width={90} height={70} rx={8} fill={T_PRIMARY_LIGHT} stroke={T_PRIMARY} />
        <Label x={85} y={38} size={10}>{t.thoracic}</Label>
        <rect x={40} y={78} width={90} height={112} rx={8} fill="#bae6fd" stroke="#0284c7" />
        <Label x={85} y={125} size={10}>{t.abdpel}</Label>
      </g>

      <g transform="translate(200,20)">
        <Label x={90} y={0} size={11}>{locale === "ar" ? "أرباع البطن" : "Abdominal Quadrants"}</Label>
        <rect x={20} y={10} width={140} height={140} fill="none" stroke={T_NEUTRAL_DARK} strokeWidth={1.5} />
        <line x1={90} y1={10} x2={90} y2={150} stroke={T_NEUTRAL_DARK} strokeWidth={1.5} />
        <line x1={20} y1={80} x2={160} y2={80} stroke={T_NEUTRAL_DARK} strokeWidth={1.5} />
        <Label x={55} y={50} size={10}>{t.ruq}</Label>
        <Label x={125} y={50} size={10}>{t.luq}</Label>
        <Label x={55} y={120} size={10}>{t.rlq}</Label>
        <Label x={125} y={120} size={10}>{t.llq}</Label>
      </g>
    </DiagramFrame>
  );
}

// 4. Negative feedback loop
function HomeostasisDiagram({ locale }: { locale: string }) {
  const t = locale === "ar"
    ? { stim: "مؤثر", rec: "مستقبل", ctrl: "مركز التحكم", eff: "المستجيب", resp: "الاستجابة" }
    : { stim: "Stimulus", rec: "Receptor", ctrl: "Control Center", eff: "Effector", resp: "Response" };
  const nodes = [
    { x: 200, y: 20, label: t.stim },
    { x: 340, y: 100, label: t.rec },
    { x: 260, y: 190, label: t.ctrl },
    { x: 100, y: 190, label: t.eff },
    { x: 30, y: 100, label: t.resp },
  ];
  return (
    <DiagramFrame viewBox="0 0 400 220">
      <circle cx={200} cy={105} r={95} fill="none" stroke={T_NEUTRAL} strokeDasharray="3 3" />
      {nodes.map((n, i) => {
        const next = nodes[(i + 1) % nodes.length];
        return <path key={i} d={`M${n.x},${n.y} L${next.x},${next.y}`} stroke={T_PRIMARY} strokeWidth={2} markerEnd="url(#arrow3)" />;
      })}
      {nodes.map((n) => (
        <g key={n.label}>
          <rect x={n.x - 45} y={n.y - 12} width={90} height={24} rx={6} fill="#fff" stroke={T_PRIMARY} strokeWidth={1.5} />
          <Label x={n.x} y={n.y + 4} size={9.5}>{n.label}</Label>
        </g>
      ))}
      <Label x={200} y={108} size={11} fill={T_PRIMARY}>{locale === "ar" ? "تغذية راجعة سلبية" : "Negative Feedback"}</Label>
      <defs>
        <marker id="arrow3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={T_PRIMARY} />
        </marker>
      </defs>
    </DiagramFrame>
  );
}

// 5. Patient positions
function PatientPositionsDiagram({ locale }: { locale: string }) {
  const positions = locale === "ar"
    ? ["ظهري", "انبطاح", "جانبي", "فاولر", "ترندلينبيرغ"]
    : ["Supine", "Prone", "Lateral", "Fowler's", "Trendelenburg"];
  return (
    <DiagramFrame viewBox="0 0 400 140">
      {positions.map((label, i) => {
        const cx = 40 + i * 78;
        return (
          <g key={label}>
            <line x1={cx - 28} y1={90} x2={cx + 28} y2={90} stroke={T_NEUTRAL} strokeWidth={3} />
            {label === positions[3] ? (
              <path d={`M${cx - 20},90 L${cx - 20},70 L${cx + 20},55`} fill="none" stroke={T_NEUTRAL_DARK} strokeWidth={2} />
            ) : label === positions[4] ? (
              <line x1={cx - 28} y1={95} x2={cx + 28} y2={78} stroke={T_NEUTRAL} strokeWidth={3} />
            ) : null}
            <ellipse
              cx={cx}
              cy={label === positions[1] ? 78 : label === positions[3] ? 60 : 78}
              rx={22} ry={9}
              fill={T_PRIMARY_LIGHT} stroke={T_PRIMARY} strokeWidth={1.5}
              transform={label === positions[2] ? `rotate(-15 ${cx} 78)` : undefined}
            />
            <circle cx={cx - (label === positions[1] ? -20 : 20)} cy={label === positions[1] ? 78 : 78} r={7} fill={T_PRIMARY_LIGHT} stroke={T_PRIMARY} />
            <Label x={cx} y={115} size={9.5}>{label}</Label>
          </g>
        );
      })}
    </DiagramFrame>
  );
}

// 6. Axial vs appendicular skeleton
function SkeletonRegionsDiagram({ locale }: { locale: string }) {
  const t = locale === "ar" ? { axial: "الهيكل المحوري", app: "الهيكل الطرفي" } : { axial: "Axial Skeleton", app: "Appendicular Skeleton" };
  return (
    <DiagramFrame viewBox="0 0 260 240">
      <g transform="translate(90,10)">
        <circle cx={30} cy={20} r={18} fill="none" stroke={T_PRIMARY} strokeWidth={3} />
        <line x1={30} y1={38} x2={30} y2={130} stroke={T_PRIMARY} strokeWidth={4} />
        <ellipse cx={30} cy={70} rx={28} ry={30} fill="none" stroke={T_PRIMARY} strokeWidth={3} />
        <path d="M2,150 L58,150 L48,175 L12,175 Z" fill="none" stroke={T_PRIMARY} strokeWidth={3} />

        <line x1={2} y1={70} x2={-35} y2={110} stroke={T_ACCENT} strokeWidth={4} />
        <line x1={-35} y1={110} x2={-45} y2={160} stroke={T_ACCENT} strokeWidth={4} />
        <line x1={58} y1={70} x2={95} y2={110} stroke={T_ACCENT} strokeWidth={4} />
        <line x1={95} y1={110} x2={105} y2={160} stroke={T_ACCENT} strokeWidth={4} />

        <line x1={12} y1={175} x2={5} y2={230} stroke={T_ACCENT} strokeWidth={4} />
        <line x1={48} y1={175} x2={55} y2={230} stroke={T_ACCENT} strokeWidth={4} />
      </g>
      <g transform="translate(10,205)">
        <rect x={0} y={0} width={14} height={14} fill={T_PRIMARY} />
        <Label x={45} y={11} anchor="start" size={10}>{t.axial}</Label>
        <rect x={130} y={0} width={14} height={14} fill={T_ACCENT} />
        <Label x={150} y={11} anchor="start" size={10}>{t.app}</Label>
      </g>
    </DiagramFrame>
  );
}

// 7. Long bone structure + bone shape types
function BoneStructureDiagram({ locale }: { locale: string }) {
  const t = locale === "ar"
    ? { epi: "المشاش", meta: "الكردوسية", dia: "الديافيز", med: "التجويف النخاعي", peri: "السمحاق", long: "طويلة", short: "قصيرة", flat: "مسطحة", irr: "غير منتظمة", ses: "سمسمانية" }
    : { epi: "Epiphysis", meta: "Metaphysis", dia: "Diaphysis", med: "Medullary cavity", peri: "Periosteum", long: "Long", short: "Short", flat: "Flat", irr: "Irregular", ses: "Sesamoid" };
  return (
    <DiagramFrame viewBox="0 0 400 240">
      <g transform="translate(30,10)">
        <path d="M40,0 C10,10 10,35 30,45 L30,140 C10,150 10,175 40,185 L60,185 C90,175 90,150 70,140 L70,45 C90,35 90,10 60,0 Z" fill="#fdf2e9" stroke={T_NEUTRAL_DARK} strokeWidth={1.5} />
        <rect x={38} y={50} width={24} height={85} fill="#fff7ed" stroke={T_NEUTRAL} strokeDasharray="2 2" />
        <line x1={70} y1={20} x2={110} y2={15} stroke={T_NEUTRAL_DARK} /><Label x={150} y={17} size={9.5} anchor="start">{t.epi}</Label>
        <line x1={72} y1={45} x2={110} y2={45} stroke={T_NEUTRAL_DARK} /><Label x={150} y={48} size={9.5} anchor="start">{t.meta}</Label>
        <line x1={70} y1={90} x2={110} y2={90} stroke={T_NEUTRAL_DARK} /><Label x={150} y={93} size={9.5} anchor="start">{t.dia}</Label>
        <line x1={50} y1={90} x2={20} y2={110} stroke={T_NEUTRAL_DARK} /><Label x={15} y={125} size={9} anchor="middle">{t.med}</Label>
        <line x1={30} y1={60} x2={-10} y2={55} stroke={T_NEUTRAL_DARK} /><Label x={-15} y={45} size={9} anchor="middle">{t.peri}</Label>
      </g>
      <g transform="translate(230,30)">
        <rect x={0} y={0} width={40} height={10} fill={T_PRIMARY_LIGHT} stroke={T_PRIMARY} /><Label x={55} y={9} size={9} anchor="start">{t.long}</Label>
        <rect x={0} y={30} width={16} height={16} fill={T_PRIMARY_LIGHT} stroke={T_PRIMARY} /><Label x={55} y={41} size={9} anchor="start">{t.short}</Label>
        <rect x={0} y={60} width={30} height={8} fill={T_PRIMARY_LIGHT} stroke={T_PRIMARY} /><Label x={55} y={68} size={9} anchor="start">{t.flat}</Label>
        <path d="M0,90 q10,-15 20,0 t20,0 q-5,15 -20,10 q-15,5 -20,-10" fill={T_PRIMARY_LIGHT} stroke={T_PRIMARY} /><Label x={65} y={95} size={9} anchor="start">{t.irr}</Label>
        <circle cx={10} cy={120} r={7} fill={T_PRIMARY_LIGHT} stroke={T_PRIMARY} /><Label x={55} y={124} size={9} anchor="start">{t.ses}</Label>
      </g>
    </DiagramFrame>
  );
}

// 8. Skeleton with labeled regions
function SkeletonLabeledDiagram({ locale }: { locale: string }) {
  const t = locale === "ar"
    ? { skull: "الجمجمة", spine: "العمود الفقري", cage: "القفص الصدري", pectoral: "الحزام الصدري", upper: "الطرف العلوي", pelvic: "الحزام الحوضي", lower: "الطرف السفلي" }
    : { skull: "Skull", spine: "Vertebral Column", cage: "Thoracic Cage", pectoral: "Pectoral Girdle", upper: "Upper Limb", pelvic: "Pelvic Girdle", lower: "Lower Limb" };
  return (
    <DiagramFrame viewBox="0 0 400 260">
      <g transform="translate(150,10)" stroke={T_NEUTRAL_DARK} strokeWidth={2.5} fill="none">
        <circle cx={30} cy={20} r={18} />
        <line x1={30} y1={38} x2={30} y2={140} strokeDasharray="4 2" />
        <ellipse cx={30} cy={75} rx={26} ry={28} />
        <line x1={4} y1={65} x2={-30} y2={100} /><line x1={-30} y1={100} x2={-38} y2={155} />
        <line x1={56} y1={65} x2={90} y2={100} /><line x1={90} y1={100} x2={98} y2={155} />
        <path d="M4,145 L56,145 L46,170 L14,170 Z" />
        <line x1={14} y1={170} x2={8} y2={230} /><line x1={46} y1={170} x2={52} y2={230} />
      </g>
      {[
        { x: 260, y: 25, label: t.skull, anchor: "start" as const },
        { x: 260, y: 70, label: t.spine, anchor: "start" as const },
        { x: 260, y: 100, label: t.cage, anchor: "start" as const },
        { x: 130, y: 105, label: t.pectoral, anchor: "end" as const },
        { x: 130, y: 140, label: t.upper, anchor: "end" as const },
        { x: 260, y: 150, label: t.pelvic, anchor: "start" as const },
        { x: 260, y: 195, label: t.lower, anchor: "start" as const },
      ].map((c) => (
        <Label key={c.label} x={c.x} y={c.y} size={10} anchor={c.anchor}>{c.label}</Label>
      ))}
    </DiagramFrame>
  );
}

// 9. Joint types
function JointTypesDiagram({ locale }: { locale: string }) {
  const t = locale === "ar" ? { fib: "ليفي (درز)", cart: "غضروفي (قرص)", syn: "زليلي" } : { fib: "Fibrous (suture)", cart: "Cartilaginous (disc)", syn: "Synovial" };
  return (
    <DiagramFrame viewBox="0 0 400 160">
      <g transform="translate(20,20)">
        <path d="M0,20 L15,0 L30,20 L45,0 L60,20" fill="none" stroke={T_NEUTRAL_DARK} strokeWidth={3} />
        <rect x={-5} y={20} width={70} height={20} fill={T_PRIMARY_LIGHT} stroke={T_PRIMARY} />
        <Label x={30} y={65} size={9.5}>{t.fib}</Label>
      </g>
      <g transform="translate(150,10)">
        <rect x={0} y={0} width={70} height={25} fill={T_PRIMARY_LIGHT} stroke={T_PRIMARY} />
        <ellipse cx={35} cy={32} rx={35} ry={8} fill="#fef3c7" stroke={T_ACCENT} />
        <rect x={0} y={40} width={70} height={25} fill={T_PRIMARY_LIGHT} stroke={T_PRIMARY} />
        <Label x={35} y={80} size={9.5}>{t.cart}</Label>
      </g>
      <g transform="translate(280,10)">
        <path d="M0,0 Q35,20 70,0 L70,25 Q35,35 0,25 Z" fill={T_PRIMARY_LIGHT} stroke={T_PRIMARY} />
        <path d="M0,55 Q35,35 70,55 L70,30 Q35,20 0,30 Z" fill={T_PRIMARY_LIGHT} stroke={T_PRIMARY} />
        <ellipse cx={35} cy={30} rx={30} ry={10} fill="#dbeafe" stroke="#0284c7" strokeDasharray="2 2" />
        <Label x={35} y={80} size={9.5}>{t.syn}</Label>
      </g>
    </DiagramFrame>
  );
}

// 10. Fracture types + injection landmark
function FracturesLandmarkDiagram({ locale }: { locale: string }) {
  const t = locale === "ar"
    ? { closed: "مغلق", open: "مفتوح", green: "غصني أخضر", comm: "مفتت", stress: "إجهاد", crest: "قمة الحرقفة" }
    : { closed: "Closed", open: "Open", green: "Greenstick", comm: "Comminuted", stress: "Stress", crest: "Iliac crest" };
  const bones = [
    { label: t.closed, draw: (cx: number) => <line x1={cx - 20} y1={30} x2={cx + 20} y2={30} stroke={T_NEUTRAL_DARK} strokeWidth={6} /> },
    { label: t.open, draw: (cx: number) => <><line x1={cx - 20} y1={30} x2={cx - 3} y2={30} stroke={T_NEUTRAL_DARK} strokeWidth={6} /><line x1={cx + 3} y1={30} x2={cx + 20} y2={30} stroke={T_NEUTRAL_DARK} strokeWidth={6} /><path d={`M${cx - 3},20 L${cx + 3},40`} stroke="#dc2626" strokeWidth={2} /></> },
    { label: t.green, draw: (cx: number) => <path d={`M${cx - 20},30 Q${cx},15 ${cx + 20},30`} stroke={T_NEUTRAL_DARK} strokeWidth={6} fill="none" /> },
    { label: t.comm, draw: (cx: number) => <><line x1={cx - 20} y1={30} x2={cx - 6} y2={30} stroke={T_NEUTRAL_DARK} strokeWidth={6} /><circle cx={cx} cy={30} r={4} fill={T_NEUTRAL_DARK} /><line x1={cx + 6} y1={30} x2={cx + 20} y2={30} stroke={T_NEUTRAL_DARK} strokeWidth={6} /></> },
    { label: t.stress, draw: (cx: number) => <><line x1={cx - 20} y1={30} x2={cx + 20} y2={30} stroke={T_NEUTRAL_DARK} strokeWidth={6} /><path d={`M${cx},22 L${cx},38`} stroke="#dc2626" strokeWidth={1.5} /></> },
  ];
  return (
    <DiagramFrame viewBox="0 0 400 190">
      {bones.map((b, i) => {
        const cx = 45 + i * 75;
        return (
          <g key={b.label}>
            {b.draw(cx)}
            <Label x={cx} y={55} size={9}>{b.label}</Label>
          </g>
        );
      })}
      <g transform="translate(100,80)">
        <path d="M0,20 Q60,-10 120,20 L110,70 Q60,90 10,70 Z" fill={T_PRIMARY_LIGHT} stroke={T_PRIMARY} strokeWidth={2} />
        <circle cx={20} cy={22} r={5} fill="#dc2626" />
        <line x1={20} y1={22} x2={20} y2={0} stroke="#dc2626" />
        <Label x={20} y={-5} size={10} fill="#dc2626">{t.crest}</Label>
      </g>
    </DiagramFrame>
  );
}

export const lessonDiagrams: Record<string, (props: { locale: string }) => React.ReactElement> = {
  "intro-anatomy-overview": LevelsOfOrganizationDiagram,
  "intro-anatomy-terminology-planes": TerminologyPlanesDiagram,
  "intro-anatomy-cavities-regions": CavitiesRegionsDiagram,
  "intro-anatomy-homeostasis": HomeostasisDiagram,
  "intro-anatomy-clinical-basics": PatientPositionsDiagram,
  "skeletal-introduction": SkeletonRegionsDiagram,
  "skeletal-anatomical-structures": BoneStructureDiagram,
  "skeletal-organs-locations": SkeletonLabeledDiagram,
  "skeletal-anatomical-relationships": JointTypesDiagram,
  "skeletal-clinical-anatomy-basics": FracturesLandmarkDiagram,
};
