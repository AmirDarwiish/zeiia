import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import API_BASE_URL from "../../config"

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
})

const fmt = (d) => d ? new Date(d).toLocaleDateString("ar-EG") : "—"
const fmtTime = (d) => d ? new Date(d).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "—"

const ACTION_COLORS = {
  Create: { bg: "rgba(52,211,153,.15)", color: "#34d399", label: "إضافة" },
  Edit:   { bg: "rgba(56,189,248,.15)", color: "#38bdf8", label: "تعديل" },
  Delete: { bg: "rgba(248,113,113,.15)", color: "#f87171", label: "حذف" },
  View:   { bg: "rgba(148,163,184,.12)", color: "#94a3b8", label: "عرض" },
  Login:  { bg: "rgba(201,169,110,.15)", color: "#C9A96E", label: "دخول" },
}

const getActionStyle = (action) => {
  const key = Object.keys(ACTION_COLORS).find(k => action?.includes(k))
  return ACTION_COLORS[key] || { bg: "rgba(167,139,250,.12)", color: "#a78bfa", label: action }
}

const ENTITY_AR = {
  Lead: "ليد", Leads: "ليدز", Customer: "عميل", Customers: "عملاء",
  User: "مستخدم", Users: "مستخدمون", Enrollment: "تسجيل", Enrollments: "تسجيلات",
  Payment: "دفعة", Payments: "مدفوعات", Course: "كورس", Courses: "كورسات",
  Student: "طالب", Students: "طلاب", Note: "ملاحظة", Notes: "ملاحظات",
}
const entityAr = (e) => ENTITY_AR[e] || e

