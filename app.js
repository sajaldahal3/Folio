/**
 * Folio - Google Drive Office Suite
 * Main Application JavaScript
 */

// Configuration
const CONFIG = {
    API_KEY: 'YOUR_API_KEY',
    CLIENT_ID: 'YOUR_CLIENT_ID',
    DISCOVERY_DOCS: [
        'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
        'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'
    ],
    SCOPES: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.send'
    ].join(' ')
};

// Application State
const state = {
    user: null,
    files: [],
    currentView: 'dashboard',
    darkMode: false,
    scannerStream: null,
    editor: {
        type: null,
        fileId: null,
        content: null
    }
};

// DOM Elements
const elements = {
    screens: {
        loading: document.getElementById('loading-screen'),
        auth: document.getElementById('auth-screen'),
        main: document.getElementById('main-layout')
    },
    views: document.querySelectorAll('.view'),
    navItems: document.querySelectorAll('.nav-item'),
    buttons: {
        signin: document.getElementById('btn-signin-google'),
        signout: document.getElementById('btn-signout'),
        new: document.getElementById('btn-new'),
        createDoc: document.getElementById('btn-create-doc'),
        newDoc: document.getElementById('btn-new-doc'),
        newSheet: document.getElementById('btn-new-sheet'),
        newSlide: document.getElementById('btn-new-slide'),
        capture: document.getElementById('btn-capture'),
        toggleCamera: document.getElementById('btn-toggle-camera'),
        compose: document.getElementById('btn-compose'),
        closeEditor: document.getElementById('btn-close-editor'),
        save: document.getElementById('btn-save'),
        export: document.getElementById('btn-export'),
        viewGrid: document.getElementById('btn-view-grid'),
        viewList: document.getElementById('btn-view-list'),
        disconnect: document.getElementById('btn-disconnect')
    },
    editor: {
        modal: document.getElementById('editor-modal'),
        title: document.getElementById('editor-title'),
        doc: document.getElementById('doc-editor'),
        sheet: document.getElementById('sheet-editor'),
        slide: document.getElementById('slide-editor')
    },
    scanner: {
        video: document.getElementById('scanner-video'),
        canvas: document.getElementById('scanner-canvas'),
        results: document.getElementById('scanner-results')
    },
    stats: {
        docs: document.getElementById('stat-docs-count'),
        sheets: document.getElementById('stat-sheets-count'),
        slides: document.getElementById('stat-slides-count'),
        total: document.getElementById('stat-total-count')
    },
    lists: {
        recent: document.getElementById('recent-files-list'),
        files: document.getElementById('file-browser'),
        docs: document.getElementById('docs-list'),
        sheets: document.getElementById('sheets-list'),
        slides: document.getElementById('slides-list'),
        emails: document.getElementById('email-list'),
        viewer: document.getElementById('email-viewer')
    },
    user: {
        avatar: document.getElementById('user-avatar'),
        avatarImg: document.getElementById('user-avatar-img'),
        account: document.getElementById('connected-account')
    },
    toggles: {
        darkMode: document.getElementById('toggle-dark-mode')
    }
};

// Initialize Application
async function init() {
    showScreen('loading');
    
    // Check for existing auth
    const token = gapi.client.getToken();
    if (token) {
        await loadUser();
        await loadFiles();
        showScreen('main');
        updateDashboard();
    } else {
        showScreen('auth');
    }
    
    setupEventListeners();
    loadSettings();
}

// Screen Management
function showScreen(screenName) {
    Object.values(elements.screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    if (screenName === 'loading') {
        elements.screens.loading.classList.add('active');
    } else if (screenName === 'auth') {
        elements.screens.auth.classList.add('active');
    } else if (screenName === 'main') {
        elements.screens.main.classList.add('active');
    }
}

function switchView(viewName) {
    state.currentView = viewName;
    
    elements.views.forEach(view => {
        view.classList.remove('active');
    });
    
    document.getElementById(`view-${viewName}`).classList.add('active');
    
    elements.navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.view === viewName) {
            item.classList.add('active');
        }
    });
    
    // Load view-specific data
    if (viewName === 'files') {
        renderFileBrowser();
    } else if (viewName === 'docs') {
        renderFileList('application/vnd.google-apps.document', elements.lists.docs);
    } else if (viewName === 'sheets') {
        renderFileList('application/vnd.google-apps.spreadsheet', elements.lists.sheets);
    } else if (viewName === 'slides') {
        renderFileList('application/vnd.google-apps.presentation', elements.lists.slides);
    } else if (viewName === 'gmail') {
        loadEmails();
    }
}

