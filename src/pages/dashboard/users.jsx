import { useState, useEffect, useCallback } from "react"

/* ═══════════════════════════════
   CONFIG
═══════════════════════════════ */
import API_BASE_URL from '../../config'

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
})

/* ═══════════════════════════════
   STYLES
═══════════════════════════════ */
const S = {
  wrap:      { background:'#0f172a', minHeight:'100vh', padding:24, direction:'rtl', color:'#f1f5f9', fontFamily:"'Cairo',sans-serif" },
  card:      { background:'#1e293b', border:'1px solid #334155', borderRadius:14, overflow:'hidden' },
  cardHead:  { padding:'14px 18px', borderBottom:'1px solid #334155', display:'flex', justifyContent:'space-between', alignItems:'center' },
  cardTitle: { fontSize:15, fontWeight:800, color:'#f1f5f9' },
  row:       { padding:'11px 18px', borderBottom:'1px solid rgba(51,65,85,.4)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, flexWrap:'wrap', cursor:'pointer', transition:'background .12s' },
  lbl:       { fontSize:11, color:'#94a3b8', fontWeight:600, display:'block', marginBottom:5 },
  inp:       { width:'100%', boxSizing:'border-box', height:38, background:'#0f172a', border:'1px solid #334155', borderRadius:8, color:'#f1f5f9', fontSize:13, padding:'0 11px', fontFamily:"'Cairo',sans-serif", outline:'none' },
  sel:       { width:'100%', boxSizing:'border-box', height:38, background:'#0f172a', border:'1px solid #334155', borderRadius:8, color:'#f1f5f9', fontSize:13, padding:'0 11px', fontFamily:"'Cairo',sans-serif", outline:'none', cursor:'pointer' },
  btnGold:   { height:36, padding:'0 16px', borderRadius:8, border:'none', background:'#C9A96E', color:'#0f172a', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:"'Cairo',sans-serif" },
  btnGhost:  { height:34, padding:'0 13px', borderRadius:7, border:'1px solid #334155', background:'transparent', color:'#94a3b8', fontSize:12, cursor:'pointer', fontFamily:"'Cairo',sans-serif" },
  btnDanger: { height:30, padding:'0 10px', borderRadius:6, border:'1px solid rgba(248,113,113,.3)', background:'rgba(248,113,113,.08)', color:'#f87171', fontSize:11, cursor:'pointer', fontFamily:"'Cairo',sans-serif" },
  btnGreen:  { height:30, padding:'0 10px', borderRadius:6, border:'1px solid rgba(52,211,153,.3)', background:'rgba(52,211,153,.08)', color:'#34d399', fontSize:11, cursor:'pointer', fontFamily:"'Cairo',sans-serif" },
  tag:       (color='#C9A96E') => ({ display:'inline-block', padding:'2px 8px', borderRadius:12, fontSize:10, fontWeight:700, background:`${color}22`, color }),
  err:       { color:'#f87171', fontSize:12, padding:'7px 10px', background:'rgba(248,113,113,.08)', borderRadius:7 },
}

/* ═══════════════════════════════
   MODAL
═══════════════════════════════ */
function Modal({ title, onClose, children, maxWidth=460 }) {
  useEffect(() => {
    const fn = e => e.key==='Escape' && onClose()
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])
  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,.65)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}
      onClick={e => e.target===e.currentTarget && onClose()}>
      <div style={{ background:'#1e293b', border:'1px solid #334155', borderRadius:16, width:'100%', maxWidth, padding:24, direction:'rtl', boxShadow:'0 25px 60px rgba(0,0,0,.5)', maxHeight:'90vh', overflowY:'auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <span style={{ fontSize:16, fontWeight:800, color:'#C9A96E' }}>{title}</span>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'#64748b', fontSize:20, cursor:'pointer' }}>×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

/* ═══════════════════════════════
   TOAST
═══════════════════════════════ */
function Toast({ toast }) {
  if (!toast) return null
  return (
    <div style={{ position:'fixed', top:20, left:'50%', transform:'translateX(-50%)', zIndex:2000,
      background: toast.ok ? 'rgba(52,211,153,.15)' : 'rgba(248,113,113,.15)',
      border:`1px solid ${toast.ok ? '#34d399' : '#f87171'}`,
      color: toast.ok ? '#34d399' : '#f87171',
      borderRadius:10, padding:'10px 24px', fontSize:14, fontWeight:600,
      boxShadow:'0 8px 24px rgba(0,0,0,.4)', pointerEvents:'none',
    }}>{toast.msg}</div>
  )
}

/* ═══════════════════════════════
   PERMISSIONS GROUPED
═══════════════════════════════ */
function PermissionCheckboxes({ all, selected, onChange }) {
  const grouped = all.reduce((acc, p) => {
    const m = p.module || 'عام'
    if (!acc[m]) acc[m] = []
    acc[m].push(p)
    return acc
  }, {})

  const toggle = code => {
    if (selected.includes(code)) onChange(selected.filter(c => c !== code))
    else onChange([...selected, code])
  }

  const toggleModule = (perms) => {
    const codes = perms.map(p => p.code)
    const allOn = codes.every(c => selected.includes(c))
    if (allOn) onChange(selected.filter(c => !codes.includes(c)))
    else onChange([...new Set([...selected, ...codes])])
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
      {Object.entries(grouped).map(([module, perms]) => {
        const allOn = perms.every(p => selected.includes(p.code))
        return (
          <div key={module} style={{ background:'#0f172a', border:'1px solid #334155', borderRadius:10, overflow:'hidden' }}>
            <div style={{ padding:'8px 12px', borderBottom:'1px solid #334155', display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}
              onClick={() => toggleModule(perms)}>
              <input type="checkbox" checked={allOn} onChange={() => toggleModule(perms)}
                style={{ accentColor:'#C9A96E', width:14, height:14 }} />
              <span style={{ fontSize:11, fontWeight:800, color:'#C9A96E', letterSpacing:1 }}>{module}</span>
              <span style={{ fontSize:10, color:'#475569' }}>({perms.length})</span>
            </div>
            <div style={{ padding:'8px 12px', display:'flex', flexWrap:'wrap', gap:8 }}>
              {perms.map(p => (
                <label key={p.code} style={{ display:'flex', alignItems:'center', gap:5, cursor:'pointer', minWidth:200 }}>
                  <input type="checkbox" checked={selected.includes(p.code)} onChange={() => toggle(p.code)}
                    style={{ accentColor:'#C9A96E', width:13, height:13 }} />
                  <span style={{ fontSize:11, color: selected.includes(p.code) ? '#f1f5f9' : '#64748b' }}>{p.name}</span>
                </label>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════
   USERS TAB
═══════════════════════════════ */
function UsersTab({ showToast }) {
  const [users, setUsers]         = useState([])
  const [roles, setRoles]         = useState([])
  const [loading, setLoading]     = useState(true)
  const [modal, setModal]         = useState(null) // 'create' | 'edit' | 'resetpw'
  const [selected, setSelected]   = useState(null)
  const [search, setSearch]       = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [ur, rr] = await Promise.all([
        fetch(`${API_BASE_URL}/api/users`, { headers: authHeaders() }),
        fetch(`${API_BASE_URL}/api/roles`, { headers: authHeaders() }),
      ])
      if (ur.ok) { const d = await ur.json(); setUsers(Array.isArray(d) ? d : d?.data || []) }
      if (rr.ok) { const d = await rr.json(); setRoles(Array.isArray(d) ? d : d?.data || []) }
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = users.filter(u =>
    !search || u.fullName?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display:'flex', gap:8, marginBottom:14, flexWrap:'wrap' }}>
        <input style={{ ...S.inp, flex:1, maxWidth:260 }} placeholder="بحث بالاسم أو الإيميل..."
          value={search} onChange={e => setSearch(e.target.value)} />
        <button style={S.btnGold} onClick={() => { setSelected(null); setModal('create') }}>+ مستخدم جديد</button>
      </div>

      <div style={S.card}>
        {loading
          ? <div style={{ padding:40, textAlign:'center', color:'#94a3b8' }}>جاري التحميل...</div>
          : filtered.length === 0
            ? <div style={{ padding:40, textAlign:'center', color:'#475569' }}>لا توجد نتائج</div>
            : filtered.map(u => (
              <div key={u.id} style={{ ...S.row }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(201,169,110,.04)'}
                onMouseLeave={e => e.currentTarget.style.background=''}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:'rgba(201,169,110,.15)', display:'flex', alignItems:'center', justifyContent:'center', color:'#C9A96E', fontWeight:800, fontSize:14, flexShrink:0 }}>
                    {(u.fullName||'?')[0]}
                  </div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:'#f1f5f9' }}>{u.fullName}</div>
                    <div style={{ fontSize:11, color:'#64748b' }}>{u.email}</div>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                  {u.roles?.map(r => <span key={r} style={S.tag('#a78bfa')}>{r}</span>)}
                  <span style={S.tag(u.isActive ? '#34d399' : '#f87171')}>{u.isActive ? 'نشط' : 'غير نشط'}</span>
                  <button style={S.btnGhost} onClick={() => { setSelected(u); setModal('edit') }}>تعديل</button>
                  <button style={S.btnGhost} onClick={() => { setSelected(u); setModal('resetpw') }}>كلمة المرور</button>
                </div>
              </div>
            ))
        }
      </div>

      {modal === 'create' && <CreateUserModal roles={roles} onClose={() => setModal(null)} onSuccess={() => { setModal(null); showToast('تم إضافة المستخدم'); load() }} />}
      {modal === 'edit'   && <EditUserModal   user={selected} roles={roles} onClose={() => setModal(null)} onSuccess={() => { setModal(null); showToast('تم الحفظ'); load() }} />}
      {modal === 'resetpw'&& <ResetPwModal    user={selected} onClose={() => setModal(null)} onSuccess={() => { setModal(null); showToast('تم تغيير كلمة المرور') }} />}
    </div>
  )
}

function CreateUserModal({ roles, onClose, onSuccess }) {
  const [form, setForm] = useState({ fullName:'', email:'', password:'', roleId:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const set = (k,v) => setForm(f => ({...f,[k]:v}))

  const submit = async () => {
    if (!form.fullName.trim()) { setError('الاسم مطلوب'); return }
    if (!form.email.trim())    { setError('الإيميل مطلوب'); return }
    if (!form.password.trim()) { setError('كلمة المرور مطلوبة'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API_BASE_URL}/api/users`, {
        method:'POST', headers:authHeaders(),
        body: JSON.stringify({ ...form, roleId: form.roleId ? parseInt(form.roleId) : undefined })
      })
      if (!res.ok) { const j = await res.json().catch(()=>{}); throw new Error(j?.message || `خطأ ${res.status}`) }
      onSuccess()
    } catch(e) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <Modal title="إضافة مستخدم جديد" onClose={onClose}>
      <div style={{ display:'flex', flexDirection:'column', gap:13 }}>
        {[{k:'fullName',label:'الاسم الكامل *',ph:'الاسم...'},{k:'email',label:'الإيميل *',ph:'user@mail.com'},{k:'password',label:'كلمة المرور *',ph:'••••••••',type:'password'}].map(f=>(
          <div key={f.k}><label style={S.lbl}>{f.label}</label>
            <input type={f.type||'text'} value={form[f.k]} onChange={e=>set(f.k,e.target.value)} placeholder={f.ph} style={S.inp} />
          </div>
        ))}
        <div><label style={S.lbl}>الدور</label>
          <select value={form.roleId} onChange={e=>set('roleId',e.target.value)} style={S.sel}>
            <option value="">-- بدون دور --</option>
            {roles.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>
        {error && <div style={S.err}>{error}</div>}
        <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
          <button onClick={onClose} style={S.btnGhost}>إلغاء</button>
          <button onClick={submit} disabled={loading} style={S.btnGold}>{loading?'...':'إضافة'}</button>
        </div>
      </div>
    </Modal>
  )
}

function EditUserModal({ user, roles, onClose, onSuccess }) {
  const [form, setForm] = useState({ fullName: user?.fullName||'', email: user?.email||'', isActive: user?.isActive??true, roleId:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  const submit = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${user.id}`, {
        method:'PUT', headers:authHeaders(),
        body: JSON.stringify({ fullName:form.fullName, email:form.email, isActive:form.isActive })
      })
      if (!res.ok) throw new Error(`خطأ ${res.status}`)
      onSuccess()
    } catch(e) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <Modal title={`تعديل: ${user?.fullName}`} onClose={onClose}>
      <div style={{ display:'flex', flexDirection:'column', gap:13 }}>
        <div><label style={S.lbl}>الاسم الكامل</label><input value={form.fullName} onChange={e=>set('fullName',e.target.value)} style={S.inp}/></div>
        <div><label style={S.lbl}>الإيميل</label><input value={form.email} onChange={e=>set('email',e.target.value)} style={S.inp}/></div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <input type="checkbox" id="isActive" checked={form.isActive} onChange={e=>set('isActive',e.target.checked)} style={{ accentColor:'#C9A96E', width:16, height:16 }}/>
          <label htmlFor="isActive" style={{ fontSize:13, color:'#94a3b8', cursor:'pointer' }}>الحساب نشط</label>
        </div>
        {error && <div style={S.err}>{error}</div>}
        <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
          <button onClick={onClose} style={S.btnGhost}>إلغاء</button>
          <button onClick={submit} disabled={loading} style={S.btnGold}>{loading?'...':'حفظ'}</button>
        </div>
      </div>
    </Modal>
  )
}

function ResetPwModal({ user, onClose, onSuccess }) {
  const [pw, setPw]       = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    if (!pw.trim()) { setError('ادخل كلمة المرور'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${user.id}/reset-password`, {
        method:'PUT', headers:authHeaders(), body:JSON.stringify({ newPassword: pw })
      })
      if (!res.ok) throw new Error(`خطأ ${res.status}`)
      onSuccess()
    } catch(e) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <Modal title={`تغيير كلمة المرور: ${user?.fullName}`} onClose={onClose} maxWidth={380}>
      <div style={{ display:'flex', flexDirection:'column', gap:13 }}>
        <div><label style={S.lbl}>كلمة المرور الجديدة</label>
          <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••" style={S.inp}/>
        </div>
        {error && <div style={S.err}>{error}</div>}
        <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
          <button onClick={onClose} style={S.btnGhost}>إلغاء</button>
          <button onClick={submit} disabled={loading} style={S.btnGold}>{loading?'...':'تغيير'}</button>
        </div>
      </div>
    </Modal>
  )
}

/* ═══════════════════════════════
   ROLES TAB
═══════════════════════════════ */
function RolesTab({ showToast }) {
  const [roles, setRoles]         = useState([])
  const [allPerms, setAllPerms]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [modal, setModal]         = useState(null)
  const [selected, setSelected]   = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [rr, pr] = await Promise.all([
        fetch(`${API_BASE_URL}/api/roles`,       { headers: authHeaders() }),
        fetch(`${API_BASE_URL}/api/permissions`, { headers: authHeaders() }),
      ])
      if (rr.ok) { const d = await rr.json(); setRoles(Array.isArray(d) ? d : d?.data || []) }
      if (pr.ok) { const d = await pr.json(); setAllPerms(Array.isArray(d) ? d : d?.data || []) }
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:14 }}>
        <button style={S.btnGold} onClick={() => { setSelected(null); setModal('create') }}>+ دور جديد</button>
      </div>
      <div style={S.card}>
        {loading
          ? <div style={{ padding:40, textAlign:'center', color:'#94a3b8' }}>جاري التحميل...</div>
          : roles.length === 0
            ? <div style={{ padding:40, textAlign:'center', color:'#475569' }}>لا توجد أدوار</div>
            : roles.map(r => (
              <div key={r.id} style={{ ...S.row }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(201,169,110,.04)'}
                onMouseLeave={e => e.currentTarget.style.background=''}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:'#C9A96E', flexShrink:0 }}/>
                  <span style={{ fontSize:14, fontWeight:700, color:'#f1f5f9' }}>{r.name}</span>
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  <button style={S.btnGhost} onClick={() => { setSelected(r); setModal('perms') }}>البرمشنز</button>
                  <button style={S.btnGhost} onClick={() => { setSelected(r); setModal('edit') }}>تعديل</button>
                </div>
              </div>
            ))
        }
      </div>

      {modal === 'create' && <CreateRoleModal allPerms={allPerms} onClose={() => setModal(null)} onSuccess={() => { setModal(null); showToast('تم إنشاء الدور'); load() }} />}
      {modal === 'edit'   && <EditRoleModal   role={selected} allPerms={allPerms} onClose={() => setModal(null)} onSuccess={() => { setModal(null); showToast('تم الحفظ'); load() }} />}
      {modal === 'perms'  && <RolePermsModal  role={selected} allPerms={allPerms} onClose={() => setModal(null)} onSuccess={() => { showToast('تم التحديث'); load() }} />}
    </div>
  )
}

function CreateRoleModal({ allPerms, onClose, onSuccess }) {
  const [name, setName]       = useState('')
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const submit = async () => {
    if (!name.trim()) { setError('اسم الدور مطلوب'); return }
    setLoading(true); setError('')
    try {
      // 1. create role
      const r1 = await fetch(`${API_BASE_URL}/api/roles`, {
        method:'POST', headers:authHeaders(), body:JSON.stringify({ name: name.trim() })
      })
      if (!r1.ok) { const j = await r1.json().catch(()=>{}); throw new Error(j?.message || `خطأ ${r1.status}`) }
      const created = await r1.json()
      const roleId = created.roleId

      // 2. assign permissions via PUT (update role)
      if (selected.length > 0 && roleId) {
        await fetch(`${API_BASE_URL}/api/roles/${roleId}`, {
          method:'PUT', headers:authHeaders(),
          body: JSON.stringify({ roleName: name.trim(), permissionCodes: selected })
        })
      }
      onSuccess()
    } catch(e) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <Modal title="إنشاء دور جديد" onClose={onClose} maxWidth={600}>
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <div><label style={S.lbl}>اسم الدور *</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="مثال: Sales Manager" style={S.inp}/></div>
        <div>
          <label style={S.lbl}>الصلاحيات</label>
          <div style={{ maxHeight:360, overflowY:'auto' }}>
            <PermissionCheckboxes all={allPerms} selected={selected} onChange={setSelected}/>
          </div>
        </div>
        {error && <div style={S.err}>{error}</div>}
        <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
          <button onClick={onClose} style={S.btnGhost}>إلغاء</button>
          <button onClick={submit} disabled={loading} style={S.btnGold}>{loading?'...':'إنشاء'}</button>
        </div>
      </div>
    </Modal>
  )
}

function EditRoleModal({ role, allPerms, onClose, onSuccess }) {
  const [name, setName]         = useState(role?.name || '')
  const [selected, setSelected] = useState([])
  const [loading, setLoading]   = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError]       = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const r = await fetch(`${API_BASE_URL}/api/roles/${role.id}/permissions`, { headers:authHeaders() })
        if (r.ok) { const d = await r.json(); setSelected((d.permissions||[]).map(p=>p.code)) }
      } catch {}
      setFetching(false)
    })()
  }, [role.id])

  const submit = async () => {
    if (!name.trim()) { setError('الاسم مطلوب'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API_BASE_URL}/api/roles/${role.id}`, {
        method:'PUT', headers:authHeaders(),
        body:JSON.stringify({ roleName: name.trim(), permissionCodes: selected })
      })
      if (!res.ok) { const j = await res.json().catch(()=>{}); throw new Error(j?.message || `خطأ ${res.status}`) }
      onSuccess()
    } catch(e) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <Modal title={`تعديل الدور: ${role?.name}`} onClose={onClose} maxWidth={600}>
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <div><label style={S.lbl}>اسم الدور *</label><input value={name} onChange={e=>setName(e.target.value)} style={S.inp}/></div>
        <div>
          <label style={S.lbl}>الصلاحيات</label>
          {fetching
            ? <div style={{ color:'#94a3b8', padding:16, textAlign:'center' }}>جاري التحميل...</div>
            : <div style={{ maxHeight:360, overflowY:'auto' }}>
                <PermissionCheckboxes all={allPerms} selected={selected} onChange={setSelected}/>
              </div>
          }
        </div>
        {error && <div style={S.err}>{error}</div>}
        <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
          <button onClick={onClose} style={S.btnGhost}>إلغاء</button>
          <button onClick={submit} disabled={loading||fetching} style={S.btnGold}>{loading?'...':'حفظ التعديلات'}</button>
        </div>
      </div>
    </Modal>
  )
}

function RolePermsModal({ role, allPerms, onClose, onSuccess }) {
  const [current, setCurrent] = useState([])
  const [fetching, setFetching] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const r = await fetch(`${API_BASE_URL}/api/roles/${role.id}/permissions`, { headers:authHeaders() })
        if (r.ok) { const d = await r.json(); setCurrent((d.permissions||[]).map(p=>p.code)) }
      } catch {}
      setFetching(false)
    })()
  }, [role.id])

  const save = async () => {
    setSaving(true); setError('')
    try {
      const res = await fetch(`${API_BASE_URL}/api/roles/${role.id}`, {
        method:'PUT', headers:authHeaders(),
        body:JSON.stringify({ roleName: role.name, permissionCodes: current })
      })
      if (!res.ok) throw new Error(`خطأ ${res.status}`)
      onSuccess()
    } catch(e) { setError(e.message) }
    finally { setSaving(false) }
  }

  return (
    <Modal title={`صلاحيات الدور: ${role?.name}`} onClose={onClose} maxWidth={620}>
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <div style={{ background:'rgba(201,169,110,.06)', border:'1px solid rgba(201,169,110,.2)', borderRadius:8, padding:'8px 12px', fontSize:12, color:'#C9A96E' }}>
          الصلاحيات المحددة: {current.length} من {allPerms.length}
        </div>
        {fetching
          ? <div style={{ color:'#94a3b8', padding:24, textAlign:'center' }}>جاري التحميل...</div>
          : <div style={{ maxHeight:400, overflowY:'auto' }}>
              <PermissionCheckboxes all={allPerms} selected={current} onChange={setCurrent}/>
            </div>
        }
        {error && <div style={S.err}>{error}</div>}
        <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
          <button onClick={onClose} style={S.btnGhost}>إغلاق</button>
          <button onClick={save} disabled={saving||fetching} style={S.btnGold}>{saving?'...':'حفظ التغييرات'}</button>
        </div>
      </div>
    </Modal>
  )
}

/* ═══════════════════════════════
   PERMISSIONS TAB
═══════════════════════════════ */
function PermissionsTab() {
  const [perms, setPerms]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [module, setModule] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const r = await fetch(`${API_BASE_URL}/api/permissions`, { headers: authHeaders() })
        if (r.ok) { const d = await r.json(); setPerms(Array.isArray(d) ? d : d?.data || []) }
      } catch {}
      setLoading(false)
    })()
  }, [])

  const modules = [...new Set(perms.map(p => p.module).filter(Boolean))]
  const filtered = perms.filter(p =>
    (!search || p.code?.toLowerCase().includes(search.toLowerCase()) || p.name?.toLowerCase().includes(search.toLowerCase())) &&
    (!module || p.module === module)
  )

  const grouped = filtered.reduce((acc, p) => {
    const m = p.module || 'عام'
    if (!acc[m]) acc[m] = []
    acc[m].push(p)
    return acc
  }, {})

  const moduleColors = ['#38bdf8','#a78bfa','#C9A96E','#fbbf24','#34d399','#f87171','#94a3b8','#60a5fa','#fb923c']
  const colorMap = modules.reduce((acc, m, i) => { acc[m] = moduleColors[i % moduleColors.length]; return acc }, {})

  return (
    <div>
      <div style={{ display:'flex', gap:8, marginBottom:14, flexWrap:'wrap' }}>
        <input style={{ ...S.inp, flex:1, maxWidth:260 }} placeholder="بحث..."
          value={search} onChange={e=>setSearch(e.target.value)} />
        <select style={{ ...S.sel, width:'auto', minWidth:140 }} value={module} onChange={e=>setModule(e.target.value)}>
          <option value="">كل الموديولز</option>
          {modules.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div style={{ fontSize:12, color:'#64748b', marginBottom:10 }}>إجمالي: {filtered.length} برمشن</div>
      {loading
        ? <div style={{ padding:40, textAlign:'center', color:'#94a3b8' }}>جاري التحميل...</div>
        : Object.entries(grouped).map(([mod, items]) => {
          const color = colorMap[mod] || '#94a3b8'
          return (
            <div key={mod} style={{ ...S.card, marginBottom:12 }}>
              <div style={{ ...S.cardHead, borderTop:`3px solid ${color}` }}>
                <span style={{ fontSize:13, fontWeight:800, color }}>{mod}</span>
                <span style={S.tag(color)}>{items.length}</span>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:0 }}>
                {items.map(p => (
                  <div key={p.id} style={{ padding:'9px 14px', borderBottom:'1px solid rgba(51,65,85,.3)', width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div>
                      <div style={{ fontSize:12, fontWeight:700, color:'#f1f5f9' }}>{p.name}</div>
                      <div style={{ fontSize:10, color:'#475569', fontFamily:'monospace', marginTop:2 }}>{p.code}</div>
                    </div>
                    <span style={S.tag(color)}>{p.module}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

/* ═══════════════════════════════
   MAIN PAGE
═══════════════════════════════ */
export default function UsersRolesPage() {
  const [tab, setTab]     = useState('users')
  const [toast, setToast] = useState(null)

  const showToast = (msg, ok=true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  const tabs = [
    { id:'users',       label:'المستخدمون' },
    { id:'roles',       label:'الأدوار' },
    { id:'permissions', label:'الصلاحيات' },
  ]

  return (
    <div style={S.wrap}>
      <Toast toast={toast} />

      {/* Header */}
      <div style={{ marginBottom:24 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:'#C9A96E' }}/>
          <span style={{ fontSize:11, fontWeight:700, color:'#C9A96E', letterSpacing:2 }}>ZEIIA CRM</span>
        </div>
        <div style={{ fontSize:22, fontWeight:800 }}>إدارة المستخدمين والصلاحيات</div>
        <div style={{ width:40, height:2, background:'#C9A96E', borderRadius:2, margin:'5px 0' }}/>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, marginBottom:20, borderBottom:'1px solid #334155', paddingBottom:1 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            height:38, padding:'0 20px', border:'none', cursor:'pointer',
            background:'transparent', fontFamily:"'Cairo',sans-serif", fontSize:14,
            color: tab===t.id ? '#C9A96E' : '#64748b',
            fontWeight: tab===t.id ? 800 : 400,
            borderBottom: tab===t.id ? '2px solid #C9A96E' : '2px solid transparent',
            marginBottom:-1, transition:'all .15s',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Content */}
      {tab === 'users'       && <UsersTab       showToast={showToast}/>}
      {tab === 'roles'       && <RolesTab       showToast={showToast}/>}
      {tab === 'permissions' && <PermissionsTab />}
    </div>
  )
}