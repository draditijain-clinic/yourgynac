import { useToast } from '../ToastNotification';

export default function Messages() {
  const { showToast } = useToast() || {};
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getTemplates();
      setTemplates(data || []);
      if (data && data.length > 0) setSelectedTemplate(data[0]);
    } catch (err) {
      console.error("Failed to load templates:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedTemplate || saving) return;
    setSaving(true);
    try {
      await adminApi.updateTemplate({
        name: selectedTemplate.name,
        subject: selectedTemplate.subject,
        message: selectedTemplate.message
      });
      if (showToast) showToast("Template updated successfully!", "success");
      loadTemplates();
    } catch (err) {
      if (showToast) showToast("Failed to update template: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="messages-view fade-in-up">
      <div className="view-header">
        <div>
          <h2>Message Templates</h2>
          <p className="subtext">Edit default WhatsApp & Email message templates without touching code.</p>
        </div>
        <button className="btn btn-outline" onClick={loadTemplates}>
          <RefreshCw size={16} style={{ marginRight: '6px' }} /> REFRESH
        </button>
      </div>

      {loading ? (
        <div className="loading-state">Loading templates...</div>
      ) : (
        <div className="templates-grid">
          <div className="templates-sidebar">
            <h4>Templates List</h4>
            <ul className="tmpl-list">
              {templates.map(t => (
                <li 
                  key={t.name}
                  className={`tmpl-item ${selectedTemplate && selectedTemplate.name === t.name ? 'active' : ''}`}
                  onClick={() => setSelectedTemplate(t)}
                >
                  <span className={`channel-badge ${t.channel.toLowerCase()}`}>{t.channel}</span>
                  <span className="tmpl-name">{t.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {selectedTemplate && (
            <div className="template-editor-card">
              <h3>Edit Template: {selectedTemplate.name}</h3>
              <form onSubmit={handleSave}>
                {selectedTemplate.channel === 'EMAIL' && (
                  <div className="form-group">
                    <label>Email Subject</label>
                    <input 
                      type="text" 
                      value={selectedTemplate.subject || ''} 
                      onChange={e => setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })}
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Message Wording</label>
                  <p className="help-text">Available placeholders: <code>{"{{name}}"}</code>, <code>{"{{date}}"}</code>, <code>{"{{time}}"}</code>, <code>{"{{service}}"}</code>, <code>{"{{id}}"}</code>, <code>{"{{meetUrl}}"}</code></p>
                  <textarea 
                    rows="10" 
                    value={selectedTemplate.message || ''} 
                    onChange={e => setSelectedTemplate({ ...selectedTemplate, message: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={saving}>
                  <Save size={16} style={{ marginRight: '6px' }} />
                  {saving ? 'SAVING...' : 'SAVE TEMPLATE'}
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      <style>{`
        .messages-view {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .view-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f1ece1;
          padding-bottom: 15px;
        }
        .view-header h2 { margin: 0 0 5px 0; font-family: var(--font-serif); color: var(--primary-color); }
        .subtext { margin: 0; color: var(--text-light); font-size: 0.9rem; }
        .templates-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 30px;
        }
        .templates-sidebar {
          background-color: #ffffff;
          border-radius: var(--border-radius);
          padding: 20px;
          border: 1px solid #f1ece1;
        }
        .templates-sidebar h4 { margin: 0 0 15px 0; color: var(--primary-color); }
        .tmpl-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .tmpl-item {
          padding: 12px;
          border-radius: 6px;
          background: #fdfcf8;
          border: 1px solid #f1ece1;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .tmpl-item.active {
          border-color: var(--accent-color);
          background-color: #fcfaf5;
        }
        .channel-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          width: fit-content;
        }
        .channel-badge.email { background-color: #dbeafe; color: #1e40af; }
        .channel-badge.whatsapp { background-color: #dcfce7; color: #166534; }
        .tmpl-name { font-size: 0.85rem; font-weight: 600; color: var(--text-color); }

        .template-editor-card {
          background-color: #ffffff;
          border-radius: var(--border-radius);
          padding: 30px;
          border: 1px solid #f1ece1;
        }
        .template-editor-card h3 { margin: 0 0 20px 0; color: var(--primary-color); font-family: var(--font-serif); }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.85rem; }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 0.95rem;
          font-family: inherit;
        }
        .help-text { font-size: 0.8rem; color: var(--text-light); margin-bottom: 8px; }
        .help-text code { background-color: #f1f5f9; padding: 2px 5px; border-radius: 4px; color: var(--primary-color); }
        @media (max-width: 992px) {
          .templates-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