// Event Listeners
function setupEventListeners() {
    // Auth buttons
    elements.buttons.signin?.addEventListener('click', handleSignIn);
    elements.buttons.signout?.addEventListener('click', handleSignOut);
    
    // Navigation
    elements.navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if (item.dataset.view) {
                switchView(item.dataset.view);
            }
        });
    });
    
    // Create buttons
    elements.buttons.createDoc?.addEventListener('click', () => openEditor('document'));
    elements.buttons.newDoc?.addEventListener('click', () => openEditor('document'));
    elements.buttons.newSheet?.addEventListener('click', () => openEditor('spreadsheet'));
    elements.buttons.newSlide?.addEventListener('click', () => openEditor('presentation'));
    elements.buttons.new?.addEventListener('click', showCreateMenu);
    
    // Editor
    elements.buttons.closeEditor?.addEventListener('click', closeEditor);
    elements.buttons.save?.addEventListener('click', saveDocument);
    elements.buttons.export?.addEventListener('click', exportDocument);
    
    // Scanner
    elements.buttons.capture?.addEventListener('click', captureImage);
    elements.buttons.toggleCamera?.addEventListener('click', toggleCamera);
    
    // Gmail
    elements.buttons.compose?.addEventListener('click', composeEmail);
    
    // View toggles
    elements.buttons.viewGrid?.addEventListener('click', () => setFileView('grid'));
    elements.buttons.viewList?.addEventListener('click', () => setFileView('list'));
    
    // Settings
    elements.toggles.darkMode?.addEventListener('change', toggleDarkMode);
    elements.buttons.disconnect?.addEventListener('click', disconnectAccount);
    
    // Search
    document.getElementById('search-input')?.addEventListener('input', 
        debounce(handleSearch, 300)
    );
}

// Google Auth Handlers
async function handleSignIn() {
    try {
        await gapi.client.init({
            apiKey: CONFIG.API_KEY,
            clientId: CONFIG.CLIENT_ID,
            discoveryDocs: CONFIG.DISCOVERY_DOCS,
            scope: CONFIG.SCOPES
        });
        
        await gapi.auth2.getAuthInstance().signIn();
        await loadUser();
        await loadFiles();
        showScreen('main');
        updateDashboard();
        showToast('Successfully signed in!', 'success');
    } catch (error) {
        console.error('Sign in error:', error);
        showToast('Failed to sign in. Please try again.', 'error');
    }
}

function handleSignOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    if (auth2) {
        auth2.signOut().then(() => {
            state.user = null;
            state.files = [];
            showScreen('auth');
            showToast('Signed out successfully', 'info');
        });
    }
}

// User Management
async function loadUser() {
    try {
        const response = await gapi.client.request({
            path: 'https://www.googleapis.com/oauth2/v2/userinfo'
        });
        
        state.user = response.result;
        elements.user.avatarImg.src = state.user.picture;
        elements.user.account.textContent = state.user.email;
    } catch (error) {
        console.error('Error loading user:', error);
    }
}

// File Management
async function loadFiles() {
    try {
        const response = await gapi.client.drive.files.list({
            pageSize: 100,
            fields: 'files(id, name, mimeType, modifiedTime, size, thumbnailLink)',
            orderBy: 'modifiedTime desc'
        });
        
        state.files = response.result.files || [];
        updateStats();
    } catch (error) {
        console.error('Error loading files:', error);
        showToast('Failed to load files', 'error');
    }
}

function updateStats() {
    const docs = state.files.filter(f => f.mimeType === 'application/vnd.google-apps.document').length;
    const sheets = state.files.filter(f => f.mimeType === 'application/vnd.google-apps.spreadsheet').length;
    const slides = state.files.filter(f => f.mimeType === 'application/vnd.google-apps.presentation').length;
    
    elements.stats.docs.textContent = docs;
    elements.stats.sheets.textContent = sheets;
    elements.stats.slides.textContent = slides;
    elements.stats.total.textContent = state.files.length;
}

function updateDashboard() {
    renderRecentFiles();
}

