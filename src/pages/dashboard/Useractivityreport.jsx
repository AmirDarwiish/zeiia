import { useState, useRef, useEffect } from "react"

const MONTHS_AR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']
const DAYS_AR   = ['أح','إث','ثل','أر','خم','جم','سب']

const TODAY = new Date()
TODAY.setHours(0, 0, 0, 0)

function DateRangePicker({ value, onChange }) {
  const [open, setOpen]           = useState(false)
  const [viewYear, setViewYear]   = useState(new Date().getFullYear())
  const [viewMonth, setViewMonth] = useState(new Date().getMonth())
  const [startDate, setStartDate] = useState(value?.start || null)
  const [endDate, setEndDate]     = useState(value?.end   || null)
  const [picking, setPicking]     = useState(false)
  const [hovDate, setHovDate]     = useState(null)
  const ref = useRef(null)

  // مزامنة value لو اتغير من برا
  useEffect(() => {
    setStartDate(value?.start || null)
    setEndDate(value?.end     || null)
  }, [value])

  // إغلاق عند الضغط برا
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        if (picking) { setStartDate(null); setPicking(false) }
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [picking])

  const fmt     = (d) => d?.toLocaleDateString("ar-EG", { day: "numeric", month: "short", year: "numeric" })
  const fmtFull = (d) => d?.toLocaleDateString("ar-EG", { day: "numeric", month: "long" })

  const navMonth = (dir) => {
    let m = viewMonth + dir, y = viewYear
    if (m > 11) { m = 0; y++ }
    if (m < 0)  { m = 11; y-- }
    setViewMonth(m); setViewYear(y)
  }

  const pickDate = (date) => {
    if (!startDate || (!picking && endDate)) {
      setStartDate(date); setEndDate(null); setPicking(true)
    } else if (picking) {
      const [lo, hi] = date < startDate ? [date, startDate] : [startDate, date]
      setStartDate(lo); setEndDate(hi); setPicking(false)
      onChange?.({ start: lo, end: hi })
    }
  }

  const applyRange = () => {
    if (startDate && endDate) {
      onChange?.({ start: startDate, end: endDate })
      setOpen(false)
    }
  }

  const clearRange = () => {
    setStartDate(null); setEndDate(null); setPicking(false); setHovDate(null)
    onChange?.(null)
  }

  const setShortcut = (days) => {
    const end   = new Date(); end.setHours(0, 0, 0, 0)
    const start = new Date(end); start.setDate(end.getDate() - days)
    const lo    = days === 0 ? new Date(end) : start
    setStartDate(lo); setEndDate(end); setPicking(false)
    setViewYear(lo.getFullYear()); setViewMonth(lo.getMonth())
    onChange?.({ start: lo, end })
  }

  const setThisMonth = () => {
    const now = new Date()
    const s = new Date(now.getFullYear(), now.getMonth(), 1)
    const e = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    setStartDate(s); setEndDate(e); setPicking(false)
    setViewYear(now.getFullYear()); setViewMonth(now.getMonth())
    onChange?.({ start: s, end: e })
  }

  const setLastMonth = () => {
    const now = new Date()
    const s = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const e = new Date(now.getFullYear(), now.getMonth(), 0)
    setStartDate(s); setEndDate(e); setPicking(false)
    setViewYear(s.getFullYear()); setViewMonth(s.getMonth())
    onChange?.({ start: s, end: e })
  }

  const getRangeClass = (date) => {
    if (!startDate) return ""
    const effEnd = picking && hovDate ? hovDate : endDate
    const lo = startDate <= (effEnd || startDate) ? startDate : (effEnd || startDate)
    const hi = startDate <= (effEnd || startDate) ? (effEnd || startDate) : startDate
    const t  = date.getTime()
    if (t === lo.getTime() && t === (hi?.getTime() ?? t)) return "range-start range-end"
    if (t === lo.getTime())                               return "range-start"
    if (hi && t === hi.getTime())                         return "range-end"
    if (hi && t > lo.getTime() && t < hi.getTime())      return "in-range"
    return ""
  }

  const renderMonth = (yr, mo) => {
    const first = new Date(yr, mo, 1).getDay()
    const days  = new Date(yr, mo + 1, 0).getDate()
    const cells = []

    DAYS_AR.forEach((d, i) => cells.push(
      <div key={`dow-${i}`} style={S.dow}>{d}</div>
    ))

    for (let i = 0; i < first; i++) cells.push(<div key={`e-${i}`} />)

    for (let d = 1; d <= days; d++) {
      const date    = new Date(yr, mo, d)
      const rc      = getRangeClass(date)
      const isToday = date.getTime() === TODAY.getTime()

      const dayStyle = {
        ...S.day,
        ...(isToday ? S.today : {}),
        ...(rc === "in-range"                                          ? S.inRange     : {}),
        ...(rc.includes("range-start") && rc.includes("range-end")    ? S.rangeSingle : {}),
        ...(rc.includes("range-start") && !rc.includes("range-end")   ? S.rangeStart  : {}),
        ...(rc.includes("range-end")   && !rc.includes("range-start") ? S.rangeEnd    : {}),
      }

      cells.push(
        <div
          key={d}
          style={dayStyle}
          onClick={() => pickDate(date)}
          onMouseEnter={() => setHovDate(date)}
          onMouseLeave={() => setHovDate(null)}
        >
          {d}
        </div>
      )
    }
    return cells
  }

  const rMo2 = viewMonth + 1 > 11 ? 0       : viewMonth + 1
  const rYr2 = viewMonth + 1 > 11 ? viewYear + 1 : viewYear

  const lo      = startDate && endDate ? (startDate < endDate ? startDate : endDate) : startDate
  const hi      = startDate && endDate ? (startDate < endDate ? endDate   : startDate) : null
  const selDays = lo && hi ? Math.round((hi - lo) / 86400000) + 1 : null

  const rangeLabel = lo && hi
    ? `${fmt(lo)}  —  ${fmt(hi)}`
    : lo ? `${fmt(lo)}  —  ...` : null

  return (
    <div ref={ref} style={{ position: "relative" }}>

      {/* ── Trigger ── */}
      <div
        style={{ ...S.box, ...(open ? S.boxActive : {}) }}
        onClick={() => setOpen(v => !v)}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round">
          <rect x="2" y="3" width="12" height="10" rx="1.5"/>
          <path d="M5 3V2M11 3V2M2 7h12"/>
        </svg>
        <span style={{ ...S.rangeText, ...(!rangeLabel ? { color: "#3d4a60" } : {}) }}>
          {rangeLabel || "من — إلى"}
        </span>
      </div>

      {/* ── Dropdown ── */}
      {open && (
        <div style={S.dropdown}>

          {/* Shortcuts */}
          <div style={S.shortcuts}>
            {[
              ["اليوم",       0],
              ["آخر 7 أيام",  7],
              ["آخر 14 يوم", 14],
              ["آخر 30 يوم", 30],
              ["آخر 3 أشهر", 90],
            ].map(([lbl, d]) => (
              <div key={lbl} style={S.shortcut} onClick={() => setShortcut(d)}>{lbl}</div>
            ))}
            <div style={S.shortcut} onClick={setThisMonth}>هذا الشهر</div>
            <div style={S.shortcut} onClick={setLastMonth}>الشهر الماضي</div>
          </div>

          {/* Two calendars */}
          <div style={S.calMonths}>
            {[
              { yr: viewYear, mo: viewMonth, side: "left"  },
              { yr: rYr2,     mo: rMo2,      side: "right" },
            ].map(({ yr, mo, side }) => (
              <div key={side}>
                <div style={S.calHeader}>
                  {side === "left"
                    ? <div style={S.navBtn} onClick={() => navMonth(-1)}>‹</div>
                    : <div style={{ width: 26 }} />}
                  <div style={S.calTitle}>{MONTHS_AR[mo]} {yr}</div>
                  {side === "right"
                    ? <div style={S.navBtn} onClick={() => navMonth(1)}>›</div>
                    : <div style={{ width: 26 }} />}
                </div>
                <div style={S.calGrid}>{renderMonth(yr, mo)}</div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={S.calFooter}>
            <div style={{ fontSize: 11, color: "#6b7891", fontFamily: "'Tajawal',sans-serif" }}>
              {!lo
                ? "اختر تاريخ البداية"
                : !hi
                  ? <span>من <b style={{ color: "#C9A96E" }}>{fmtFull(lo)}</b> — اختر تاريخ النهاية</span>
                  : <span>من <b style={{ color: "#C9A96E" }}>{fmtFull(lo)}</b> إلى <b style={{ color: "#C9A96E" }}>{fmtFull(hi)}</b> — <b style={{ color: "#C9A96E" }}>{selDays} يوم</b></span>
              }
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={S.btnClear} onClick={clearRange}>مسح</button>
              <button style={{ ...S.btnApply, ...(!lo || !hi ? { opacity: 0.45, cursor: "not-allowed" } : {}) }} onClick={applyRange} disabled={!lo || !hi}>
                تطبيق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Styles ───────────────────────────────────────────────────────────────────
const S = {
  box: {
    height: 38, background: "#080d16",
    border: "1px solid rgba(255,255,255,0.06)", borderRadius: 9,
    padding: "0 12px", display: "flex", alignItems: "center", gap: 8,
    cursor: "pointer", transition: "border-color .2s", minWidth: 220,
  },
  boxActive:   { borderColor: "rgba(201,169,110,0.25)" },
  rangeText:   { fontSize: 12, color: "#e8edf5", fontFamily: "'Tajawal',sans-serif", flex: 1 },

  dropdown: {
    position: "absolute", top: "calc(100% + 6px)", right: 0,
    background: "#0d1420", border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 14, padding: 16, zIndex: 999,
    minWidth: 560, boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
  },

  shortcuts: {
    display: "flex", gap: 6, flexWrap: "wrap",
    marginBottom: 12, paddingBottom: 12,
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  shortcut: {
    fontSize: 10, fontWeight: 700, padding: "4px 10px",
    borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)",
    background: "#080d16", color: "#6b7891",
    cursor: "pointer", fontFamily: "'Tajawal',sans-serif",
  },

  calMonths: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  calHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  calTitle:  { fontSize: 13, fontWeight: 700, color: "#e8edf5", fontFamily: "'Tajawal',sans-serif" },
  navBtn: {
    width: 26, height: 26, borderRadius: 7,
    border: "1px solid rgba(255,255,255,0.06)", background: "#080d16",
    color: "#6b7891", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
  },

  calGrid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 },
  dow: {
    textAlign: "center", fontSize: 9, fontWeight: 700,
    color: "#3d4a60", padding: "4px 0", fontFamily: "'Tajawal',sans-serif",
  },
  day: {
    textAlign: "center", fontSize: 11, padding: "5px 2px",
    borderRadius: 6, cursor: "pointer", color: "#6b7891",
    fontFamily: "'Tajawal',sans-serif", transition: "background .12s, color .12s",
  },
  today:       { color: "#C9A96E", fontWeight: 700 },
  inRange:     { background: "rgba(201,169,110,0.1)", color: "#e8edf5", borderRadius: 0 },
  rangeStart:  { background: "#C9A96E", color: "#080d16", fontWeight: 700, borderRadius: "6px 0 0 6px" },
  rangeEnd:    { background: "#C9A96E", color: "#080d16", fontWeight: 700, borderRadius: "0 6px 6px 0" },
  rangeSingle: { background: "#C9A96E", color: "#080d16", fontWeight: 700, borderRadius: 6 },

  calFooter: {
    marginTop: 12, paddingTop: 12,
    borderTop: "1px solid rgba(255,255,255,0.06)",
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
  },
  btnClear: {
    height: 30, padding: "0 12px", borderRadius: 7,
    border: "1px solid rgba(255,255,255,0.06)", background: "transparent",
    color: "#6b7891", fontSize: 11, cursor: "pointer", fontFamily: "'Cairo',sans-serif",
  },
  btnApply: {
    height: 30, padding: "0 14px", borderRadius: 7,
    border: "none", background: "#C9A96E", color: "#080d16",
    fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'Cairo',sans-serif",
    transition: "opacity .2s",
  },
}

export default DateRangePicker