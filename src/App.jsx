import React, { useMemo, useState } from "react";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedWarningId, setSelectedWarningId] = useState("W20260313001");
  const [selectedStudentId, setSelectedStudentId] = useState("20230001");
  const [appointmentStatus, setAppointmentStatus] = useState({
    A001: "待受理",
    A002: "已联系",
    A003: "已预约",
  });
  const [followupOpen, setFollowupOpen] = useState(false);

  const stats = [
    { label: "今日打卡人数", value: 128, sub: "+12 较昨日" },
    { label: "今日测评人数", value: 46, sub: "+5 较昨日" },
    { label: "今日预约申请", value: 9, sub: "3 条待受理" },
    { label: "待处理预警", value: 7, sub: "2 条高风险" },
  ];

  const warnings = [
    {
      id: "W20260313001",
      userId: "U001",
      name: "张同学",
      studentNo: "20230001",
      college: "信息学院",
      className: "电子信息2301",
      level: "L3",
      source: "倾诉风险",
      reason: "命中高危关键词",
      time: "2026-03-13 10:21",
      status: "待处理",
    },
    {
      id: "W20260313002",
      userId: "U002",
      name: "李同学",
      studentNo: "20230015",
      college: "计算机学院",
      className: "软件工程2302",
      level: "L2",
      source: "心理测评",
      reason: "测评分数偏高",
      time: "2026-03-13 09:45",
      status: "跟进中",
    },
    {
      id: "W20260313003",
      userId: "U003",
      name: "王同学",
      studentNo: "20230028",
      college: "机械学院",
      className: "机械2301",
      level: "L1",
      source: "情绪打卡",
      reason: "连续3天低情绪",
      time: "2026-03-12 20:14",
      status: "待处理",
    },
  ];

  const students = [
    {
      studentNo: "20230001",
      name: "张同学",
      college: "信息学院",
      className: "电子信息2301",
      phone: "138****1234",
      level: "L3 紧急关注",
      assessment: "中高风险",
      appointment: "已提交申请",
      lowMoodDays: 4,
      processStatus: "待人工复核",
      checkinTrend: [35, 45, 40, 58, 49, 70, 55],
    },
    {
      studentNo: "20230015",
      name: "李同学",
      college: "计算机学院",
      className: "软件工程2302",
      phone: "186****2356",
      level: "L2 重点关注",
      assessment: "中风险",
      appointment: "暂未预约",
      lowMoodDays: 2,
      processStatus: "跟进中",
      checkinTrend: [55, 50, 42, 46, 52, 44, 48],
    },
    {
      studentNo: "20230028",
      name: "王同学",
      college: "机械学院",
      className: "机械2301",
      phone: "137****6645",
      level: "L1 一般关注",
      assessment: "轻度波动",
      appointment: "暂未预约",
      lowMoodDays: 3,
      processStatus: "待处理",
      checkinTrend: [48, 44, 46, 43, 40, 38, 36],
    },
  ];

  const appointments = [
    {
      id: "A001",
      name: "陈同学",
      college: "信息学院",
      type: "心理咨询",
      desc: "近期学习压力较大，希望预约沟通",
      time: "2026-03-13 11:00",
      status: "待受理",
    },
    {
      id: "A002",
      name: "赵同学",
      college: "外国语学院",
      type: "情绪疏导",
      desc: "睡眠状态差，情绪低落",
      time: "2026-03-13 09:10",
      status: "已联系",
    },
    {
      id: "A003",
      name: "孙同学",
      college: "经管学院",
      type: "复诊回访",
      desc: "上次咨询后一周回访",
      time: "2026-03-12 16:30",
      status: "已预约",
    },
  ];

  const followups = [
    {
      time: "2026-03-13 10:40",
      operator: "张老师",
      action: "电话联系",
      note: "学生表示近期学业压力较大，已建议尽快面谈。",
    },
    {
      time: "2026-03-13 11:10",
      operator: "王辅导员",
      action: "班级辅导",
      note: "已同步关注学生近期出勤与作业状态。",
    },
  ];

  const levelStyle = {
    L1: "badge badge-l1",
    L2: "badge badge-l2",
    L3: "badge badge-l3",
  };

  const statusStyle = {
    待处理: "status status-red",
    跟进中: "status status-blue",
    已联系: "status status-green",
    待受理: "status status-orange",
    已预约: "status status-purple",
    已完成: "status status-green",
    已取消: "status status-gray",
  };

  const navItems = [
    { key: "dashboard", label: "总览看板 Dashboard" },
    { key: "warnings", label: "预警中心 Warning List" },
    { key: "student", label: "学生详情 Student Detail" },
    { key: "appointment", label: "预约管理 Appointment" },
    { key: "analytics", label: "统计分析 Analytics" },
  ];

  const selectedWarning = useMemo(
    () => warnings.find((w) => w.id === selectedWarningId) || warnings[0],
    [selectedWarningId]
  );

  const selectedStudent = useMemo(
    () => students.find((s) => s.studentNo === selectedStudentId) || students[0],
    [selectedStudentId]
  );

  function TrendBar({ h, label = "日" }) {
    return (
      <div className="trend-item">
        <div className="trend-outer">
          <div className="trend-inner" style={{ height: `${h}%` }} />
        </div>
        <span className="trend-label">{label}</span>
      </div>
    );
  }

  function Card({ children, className = "" }) {
    return <div className={`card ${className}`}>{children}</div>;
  }

  const renderDashboard = () => (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <div className="page-caption">学校端首页</div>
          <h2 className="page-title">总览看板</h2>
        </div>
        <div className="header-actions">
          <button className="btn btn-light">导出日报</button>
          <button onClick={() => setFollowupOpen(true)} className="btn btn-dark">
            新增跟进记录
          </button>
        </div>
      </header>

      <section className="stats-grid">
        {stats.map((item) => (
          <Card key={item.label}>
            <div className="stat-label">{item.label}</div>
            <div className="stat-value">{item.value}</div>
            <div className="stat-sub">{item.sub}</div>
          </Card>
        ))}
      </section>

      <section className="three-grid">
        <Card className="span-2">
          <div className="section-head between">
            <div>
              <h3 className="section-title">近 7 日预警趋势</h3>
              <p className="section-sub">展示近一周重点关注事件变化</p>
            </div>
            <div className="chip">最近更新：今天 11:30</div>
          </div>
          <div className="trend-row">
            {[
              { h: 38, label: "一" },
              { h: 54, label: "二" },
              { h: 41, label: "三" },
              { h: 62, label: "四" },
              { h: 49, label: "五" },
              { h: 72, label: "六" },
              { h: 58, label: "日" },
            ].map((item, idx) => (
              <TrendBar key={idx} h={item.h} label={item.label} />
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="section-title">风险等级分布</h3>
          <p className="section-sub">当前已识别学生风险分层</p>
          <div className="list-gap">
            {[
              { label: "L0 状态平稳", value: 72, width: "72%" },
              { label: "L1 一般关注", value: 16, width: "16%" },
              { label: "L2 重点关注", value: 9, width: "9%" },
              { label: "L3 紧急关注", value: 3, width: "3%" },
            ].map((item) => (
              <div key={item.label}>
                <div className="bar-head">
                  <span>{item.label}</span>
                  <span className="bar-value">{item.value}</span>
                </div>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: item.width }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="five-grid">
        <Card className="span-3">
          <div className="section-head between">
            <div>
              <h3 className="section-title">预警中心</h3>
              <p className="section-sub">自动识别结果 + 人工处理状态</p>
            </div>
            <button onClick={() => setActivePage("warnings")} className="btn btn-light">
              查看全部
            </button>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>学生</th>
                  <th>来源</th>
                  <th>等级</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {warnings.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="cell-title">{item.name}</div>
                      <div className="cell-sub">{item.college} · {item.className}</div>
                    </td>
                    <td>
                      <div>{item.source}</div>
                      <div className="cell-sub">{item.reason}</div>
                    </td>
                    <td>
                      <span className={levelStyle[item.level]}>{item.level}</span>
                    </td>
                    <td>
                      <span className={statusStyle[item.status] || "status status-gray"}>{item.status}</span>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setSelectedWarningId(item.id);
                          setSelectedStudentId(item.studentNo);
                          setActivePage("student");
                        }}
                        className="btn btn-small btn-dark"
                      >
                        查看详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="span-2">
          <div>
            <h3 className="section-title">学生详情</h3>
            <p className="section-sub">重点学生个体状态与跟进记录</p>
          </div>

          <div className="detail-box">
            <div className="between top-gap">
              <div>
                <div className="detail-name">{selectedStudent.name}</div>
                <div className="cell-sub detail-meta">
                  {selectedStudent.college} · {selectedStudent.className} · {selectedStudent.studentNo}
                </div>
              </div>
              <span className="badge badge-l3">{selectedStudent.level}</span>
            </div>

            <div className="mini-grid top-gap-lg">
              <div className="mini-card">
                <div className="mini-label">最近测评</div>
                <div className="mini-value">{selectedStudent.assessment}</div>
              </div>
              <div className="mini-card">
                <div className="mini-label">预约状态</div>
                <div className="mini-value">{selectedStudent.appointment}</div>
              </div>
              <div className="mini-card">
                <div className="mini-label">连续低情绪</div>
                <div className="mini-value">{selectedStudent.lowMoodDays} 天</div>
              </div>
              <div className="mini-card">
                <div className="mini-label">当前状态</div>
                <div className="mini-value">{selectedStudent.processStatus}</div>
              </div>
            </div>
          </div>

          <div className="top-gap-lg">
            <div className="section-small-title">跟进记录</div>
            <div className="list-gap-sm">
              {followups.map((item, idx) => (
                <div key={idx} className="follow-card">
                  <div className="between">
                    <span className="cell-title">{item.action}</span>
                    <span className="cell-sub">{item.time}</span>
                  </div>
                  <div className="cell-sub top-gap-xs">操作人：{item.operator}</div>
                  <div className="top-gap-sm line-height">{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section>
        <Card>
          <div className="section-head between">
            <div>
              <h3 className="section-title">预约管理</h3>
              <p className="section-sub">学生预约申请的受理与处理状态</p>
            </div>
            <button onClick={() => setActivePage("appointment")} className="btn btn-light">
              进入预约页
            </button>
          </div>

          <div className="appointment-grid">
            {appointments.map((item) => (
              <div key={item.id} className="appointment-card">
                <div className="between start-align">
                  <div>
                    <div className="cell-title big">{item.name}</div>
                    <div className="cell-sub top-gap-xs">{item.college}</div>
                  </div>
                  <span className={statusStyle[appointmentStatus[item.id]] || "status status-gray"}>
                    {appointmentStatus[item.id]}
                  </span>
                </div>
                <div className="text-list top-gap">
                  <div><span className="muted">预约类型：</span>{item.type}</div>
                  <div><span className="muted">提交时间：</span>{item.time}</div>
                  <div className="line-height"><span className="muted">说明：</span>{item.desc}</div>
                </div>
                <div className="two-btns top-gap-lg">
                  <button onClick={() => setActivePage("appointment")} className="btn btn-dark full">查看详情</button>
                  <button
                    onClick={() => {
                      const current = appointmentStatus[item.id];
                      const next =
                        current === "待受理"
                          ? "已联系"
                          : current === "已联系"
                          ? "已预约"
                          : current === "已预约"
                          ? "已完成"
                          : "待受理";
                      setAppointmentStatus((prev) => ({ ...prev, [item.id]: next }));
                    }}
                    className="btn btn-light full"
                  >
                    更新状态
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );

  const renderWarningPage = () => (
    <div className="page-stack">
      <header>
        <div className="page-caption">学校端 / 预警中心</div>
        <h2 className="page-title">预警中心</h2>
      </header>

      <Card>
        <div className="filter-grid">
          <input className="input" placeholder="搜索学生姓名 / 学号" />
          <select className="input">
            <option>全部等级</option>
            <option>L1 一般关注</option>
            <option>L2 重点关注</option>
            <option>L3 紧急关注</option>
          </select>
          <select className="input">
            <option>全部来源</option>
            <option>情绪打卡</option>
            <option>心理测评</option>
            <option>倾诉风险</option>
          </select>
          <select className="input">
            <option>全部状态</option>
            <option>待处理</option>
            <option>跟进中</option>
            <option>已联系</option>
          </select>
        </div>
      </Card>

      <Card>
        <div className="table-wrap">
          <table className="table min-wide">
            <thead>
              <tr>
                <th>学生</th>
                <th>学院班级</th>
                <th>触发来源</th>
                <th>风险等级</th>
                <th>触发时间</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {warnings.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="cell-title">{item.name}</div>
                    <div className="cell-sub">{item.studentNo}</div>
                  </td>
                  <td>
                    <div>{item.college}</div>
                    <div className="cell-sub">{item.className}</div>
                  </td>
                  <td>
                    <div>{item.source}</div>
                    <div className="cell-sub">{item.reason}</div>
                  </td>
                  <td>
                    <span className={levelStyle[item.level]}>{item.level}</span>
                  </td>
                  <td>{item.time}</td>
                  <td>
                    <span className={statusStyle[item.status] || "status status-gray"}>{item.status}</span>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedWarningId(item.id);
                        setSelectedStudentId(item.studentNo);
                        setActivePage("student");
                      }}
                      className="btn btn-small btn-dark"
                    >
                      查看详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderStudentPage = () => (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <div className="page-caption">学校端 / 学生详情</div>
          <h2 className="page-title">学生详情</h2>
        </div>
        <button onClick={() => setFollowupOpen(true)} className="btn btn-dark">新增跟进</button>
      </header>

      <div className="three-grid">
        <Card className="span-2">
          <div className="between start-align">
            <div>
              <div className="detail-name large">{selectedStudent.name}</div>
              <div className="cell-sub top-gap-sm">
                {selectedStudent.college} · {selectedStudent.className} · {selectedStudent.studentNo}
              </div>
              <div className="cell-sub top-gap-xs">联系方式：{selectedStudent.phone}</div>
            </div>
            <span className="badge badge-l3">{selectedStudent.level}</span>
          </div>

          <div className="mini-grid-4 top-gap-lg">
            <div className="mini-card gray"><div className="mini-label">最近测评</div><div className="mini-value">{selectedStudent.assessment}</div></div>
            <div className="mini-card gray"><div className="mini-label">预约状态</div><div className="mini-value">{selectedStudent.appointment}</div></div>
            <div className="mini-card gray"><div className="mini-label">连续低情绪</div><div className="mini-value">{selectedStudent.lowMoodDays} 天</div></div>
            <div className="mini-card gray"><div className="mini-label">处理状态</div><div className="mini-value">{selectedStudent.processStatus}</div></div>
          </div>

          <div className="top-gap-xl">
            <div className="section-title">最近 7 天情绪趋势</div>
            <div className="trend-row top-gap">
              {selectedStudent.checkinTrend.map((h, idx) => (
                <TrendBar key={idx} h={h} label={`${idx + 1}日`} />
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="section-title">当前预警</div>
          <div className="detail-box top-gap">
            <div className="mini-label">来源</div>
            <div className="mini-value top-gap-xs">{selectedWarning.source}</div>
            <div className="mini-label top-gap-lg">原因</div>
            <div className="mini-value top-gap-xs">{selectedWarning.reason}</div>
            <div className="mini-label top-gap-lg">触发时间</div>
            <div className="mini-value top-gap-xs">{selectedWarning.time}</div>
          </div>

          <div className="top-gap-lg">
            <div className="section-title">跟进记录</div>
            <div className="list-gap-sm top-gap">
              {followups.map((item, idx) => (
                <div key={idx} className="follow-card">
                  <div className="between">
                    <span className="cell-title">{item.action}</span>
                    <span className="cell-sub">{item.time}</span>
                  </div>
                  <div className="cell-sub top-gap-xs">操作人：{item.operator}</div>
                  <div className="top-gap-sm line-height">{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderAppointmentPage = () => (
    <div className="page-stack">
      <header>
        <div className="page-caption">学校端 / 预约管理</div>
        <h2 className="page-title">预约管理</h2>
      </header>

      <div className="appointment-grid">
        {appointments.map((item) => (
          <Card key={item.id}>
            <div className="between start-align">
              <div>
                <div className="cell-title big">{item.name}</div>
                <div className="cell-sub top-gap-xs">{item.college}</div>
              </div>
              <span className={statusStyle[appointmentStatus[item.id]] || "status status-gray"}>
                {appointmentStatus[item.id]}
              </span>
            </div>
            <div className="text-list top-gap">
              <div><span className="muted">预约类型：</span>{item.type}</div>
              <div><span className="muted">提交时间：</span>{item.time}</div>
              <div className="line-height"><span className="muted">说明：</span>{item.desc}</div>
            </div>
            <div className="two-btns top-gap-lg">
              <button className="btn btn-dark full">查看详情</button>
              <button
                onClick={() => {
                  const current = appointmentStatus[item.id];
                  const next =
                    current === "待受理"
                      ? "已联系"
                      : current === "已联系"
                      ? "已预约"
                      : current === "已预约"
                      ? "已完成"
                      : "待受理";
                  setAppointmentStatus((prev) => ({ ...prev, [item.id]: next }));
                }}
                className="btn btn-light full"
              >
                更新状态
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAnalyticsPage = () => (
    <div className="page-stack">
      <header>
        <div className="page-caption">学校端 / 统计分析</div>
        <h2 className="page-title">统计分析</h2>
      </header>

      <div className="two-grid">
        <Card>
          <div className="section-title">学院风险分布</div>
          <div className="list-gap top-gap">
            {[
              ["信息学院", 18],
              ["计算机学院", 13],
              ["机械学院", 9],
              ["经管学院", 7],
            ].map(([name, value]) => (
              <div key={name}>
                <div className="bar-head">
                  <span>{name}</span>
                  <span className="bar-value">{value}</span>
                </div>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: `${Number(value) * 4}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="section-title">闭环处理率</div>
          <div className="giant-number top-gap">84%</div>
          <div className="section-sub top-gap-sm">本月预警事件中，84% 已完成联系、跟进或转介。</div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="app-shell">
      <div className="layout">
        <aside className="sidebar">
          <div>
            <div className="sidebar-caption">心桥校园 · 学校端</div>
            <h1 className="sidebar-title">心理健康工作台</h1>
            <p className="sidebar-desc">
              面向辅导员、心理老师与管理者的预警查看、人工复核、服务跟进与统计分析后台。
            </p>
          </div>

          <nav className="nav-list">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActivePage(item.key)}
                className={`nav-btn ${activePage === item.key ? "nav-btn-active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="role-box">
            <div className="role-label">当前角色</div>
            <div className="role-title">心理中心负责人</div>
            <div className="role-desc">查看全校趋势、预警与闭环情况</div>
          </div>
        </aside>

        <main className="main-content">
          {activePage === "dashboard" && renderDashboard()}
          {activePage === "warnings" && renderWarningPage()}
          {activePage === "student" && renderStudentPage()}
          {activePage === "appointment" && renderAppointmentPage()}
          {activePage === "analytics" && renderAnalyticsPage()}
        </main>
      </div>

      {followupOpen && (
        <div className="modal-mask">
          <div className="modal-box">
            <div className="between start-align">
              <div>
                <div className="modal-title">新增跟进记录</div>
                <div className="section-sub top-gap-xs">演示版弹窗，后续可接真实表单与云函数</div>
              </div>
              <button onClick={() => setFollowupOpen(false)} className="btn btn-light">关闭</button>
            </div>
            <div className="filter-grid top-gap-lg">
              <input className="input" placeholder="学生姓名" defaultValue={selectedStudent.name} />
              <input className="input" placeholder="操作人" defaultValue="张老师" />
              <select className="input">
                <option>电话联系</option>
                <option>线下面谈</option>
                <option>班级关注</option>
                <option>转介处理</option>
              </select>
              <input className="input" placeholder="下次回访时间" defaultValue="2026-03-15 15:00" />
            </div>
            <textarea
              className="textarea top-gap"
              defaultValue="学生表示近期学习压力较大，已建议尽快安排面谈。"
            />
            <div className="header-actions top-gap">
              <button onClick={() => setFollowupOpen(false)} className="btn btn-light">取消</button>
              <button onClick={() => setFollowupOpen(false)} className="btn btn-dark">保存记录</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