function renderRecentFiles() {
    const recent = state.files.slice(0, 5);
    elements.lists.recent.innerHTML = recent.map(file => createFileItemHTML(file)).join('');
}

function renderFileBrowser() {
    elements.lists.files.innerHTML = state.files.map(file => createFileItemHTML(file, true)).join('');
}

function renderFileList(mimeType, container) {
    const filtered = state.files.filter(f => f.mimeType === mimeType);
    container.innerHTML = filtered.map(file => createFileItemHTML(file)).join('');
}

function createFileItemHTML(file, isGrid = false) {
    const iconClass = getFileIconClass(file.mimeType);
    const date = new Date(file.modifiedTime).toLocaleDateString();
    
    return `
        <div class="file-item" onclick="openFile('${file.id}')">
            <div class="file-icon ${iconClass}">
                <span class="material-icons-round">${getFileIcon(file.mimeType)}</span>
            </div>
            <div class="file-info">
                <div class="file-name">${escapeHtml(file.name)}</div>
                <div class="file-meta">${date}</div>
            </div>
            <div class="file-actions">
                <button class="icon-btn" onclick="event.stopPropagation(); downloadFile('${file.id}')">
                    <span class="material-icons-round">download</span>
                </button>
                <button class="icon-btn" onclick="event.stopPropagation(); deleteFile('${file.id}')">
                    <span class="material-icons-round">delete</span>
                </button>
            </div>
        </div>
    `;
}

function getFileIconClass(mimeType) {
    if (mimeType === 'application/vnd.google-apps.document') return 'doc';
    if (mimeType === 'application/vnd.google-apps.spreadsheet') return 'sheet';
    if (mimeType === 'application/vnd.google-apps.presentation') return 'slide';
    if (mimeType === 'application/vnd.google-apps.folder') return 'folder';
    return 'doc';
}

function getFileIcon(mimeType) {
    if (mimeType === 'application/vnd.google-apps.document') return 'article';
    if (mimeType === 'application/vnd.google-apps.spreadsheet') return 'table_chart';
    if (mimeType === 'application/vnd.google-apps.presentation') return 'presentation';
    if (mimeType === 'application/vnd.google-apps.folder') return 'folder';
    return 'description';
}

async function openFile(fileId) {
    const file = state.files.find(f => f.id === fileId);
    if (!file) return;
    
    if (file.mimeType === 'application/vnd.google-apps.document') {
        openEditor('document', fileId);
    } else if (file.mimeType === 'application/vnd.google-apps.spreadsheet') {
        openEditor('spreadsheet', fileId);
    } else if (file.mimeType === 'application/vnd.google-apps.presentation') {
        openEditor('presentation', fileId);
    } else {
        // Open in new tab for other file types
        window.open(`https://drive.google.com/file/d/${fileId}/view`, '_blank');
    }
}

async function downloadFile(fileId) {
    try {
        const response = await gapi.client.drive.files.get({
            fileId: fileId,
            alt: 'media'
        });
        
        showToast('File downloaded', 'success');
    } catch (error) {
        console.error('Download error:', error);
        showToast('Failed to download file', 'error');
    }
}

async function deleteFile(fileId) {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    try {
        await gapi.client.drive.files.delete({ fileId: fileId });
        state.files = state.files.filter(f => f.id !== fileId);
        updateStats();
        renderFileBrowser();
        showToast('File deleted', 'success');
    } catch (error) {
        console.error('Delete error:', error);
        showToast('Failed to delete file', 'error');
    }
}

// Editor Functions
function openEditor(type, fileId = null) {
    state.editor.type = type;
    state.editor.fileId = fileId;
    
    // Hide all editor types
    document.querySelectorAll('.editor-type').forEach(el => el.classList.add('hidden'));
    
    // Show appropriate editor
    if (type === 'document') {
        elements.editor.doc.classList.remove('hidden');
        elements.editor.title.value = fileId ? 'Loading...' : 'New Document';
    } else if (type === 'spreadsheet') {
        elements.editor.sheet.classList.remove('hidden');
        elements.editor.title.value = fileId ? 'Loading...' : 'New Spreadsheet';
        initSheetEditor();
    } else if (type === 'presentation') {
        elements.editor.slide.classList.remove('hidden');
        elements.editor.title.value = fileId ? 'Loading...' : 'New Presentation';
    }
    
    elements.editor.modal.classList.add('active');
    
    if (fileId) {
        loadDocumentContent(fileId, type);
    }
}