const S = {
  wrap: { background: "#0f172a", minHeight: "100vh", padding: "24px 20px", direction: "rtl", color: "#f1f5f9", fontFamily: "'Cairo',sans-serif", boxSizing: "border-box" },
  card: { background: "#1e293b", border: "1px solid #334155", borderRadius: 12 },
  lbl:  { fontSize: 11, color: "#94a3b8", fontWeight: 600, display: "block", marginBottom: 5 },
  inp:  { width: "100%", boxSizing: "border-box", height: 38, background: "#0f172a", border: "1px solid #334155", borderRadius: 8, color: "#f1f5f9", fontSize: 13, padding: "0 11px", fontFamily: "'Cairo',sans-serif", outline: "none" },
  sel:  { width: "100%", boxSizing: "border-box", height: 38, background: "#0f172a", border: "1px solid #334155", borderRadius: 8, color: "#f1f5f9", fontSize: 13, padding: "0 11px", fontFamily: "'Cairo',sans-serif", outline: "none", cursor: "pointer" },
  btnGold:  { height: 38, padding: "0 20px", borderRadius: 8, border: "none", background: "#C9A96E", color: "#0f172a", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Cairo',sans-serif" },
  btnGhost: { height: 34, padding: "0 14px", borderRadius: 8, border: "1px solid #334155", background: "transparent", color: "#94a3b8", fontSize: 13, cursor: "pointer", fontFamily: "'Cairo',sans-serif" },
}

function StatCard({ label, value, sub, color = "#C9A96E", icon }) {
  return (
    <div style={{ ...S.card, padding: "18px 20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 3, height: "100%", background: color }} />
      <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
        {icon && <span>{icon}</span>}{label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "#f1f5f9", marginBottom: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color, fontWeight: 600 }}>{sub}</div>}
    </div>
  )
}

export default function UserActivityReport() {
  const navigate = useNavigate()
  const [users, setUsers]       = useState([])
  const [userId, setUserId]     = useState("")
  const [date, setDate]         = useState(new Date().toISOString().split("T")[0])
  const [actions, setActions]   = useState([])
  const [summary, setSummary]   = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState("")
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const r = await fetch(`${API_BASE_URL}/api/users`, { headers: authHeaders() })
        if (r.ok) { const d = await r.json(); setUsers(Array.isArray(d) ? d : d?.data || []) }
      } catch {}
    })()
  }, [])

  const search = async () => {
    if (!userId) { setError("اختر مستخدم أولاً"); return }
    if (!date)   { setError("اختر التاريخ"); return }
    setLoading(true); setError(""); setSearched(true)
    try {
      const [ar, sr] = await Promise.all([
        fetch(`${API_BASE_URL}/api/reports/user-activity/actions?userId=${userId}&date=${date}`, { headers: authHeaders() }),
        fetch(`${API_BASE_URL}/api/reports/user-activity/daily-summary?userId=${userId}&date=${date}`, { headers: authHeaders() }),
      ])
      if (ar.ok) { const d = await ar.json(); setActions(d?.data || d || []) }
      if (sr.ok) { const d = await sr.json(); setSummary(d?.data || d) }
    } catch (e) { setError("فشل التحميل: " + e.message) }
    finally { setLoading(false) }
  }

  const selectedUser = users.find(u => u.id === parseInt(userId))

  // حساب أول وآخر إجراء
  const firstAction = actions.length > 0 ? actions[actions.length - 1] : null
  const lastAction  = actions.length > 0 ? actions[0] : null

  // تجميع حسب الـ entity
  const grouped = actions.reduce((acc, a) => {
    const key = a.entity || "أخرى"
    if (!acc[key]) acc[key] = { total: 0, create: 0, edit: 0, delete: 0, view: 0, other: 0 }
    acc[key].total++
    if (a.action?.includes("Create")) acc[key].create++
    else if (a.action?.includes("Edit") || a.action?.includes("Update")) acc[key].edit++
    else if (a.action?.includes("Delete")) acc[key].delete++
    else if (a.action?.includes("View") || a.action?.includes("Get")) acc[key].view++
    else acc[key].other++
    return acc
  }, {})

  return (
    <div style={S.wrap}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C9A96E" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#C9A96E", letterSpacing: 2 }}>ZEIIA CRM</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>تقرير نشاط المستخدم</div>
          <div style={{ width: 36, height: 2, background: "#C9A96E", borderRadius: 2, margin: "5px 0" }} />
          <div style={{ fontSize: 12, color: "#64748b" }}>تتبع إجراءات المستخدمين يومياً</div>
        </div>
        <button onClick={() => navigate("/dashboard/users")} style={{ ...S.btnGhost, display: "flex", alignItems: "center", gap: 6 }}>
          ← العودة للمستخدمين
        </button>
      </div>

      {/* Filters */}
      <div style={{ ...S.card, padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#C9A96E", marginBottom: 14 }}>🔍 بحث في التقرير</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 12, alignItems: "flex-end" }}>
          <div>
            <label style={S.lbl}>المستخدم *</label>
            <select value={userId} onChange={e => setUserId(e.target.value)} style={S.sel}>
              <option value="">-- اختر مستخدم --</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.fullName} — {u.email}</option>)}
            </select>
          </div>
          <div>
            <label style={S.lbl}>التاريخ *</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ ...S.inp, colorScheme: "dark" }} />
          </div>
          <button onClick={search} disabled={loading} style={{ ...S.btnGold, height: 38, minWidth: 120 }}>
            {loading ? "جاري التحميل..." : "📊 عرض التقرير"}
          </button>
        </div>
        {error && <div style={{ color: "#f87171", fontSize: 12, marginTop: 10, padding: "8px 12px", background: "rgba(248,113,113,.08)", borderRadius: 7 }}>{error}</div>}
      </div>

      {loading && <div style={{ textAlign: "center", padding: 60, color: "#C9A96E", fontSize: 14 }}>جاري تحميل التقرير...</div>}

      {searched && !loading && (
        <>
          {/* User Info Bar */}
          {selectedUser && (
            <div style={{ ...S.card, padding: "14px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(201,169,110,.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A96E", fontWeight: 800, fontSize: 20, flexShrink: 0 }}>
                {(selectedUser.fullName || "?")[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9" }}>{selectedUser.fullName}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{selectedUser.email}</div>
              </div>
              <div style={{ fontSize: 13, color: "#94a3b8", background: "#0f172a", padding: "6px 14px", borderRadius: 8, border: "1px solid #334155" }}>
                📅 {fmt(date)}
              </div>
            </div>
          )}

          {/* Stats Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 20 }}>
            <StatCard icon="⚡" label="إجمالي الإجراءات" value={actions.length} sub="إجراء في اليوم" color="#C9A96E" />
            <StatCard icon="⏱️" label="ساعات النشاط" value={summary?.activeHours ?? 0} sub="ساعة نشطة" color="#34d399" />
            <StatCard icon="🕐" label="أول إجراء" value={firstAction ? fmtTime(firstAction.time) : "—"} sub="بداية اليوم" color="#38bdf8" />
            <StatCard icon="🕔" label="آخر إجراء" value={lastAction ? fmtTime(lastAction.time) : "—"} sub="نهاية اليوم" color="#a78bfa" />
            <StatCard icon="📂" label="أقسام مختلفة" value={Object.keys(grouped).length} sub="قسم تم التعامل معه" color="#fbbf24" />
          </div>

          {/* First & Last Action Detail */}
          {(firstAction || lastAction) && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {firstAction && (
                <div style={{ ...S.card, padding: "14px 16px", borderTop: "3px solid #38bdf8" }}>
                  <div style={{ fontSize: 11, color: "#38bdf8", fontWeight: 700, marginBottom: 8 }}>🕐 أول إجراء في اليوم</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#f1f5f9", marginBottom: 4 }}>{fmtTime(firstAction.time)}</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ ...getActionStyle(firstAction.action), padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700, background: getActionStyle(firstAction.action).bg, color: getActionStyle(firstAction.action).color }}>
                      {getActionStyle(firstAction.action).label || firstAction.action}
                    </span>
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>{entityAr(firstAction.entity)}</span>
                  </div>
                </div>
              )}
              {lastAction && (
                <div style={{ ...S.card, padding: "14px 16px", borderTop: "3px solid #a78bfa" }}>
                  <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 700, marginBottom: 8 }}>🕔 آخر إجراء في اليوم</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#f1f5f9", marginBottom: 4 }}>{fmtTime(lastAction.time)}</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700, background: getActionStyle(lastAction.action).bg, color: getActionStyle(lastAction.action).color }}>
                      {getActionStyle(lastAction.action).label || lastAction.action}
                    </span>
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>{entityAr(lastAction.entity)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Main Content */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 16 }}>

            {/* Timeline */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", marginBottom: 10 }}>
                📋 سجل الإجراءات التفصيلي ({actions.length})
              </div>
              <div style={{ ...S.card, maxHeight: 540, overflowY: "auto" }}>
                {actions.length === 0
                  ? <div style={{ padding: 50, textAlign: "center", color: "#475569", fontSize: 13 }}>لا توجد إجراءات في هذا اليوم</div>
                  : actions.map((a, i) => {
                    const st = getActionStyle(a.action)
                    return (
                      <div key={i} style={{ padding: "10px 16px", borderBottom: "1px solid rgba(51,65,85,.35)", display: "flex", alignItems: "center", gap: 10, transition: "background .1s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(201,169,110,.03)"}
                        onMouseLeave={e => e.currentTarget.style.background = ""}>
                        <span style={{ fontSize: 11, color: "#475569", minWidth: 55, flexShrink: 0, fontFamily: "monospace" }}>{fmtTime(a.time)}</span>
                        <span style={{ background: st.bg, color: st.color, padding: "2px 9px", borderRadius: 6, fontSize: 10, fontWeight: 700, flexShrink: 0, minWidth: 45, textAlign: "center" }}>
                          {st.label || a.action}
                        </span>
                        <span style={{ fontSize: 12, color: "#f1f5f9", fontWeight: 600, flexShrink: 0 }}>{entityAr(a.entity)}</span>
                        {a.action && (
                          <span style={{ fontSize: 11, color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {a.action}
                          </span>
                        )}
                      </div>
                    )
                  })
                }
              </div>
            </div>

            {/* Grouped Summary */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", marginBottom: 10 }}>
                📊 ملخص النشاط حسب القسم
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {Object.keys(grouped).length === 0
                  ? <div style={{ ...S.card, padding: 40, textAlign: "center", color: "#475569", fontSize: 13 }}>لا توجد بيانات</div>
                  : Object.entries(grouped)
                    .sort((a, b) => b[1].total - a[1].total)
                    .map(([entity, stats]) => {
                      const pct = Math.round((stats.total / actions.length) * 100)
                      return (
                        <div key={entity} style={{ ...S.card, padding: "14px 16px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9" }}>{entityAr(entity)}</span>
                            <span style={{ fontSize: 13, color: "#C9A96E", fontWeight: 800 }}>{stats.total}</span>
                          </div>
                          {/* Progress Bar */}
                          <div style={{ height: 5, background: "#0f172a", borderRadius: 3, overflow: "hidden", marginBottom: 8 }}>
                            <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #C9A96E, #f0c98a)", borderRadius: 3 }} />
                          </div>
                          {/* Mini Stats */}
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {stats.create > 0 && <span style={{ fontSize: 10, background: "rgba(52,211,153,.1)", color: "#34d399", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>+{stats.create} إضافة</span>}
                            {stats.edit   > 0 && <span style={{ fontSize: 10, background: "rgba(56,189,248,.1)", color: "#38bdf8", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>✏️ {stats.edit} تعديل</span>}
                            {stats.delete > 0 && <span style={{ fontSize: 10, background: "rgba(248,113,113,.1)", color: "#f87171", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>🗑 {stats.delete} حذف</span>}
                            {stats.view   > 0 && <span style={{ fontSize: 10, background: "rgba(148,163,184,.1)", color: "#94a3b8", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>👁 {stats.view} عرض</span>}
                          </div>
                          <div style={{ fontSize: 10, color: "#475569", marginTop: 6 }}>{pct}% من إجمالي النشاط</div>
                        </div>
                      )
                    })
                }
              </div>
            </div>
          </div>
        </>
      )}

      {!searched && !loading && (
        <div style={{ textAlign: "center", padding: 80, color: "#334155" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📊</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#475569", marginBottom: 8 }}>اختر مستخدم وتاريخ</div>
          <div style={{ fontSize: 13, color: "#334155" }}>لعرض تقرير النشاط اليومي التفصيلي</div>
        </div>
      )}
    </div>
  )
}