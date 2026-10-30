import React, { useState, useRef } from 'react';
import { DEFAULT_CONFIG } from './defaultConfig';
import { generateSignatureHtml } from './utils/generateSignatureHtml';
import './App.css';

export default function App() {
  const [formData, setFormData] = useState(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState('colaborador');
  const [feedback, setFeedback] = useState({ show: false, message: '', type: 'success' });
  const [testingStatus, setTestingStatus] = useState(null);
  const previewRef = useRef(null);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const showToast = (message, type = 'success') => {
    setFeedback({ show: true, message, type });
    setTimeout(() => setFeedback({ show: false, message: '', type: 'success' }), 4500);
  };

  const handleCopySignature = async () => {
    const rawHtml = generateSignatureHtml(formData);
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const blobHtml = new Blob([rawHtml], { type: 'text/html' });
        const blobText = new Blob([previewRef.current ? previewRef.current.innerText : 'Assinatura Comfort Door'], { type: 'text/plain' });
        await navigator.clipboard.write([
          new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobText })
        ]);
        showToast('Assinatura copiada! Cole no Gmail com Ctrl + V.', 'success');
        return;
      }
      throw new Error();
    } catch {
      try {
        if (previewRef.current) {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(previewRef.current);
          selection.removeAllRanges();
          selection.addRange(range);
          document.execCommand('copy');
          selection.removeAllRanges();
          showToast('Assinatura copiada com sucesso!', 'success');
          return;
        }
      } catch {}
      showToast('Falha ao copiar. Use o botão Baixar HTML.', 'error');
    }
  };

  const handleDownloadHtml = () => {
    const rawHtml = generateSignatureHtml(formData);
    const blob = new Blob([rawHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `assinatura-${formData.colaborador.nome.toLowerCase().replace(/\s+/g, '-') || 'comfortdoor'}.html`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Arquivo baixado com sucesso!', 'success');
  };

  const handleRestoreDefaults = () => {
    if (window.confirm('Restaurar padrão da Comfort Door?')) {
      setFormData(DEFAULT_CONFIG);
      setTestingStatus(null);
      showToast('Padrão restaurado.', 'info');
    }
  };

  const handleClearCollaborator = () => {
    setFormData(prev => ({
      ...prev,
      colaborador: { nome: '', cargo: '', telefone: '', email: '', fotoUrl: '' }
    }));
    showToast('Campos limpos.', 'info');
  };

  const handleTestImages = async () => {
    setTestingStatus('testing');
    const urls = [
      formData.colaborador.fotoUrl,
      formData.imagens.logoUrl,
      formData.imagens.bannerUrl,
      formData.imagens.iconeInstagramUrl,
      formData.imagens.iconeTiktokUrl,
      formData.imagens.iconeLinkedinUrl,
      formData.imagens.iconeYoutubeUrl
    ].filter(Boolean);

    const check = (url) => new Promise(res => {
      const img = new Image();
      img.onload = () => res(true);
      img.onerror = () => res(false);
      img.src = url;
    });

    const results = await Promise.all(urls.map(check));
    if (results.every(Boolean)) {
      setTestingStatus('ok');
      showToast('Todas as imagens estão online!', 'success');
    } else {
      setTestingStatus('error');
      showToast('Algumas imagens falharam ao carregar. Verifique as URLs.', 'error');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <div className="header-logo-badge">CD</div>
          <div>
            <h1>Gerador de Assinaturas Corporativas</h1>
            <p>Comfort Door &bull; Marketing &bull; Gmail Ready</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={handleTestImages}>
            {testingStatus === 'testing' ? 'Testando...' : 'Testar Imagens'}
          </button>
          <button className="btn btn-outline" onClick={handleRestoreDefaults}>Restaurar Padrão</button>
        </div>
      </header>

      {feedback.show && (
        <div className={`toast-notification toast-${feedback.type}`}>
          <span>{feedback.message}</span>
        </div>
      )}

      <main className="app-main">
        <section className="editor-column">
          <div className="tabs-nav">
            <button className={`tab-btn ${activeTab === 'colaborador' ? 'active' : ''}`} onClick={() => setActiveTab('colaborador')}>Colaborador</button>
            <button className={`tab-btn ${activeTab === 'redes' ? 'active' : ''}`} onClick={() => setActiveTab('redes')}>Redes & Links</button>
            <button className={`tab-btn ${activeTab === 'institucional' ? 'active' : ''}`} onClick={() => setActiveTab('institucional')}>Imagens FTP</button>
          </div>

          <div className="panel-content">
            {activeTab === 'colaborador' && (
              <div className="tab-pane">
                <div className="pane-header">
                  <h3>Dados do Colaborador</h3>
                  <button className="btn-text-clear" onClick={handleClearCollaborator}>Limpar Campos</button>
                </div>
                <div className="form-group">
                  <label>Nome Completo</label>
                  <input type="text" value={formData.colaborador.nome} onChange={e => handleChange('colaborador', 'nome', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Cargo</label>
                  <input type="text" value={formData.colaborador.cargo} onChange={e => handleChange('colaborador', 'cargo', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Telefone / WhatsApp</label>
                  <input type="text" value={formData.colaborador.telefone} onChange={e => handleChange('colaborador', 'telefone', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>E-mail (Opcional)</label>
                  <input type="email" value={formData.colaborador.email} onChange={e => handleChange('colaborador', 'email', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>URL HTTPS da Foto (102 × 136 px)</label>
                  <input type="url" value={formData.colaborador.fotoUrl} onChange={e => handleChange('colaborador', 'fotoUrl', e.target.value)} />
                </div>
              </div>
            )}

            {activeTab === 'redes' && (
              <div className="tab-pane">
                <div className="pane-header"><h3>Redes Sociais</h3></div>
                <div className="form-group">
                  <label>Site Oficial (URL)</label>
                  <input type="url" value={formData.links.siteUrl} onChange={e => handleChange('links', 'siteUrl', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Texto do Site</label>
                  <input type="text" value={formData.links.siteLabel} onChange={e => handleChange('links', 'siteLabel', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Instagram URL</label>
                  <input type="url" value={formData.links.instagramUrl} onChange={e => handleChange('links', 'instagramUrl', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>TikTok URL</label>
                  <input type="url" value={formData.links.tiktokUrl} onChange={e => handleChange('links', 'tiktokUrl', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>LinkedIn URL</label>
                  <input type="url" value={formData.links.linkedinUrl} onChange={e => handleChange('links', 'linkedinUrl', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>YouTube URL</label>
                  <input type="url" value={formData.links.youtubeUrl} onChange={e => handleChange('links', 'youtubeUrl', e.target.value)} />
                </div>
              </div>
            )}

            {activeTab === 'institucional' && (
              <div className="tab-pane">
                <div className="pane-header"><h3>Imagens Institucionais (FTP)</h3></div>
                <div className="form-group">
                  <label>Logotipo Comfort Door</label>
                  <input type="url" value={formData.imagens.logoUrl} onChange={e => handleChange('imagens', 'logoUrl', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Banner Direito (173 × 136 px)</label>
                  <input type="url" value={formData.imagens.bannerUrl} onChange={e => handleChange('imagens', 'bannerUrl', e.target.value)} />
                </div>
                <div className="grid-2col">
                  <div className="form-group">
                    <label>Ícone Instagram</label>
                    <input type="url" value={formData.imagens.iconeInstagramUrl} onChange={e => handleChange('imagens', 'iconeInstagramUrl', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Ícone TikTok</label>
                    <input type="url" value={formData.imagens.iconeTiktokUrl} onChange={e => handleChange('imagens', 'iconeTiktokUrl', e.target.value)} />
                  </div>
                </div>
                <div className="grid-2col">
                  <div className="form-group">
                    <label>Ícone LinkedIn</label>
                    <input type="url" value={formData.imagens.iconeLinkedinUrl} onChange={e => handleChange('imagens', 'iconeLinkedinUrl', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Ícone YouTube</label>
                    <input type="url" value={formData.imagens.iconeYoutubeUrl} onChange={e => handleChange('imagens', 'iconeYoutubeUrl', e.target.value)} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="preview-column">
          <div className="card-preview">
            <div className="card-preview-header">
              <h2>Pré-visualização</h2>
              <span className="dimension-tag">625 × 164 px</span>
            </div>
            <div className="preview-stage-wrapper">
              <div className="signature-viewport" ref={previewRef} dangerouslySetInnerHTML={{ __html: generateSignatureHtml(formData) }} />
            </div>
            <div className="actions-panel">
              <button className="btn btn-primary-large" onClick={handleCopySignature}>COPIAR ASSINATURA</button>
              <button className="btn btn-secondary-large" onClick={handleDownloadHtml}>BAIXAR HTML</button>
            </div>
            <div className="gmail-instructions">
              <h4>Instruções Gmail:</h4>
              <ol>
                <li>Clique em <strong>COPIAR ASSINATURA</strong>.</li>
                <li>No Gmail, vá em <strong>Configurações &gt; Geral &gt; Assinatura</strong>.</li>
                <li>Pressione <strong>Ctrl + V</strong> e salve as alterações.</li>
              </ol>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