function closeEditor() {
    elements.editor.modal.classList.remove('active');
    state.editor.type = null;
    state.editor.fileId = null;
}

async function loadDocumentContent(fileId, type) {
    try {
        const response = await gapi.client.drive.files.get({
            fileId: fileId,
            fields: 'name'
        });
        
        elements.editor.title.value = response.result.name;
        
        // For demo purposes, load placeholder content
        if (type === 'document') {
            document.querySelector('.doc-content').innerHTML = '<p>Document content loaded...</p>';
        }
        
        showToast('Document loaded', 'success');
    } catch (error) {
        console.error('Load error:', error);
        showToast('Failed to load document', 'error');
    }
}

async function saveDocument() {
    if (!state.editor.fileId) {
        await createNewDocument();
    } else {
        await updateDocument();
    }
}

async function createNewDocument() {
    try {
        const mimeType = {
            'document': 'application/vnd.google-apps.document',
            'spreadsheet': 'application/vnd.google-apps.spreadsheet',
            'presentation': 'application/vnd.google-apps.presentation'
        }[state.editor.type];
        
        const response = await gapi.client.drive.files.create({
            resource: {
                name: elements.editor.title.value,
                mimeType: mimeType
            }
        });
        
        state.editor.fileId = response.result.id;
        state.files.unshift(response.result);
        updateStats();
        
        showToast('Document created', 'success');
    } catch (error) {
        console.error('Create error:', error);
        showToast('Failed to create document', 'error');
    }
}

async function updateDocument() {
    try {
        // For demo, just show success
        showToast('Document saved', 'success');
    } catch (error) {
        console.error('Update error:', error);
        showToast('Failed to save document', 'error');
    }
}

function exportDocument() {
    if (!state.editor.fileId) {
        showToast('Please save the document first', 'warning');
        return;
    }
    
    // Open in Google Docs for export
    window.open(`https://docs.google.com/document/d/${state.editor.fileId}/export`, '_blank');
}

function initSheetEditor() {
    const grid = elements.editor.sheet.querySelector('.sheet-grid');
    if (!grid || grid.children.length > 0) return;
    
    // Create 26x20 grid
    for (let i = 0; i < 520; i++) {
        const cell = document.createElement('div');
        cell.className = 'sheet-cell';
        cell.contentEditable = true;
        grid.appendChild(cell);
    }
}

// Scanner Functions
async function startScanner() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
        });
        
        state.scannerStream = stream;
        elements.scanner.video.srcObject = stream;
    } catch (error) {
        console.error('Scanner error:', error);
        showToast('Could not access camera', 'error');
    }
}

function stopScanner() {
    if (state.scannerStream) {
        state.scannerStream.getTracks().forEach(track => track.stop());
        state.scannerStream = null;
    }
}

async function captureImage() {
    const video = elements.scanner.video;
    const canvas = elements.scanner.canvas;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    // Convert to blob and save
    canvas.toBlob(async (blob) => {
        try {
            const metadata = {
                name: `Scan_${Date.now()}.jpg`,
                mimeType: 'image/jpeg'
            };
            
            const form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', blob);
            
            // Upload to Drive
            const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + gapi.client.getToken().access_token
                },
                body: form
            });
            
            const result = await response.json();
            
            // Add to results
            const img = document.createElement('img');
            img.src = URL.createObjectURL(blob);
            
            const item = document.createElement('div');
            item.className = 'scanner-result-item';
            item.appendChild(img);
            elements.scanner.results.prepend(item);
            
            showToast('Image captured and saved', 'success');
        } catch (error) {
            console.error('Upload error:', error);
            showToast('Failed to save image', 'error');
        }
    }, 'image/jpeg');
}

async function toggleCamera() {
    stopScanner();
    
    const currentFacingMode = state.scannerStream?.getVideoTracks()[0]?.getSettings()?.facingMode;
    const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: newFacingMode } 
        });
        
        state.scannerStream = stream;
        elements.scanner.video.srcObject = stream;
    } catch (error) {
        console.error('Camera toggle error:', error);
    }
}

