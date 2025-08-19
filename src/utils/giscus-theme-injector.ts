/**
 * Giscus Theme Injector
 * Injects custom CSS into Giscus iframe for seamless portfolio integration
 */

export function injectGiscusTheme() {
  // Custom CSS to inject into Giscus iframe
  const customCSS = `
    /* Portfolio Integration Styles */
    .gsc-main {
      background: #030712 !important;
      color: #e0f2fe !important;
      font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
    }
    
    .gsc-comment-box {
      background: linear-gradient(135deg, #111827 0%, #1f2937 100%) !important;
      border: 1px solid rgba(99, 102, 241, 0.2) !important;
      border-radius: 12px !important;
    }
    
    .gsc-comment-box-textarea {
      background: #030712 !important;
      color: #e0f2fe !important;
      border: 1px solid rgba(99, 102, 241, 0.2) !important;
      border-radius: 8px !important;
      font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
    }
    
    .gsc-comment-box-textarea:focus {
      border-color: #6366f1 !important;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
    }
    
    .gsc-comment-box-bottom {
      background: transparent !important;
    }
    
    .gsc-comment-box-preview {
      background: #111827 !important;
      border: 1px solid rgba(99, 102, 241, 0.2) !important;
      border-radius: 8px !important;
      color: #e0f2fe !important;
    }
    
    .gsc-comment-box-tabs {
      border-bottom: 1px solid rgba(99, 102, 241, 0.2) !important;
    }
    
    .gsc-comment-box-tab {
      color: #9ca3af !important;
      border-bottom: 2px solid transparent !important;
    }
    
    .gsc-comment-box-tab[aria-selected="true"] {
      color: #6366f1 !important;
      border-bottom-color: #6366f1 !important;
    }
    
    .gsc-comment-box-tab:hover {
      color: #818cf8 !important;
    }
    
    .gsc-comment {
      background: linear-gradient(135deg, #111827 0%, #1f2937 100%) !important;
      border: 1px solid rgba(99, 102, 241, 0.1) !important;
      border-radius: 12px !important;
      margin: 1rem 0 !important;
    }
    
    .gsc-comment-header {
      border-bottom: 1px solid rgba(99, 102, 241, 0.1) !important;
      background: rgba(99, 102, 241, 0.05) !important;
    }
    
    .gsc-comment-author {
      color: #e0f2fe !important;
      font-weight: 600 !important;
    }
    
    .gsc-comment-author-avatar {
      border-radius: 50% !important;
      border: 2px solid rgba(99, 102, 241, 0.2) !important;
    }
    
    .gsc-comment-content {
      color: #e0f2fe !important;
      background: transparent !important;
    }
    
    .gsc-comment-content a {
      color: #6366f1 !important;
    }
    
    .gsc-comment-content a:hover {
      color: #818cf8 !important;
    }
    
    .gsc-comment-content code {
      background: #111827 !important;
      color: #00ffff !important;
      border: 1px solid rgba(99, 102, 241, 0.2) !important;
      border-radius: 4px !important;
    }
    
    .gsc-comment-content pre {
      background: #111827 !important;
      border: 1px solid rgba(99, 102, 241, 0.2) !important;
      border-radius: 8px !important;
    }
    
    .gsc-comment-content blockquote {
      border-left: 4px solid #6366f1 !important;
      background: rgba(99, 102, 241, 0.05) !important;
      color: #e0f2fe !important;
    }
    
    .gsc-reply {
      background: linear-gradient(135deg, #1f2937 0%, #374151 100%) !important;
      border: 1px solid rgba(99, 102, 241, 0.1) !important;
      border-radius: 8px !important;
    }
    
    .gsc-replies {
      border-left: 2px solid rgba(99, 102, 241, 0.2) !important;
      margin-left: 1rem !important;
      padding-left: 1rem !important;
    }
    
    .gsc-reactions {
      background: rgba(99, 102, 241, 0.05) !important;
      border: 1px solid rgba(99, 102, 241, 0.1) !important;
      border-radius: 8px !important;
    }
    
    .gsc-reactions-menu {
      background: #1f2937 !important;
      border: 1px solid rgba(99, 102, 241, 0.2) !important;
      border-radius: 8px !important;
      box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.4) !important;
    }
    
    .gsc-reaction-count {
      color: #9ca3af !important;
    }
    
    .gsc-reaction-count[aria-pressed="true"] {
      background: rgba(99, 102, 241, 0.2) !important;
      color: #6366f1 !important;
    }
    
    .gsc-pagination {
      border-top: 1px solid rgba(99, 102, 241, 0.2) !important;
    }
    
    .gsc-pagination-button {
      background: linear-gradient(135deg, #1f2937 0%, #374151 100%) !important;
      border: 1px solid rgba(99, 102, 241, 0.2) !important;
      color: #e0f2fe !important;
      border-radius: 8px !important;
    }
    
    .gsc-pagination-button:hover {
      background: linear-gradient(135deg, #374151 0%, #4b5563 100%) !important;
      border-color: #6366f1 !important;
    }
    
    .gsc-pagination-button:disabled {
      opacity: 0.5 !important;
    }
    
    .gsc-loading {
      color: #6366f1 !important;
    }
    
    .gsc-button {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%) !important;
      color: #ffffff !important;
      border: none !important;
      border-radius: 8px !important;
      font-weight: 600 !important;
      transition: all 0.2s ease !important;
    }
    
    .gsc-button:hover {
      background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%) !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3) !important;
    }
    
    .gsc-button-secondary {
      background: transparent !important;
      border: 1px solid rgba(99, 102, 241, 0.2) !important;
      color: #6366f1 !important;
    }
    
    .gsc-button-secondary:hover {
      background: rgba(99, 102, 241, 0.1) !important;
      border-color: #6366f1 !important;
    }
    
    /* Custom scrollbar for better integration */
    ::-webkit-scrollbar {
      width: 8px !important;
      height: 8px !important;
    }
    
    ::-webkit-scrollbar-track {
      background: #1f2937 !important;
      border-radius: 4px !important;
    }
    
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #6366f1, #00ffff) !important;
      border-radius: 4px !important;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(135deg, #4f46e5, #0891b2) !important;
    }
  `;

  // Function to inject CSS into iframe
  function injectIntoIframe() {
    const iframe = document.querySelector<HTMLIFrameElement>('.giscus-frame');
    if (!iframe || !iframe.contentDocument) return;

    try {
      const iframeDoc = iframe.contentDocument;
      let styleElement = iframeDoc.getElementById('portfolio-giscus-styles');
      
      if (!styleElement) {
        styleElement = iframeDoc.createElement('style');
        styleElement.id = 'portfolio-giscus-styles';
        styleElement.textContent = customCSS;
        iframeDoc.head.appendChild(styleElement);
      }
    } catch (error) {
      console.log('Could not inject styles into Giscus iframe (CORS limitation)');
    }
  }

  // Try to inject styles when iframe loads
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement && node.querySelector('.giscus-frame')) {
          setTimeout(injectIntoIframe, 500);
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Also try immediately in case iframe is already present
  setTimeout(injectIntoIframe, 1000);
  setTimeout(injectIntoIframe, 3000);
  setTimeout(injectIntoIframe, 5000);
}

export default injectGiscusTheme;