// Gmail Functions
async function loadEmails() {
    try {
        const response = await gapi.client.gmail.users.messages.list({
            userId: 'me',
            maxResults: 20
        });
        
        const messages = response.result.messages || [];
        const emails = await Promise.all(
            messages.map(msg => gapi.client.gmail.users.messages.get({
                userId: 'me',
                id: msg.id
            }))
        );
        
        renderEmailList(emails.map(e => e.result));
    } catch (error) {
        console.error('Gmail error:', error);
        showToast('Failed to load emails', 'error');
    }
}

function renderEmailList(emails) {
    elements.lists.emails.innerHTML = emails.map(email => {
        const subject = email.payload.headers.find(h => h.name === 'Subject')?.value || 'No Subject';
        const from = email.payload.headers.find(h => h.name === 'From')?.value || 'Unknown';
        
        return `
            <div class="email-item" onclick="viewEmail('${email.id}')">
                <span class="material-icons-round">email</span>
                <div class="file-info">
                    <div class="file-name">${escapeHtml(subject)}</div>
                    <div class="file-meta">${escapeHtml(from)}</div>
                </div>
            </div>
        `;
    }).join('');
}

async function viewEmail(emailId) {
    try {
        const response = await gapi.client.gmail.users.messages.get({
            userId: 'me',
            id: emailId
        });
        
        const email = response.result;
        const subject = email.payload.headers.find(h => h.name === 'Subject')?.value || 'No Subject';
        const from = email.payload.headers.find(h => h.name === 'From')?.value || 'Unknown';
        
        // Get body content
        let body = '';
        if (email.payload.parts) {
            const part = email.payload.parts.find(p => p.mimeType === 'text/plain');
            if (part && part.body.data) {
                body = atob(part.body.data);
            }
        } else if (email.payload.body.data) {
            body = atob(email.payload.body.data);
        }
        
        elements.lists.viewer.innerHTML = `
            <h2>${escapeHtml(subject)}</h2>
            <p><strong>From:</strong> ${escapeHtml(from)}</p>
            <hr style="margin: 1rem 0; border: none; border-top: 1px solid var(--border-light);">
            <div style="white-space: pre-wrap;">${escapeHtml(body)}</div>
        `;
        
        elements.lists.viewer.classList.add('active');
    } catch (error) {
        console.error('View email error:', error);
    }
}

function composeEmail() {
    const to = prompt('To:');
    if (!to) return;
    
    const subject = prompt('Subject:');
    if (!subject) return;
    
    const body = prompt('Message:');
    if (!body) return;
    
    // Open Gmail compose in new window
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
}

// Settings Functions
function loadSettings() {
    const darkMode = localStorage.getItem('folio_dark_mode') === 'true';
    if (darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        elements.toggles.darkMode.checked = true;
    }
}

function toggleDarkMode() {
    const isDark = elements.toggles.darkMode.checked;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('folio_dark_mode', isDark);
    showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled', 'info');
}

function disconnectAccount() {
    if (confirm('Are you sure you want to disconnect your account?')) {
        handleSignOut();
    }
}

// Utility Functions
function showCreateMenu() {
    const options = [
        { label: 'Document', type: 'document' },
        { label: 'Spreadsheet', type: 'spreadsheet' },
        { label: 'Presentation', type: 'presentation' }
    ];
    
    // Simple prompt for now
    const choice = prompt('Create: 1) Document 2) Spreadsheet 3) Presentation');
    if (choice === '1') openEditor('document');
    else if (choice === '2') openEditor('spreadsheet');
    else if (choice === '3') openEditor('presentation');
}

function setFileView(view) {
    const browser = document.getElementById('file-browser');
    browser.classList.remove('grid', 'list');
    browser.classList.add(view);
}

function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    
    if (!query) {
        renderFileBrowser();
        return;
    }
    
    const filtered = state.files.filter(f => 
        f.name.toLowerCase().includes(query)
    );
    
    elements.lists.files.innerHTML = filtered.map(file => createFileItemHTML(file, true)).join('');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="material-icons-round">${getToastIcon(type)}</span>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s reverse forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function getToastIcon(type) {
    const icons = {
        success: 'check_circle',
        error: 'error',
        warning: 'warning',
        info: 'info'
    };
    return icons[type] || icons.info;
}

// Handle scanner view activation
const originalSwitchView = switchView;
switchView = function(viewName) {
    originalSwitchView(viewName);
    
    if (viewName === 'scanner') {
        setTimeout(startScanner, 500);
    } else {
        stopScanner();
    }
};

// Initialize on load
window.addEventListener('load', init);
