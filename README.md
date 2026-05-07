# Folio — Complete Google AI Studio Build Prompts
## Phase-by-Phase: Web App → Flutter Mobile App
**Version:** 1.0 | Based on Folio PRD v1.0
**Tagline:** *Your Drive. Your Docs. Limitless.*

---

> **HOW TO USE THIS DOCUMENT**
> Copy each prompt block **exactly** into Google AI Studio (Gemini 2.5 Pro recommended).
> Complete each phase fully before moving to the next.
> Each prompt is self-contained and builds on the previous output.
> Model setting: **Temperature 1.0**, **Output tokens: 8192** for code phases.

---

# ══════════════════════════════════════════
# WEB APP BUILD — PHASES 1–6
# ══════════════════════════════════════════

---

## ▌PHASE 1 — Project Foundation, Design System & Shell

### Prompt 1A — Design System & Global Styles

```
You are building "Folio" — a Google Drive-native office suite web app.
Tagline: "Your Drive. Your Docs. Limitless."

Generate a complete, production-ready CSS design system file (design-system.css) for Folio.
Include ALL of the following — no placeholders, no TODO comments, fully implemented:

COLOR TOKENS (CSS custom properties):
--color-primary: #1A73E8          /* Actions, FABs, links */
--color-navy: #0D2344             /* Logo mark, primary text dark */
--color-surface: #FFFFFF          /* Cards, editor background */
--color-background: #F8F9FA       /* App background */
--color-muted: #5F6368            /* Secondary text, icons */
--color-teal: #00BFA5             /* Success states, scanner overlay */
--color-amber: #F9AB00            /* Sync warnings, conflicts */
--color-danger: #D93025           /* Delete actions, errors */
--color-border: #E8EAED
--color-shadow: rgba(0,0,0,0.12)

DARK MODE TOKENS (prefers-color-scheme: dark):
--color-background: #1C1B1F
--color-surface: #2C2B30
--color-primary-text: #E3E2E6
--color-muted: #938F99
(derive remaining dark tokens logically)

TYPOGRAPHY:
- Display/headings: 'Instrument Serif', Georgia, serif
- UI/body: 'Google Sans', 'Nunito Sans', sans-serif
- Monospace: 'JetBrains Mono', 'Fira Code', monospace
Include @import for Google Fonts (Instrument Serif, Nunito Sans, JetBrains Mono from fonts.googleapis.com).
Define type scale: --text-xs through --text-4xl with line-height and letter-spacing.
Define font-weight tokens: --weight-regular: 400, --weight-medium: 500, --weight-semibold: 600, --weight-bold: 700.

SPACING SCALE (4px base):
--space-1 through --space-16 (4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 56px, 64px, 80px, 96px, 112px, 128px, 160px)

ELEVATION (box-shadow tokens):
--elevation-1 through --elevation-4

RADIUS TOKENS:
--radius-sm: 6px, --radius-md: 12px, --radius-lg: 16px, --radius-xl: 24px, --radius-full: 9999px

ANIMATION TOKENS:
--duration-fast: 150ms, --duration-base: 200ms, --duration-slow: 300ms, --duration-slower: 500ms
--easing-standard: cubic-bezier(0.2, 0, 0, 1)
--easing-decelerate: cubic-bezier(0, 0, 0.2, 1)
--easing-accelerate: cubic-bezier(0.3, 0, 1, 1)

BASE RESET: Full modern CSS reset.

UTILITY CLASSES: .sr-only, .truncate, .flex, .flex-col, .items-center, .justify-between, .gap-*, .p-*, .rounded-*, .text-muted, .text-danger, .text-primary, .font-mono

COMPONENT BASE STYLES (no JS needed):
- .btn (base), .btn-primary, .btn-secondary, .btn-ghost, .btn-danger — with :hover, :active, :focus-visible, :disabled states
- .card (with border + shadow), .card-hover
- .badge (variants: default, success, warning, danger, info)
- .chip (filter chip with active state)
- .input, .input-search (with search icon via background-image SVG data URI)
- .skeleton (animated shimmer loading state)
- .divider, .divider-vertical
- .tooltip (CSS-only, via [data-tooltip] attribute)
- .snackbar (slide-up from bottom)
- .modal-overlay, .modal-dialog
- .sheet (bottom sheet, slides up)
- .fab (floating action button, primary + secondary sizes)
- .icon-btn (icon-only button, circular)
- .progress-bar, .progress-ring (SVG-based circular progress)
- .avatar (circular, with initials fallback)
- .file-card (file list item card)
- .sponsored-badge (for native ad cards)

SCROLLBAR: Custom thin scrollbar styling (webkit + standard)

FOCUS MANAGEMENT: High-contrast focus rings for accessibility (WCAG 2.1 AA)

Output ONLY the CSS. No HTML. No explanations. No markdown fences around the code.
```

---

### Prompt 1B — App Shell HTML

```
You are building "Folio" — a Google Drive-native web office suite.
Assume design-system.css already exists and is linked.

Generate a complete index.html for Folio. This is the app shell — the full structural skeleton of the entire web app. It must include ALL screens and panels as hidden sections that JavaScript will show/hide. No React, no Vue — vanilla HTML/CSS/JS only.

INCLUDE ALL OF THE FOLLOWING, fully written (no placeholders):

1. <head>:
   - Meta charset, viewport (width=device-width, initial-scale=1)
   - Theme-color meta tags (light: #1A73E8, dark: #0D2344)
   - Open Graph tags for the app (title: "Folio – Office Docs & Drive", description, image placeholder)
   - Link to design-system.css
   - Link to app.js (defer)
   - Link to Google Sign-In API: https://accounts.google.com/gsi/client
   - PWA manifest link: manifest.json
   - Apple touch icon meta tags
   - Preconnect to fonts.googleapis.com, fonts.gstatic.com, apis.google.com

2. SCREENS (each as <section id="screen-*" class="screen" hidden>):

   SCREEN: splash
   - Animated Folio logo (SVG inline: stylized "F" from two overlapping document shapes, back page #0D2344, front page #1A73E8)
   - App name "Folio" in Instrument Serif, tagline "Your Drive. Your Docs. Limitless."
   - CSS keyframe fade-in animation (1.5s)

   SCREEN: onboarding
   - 3-card carousel with dot indicators and Next/Skip buttons
   - Card 1: Drive icon + "Your files, your Drive" — "Everything lives in your own Google Drive. We store nothing."
   - Card 2: Offline icon + "Edit everything offline" — "Auto-saved locally. Synced when you reconnect."
   - Card 3: Envelope icon + "Share via email instantly" — "Send files via Gmail without leaving Folio."
   - All SVG icons inline

   SCREEN: consent
   - UMP consent dialog for AdMob (GDPR/CCPA)
   - Accept All / Manage Options / Reject All buttons
   - Privacy Policy link, Ad Preferences link

   SCREEN: auth
   - Folio logo centered
   - "Sign in with Google" button (Google's official button style: white, Google logo SVG, proper text)
   - Privacy note below: "We only access files you open. No data leaves your device to our servers."
   - Scope explanation: Drive (files only) + Gmail (compose only)

   SCREEN: home (main app — the core screen)
   STRUCTURE:
   a. Top app bar: Folio logo (small) + Search bar (expandable) + Avatar/profile button
   b. Filter chips row: All · Word · PDF · Excel · PPT · TXT · Images · Starred
   c. Tab row: Recent · My Drive · Shared with Me
   d. Ad banner container (id="ad-banner-container", 90px height, bottom of filter area)
   e. File list area (id="file-list", scrollable)
      - Empty state (id="empty-state"): SVG illustration + "No files yet" + "Browse Drive" button
      - Loading skeleton: 6 skeleton file-card items
      - File list: <ul id="files-ul"> (populated by JS)
      - Each file card: file-type icon (SVG), file name, modified date, file size, sync badge, 3-dot menu
   f. Bottom navigation bar: Documents (home icon) · Scanner (camera icon) · Profile (person icon)
   g. FAB (+ button): "New" with sub-menu (New Document, New Spreadsheet, New Folder, Scan Document)
   h. Drive folder breadcrumb bar (id="breadcrumb-bar", hidden by default)

   SCREEN: file-viewer (document editor/viewer wrapper)
   - Top bar: Back button + File name (editable h1 inline) + Sync status pill + Share button + More menu (⋮)
   - Toolbar area (id="editor-toolbar"): formatting buttons rendered by JS per file type
   - Editor area (id="editor-content"): where file content renders
   - AI panel (id="ai-panel", bottom sheet, hidden): Gemini summary results
   - Last sync pill (bottom center): "Synced 2 min ago"
   - FAB: Sync to Drive (primary) + Share (secondary)

   SCREEN: scanner
   - Camera viewfinder area (id="scanner-viewfinder")
   - Edge detection overlay (SVG rectangle with teal #00BFA5 corner handles)
   - Controls: Page counter badge + Capture button (large circle) + Gallery button + Flash toggle
   - Bottom sheet: page thumbnails strip (multi-page flow)
   - Action buttons: "Add Page" + "Finalize & Export"

   SCREEN: email-compose
   - Back button + "New Email" title + Send button
   - To: field (tag-style with autocomplete dropdown placeholder)
   - Subject: field
   - Attachment chip (file name + size + remove X)
   - "Attach as Drive link / Attach as file" toggle
   - Drive link permissions selector (View / Comment / Edit)
   - Message body textarea
   - Gmail "G" watermark bottom-right (subtle)

   SCREEN: profile
   - User avatar (large, circular) + Name + Email
   - Google Drive storage ring (SVG circular progress, color-coded)
   - Storage text: "X.X GB used of 15 GB"
   - Menu sections:
     * Settings section: Dark Mode toggle, App Lock toggle, Allow Screenshots toggle, Notification Preferences
     * Privacy section: File Access Log, Delete All Local Data, Privacy Policy, CCPA toggle
     * Subscription section: "Remove Ads — $1.99" prominent button (or "Ad-Free Unlocked ✓" state)
     * About section: Version, Open Source Licenses, Rate Folio, Send Feedback
   - Sign Out button (red, bottom)

   SCREEN: drive-manager (in-app Drive browser)
   - Top bar: Back + "My Drive" title + New Folder button + Search
   - Breadcrumb navigation (id="drive-breadcrumb")
   - Folder/file grid with folder cards and file cards
   - Long-press context menu (position: absolute): Rename, Move, Copy, Delete, Share, Star, Color Label, Info
   - Multi-select mode: checkbox appears on each card, bulk action bar slides up from bottom

   SCREEN: settings-security
   - App Lock section: enable toggle, timeout selector (1 / 5 / 15 / 30 min), change PIN button
   - Biometrics toggle
   - Screenshot prevention toggle
   - Clipboard auto-clear toggle (60s)
   - Jailbreak warning (if applicable)

3. GLOBAL OVERLAYS (always in DOM, shown/hidden):
   - id="modal-overlay": dark backdrop
   - id="context-menu": floating context menu (position: fixed)
   - id="snackbar-container": snackbar queue
   - id="loading-overlay": full-screen spinner with Folio logo
   - id="ad-interstitial": full-screen interstitial ad container (with X button after 5s timer)
   - id="rewarded-ad-modal": rewarded ad prompt modal (Watch ad → unlock feature)
   - id="biometric-lock-screen": app lock screen (shows logo + biometric button + PIN fallback)

4. INLINE SVG ICON LIBRARY (id="svg-icons", display:none):
   Define SVG symbols for: home, folder, file-word, file-pdf, file-excel, file-ppt, file-txt, file-image, scanner, profile, search, back-arrow, close, more-vert, add, sync, share, email, star, star-filled, trash, move, rename, copy, info, check, warning, lock, biometric-face, biometric-finger, download, upload, ai-sparkle, drive-logo, gmail-logo, settings, dark-mode, light-mode, play, pause, tts, convert, print, password-lock, qr-code, eye, eye-off, ad-remove, chevron-right, chevron-down, drag-handle, grid-view, list-view, sort, filter, clock, size, calendar, refresh, error, offline, online, watermark

5. <script> tag at bottom: just the import of app.js

Write clean, semantic HTML5. Use aria-label, role, aria-hidden, aria-expanded appropriately. No inline styles (all classes from design-system.css). Every screen must be complete — no "..." shortcuts.
```

---

## ▌PHASE 2 — Authentication, Drive Integration & File Listing

### Prompt 2A — Google Auth & Drive API Module

```
You are building "Folio" — a Google Drive-native office suite web app.
The HTML shell (index.html) and CSS (design-system.css) are complete.

Generate auth.js — the complete Google Authentication and Drive API integration module.
Use vanilla JavaScript ES6 modules. No frameworks.

GOOGLE OAUTH 2.0 CONFIGURATION:
const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // placeholder
const SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/contacts.readonly'
].join(' ');

IMPLEMENT ALL OF THE FOLLOWING — fully working code, no stubs:

1. AUTH INITIALIZATION
   - Use Google Identity Services (GIS) library (accounts.google.com/gsi/client)
   - Initialize google.accounts.oauth2.initTokenClient with all scopes
   - Store access_token in memory (not localStorage)
   - Store refresh logic: auto-refresh 5 minutes before expiry using setTimeout

2. SIGN IN FLOW
   export async function signIn():
   - Request token via tokenClient.requestAccessToken()
   - On success: fetch user profile from https://www.googleapis.com/oauth2/v2/userinfo
   - Store profile in sessionStorage: { name, email, picture, hd (workspace domain) }
   - Update UI: set avatar src, name in profile screen
   - Navigate to home screen
   - Trigger Drive file list load

3. SIGN OUT FLOW
   export async function signOut():
   - Call google.accounts.oauth2.revoke(token)
   - Clear sessionStorage
   - Clear encrypted cache (call cache.clearAll())
   - Navigate to auth screen

4. TOKEN MANAGEMENT
   export function getAccessToken(): string — returns current token or throws if expired
   export function isAuthenticated(): boolean
   export async function refreshTokenIfNeeded(): Promise<void>
   - Intercept all API calls: if 401 received, attempt token refresh once, retry request, if fails → signOut()

5. DRIVE API v3 — Complete Implementation:
   Base URL: https://www.googleapis.com/drive/v3

   export async function listFiles(params: {
     query?: string,        // Drive API q parameter
     pageToken?: string,
     pageSize?: number,     // default 50
     orderBy?: string,      // default 'modifiedTime desc'
     folderId?: string      // list children of folder
   }): Promise<{files: DriveFile[], nextPageToken?: string}>

   Supported q filters built into helper:
   - Recent 30 days: modifiedTime > '${date}' (ISO 8601)
   - By type: mimeType contains 'wordprocessingml' | 'pdf' | 'spreadsheetml' | 'presentationml' | 'text/plain' | 'image/'
   - Starred: starred = true
   - Shared with me: sharedWithMe = true
   - In folder: '${folderId}' in parents and trashed = false
   - Full text search: name contains '${term}' or fullText contains '${term}'

   export async function getFile(fileId: string): Promise<DriveFile>

   export async function downloadFile(fileId: string, mimeType?: string): Promise<ArrayBuffer>
   - If mimeType provided: use export endpoint (/files/{id}/export?mimeType=...)
   - Else: use media download (/files/{id}?alt=media)
   - Show progress: emit 'download-progress' custom event with { loaded, total, percent }

   export async function uploadFile(params: {
     name: string,
     mimeType: string,
     content: ArrayBuffer | string,
     parentFolderId?: string,
     fileId?: string  // if provided, update existing file
   }): Promise<DriveFile>
   - Use multipart upload for files < 5MB
   - Use resumable upload for files >= 5MB
   - Emit 'upload-progress' custom event

   export async function renameFile(fileId: string, newName: string): Promise<DriveFile>
   export async function moveFile(fileId: string, newParentId: string, oldParentId: string): Promise<DriveFile>
   export async function deleteFile(fileId: string): Promise<void>  // moves to trash
   export async function copyFile(fileId: string, newName: string, parentId: string): Promise<DriveFile>
   export async function starFile(fileId: string, starred: boolean): Promise<DriveFile>
   export async function createFolder(name: string, parentId?: string): Promise<DriveFile>

   export async function getDriveStorageQuota(): Promise<{
     limit: number,
     usage: number,
     usageInDrive: number,
     usageInDriveTrash: number
   }>

   export async function getFilePermissions(fileId: string): Promise<Permission[]>
   export async function createShareLink(fileId: string, role: 'reader'|'commenter'|'writer'): Promise<string>

   DriveFile type (JSDoc typedef):
   @typedef {Object} DriveFile
   @property {string} id
   @property {string} name
   @property {string} mimeType
   @property {string} modifiedTime (ISO 8601)
   @property {string} createdTime
   @property {number} size (bytes)
   @property {string} iconLink
   @property {string} webViewLink
   @property {boolean} starred
   @property {boolean} trashed
   @property {string[]} parents
   @property {Object} owners [{displayName, emailAddress, photoLink}]
   @property {Object} lastModifyingUser {displayName, emailAddress, photoLink}
   @property {string} sharingUser (if shared with me)
   @property {boolean} capabilities.canEdit
   @property {boolean} capabilities.canDownload

6. ERROR HANDLING:
   export class DriveAPIError extends Error
   - Parse Google API error responses: { code, message, errors[] }
   - Handle: 401 (refresh), 403 (permission), 404 (not found), 429 (rate limit → retry with exponential backoff), 500/503 (retry 3x)
   - All errors emit 'api-error' custom event caught by UI to show snackbar

7. REQUEST QUEUE:
   - Implement a simple queue with concurrency limit of 3 parallel requests
   - Track in-flight requests; cancel on sign-out

Export all functions. Use JSDoc comments throughout. Production quality.
```

---

### Prompt 2B — File List UI & Cache Module

```
You are building "Folio" — a Google Drive-native web office suite.
auth.js and the HTML shell are complete.

Generate TWO files:

FILE 1: cache.js — AES-256 encrypted local file cache
Using the Web Crypto API (window.crypto.subtle) — no external libraries.

Implement:
1. KEY GENERATION:
   - Derive a device-bound key using crypto.subtle.generateKey (AES-GCM, 256-bit, extractable: false)
   - Store key handle in memory only (never persisted)
   - Regenerate key on each session; re-encrypt cache entries with new key
   - On sign-out: call clearAll() to wipe all IndexedDB entries

2. STORAGE BACKEND: IndexedDB
   - Database: 'folio-cache', version 1
   - Object stores:
     * 'files': { id (fileId), encryptedContent (ArrayBuffer), iv (Uint8Array), mimeType, name, modifiedTime, size, cacheTime }
     * 'metadata': { id, name, mimeType, modifiedTime, size, starred, parents, syncStatus: 'synced'|'local'|'pending' }
     * 'audit-log': { id (auto), fileId, action: 'opened'|'edited'|'deleted'|'shared', timestamp, encryptedExtra }

3. EXPORTED FUNCTIONS:
   export async function cacheFile(fileId, content: ArrayBuffer, metadata: object): Promise<void>
   export async function getCachedFile(fileId): Promise<{content: ArrayBuffer, metadata: object} | null>
   export async function getCachedMetadata(fileId): Promise<object | null>
   export async function updateMetadata(fileId, metadata: object): Promise<void>
   export async function getAllCachedMetadata(): Promise<object[]>
   export async function removeCachedFile(fileId): Promise<void>
   export async function clearAll(): Promise<void>
   export async function getCacheSize(): Promise<number> // bytes
   export async function getLimitedCache(maxFiles: 20): Promise<string[]> // LRU eviction, returns fileIds evicted
   export async function logAccess(fileId, action, extra?: object): Promise<void>
   export async function getAuditLog(): Promise<AuditEntry[]>
   export async function clearAuditLog(): Promise<void>

4. SYNC STATUS TRACKING:
   - Mark files as 'pending' when edited offline
   - SyncQueue: { pendingUploads: fileId[] } stored in sessionStorage
   - export function getPendingUploads(): string[]
   - export function markPendingUpload(fileId): void
   - export function clearPendingUpload(fileId): void

FILE 2: files-ui.js — Complete file list UI rendering and interactions

Implement:
1. FILE LIST RENDERING:
   export async function renderFileList(files: DriveFile[], container: HTMLElement): Promise<void>
   - Generates file-card elements for each file
   - File card HTML structure (aria-label, role="listitem"):
     * File type icon (SVG use href from inline sprite)
     * File name (truncated, full name in title attribute)
     * Modified date (human-readable: "Today", "Yesterday", "3 days ago", then date format)
     * File size (formatted: "1.2 MB", "340 KB")
     * Sync status badge: 🟢 Synced / 🔵 Offline / 🟡 Pending
     * 3-dot menu button (aria-haspopup)
   - Every 10th item: insert native ad placeholder card (class="file-card file-card--ad") with "Sponsored" badge
   - Animate in: staggered fade+slide-up (animation-delay: index * 30ms)

2. EMPTY STATE:
   export function renderEmptyState(reason: 'no-files'|'no-results'|'offline'|'error'): void

3. LOADING SKELETONS:
   export function showSkeletons(count: 6): void
   export function hideSkeletons(): void

4. FILTER CHIPS:
   export function initFilterChips(): void
   - Click handler for each chip: All, Word, PDF, Excel, PPT, TXT, Images, Starred
   - Active chip gets .chip--active class
   - Triggers re-fetch from Drive or filter from cache

5. TAB SWITCHING:
   export function initTabs(): void
   - Recent (30 days), My Drive (full tree), Shared with Me
   - My Drive tab shows breadcrumb navigation + folder grid

6. SEARCH:
   export function initSearch(): void
   - Debounce 400ms
   - Search Drive API (name contains) + local cache FTS
   - Highlight matched terms in results

7. CONTEXT MENU (long-press / right-click):
   export function showContextMenu(fileId, x, y): void
   - Items: Open, Rename, Move, Copy, Delete, Share, Make Offline, Star/Unstar, File Info
   - Each item triggers appropriate handler
   - Dismiss on outside click or Escape

8. MULTI-SELECT MODE:
   export function enterMultiSelect(firstFileId): void
   export function toggleFileSelection(fileId): void
   export function exitMultiSelect(): void
   - Shows checkbox on each card
   - Bottom bulk action bar slides up: Move, Delete, Convert to PDF, Download, Share
   - Selection counter in top bar ("3 selected")

9. SORT & VIEW:
   export function setSortOrder(by: 'name'|'date'|'size'|'type', dir: 'asc'|'desc'): void
   export function setViewMode(mode: 'list'|'grid'): void
   - Grid: 2-column cards with larger icons
   - List: compact rows

10. PULL-TO-REFRESH:
    export function initPullToRefresh(container): void
    - Touch events: deltaY > 80px triggers refresh indicator + Drive API re-fetch

11. INFINITE SCROLL / PAGINATION:
    export function initInfiniteScroll(container, onLoadMore): void
    - IntersectionObserver on last card → fetch next page from Drive

12. FILE INFO PANEL:
    export function showFileInfoPanel(file: DriveFile): void
    - Slide-up bottom sheet with all file metadata

All functions use the drive.js API and cache.js modules. Export all. JSDoc comments. No framework.
```

---

## ▌PHASE 3 — Document Editors & Viewers

### Prompt 3A — Word Document Editor

```
You are building "Folio" — a Google Drive office suite web app.
The app shell, auth, Drive API, cache, and file list UI are complete.

Generate word-editor.js — a complete, production-quality Word document editor for .docx files.
No external libraries (pure vanilla JS + Web APIs). Use the file's ArrayBuffer from cache.

DOCX PARSING (implement a minimal DOCX reader/writer using the ZIP structure):
A .docx is a ZIP containing word/document.xml. Use a bundled pako.js CDN (pako.inflate) or the DecompressionStream API for ZIP extraction.

1. DOCX READER:
   export async function parseDOCX(buffer: ArrayBuffer): Promise<DocxDocument>
   - Extract word/document.xml from the ZIP
   - Parse XML to DOM (DOMParser)
   - Convert w:p (paragraphs) → {type: 'paragraph', runs: [{text, bold, italic, underline, strike, fontSize, color, highlight, fontFamily}], style: 'heading1'|'heading2'|'heading3'|'heading4'|'normal'|'listBullet'|'listNumber', alignment: 'left'|'center'|'right'|'justify', indentLevel}
   - Convert w:tbl (tables) → {type: 'table', rows: [{cells: [{content, colspan, rowspan}]}]}
   - Parse images: extract from word/media/, convert to blob URLs
   - Return DocxDocument { title, paragraphs[], styles{} }

2. DOCX WRITER:
   export async function serializeDOCX(doc: DocxDocument): Promise<ArrayBuffer>
   - Reconstruct word/document.xml from the DocxDocument object
   - Preserve all original parts (relationships, styles, settings) from original ZIP
   - Only replace word/document.xml content
   - Re-zip using a minimal ZIP builder (implement from scratch using Uint8Array + CRC32)

3. EDITOR RENDERING:
   export function mountWordEditor(doc: DocxDocument, container: HTMLElement): EditorInstance
   - Render document as a contenteditable div (class="doc-page") styled like a white A4 page
   - Page: max-width 816px, padding 96px 96px (1 inch margins), box-shadow for paper feel
   - Apply heading styles, paragraph styles, list indentation
   - Tables render as HTML <table> with proper borders
   - Images render inline as <img src="blob:...">
   - Font sizes, colors, highlights all applied as inline styles on spans

4. FORMATTING TOOLBAR:
   export function renderWordToolbar(container: HTMLElement, editor: EditorInstance): void
   Toolbar groups (sticky below top bar):
   - GROUP 1: Bold (Ctrl+B), Italic (Ctrl+I), Underline (Ctrl+U), Strikethrough
   - GROUP 2: Heading selector dropdown (Normal, H1, H2, H3, H4)
   - GROUP 3: Font size input (8–72pt, ↑↓ steppers)
   - GROUP 4: Font color picker (16 color swatches + custom), Highlight color picker
   - GROUP 5: Align Left, Center, Right, Justify
   - GROUP 6: Bullet list, Numbered list, Increase/Decrease indent
   - GROUP 7: Insert Image button, Insert Table button (grid picker)
   - GROUP 8: Find & Replace button (opens floating panel)
   - STATUS BAR: Word count + Character count (live, bottom of editor)

   FLOATING SELECTION TOOLBAR:
   - Appears above text selection (position: absolute)
   - Contains: Bold, Italic, Underline, Color, Highlight, Link, Comment
   - Dismisses on outside click

5. FIND & REPLACE:
   export function openFindReplace(editor: EditorInstance): void
   - Floating panel: Find input + Replace input + Case-sensitive checkbox + Regex checkbox
   - Highlight all matches in yellow
   - Replace / Replace All buttons
   - Match counter: "3 of 12"

6. AUTO-SAVE:
   - Save to cache every 30 seconds (call cache.cacheFile)
   - Serialize to DOCX on save
   - Show "Saving..." → "Saved locally" in sync pill

7. SYNC TO DRIVE:
   - Auto-sync 5 seconds after last keystroke (debounced)
   - Manual sync button triggers immediate upload
   - Upload uses drive.uploadFile with existing fileId to update
   - Conflict detection: compare modifiedTime of cached version vs Drive version before overwrite

8. TRACK CHANGES (view mode):
   - Parse w:ins and w:del elements from DOCX XML
   - Render insertions with green underline, deletions with red strikethrough

9. EXPORT TO PDF:
   - Use window.print() with print-specific CSS (hide toolbar, show document only)
   - OR: serialize document to HTML → send to Gemini API with prompt to convert layout?
   - Actually: implement basic PDF generation using canvas + jsPDF CDN
   - Export: download as .pdf OR upload to Drive as new file

10. DOCUMENT STATS:
    export function getWordCount(doc: DocxDocument): {words: number, characters: number, paragraphs: number}
    - Live update in status bar

Return EditorInstance { getDocument(), isDirty(), save(), destroy() }
Export all. Complete implementation. No placeholders.
```

---

### Prompt 3B — PDF Viewer with Annotations

```
You are building "Folio" — a Google Drive office suite web app.

Generate pdf-viewer.js — a complete PDF viewer with annotation support.
Use PDF.js (cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js) loaded dynamically.

1. PDF LOADING:
   export async function loadPDF(buffer: ArrayBuffer, container: HTMLElement): Promise<PDFViewerInstance>
   - Initialize PDF.js worker (pdfjsLib.GlobalWorkerOptions.workerSrc = CDN URL)
   - Load document: pdfjsLib.getDocument({ data: buffer })
   - Render pages sequentially: each page → <canvas> element
   - Viewport: scale=1.5 default; pinch-to-zoom support (touch events)
   - Lazy render: render visible pages + 1 page ahead using IntersectionObserver
   - Loading progress bar during initial render

2. TOOLBAR:
   export function renderPDFToolbar(viewer: PDFViewerInstance, container: HTMLElement): void
   - Page navigation: ← Page X of Y → (input for direct jump)
   - Zoom: − / + / Fit Width / Fit Page / percentage display
   - Rotation: 90° CW, 90° CCW
   - Annotation tools (toggle modes):
     * Highlight (yellow, green, pink, blue color picker)
     * Sticky note (click → places draggable note card)
     * Freehand draw (SVG path overlay)
     * Text underline
     * Strikethrough
     * Rectangle shape
     * Text stamp ("Approved", "Rejected", "Draft", "Confidential" — custom text)
   - Eraser mode (remove annotations)
   - Find in PDF: text search with match highlight + navigation
   - Download button, Print button

3. ANNOTATION LAYER:
   - Annotations stored as JSON in cache alongside the file: { pageIndex, type, coords, color, content, author, createdAt }
   - Render annotations as SVG overlay (absolute positioned above canvas)
   - Draggable sticky notes (drag handle)
   - Editable sticky note content (click note → textarea appears)
   - Annotation list panel (slide-in from right): list all annotations chronologically

4. FORM FILLING:
   export function detectFormFields(pdfDoc): FormField[]
   - Detect AcroForm fields in PDF
   - Render HTML inputs overlaid on canvas at correct positions
   - Text fields, checkboxes, radio buttons, dropdowns
   - Save filled values to annotation JSON

5. DIGITAL SIGNATURE:
   export function openSignaturePanel(): void
   - Draw signature: HTML5 canvas with touch/mouse drawing
   - Type signature: text rendered in cursive font
   - Upload image: from device gallery
   - Place on PDF: drag to position, resize
   - Flatten to PDF on export

6. ZOOM & NAVIGATION:
   - Mouse wheel: zoom
   - Pinch: zoom (touch)
   - Click + drag: pan (when zoomed)
   - Keyboard: Arrow keys scroll, +/- zoom, Ctrl+F search, Escape dismiss tools
   - Page thumbnail strip (collapsible left panel): click thumbnail to jump to page

7. TEXT-TO-SPEECH integration:
   export function readPDFAloud(viewer: PDFViewerInstance): TTSController
   - Extract text layer from each page (page.getTextContent())
   - Pass to TTS module (tts.js — will be generated separately)
   - Highlight current sentence being read on the canvas overlay

8. SAVE ANNOTATIONS TO DRIVE:
   - On annotation change → debounce 3s → serialize annotations JSON → upload to Drive as sidecar file
   - File naming: originalName_annotations.json alongside original PDF in same folder
   - Load existing annotations on file open

Return PDFViewerInstance { currentPage, totalPages, zoomLevel, annotations, destroy() }
Export all functions. Full implementation with PDF.js CDN. No placeholders.
```

---

### Prompt 3C — Excel Viewer, PPT Viewer, TXT Editor

```
You are building "Folio" — a Google Drive office suite web app.

Generate THREE editor/viewer modules:

FILE 1: excel-viewer.js — Excel (.xlsx) viewer with basic cell editing

XLSX PARSING using SheetJS (CDN: cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js):

export async function loadExcel(buffer: ArrayBuffer, container: HTMLElement): Promise<ExcelInstance>

1. WORKBOOK RENDERING:
   - Parse with XLSX.read(buffer, {type: 'array'})
   - Sheet tabs at bottom: click to switch sheets
   - Render active sheet as HTML table
   - Freeze first row option (sticky header)
   - Column headers: A, B, C... (spreadsheet style)
   - Row numbers: 1, 2, 3...
   - Cell references shown in top-left pill (like "B4") on cell focus

2. CELL EDITING:
   - Click cell → contenteditable activated
   - Enter → move to cell below; Tab → move right; Arrow keys → navigate
   - Formula bar (text input at top): shows raw cell value / formula
   - Basic formula display (show formula text; evaluate =SUM, =AVERAGE, =COUNT, =IF on-device)
   - Number formatting: currency, percentage, date auto-detected
   - Cell selection highlight (blue border)
   - Multi-cell selection (shift+click, shift+arrows)

3. TOOLBAR:
   - Bold, Italic, Underline
   - Text align: left, center, right
   - Cell background color picker
   - Font color picker
   - Number format selector: General, Number, Currency, Date, Percentage
   - Wrap text toggle
   - Merge cells button
   - Sort (A→Z, Z→A) on selected column
   - Insert row above/below, Delete row
   - Insert column left/right, Delete column
   - Freeze rows/columns toggle

4. SAVE:
   - Serialize back to XLSX using XLSX.write()
   - Upload to Drive via drive.uploadFile

FILE 2: ppt-viewer.js — PowerPoint (.pptx) viewer + presentation mode

export async function loadPPT(buffer: ArrayBuffer, container: HTMLElement): Promise<PPTInstance>

1. SLIDE RENDERING:
   - Extract slides from PPTX ZIP (ppt/slides/slide*.xml)
   - Parse basic slide content: title, content text boxes, background color, shapes
   - Render each slide as a 16:9 aspect-ratio div (960×540px base, scaled)
   - Text elements positioned absolutely based on <p:sp> offset/extents (converted from EMU units: 1 inch = 914400 EMU)
   - Background color from <p:bg>

2. SLIDE PANEL:
   - Left panel: scrollable thumbnail strip (rendered as mini slides, 160px wide)
   - Click thumbnail → scroll main view to that slide
   - Current slide indicator

3. PRESENTATION MODE:
   - Full-screen API: document.documentElement.requestFullscreen()
   - Navigation: click to advance, arrow keys
   - Slide number overlay (bottom right)
   - Exit on Escape

4. BASIC TEXT EDITING:
   - Click text box → contenteditable (MVP: text only, no formatting)
   - Changes tracked in memory, save rebuilds slide XML

FILE 3: txt-editor.js — Plain text (.txt) editor

export async function loadTXT(buffer: ArrayBuffer, container: HTMLElement): Promise<TXTInstance>

1. EDITOR:
   - Simple <textarea> with monospace font (JetBrains Mono)
   - Line numbers (absolutely positioned div synced to textarea scroll)
   - Word wrap toggle
   - Encoding detection (UTF-8, UTF-16 BOM)
   - Character encoding displayed in status bar

2. TOOLBAR:
   - Font size selector (10–24px)
   - Word wrap toggle
   - Find & Replace (Ctrl+F / Ctrl+H): same find-replace component as word editor
   - Line count + word count + character count in status bar
   - Spell check toggle (browser native spellcheck attribute)

3. AUTOSAVE: same 30s cache pattern as word editor
4. SYNC: same Drive upload pattern

Export all instances and functions. Full implementation. No placeholders.
```

---

## ▌PHASE 4 — Scanner, Gmail, Drive Manager & AI Features

### Prompt 4A — Document Scanner

```
You are building "Folio" — a Google Drive office suite web app.

Generate scanner.js — a complete document scanner module using the device camera.
Target: modern Chrome/Safari with MediaDevices API. No external libraries for capture.

1. CAMERA INITIALIZATION:
   export async function initScanner(viewfinderEl: HTMLElement): Promise<ScannerInstance>
   - Request rear camera: navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: {ideal:1920}, height: {ideal:1080} } })
   - Display stream in <video> element inside viewfinderEl
   - Handle permission denied: show instruction overlay "Please allow camera access"
   - Flash/torch: try navigator.mediaDevices.getSupportedConstraints().torch; apply via track.applyConstraints({advanced:[{torch:true}]})

2. EDGE DETECTION OVERLAY:
   - Draw a semi-transparent dark overlay over the video
   - Centered "document detection zone" with teal (#00BFA5) corner handles
   - Animate corner handles pulsing when document detected
   - ML-based: use TensorFlow.js (CDN) with a lightweight document detection model? 
     → Actually: implement heuristic edge detection using canvas:
       * Draw video frame to offscreen canvas every 100ms
       * Apply Sobel edge detection filter (pure JS implementation)
       * Find the largest rectangular contour
       * Draw the detected quadrilateral outline on an overlay <canvas>
       * Color: teal if confidence > 0.7, amber if 0.4–0.7, no overlay if < 0.4
   - Implement full Sobel operator in JS (3×3 kernel convolution on ImageData)
   - Implement perspective transform matrix to correct document skew (homography)

3. CAPTURE:
   export function captureFrame(scanner: ScannerInstance): Promise<ScannedPage>
   - Draw current video frame to canvas
   - Apply perspective correction (4-point transform to rectangle)
   - Image enhancement: brightness/contrast auto-adjust, grayscale mode, B&W (binary threshold)
   - Crop to detected document bounds
   - Convert to JPEG blob (quality 0.85) and PNG blob
   - Return: { original: Blob, enhanced: Blob, preview: string (data URL) }

4. MULTI-PAGE FLOW:
   - ScannedSession { pages: ScannedPage[] }
   export function addPage(session, page): void
   export function removePage(session, index): void
   export function reorderPage(session, fromIndex, toIndex): void
   - Thumbnail strip: small <img> previews of each page, draggable to reorder
   - "Scan more" button → triggers capture again
   - "Done" button → proceeds to export

5. PAGE EDITING:
   export function openPageEditor(page: ScannedPage, container: HTMLElement): void
   - Manual crop: 4 corner handles draggable (CSS transform + pointer events)
   - Rotate: 90° steps (canvas transform)
   - Filters: Original / Enhanced / Grayscale / Black & White (radio buttons)
   - Apply and update page

6. OCR (ML Kit simulation using Tesseract.js CDN):
   export async function extractTextFromPage(page: ScannedPage): Promise<string>
   - Load Tesseract.js from CDN (unpkg.com/tesseract.js@5/dist/tesseract.min.js)
   - Run OCR on enhanced image
   - Return plain text
   - Option to save as .txt file to Drive alongside PDF

7. PDF EXPORT:
   export async function exportToPDF(session: ScannedSession, options: {
     quality: 'draft'|'standard'|'high',
     addOCRLayer: boolean,
     filename: string
   }): Promise<ArrayBuffer>
   - Use jsPDF (CDN: cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js)
   - Add each page as JPEG image to PDF (A4 size, fit to page)
   - If addOCRLayer: add invisible text layer for searchability
   - Return PDF ArrayBuffer

8. DRIVE UPLOAD:
   export async function saveToDriver(pdfBuffer: ArrayBuffer, filename: string): Promise<DriveFile>
   - Upload to "Scanned Documents" folder (create folder if doesn't exist)
   - Show upload progress snackbar
   - On complete: navigate to file in file list

Export ScannerInstance { stop(), toggleTorch(), switchCamera() } and all functions. Full implementation.
```

---

### Prompt 4B — Gmail Integration & Drive Manager

```
You are building "Folio" — a Google Drive office suite web app.

Generate TWO files:

FILE 1: gmail.js — In-app Gmail compose and send

GMAIL API v1 base: https://www.googleapis.com/gmail/v1/users/me

1. COMPOSE WINDOW:
   export function openCompose(options: {
     attachFile?: DriveFile,
     shareLink?: string,
     linkPermission?: 'reader'|'commenter'|'writer',
     to?: string[],
     subject?: string
   }): void
   - Show email-compose screen
   - Populate fields from options

2. RECIPIENT AUTOCOMPLETE:
   export async function searchContacts(query: string): Promise<Contact[]>
   - Call Google Contacts API (people.googleapis.com/v1/people:searchContacts)
   - Return: { name, email, photoUrl }
   - Render dropdown below To field
   - Keyboard: arrows to navigate, Enter to select, Backspace removes last tag
   - Recipient tags: chip style with name + remove X

3. ATTACHMENT HANDLING:
   - "Attach as file": download from Drive buffer → encode as base64 → attach to email
   - File size warning: >10MB → suggest Drive link instead
   - "Attach as Drive link": insert formatted link in email body
     * "I'm sharing [Filename] with you. View it here: [Drive link]"
     * Set permission via drive.createShareLink(fileId, role) first
   - Attachment chip shows: file icon + name + size + ✕

4. EMAIL SEND:
   export async function sendEmail(params: {
     to: string[],
     subject: string,
     body: string,
     attachments?: {name: string, mimeType: string, data: string (base64)}[]
   }): Promise<void>
   - Construct RFC 2822 MIME message manually
   - For attachments: multipart/mixed with text/html body + application/octet-stream parts
   - Encode entire message as base64url (URL-safe base64)
   - POST to /messages/send with {raw: encoded_message}
   - Handle 403: gmail.compose scope not granted → fallback to system mailto: URI
   - On success: show "Email sent!" snackbar → close compose screen

5. SCHEDULED SEND (P2 — stub implementation):
   export async function scheduleSend(params, sendAt: Date): Promise<void>
   - Store in IndexedDB, use Service Worker background sync to send

FILE 2: drive-manager.js — Full in-app Drive file manager UI

export function mountDriveManager(container: HTMLElement): DriveManagerInstance

1. FOLDER TREE NAVIGATION:
   - Root: "My Drive" → fetchChildren(rootId)
   - Render: folders first, then files (separate sections)
   - Folder cards: folder icon (yellow) + name + item count + modified date
   - Click folder → navigate into it (fetchChildren(folderId))
   - Breadcrumb updates: Home > Projects > Q2 Reports (each clickable)
   - Back button/gesture: pops breadcrumb stack

2. FOLDER CREATION:
   export async function createFolderPrompt(parentId: string): Promise<void>
   - Inline input appears (animated) in folder grid
   - Enter to confirm, Escape to cancel
   - Calls drive.createFolder(name, parentId)
   - Optimistic UI: add folder card immediately, update on API response

3. CONTEXT MENU (long-press / right-click on file or folder):
   Shows: Rename / Move / Copy / Delete / Star / Get Link / Info / Color Label (folders only)
   - Rename: inline text edit
   - Move: shows folder picker bottom sheet (tree navigation to select destination)
   - Delete: confirmation dialog → moves to Drive trash (NOT permanent)
   - Color Label (folders): 8 color swatches matching Google Drive colors

4. DRAG AND DROP (desktop):
   - Files: draggable="true"; drop target: folders (highlight on dragover)
   - Drop → drive.moveFile(fileId, newParentId, oldParentId)

5. FOLDER PICKER COMPONENT (reusable):
   export function openFolderPicker(options: {
     title: string,
     excludeFileId?: string,
     onSelect: (folderId: string, folderName: string) => void
   }): void
   - Bottom sheet with full Drive tree
   - "Select" button activates when folder is chosen
   - "New Folder" button inside picker

6. DRIVE STORAGE INDICATOR:
   export async function renderStorageIndicator(container: HTMLElement): Promise<void>
   - Fetch quota from drive.getDriveStorageQuota()
   - Render SVG circular progress (stroke-dashoffset animation)
   - Colors: green <70%, amber 70–90%, red >90%
   - Text: "8.3 GB used of 15 GB"
   - Breakdown bars: Docs, PDFs, Images, Other
   - "Get more storage" link → opens Google One upgrade page

7. MULTI-SELECT MODE:
   - Long-press first file → checkbox appears on all items
   - Bulk action bar: Move | Delete | Convert to PDF | Make Offline | Download | Share
   - Download bulk: zip selected files using JSZip (CDN) → single download

8. FILE DETAILS PANEL:
   export function showFileDetails(file: DriveFile): void
   - Bottom sheet: icon + name + type + size + created + modified + owner + sharing status + folder path + local sync status
   - "Open in Drive" link
   - "Copy file ID" button

Export all. Full implementation. No placeholders or stubs.
```

---

### Prompt 4C — AI Features, TTS & Remaining Modules

```
You are building "Folio" — a Google Drive office suite web app.

Generate FOUR files:

FILE 1: ai.js — Gemini AI integration (document summarizer + smart search)

GEMINI API: https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY'; // placeholder

1. DOCUMENT SUMMARIZER:
   export async function summarizeDocument(params: {
     text: string,
     language?: string,  // default: 'English'
     selectionOnly?: boolean,
     fileId: string
   }): Promise<SummaryResult>

   PROMPT TEMPLATE:
   "You are a document analysis assistant. Analyze this document text and provide:
   1. A 3-5 bullet point executive summary
   2. Key topics (max 5, as short tags)
   3. Document sentiment: positive / neutral / negative
   4. Estimated reading time (words ÷ 200)
   Respond in ${language}. Be concise and professional.
   Document text (first 10000 characters):
   ${text.substring(0, 10000)}"

   - Client-side rate limiting: max 1 request per 4 seconds (15 RPM = 1 per 4s)
   - Rate limit UI: disable button + countdown timer "Available in 3s"
   - Cache: store summaryHash (SHA-256 of fileId+first1000chars) → reuse cached result
   - Error handling: 429 → "Gemini rate limit — try again in a moment"

   SummaryResult: { bullets: string[], topics: string[], sentiment: string, readingTimeMin: number }

   RENDER:
   export function renderSummaryPanel(result: SummaryResult, container: HTMLElement): void
   - Slide-up panel with ✨ icon header
   - Bullet points with leading dots
   - Topic chips (pill style)
   - Sentiment pill: 🟢 Positive / ⬜ Neutral / 🔴 Negative
   - "Summarize in language" dropdown (top 10 languages)
   - "Summarize selection only" checkbox (if text selected in editor)
   - Privacy note: "📤 Text sent to Google Gemini"
   - "Copy Summary" button

2. SMART SEARCH (semantic content search):
   export function buildSearchIndex(cachedFiles: {fileId, content: string}[]): SearchIndex
   - SQLite FTS5 simulation: in-memory index using Map<string, {fileId, positions: number[]}>
   - Tokenize: split on spaces, lowercase, remove stopwords
   - Index each cached file's text content

   export function searchContent(query: string, index: SearchIndex): SearchResult[]
   - Return matches sorted by relevance (TF-IDF approximation)
   - Snippet: extract 100-character context around first match
   - Highlight matched terms in snippet

FILE 2: tts.js — Text-to-Speech reader

Uses Web Speech API (SpeechSynthesis) — no external library.

export class TTSController {
  constructor(text: string, options?: {rate?: number, pitch?: number, voice?: SpeechSynthesisVoice})

  play(): void
  pause(): void
  resume(): void
  stop(): void
  skipForward(): void  // next sentence
  skipBackward(): void // previous sentence
  setRate(rate: number): void  // 0.5 to 3.0
  getVoices(): SpeechSynthesisVoice[]
  setVoice(voice: SpeechSynthesisVoice): void

  // Events
  onSentenceChange(callback: (sentenceIndex: number, text: string) => void): void
  onEnd(callback: () => void): void
}

SENTENCE SPLITTING: split text on [.!?] followed by space/newline.
HIGHLIGHTING: emit sentenceIndex so editor can highlight current sentence.

TOOLBAR RENDERING:
export function renderTTSBar(controller: TTSController, container: HTMLElement): void
- Floating bar at bottom of screen (above bottom nav)
- Play/Pause button, Skip ← →, Speed selector (0.5× / 0.75× / 1× / 1.5× / 2× / 3×)
- Voice selector dropdown (from getVoices())
- Progress: "Sentence 12 of 87"
- Close button

FILE 3: security.js — Biometric lock, PIN, and security features

export async function initAppLock(): Promise<void>
- Check localStorage for app_lock_enabled
- On app focus (visibilitychange event): if lock enabled → show biometric lock screen

export async function authenticateBiometric(): Promise<boolean>
- Use Web Authentication API (navigator.credentials.get with PublicKeyCredential)
- Fallback: show PIN entry if WebAuthn not available or fails

export function showLockScreen(): void
export function hideLockScreen(): void

export function initPIN(pin: string): void — store PIN hash (SHA-256 + salt) in localStorage
export function verifyPIN(input: string): boolean
export function clearPIN(): void

export function enableScreenshotPrevention(): void
- Web: no direct equivalent; add warning overlay on right-click → "Screenshots are prevented"
- Add CSS user-select: none on sensitive areas

export function initAutoLock(timeoutMinutes: number): void
- Debounced timer on user interaction (mousemove, keydown, touchstart)
- On timeout: showLockScreen()

export async function detectDeviceIntegrity(): Promise<{isCompromised: boolean, reason?: string}>
- Web: limited detection; check for devtools open via window sizing heuristic

FILE 4: notifications.js — Local notifications and sync status

export function showSnackbar(params: {
  message: string,
  type?: 'info'|'success'|'warning'|'error',
  duration?: number,  // ms, default 4000
  action?: {label: string, handler: () => void}
}): void
- Animate in from bottom (translateY from 100% to 0)
- Queue multiple: stack with 8px vertical offset
- Auto-dismiss after duration
- Swipe-to-dismiss (touch)

export function showSyncStatus(status: 'syncing'|'synced'|'pending'|'offline'|'error', detail?: string): void
- Updates the sync pill in the editor and file cards

export function showConversionComplete(filename: string, onOpen: () => void): void
- Triggers interstitial ad check before showing "File Ready" dialog

export function showUploadProgress(filename: string, percent: number): void
export function hideUploadProgress(): void

export function requestBrowserNotificationPermission(): Promise<boolean>
export function sendBrowserNotification(title: string, body: string, icon?: string): void
- Used for background sync completion when tab is in background

Export all. Full implementations.
```

---

## ▌PHASE 5 — Ads, IAP, Analytics & PWA

### Prompt 5A — AdMob Integration, IAP & Consent

```
You are building "Folio" — a Google Drive office suite web app (also a PWA).
All editors, Drive, Gmail, AI modules are complete.

Generate ads.js — Complete ad integration and monetization module.

NOTE: For the web app, use Google Ad Manager / AdSense (AdMob is Flutter-native).
On web, use: window.googletag (Google Publisher Tag) or placeholder divs with AdSense script.
Implement as a full abstraction layer so mobile Flutter code can swap AdMob SDK in.

1. INITIALIZATION:
   export async function initAds(): Promise<void>
   - Check if user has purchased ad-free (localStorage key 'folio_ad_free')
   - If ad-free: do nothing; return
   - Load consent status (from consent.js)
   - If consent granted: load personalized ads
   - If consent denied: load non-personalized ads (npa=1 parameter)
   - Load Google Publisher Tag script dynamically

2. BANNER AD:
   export function showBannerAd(container: HTMLElement): void
   - Insert <div id="div-gpt-ad-banner"> with correct sizing
   - Slot configuration: 320x50 (mobile), 728x90 (desktop)
   - Add subtle gray separator line above banner (border-top: 1px solid #E8EAED)
   - "Remove Ads" text link below banner (font-size: 11px, color: #5F6368)
   - Click "Remove Ads" → openIAPModal()

3. INTERSTITIAL AD:
   export function showInterstitialAd(onClose: () => void): void
   - Show interstitial overlay (id="ad-interstitial")
   - X button appears after 5-second countdown timer
   - Track frequency: max 1 per 5 minutes (store lastInterstitialTime in sessionStorage)
   - If frequency cap hit: call onClose() immediately without showing ad
   - On close: call onClose() callback

4. REWARDED AD:
   export function showRewardedAd(params: {
     feature: 'remove-watermark'|'batch-convert'|'premium-tts'|'pdf-password',
     onReward: () => void,
     onCancel: () => void
   }): void
   - Show rewarded-ad-modal with feature description
   - "Watch Ad to Unlock: [feature name]" title
   - Feature icon + description of what's unlocked
   - "Watch Ad" button + "No thanks" button
   - Simulate reward (placeholder): after 5s countdown → call onReward()

5. NATIVE ADS:
   export function createNativeAdCard(): HTMLElement
   - Returns a file-card styled div with "Sponsored" badge
   - Uses same .file-card class but adds .file-card--sponsored
   - Placeholder content (replace with real ad network data in production)

6. IAP (WEB STUB — real IAP is Flutter):
   export function openIAPModal(): void
   - Show modal: "Remove Ads Forever — $1.99"
   - Description: "One-time purchase. No subscription. Rewarded ads remain as optional."
   - "Purchase — $1.99" button (links to payment flow placeholder)
   - "Restore Purchase" link
   - On successful purchase: localStorage.setItem('folio_ad_free', 'true') → hideAllAds()

   export function hideAllAds(): void
   - Remove banner ad container
   - Set flag to skip interstitial
   - Skip native ad insertion
   - Show "Ad-Free ✓" badge in profile screen

7. CONSENT MANAGEMENT:
   export async function showConsentDialog(): Promise<'granted'|'denied'|'partial'>
   - Show consent screen (UMP-style) on first launch
   - "Accept All" → store 'folio_consent: all' in localStorage
   - "Manage Options" → show granular toggles (personalized ads, analytics)
   - "Reject All" → store 'folio_consent: none'
   - Return user's choice

   export function getConsentStatus(): 'granted'|'denied'|'partial'|'unknown'

8. AD REVENUE TRACKING (analytics):
   - Log ad events to analytics.js: banner_viewed, interstitial_shown, interstitial_closed, rewarded_started, rewarded_completed, ad_free_purchased

Export all. No stubs.
```

---

### Prompt 5B — App Controller, Router & PWA

```
You are building "Folio" — a Google Drive office suite web app.
All modules (auth, drive, cache, files-ui, word-editor, pdf-viewer, excel-viewer, ppt-viewer, txt-editor, scanner, gmail, drive-manager, ai, tts, security, notifications, ads) are complete.

Generate THREE files:

FILE 1: router.js — Client-side screen navigation

export class Router {
  constructor(screens: string[])  // list of screen IDs

  navigate(screenId: string, params?: object): void
  - Hides all screens (remove 'active' class, add 'hidden' attribute)
  - Shows target screen (add 'active', remove 'hidden')
  - Slide animation: new screen slides in from right; back slides from left
  - Stores navigation state in history stack

  back(): void  // pop history stack, navigate to previous screen
  getParams(): object  // current screen params

  onNavigate(callback: (screenId, params) => void): void
}

ROUTE DEFINITIONS:
- 'splash' → 'onboarding' (after 1.5s) OR 'auth' (if visited before) OR 'home' (if authenticated)
- 'onboarding' → 'consent' (on completion)
- 'consent' → 'auth'
- 'auth' → 'home' (on sign in)
- 'home' → 'file-viewer' (on file open, with fileId param)
- 'home' → 'scanner'
- 'home' → 'profile'
- 'home' → 'drive-manager'
- 'file-viewer' → 'email-compose' (on share)
- 'file-viewer' → 'ai-panel' (integrated, not a route)
- any → 'settings-security'

FILE 2: app.js — Main application controller (orchestrates all modules)

This is the entry point. Implement complete app initialization and event handling.

1. APP INITIALIZATION (DOMContentLoaded):
   async function initApp():
   a. Show splash screen → animate logo
   b. After 1.5s: check localStorage 'folio_onboarded'
      - If false: navigate to onboarding
      - If true: check isAuthenticated()
        * Authenticated: navigate to home, load file list
        * Not authenticated: navigate to auth
   c. Initialize security: initAppLock(), initAutoLock(5)
   d. Initialize ads: initAds() (after consent)
   e. Register service worker

2. ONBOARDING:
   - Carousel: Next button advances cards (transform: translateX animation)
   - Skip: goes to consent
   - Last card Next → consent
   - On consent complete → navigate to auth
   - Set localStorage 'folio_onboarded' = true

3. AUTH SCREEN:
   - Google Sign-In button click → signIn()
   - On success: navigate to home

4. HOME SCREEN:
   a. File list: await loadHomeFiles()
      - Try Drive API (recent 30 days) → render via renderFileList()
      - If offline: load from getAllCachedMetadata()
   b. Filter chips: initFilterChips()
   c. Tabs: initTabs() — Recent / My Drive / Shared with Me
   d. Search: initSearch()
   e. Pull-to-refresh: initPullToRefresh()
   f. FAB menu:
      - New Document → drive.createFile + navigate to word editor (empty)
      - New Spreadsheet → drive.createFile + navigate to excel viewer (empty)
      - New Folder → createFolderPrompt('root')
      - Scan Document → navigate to scanner screen
   g. Bottom nav: Documents (home) | Scanner | Profile
   h. File card click → openFile(fileId)
   i. File card long-press → showContextMenu(fileId)

5. OPEN FILE (openFile):
   async function openFile(fileId: string, file: DriveFile):
   a. Check cache: getCachedFile(fileId)
      - Cache hit + not stale: use cached content
      - Cache miss or stale: download from Drive (showProgress)
   b. Update cache
   c. Navigate to file-viewer screen with params {fileId, file}
   d. Mount appropriate editor:
      - .docx/.doc → mountWordEditor()
      - .pdf → loadPDF()
      - .xlsx/.xls → loadExcel()
      - .pptx/.ppt → loadPPT()
      - .txt → loadTXT()
      - .jpg/.png/.gif → show image viewer (img tag, pinch zoom)
   e. Log access: cache.logAccess(fileId, 'opened')

6. FILE VIEWER SCREEN:
   - Back button: check isDirty() → if dirty: "Unsaved changes — Save before leaving?" dialog
   - File name: click → inline edit (rename file)
   - Share button → openCompose({ attachFile: currentFile })
   - ⋮ menu: Convert, Export PDF, Text-to-Speech, AI Summary, Print, File Info, Delete
   - AI Summary button (✨): showSummaryPanel()
   - Sync pill: shows sync status, click → manual sync

7. SCANNER SCREEN:
   - Initialize camera on screen enter
   - Stop camera on screen leave
   - Capture → process → show page editor
   - Export → PDF → upload to Drive → navigate to file-viewer

8. PROFILE SCREEN:
   - Load user info from sessionStorage
   - Render storage indicator: renderStorageIndicator()
   - Dark mode toggle: toggle class 'dark' on <html>, store in localStorage
   - App lock toggle: initPIN flow if enabling
   - Sign out: confirmation dialog → signOut() → navigate to auth

9. CONVERSION FEATURE:
   async function convertFile(fileId, sourceMime, targetMime):
   a. Show progress notification
   b. Download file from Drive (or cache)
   c. Convert:
      - DOCX → PDF: use word editor's export function
      - PDF → DOCX: basic text extraction (PDF.js text layer → wrap in minimal DOCX XML)
   d. Show interstitial ad (if eligible)
   e. Upload converted file to Drive (same folder, new name)
   f. Show "File Ready" snackbar with Open button

10. OFFLINE MODE:
    - Listen for 'online'/'offline' events
    - Banner: "You're offline — working from local cache" (amber snackbar, persistent)
    - On reconnect: check getPendingUploads() → auto-sync all pending files

11. KEYBOARD SHORTCUTS (web/desktop):
    - Ctrl+S: save current file
    - Ctrl+F: find (in editor)
    - Ctrl+P: print
    - Ctrl+Z: undo, Ctrl+Shift+Z: redo
    - Escape: close panels, dismiss menus

FILE 3: manifest.json — PWA manifest

{
  "name": "Folio – Office Docs & Drive",
  "short_name": "Folio",
  "description": "Office suite for Google Drive — free forever",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0D2344",
  "theme_color": "#1A73E8",
  "orientation": "portrait-primary",
  "icons": [
    { "src": "icons/icon-72.png", "sizes": "72x72", "type": "image/png" },
    { "src": "icons/icon-96.png", "sizes": "96x96", "type": "image/png" },
    { "src": "icons/icon-128.png", "sizes": "128x128", "type": "image/png" },
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ],
  "shortcuts": [
    { "name": "Scan Document", "url": "/?action=scan", "icons": [...] },
    { "name": "New Document", "url": "/?action=new-doc", "icons": [...] },
    { "name": "Recent Files", "url": "/?tab=recent", "icons": [...] }
  ],
  "screenshots": [...],
  "categories": ["productivity", "utilities"],
  "lang": "en"
}

Also generate: service-worker.js
- Cache-first strategy for app shell (design-system.css, app.js, icons, fonts)
- Network-first for all API calls
- Background sync: 'folio-sync' tag → upload pending files when connection restored
- Push notification handler for sync complete events

Export all. Full implementation.
```

---

## ▌PHASE 6 — Polish, Accessibility & Deployment

### Prompt 6A — Final Polish, Animations & Accessibility

```
You are building "Folio" — a Google Drive office suite web app.
All modules are now complete. This is the final polish pass.

Generate THREE files:

FILE 1: animations.css — All app animations

Complete CSS keyframe animations and transitions for:
1. SPLASH: logo-pulse (scale 0.8 → 1.05 → 1.0), fade-in, tagline-reveal (opacity 0→1 with 0.3s delay)
2. ONBOARDING: slide-in-right, slide-out-left (carousel transitions, translateX)
3. SCREEN TRANSITIONS: slide-in-from-right, slide-out-to-left, slide-in-from-left, slide-out-to-right (300ms ease)
4. MODAL: backdrop-fade-in, dialog-scale-in (scale 0.9→1 + opacity)
5. BOTTOM SHEET: sheet-slide-up (translateY 100%→0), sheet-slide-down
6. SNACKBAR: snackbar-slide-up, snackbar-slide-down
7. FAB: fab-expand (sub-items fan out), fab-collapse
8. FILE CARD: card-appear (staggered, defined by --card-index variable: animation-delay: calc(var(--card-index) * 30ms))
9. SKELETON: shimmer (background-position 200% → -200%, 1.5s infinite)
10. SYNC PILL: syncing (rotating circle), synced (checkmark pop), error (shake)
11. CONTEXT MENU: menu-appear (transform-origin: top right, scale 0.9→1)
12. CHIP ACTIVE: chip-select (scale 0.95 → 1 with color transition)
13. DRAG INDICATOR: drag-lift (scale 1.05, box-shadow increase)
14. PULL-TO-REFRESH: refresh-spin (360° rotation of refresh icon)
15. AI PANEL: sparkle-appear (✨ icon scale + glow pulse)
16. PROGRESS RING: ring-fill (stroke-dashoffset animation)
17. SCANNER CORNERS: corner-pulse (opacity 0.6→1, scale 0.98→1.02, infinite)
18. TOAST PROGRESS: toast-shrink (width 100%→0, duration matches snackbar lifetime)

FILE 2: accessibility.js — WCAG 2.1 AA compliance helpers

1. FOCUS MANAGEMENT:
   export function trapFocus(modalEl: HTMLElement): () => void
   - Traps Tab/Shift+Tab within modal
   - Returns cleanup function
   export function restoreFocus(el: HTMLElement): void
   export function announceSROnly(message: string, politeness?: 'polite'|'assertive'): void
   - Uses aria-live regions

2. DYNAMIC ARIA:
   export function updateAriaExpanded(triggerEl, isExpanded): void
   export function setAriaLoading(el, isLoading): void
   export function markCurrentPage(navEl, activeId): void

3. COLOR CONTRAST CHECKER (dev utility):
   export function checkContrast(hex1, hex2): number  // returns WCAG ratio

4. REDUCED MOTION:
   - Detect prefers-reduced-motion
   - export const reducedMotion: boolean
   - If true: disable all CSS animations (add class 'reduced-motion' to <html>)

5. DYNAMIC TEXT SIZE:
   - Respect browser font-size preference
   - Use rem units throughout (already in design system)
   - export function scaleTextSize(factor: 1.0 | 1.2 | 1.4 | 1.6): void

6. HIGH CONTRAST MODE:
   export function enableHighContrast(): void
   - Add class 'high-contrast' to <html>
   - High contrast CSS overrides (in design-system.css: .high-contrast selector block)

7. KEYBOARD NAVIGATION:
   - All interactive elements reachable via Tab
   - Visible focus rings (already in design system)
   - Export: focusableSelector (string of all focusable element selectors)

FILE 3: analytics.js — Firebase Analytics (opt-in) and Crashlytics

NOTE: Use Firebase JS SDK (CDN). Implement opt-in: only init if consent granted.

const firebaseConfig = {
  // placeholder — user fills in Firebase project config
  apiKey: "YOUR_API_KEY",
  authDomain: "folio-app.firebaseapp.com",
  projectId: "folio-app",
  ...
};

1. INITIALIZATION:
   export async function initAnalytics(consentGranted: boolean): Promise<void>
   - If not consented: set analytics_disabled flag only; no SDK load
   - Load firebase/analytics and firebase/performance dynamically

2. EVENT TRACKING:
   export function trackEvent(name: string, params?: object): void
   Events to track:
   - file_opened (fileId, mimeType)
   - file_edited (mimeType, wordsEdited)
   - file_converted (fromType, toType)
   - file_shared (method: 'email'|'link')
   - scanner_used (pageCount)
   - ai_summary_used (fileType, language)
   - ad_banner_viewed
   - ad_interstitial_shown, ad_interstitial_closed_early
   - ad_rewarded_completed (feature)
   - ad_free_purchased
   - search_performed (hasResults)
   - app_lock_triggered
   - dark_mode_toggled (enabled)
   - sign_in, sign_out
   - error_occurred (type, message — no PII)

3. CRASH REPORTING (Crashlytics equivalent — Firebase Crashlytics via compat SDK):
   export function initCrashlytics(): void
   - Override window.onerror and window.onunhandledrejection
   - Log to Firebase: { error: message, stack: trimmed_stack, url, timestamp }
   - Never include file content or user data in crash reports

4. PERFORMANCE:
   - Firebase Performance: track custom traces for file_open_time, search_latency, sync_duration

Export all. Full implementation.
```

---

# ══════════════════════════════════════════
# FLUTTER MOBILE APP — PHASES 7–12
# ══════════════════════════════════════════

---

## ▌PHASE 7 — Flutter Project Setup & Architecture

### Prompt 7 — Flutter Project Structure & pubspec.yaml

```
You are converting "Folio" — a complete web office suite — into a production Flutter app.
The web app is fully built. Now implement the exact same feature set in Flutter/Dart.

Generate the complete Flutter project structure and configuration files.

OUTPUT ALL OF THE FOLLOWING FILES IN FULL:

FILE 1: pubspec.yaml

name: folio
description: Your Drive. Your Docs. Limitless.
version: 1.0.0+1
publish_to: 'none'

environment:
  sdk: '>=3.2.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  
  # Google Auth & APIs
  google_sign_in: ^6.2.1
  googleapis: ^12.0.0
  googleapis_auth: ^1.5.1
  extension_google_sign_in_as_googleapis_auth: ^2.0.12
  
  # State Management
  flutter_riverpod: ^2.5.1
  riverpod_annotation: ^2.3.5
  
  # Storage & Security
  flutter_secure_storage: ^9.0.0
  hive_flutter: ^1.1.0
  sqflite_cipher: ^2.3.0+1  # SQLCipher
  local_auth: ^2.1.8
  crypto: ^3.0.3
  
  # File Viewers & Editors
  pdfrx: ^1.0.75
  syncfusion_flutter_pdf: ^25.1.35
  syncfusion_flutter_pdfviewer: ^25.1.35
  xml: ^6.5.0
  archive: ^3.6.1  # ZIP for DOCX/XLSX/PPTX parsing
  
  # Excel
  excel: ^4.0.3
  
  # Ads & IAP
  google_mobile_ads: ^5.1.0
  in_app_purchase: ^3.1.13
  
  # Firebase
  firebase_core: ^3.2.0
  firebase_analytics: ^11.2.0
  firebase_crashlytics: ^4.0.4
  firebase_performance: ^0.9.4+4
  
  # Scanner & ML Kit
  google_mlkit_document_scanner: ^0.1.1
  google_mlkit_text_recognition: ^0.13.0
  camera: ^0.10.6
  
  # Gmail
  # Uses googleapis package (gmail: ^3.0.0 via googleapis)
  
  # UI & Navigation
  go_router: ^14.0.0
  animations: ^2.0.11
  google_fonts: ^6.2.1
  flutter_svg: ^2.0.10+1
  cached_network_image: ^3.3.1
  shimmer: ^3.0.0
  
  # Utilities
  intl: ^0.19.0
  path_provider: ^2.1.3
  share_plus: ^9.0.0
  url_launcher: ^6.3.0
  connectivity_plus: ^6.0.3
  flutter_local_notifications: ^17.2.2
  app_links: ^6.1.1
  permission_handler: ^11.3.1
  device_info_plus: ^10.1.0
  package_info_plus: ^8.0.1
  image_picker: ^1.1.2
  flutter_tts: ^4.0.2
  open_filex: ^4.4.1
  
  # Ad Consent
  google_user_messaging_platform: ^3.1.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^4.0.0
  build_runner: ^2.4.11
  riverpod_generator: ^2.4.3
  hive_generator: ^2.0.1

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/icons/
    - assets/fonts/
    - assets/onboarding/
  fonts:
    - family: InstrumentSerif
      fonts:
        - asset: assets/fonts/InstrumentSerif-Regular.ttf
        - asset: assets/fonts/InstrumentSerif-Italic.ttf
          style: italic

FILE 2: lib/main.dart — App entry point

Complete implementation:
- Firebase initialization
- Hive initialization (register adapters)
- Riverpod ProviderScope wrapper
- GoRouter setup (all routes defined)
- MaterialApp.router with full ThemeData (light + dark)
- Override FlutterError.onError → Crashlytics
- BiometricLock wrapper widget

ThemeData:
- colorScheme from ColorScheme.fromSeed(seedColor: Color(0xFF1A73E8))
- Light: background #F8F9FA, surface #FFFFFF
- Dark: background #1C1B1F, surface #2C2B30
- textTheme: GoogleFonts.nunito (body) + InstrumentSerif (display)
- AppBarTheme: elevation 0, white background (light) / #2C2B30 (dark)
- BottomNavigationBarTheme: selectedItemColor #1A73E8
- CardTheme: radius 12, elevation 1
- FilledButtonTheme, OutlinedButtonTheme, TextButtonTheme — fully configured

FILE 3: lib/core/router.dart — GoRouter configuration

All routes:
- /splash → SplashScreen
- /onboarding → OnboardingScreen
- /consent → ConsentScreen
- /auth → AuthScreen
- /home → HomeScreen (with sub-routes)
  * /home/drive → DriveManagerScreen
  * /home/profile → ProfileScreen
  * /home/settings → SettingsScreen
  * /home/settings/security → SecuritySettingsScreen
  * /home/audit-log → AuditLogScreen
- /viewer/:fileId → FileViewerScreen
- /scanner → ScannerScreen
- /email-compose → EmailComposeScreen (with queryParams: fileId, shareType)
- /ai-summary/:fileId → AISummaryScreen

Redirect logic:
- If not authenticated → /auth
- If not onboarded → /onboarding
- If app lock active → show lock overlay (not a route — overlay widget)

FILE 4: lib/core/app_theme.dart
Full ThemeData definitions for light and dark themes. Include all component themes (buttons, cards, inputs, dialogs, bottom sheets, navigation bar, FAB, chips, badges, snackbars).

FILE 5: lib/core/constants.dart
All app constants: Google Client ID, API scopes, AdMob ad unit IDs (test IDs for development), Gemini API key placeholder, cache limits, rate limits, animation durations, file type MIME types map.

FILE 6: lib/core/extensions.dart
Dart extension methods:
- String: .fileExtension, .mimeType, .truncate(n), .toHumanFileSize
- DateTime: .toRelativeString ('Today', 'Yesterday', '3 days ago')
- int: .toFileSizeString ('1.2 MB', '340 KB')
- BuildContext: .showSnackBar(msg), .showConfirmDialog(title, body)

FILE 7: android/app/src/main/AndroidManifest.xml (complete)
Permissions: INTERNET, ACCESS_NETWORK_STATE, CAMERA, READ_EXTERNAL_STORAGE (< API 33), READ_MEDIA_IMAGES (>= API 33), USE_BIOMETRIC, USE_FINGERPRINT, RECEIVE_BOOT_COMPLETED, VIBRATE
Deep link intent filters: folio://open scheme
AdMob App ID meta-data tag
FLAG_SECURE meta-data for screen capture prevention
Backup rules (exclude sensitive data)

FILE 8: ios/Runner/Info.plist additions (complete)
NSCameraUsageDescription, NSPhotoLibraryUsageDescription, NSFaceIDUsageDescription, NSContactsUsageDescription
URL scheme: folio
Google Sign-In URL scheme (REVERSED_CLIENT_ID)
NSAppTransportSecurity: NSAllowsArbitraryLoads: false

Output all files completely. No placeholders in code logic. Full Dart/YAML.
```

---

## ▌PHASE 8 — Flutter Auth, Drive & State Management

### Prompt 8 — Auth, Drive Service & Riverpod Providers

```
You are building the Flutter version of "Folio." Project structure, pubspec.yaml, and main.dart are complete.

Generate the complete authentication and Drive API layer in Flutter/Dart.

FILE 1: lib/services/auth_service.dart

class AuthService {
  // Google Sign-In instance with exact scopes
  static const _scopes = [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/contacts.readonly',
  ];

  Future<UserProfile?> signIn() async:
  - GoogleSignIn().signIn()
  - Get auth headers via GoogleSignInAccount.authHeaders
  - Fetch user profile from googleapis userinfo endpoint
  - Store tokens securely via flutter_secure_storage
  - Return UserProfile { name, email, photoUrl, hostedDomain }

  Future<void> signOut() async:
  - GoogleSignIn().signOut()
  - flutter_secure_storage.deleteAll()
  - HiveCache.clearAll()

  Future<bool> isSignedIn() async
  Future<Map<String, String>> getAuthHeaders() async
  Future<void> silentSignIn() async

  Stream<GoogleSignInAccount?> get authStateChanges
}

@freezed class UserProfile: name, email, photoUrl, hostedDomain

FILE 2: lib/services/drive_service.dart

Complete Drive API v3 service using googleapis package:
import 'package:googleapis/drive/v3.dart' as drive;

class DriveService {
  Future<List<drive.File>> listFiles({
    String? query,
    String? pageToken,
    int pageSize = 50,
    String orderBy = 'modifiedTime desc',
    String? folderId,
  }): complete implementation with all query builder helpers

  Future<drive.File> getFile(String fileId)

  Future<List<int>> downloadFile(String fileId, {String? exportMimeType})
  // Use StreamedResponse for progress tracking
  // Emit download progress via StreamController

  Future<drive.File> uploadFile({
    required String name,
    required String mimeType,
    required List<int> content,
    String? parentFolderId,
    String? fileId,  // update existing
  })
  // Use resumable upload for > 5MB
  // Emit upload progress via StreamController

  Future<drive.File> renameFile(String fileId, String newName)
  Future<drive.File> moveFile(String fileId, String newParentId, String oldParentId)
  Future<void> deleteFile(String fileId)
  Future<drive.File> copyFile(String fileId, String newName, String parentId)
  Future<drive.File> starFile(String fileId, bool starred)
  Future<drive.File> createFolder(String name, {String? parentId})
  Future<drive.About> getStorageQuota()
  Future<String> createShareLink(String fileId, String role)
  Future<List<drive.Permission>> getPermissions(String fileId)

  // Stream-based progress
  Stream<double> get downloadProgress
  Stream<double> get uploadProgress
}

FILE 3: lib/services/cache_service.dart

AES-256 encrypted file cache using Hive + flutter_secure_storage:

class CacheService {
  // Initialize Hive boxes: 'files', 'metadata', 'audit_log'
  // Encryption key stored in flutter_secure_storage
  // Use HiveAesCipher for box encryption

  Future<void> cacheFile(String fileId, List<int> content, DriveFileModel metadata)
  Future<CachedFile?> getCachedFile(String fileId)
  Future<DriveFileModel?> getCachedMetadata(String fileId)
  Future<List<DriveFileModel>> getAllCachedMetadata()
  Future<void> updateMetadata(String fileId, DriveFileModel metadata)
  Future<void> removeCachedFile(String fileId)
  Future<void> clearAll()
  Future<int> getCacheSize()  // bytes
  Future<void> enforceCacheLimit({int maxFiles = 20})  // LRU eviction

  // Sync queue
  Future<void> markPendingUpload(String fileId)
  Future<void> clearPendingUpload(String fileId)
  Future<List<String>> getPendingUploads()

  // Audit log (encrypted)
  Future<void> logAccess(String fileId, String action)
  Future<List<AuditEntry>> getAuditLog()
  Future<void> clearAuditLog()
}

FILE 4: lib/models/ — All data models with Freezed + Hive adapters

lib/models/drive_file_model.dart:
@freezed @HiveType class DriveFileModel:
  id, name, mimeType, modifiedTime, createdTime, size, starred, trashed,
  parents, webViewLink, iconLink, ownerName, ownerEmail, ownerPhoto,
  lastModifierName, lastModifierEmail, sharingUser, canEdit, canDownload,
  syncStatus (SyncStatus enum: synced, pending, localOnly, conflict)

lib/models/user_profile.dart: @freezed
lib/models/audit_entry.dart: @freezed @HiveType
lib/models/scan_session.dart: @freezed (pages: List<ScannedPage>)
lib/models/scanned_page.dart: @freezed (imagePath, enhancedPath, extractedText)
lib/models/ai_summary.dart: @freezed (bullets, topics, sentiment, readingTimeMin)
lib/models/email_draft.dart: @freezed (to, subject, body, attachments)

FILE 5: lib/providers/ — All Riverpod providers

lib/providers/auth_provider.dart:
@riverpod class AuthNotifier: signIn, signOut, silentSignIn
@riverpod UserProfile? currentUser (derived from AuthNotifier)

lib/providers/files_provider.dart:
@riverpod class FilesNotifier:
  - State: AsyncValue<List<DriveFileModel>>
  - loadRecent(), loadFolder(folderId), searchFiles(query)
  - refreshFiles(), loadNextPage()
  - applyFilter(FileTypeFilter), setSortOrder(SortOrder, SortDirection)

lib/providers/file_detail_provider.dart:
@riverpod class FileDetailNotifier(fileId):
  - State: FileDetailState (file, content, syncStatus, isDirty)
  - openFile(), saveFile(), syncToDrive(), revertChanges()

lib/providers/cache_provider.dart:
@riverpod CacheService cacheService (singleton)

lib/providers/connectivity_provider.dart:
@riverpod Stream<ConnectivityResult> connectivityStream
@riverpod bool isOnline

lib/providers/drive_manager_provider.dart:
@riverpod class DriveManagerNotifier:
  - navigateToFolder(folderId), navigateBack()
  - State: {currentFolder, breadcrumbs, items, isLoading}
  - createFolder, renameFile, moveFile, deleteFile, starFile

lib/providers/ads_provider.dart:
@riverpod class AdsNotifier:
  - isAdFree, loadBannerAd, showInterstitial, showRewarded, purchaseAdFree

lib/providers/settings_provider.dart:
@riverpod class SettingsNotifier:
  - darkMode, appLockEnabled, lockTimeout, screenshotPrevention, analyticsOptIn
  - All persisted in SharedPreferences

All providers: fully implemented with proper error handling, loading states, cancellation.
Use AsyncNotifier and Notifier as appropriate. Generate all .g.dart file annotations.

Output all files completely. Full Dart code. No stubs or TODOs.
```

---

## ▌PHASE 9 — Flutter UI Screens

### Prompt 9A — Core Screens (Splash, Onboarding, Auth, Home)

```
You are building the Flutter version of "Folio." All services and providers are complete.

Generate the core UI screens. Use Material 3, Riverpod, GoRouter. Full implementation.

FILE 1: lib/screens/splash_screen.dart
- AnimatedBuilder with CurvedAnimation
- Folio SVG logo (flutter_svg, from assets) fades in + scale 0.8→1.0 in 800ms
- Tagline "Your Drive. Your Docs. Limitless." fades in at 600ms delay
- InstrumentSerif font for tagline
- After 1.5s: check auth → navigate appropriately
- Background: Deep Navy #0D2344, logo in white + blue

FILE 2: lib/screens/onboarding_screen.dart
- PageView with 3 pages (physics: BouncingScrollPhysics)
- Each page: SVG illustration + title (InstrumentSerif) + description (NunitoSans)
- Animated dot indicators (AnimatedContainer for active dot)
- Skip button (top right, always visible)
- Next button (bottom right, primary filled)
- Last page: "Get Started" button
- SmoothPageIndicator animation
- Page content:
  1. "Your files, your Drive" + Drive + phone illustration
  2. "Edit everything offline" + document + wifi-off illustration
  3. "Share via email instantly" + envelope illustration

FILE 3: lib/screens/consent_screen.dart
- GoogleUserMessagingPlatform (UMP SDK) integration
- Call ConsentInformation.instance.requestConsentInfoUpdate on load
- If consent required: show UMP form
- 3 buttons: Accept All / Manage Preferences / Reject All
- Privacy Policy link (url_launcher)
- "Continue without personalized ads" option
- Animated slide-up panel

FILE 4: lib/screens/auth_screen.dart
- Folio logo centered (large, animated entrance)
- Google Sign-In button (official styling: white, rounded, Google logo SVG, "Sign in with Google" text)
- Subtle description below: scopes explanation
- Privacy statement: "Your files never leave your Drive"
- Sign-in trigger: ref.read(authProvider.notifier).signIn()
- Loading state: CircularProgressIndicator replacing button
- Error state: SnackBar with retry option

FILE 5: lib/screens/home_screen.dart — The main app screen (most complex)

Structure using Scaffold:
- AppBar: Folio small logo (left) + search icon (right, expands to SearchBar) + avatar (right)
- Body: CustomScrollView with SliverToBoxAdapter sections:
  a. Filter chips row (horizontal ListView): All, Word, PDF, Excel, PPT, TXT, Images, Starred
  b. Tab bar: Recent · My Drive · Shared with Me (TabController)
  c. Banner ad widget (AdmobBannerAd widget, 90dp height)
  d. TabBarView with:
     * Recent tab: AsyncValue file list from filesProvider
     * My Drive tab: folder tree (DriveManagerWidget embedded)
     * Shared tab: shared files list
- BottomNavigationBar: 3 items (Documents, Scanner, Profile) — NavigationBar Material 3
- FAB: SpeedDial-style (+):
  Sub-items: New Document, New Spreadsheet, New Folder, Scan Document
  Use animated FAB expansion (AnimatedList or custom AnimatedBuilder)
- File list rendering: ListView.builder with FileListItem widgets
  Every 10th item: NativeAdCard widget
- Pull-to-refresh: RefreshIndicator wrapping scroll content
- Empty state: EmptyStateWidget (illustration + text + action button)
- Shimmer loading: ShimmerFileList (6 skeleton cards)
- Offline banner: MaterialBanner (amber) at top of body

FILE 6: lib/widgets/file_list_item.dart
Full file card widget:
- Leading: FileTypeIcon widget (SVG per mime type, colored)
- Title: file name (maxLines: 1, overflow: ellipsis)
- Subtitle: "${relativeDate} · ${fileSize}" or sync status
- Trailing: SyncStatusBadge + IconButton (⋮)
- onTap: navigate to viewer
- onLongPress: show context menu OR enter multi-select
- Swipe actions (Dismissible): star (left) / delete (right) with confirmation
- InkWell with 12dp border radius

FILE 7: lib/widgets/file_type_icon.dart
Returns correct colored SvgPicture based on mimeType:
- DOCX: blue document icon
- PDF: red PDF icon
- XLSX: green spreadsheet icon
- PPTX: orange presentation icon
- TXT: gray text icon
- Image: purple image icon
- Folder: yellow folder icon
- Unknown: gray file icon

FILE 8: lib/widgets/context_menu.dart
showModalBottomSheet-based context menu:
- Rename, Move, Copy, Delete, Share, Make Available Offline, Star, Get Link, File Details
- Each item: ListTile with leading icon + label
- Delete: shows ConfirmDialog first
- Star: toggles and updates UI optimistically

FILE 9: lib/widgets/multi_select_bar.dart
AnimatedContainer that slides up from bottom when multi-select active:
- "N selected" count
- Action buttons: Move, Delete, Convert to PDF, Download, Share
- Dismiss: clear selection

Output all screens and widgets completely. Full Dart code. No stubs.
```

---

### Prompt 9B — File Viewer, Scanner, Profile & Drive Manager Screens

```
You are building the Flutter version of "Folio." Core screens are complete.

Generate the remaining UI screens and widgets.

FILE 1: lib/screens/file_viewer_screen.dart
Router param: fileId (String)

- AppBar: BackButton + file name (InkWell to rename) + SyncStatusPill + ShareIconButton + PopupMenuButton(⋮)
- PopupMenu items: Convert, Export PDF, Text-to-Speech, AI Summary, Print, File Info, Delete
- Body: content area mounted by _mountEditor(mimeType)
- Floating sync pill (bottom center): "Synced 2 min ago" (AnimatedSwitcher)
- SpeedDial FAB: Sync to Drive (primary) + Share (secondary)
- WillPopScope: check isDirty → show "Save?" AlertDialog

Editor mounting:
Widget _mountEditor(String mimeType, List<int> content):
  - application/vnd.openxmlformats-officedocument.wordprocessingml.document → WordEditorWidget
  - application/pdf → PdfViewerWidget
  - application/vnd.openxmlformats-officedocument.spreadsheetml.sheet → ExcelViewerWidget
  - application/vnd.ms-powerpoint / presentationml → PptViewerWidget
  - text/plain → TxtEditorWidget
  - image/* → ImageViewerWidget (InteractiveViewer + CachedNetworkImage/MemoryImage)
  - default → UnsupportedFileWidget

FILE 2: lib/widgets/editors/word_editor_widget.dart
Full DOCX editor using xml package for parsing:
- Parse DOCX: extract archive (using 'archive' package), parse word/document.xml
- Render paragraphs as Flutter widgets:
  * Normal text → Text/RichText (TextSpan with style)
  * Headings H1–H4 → styled Text (InstrumentSerif for H1, larger sizes)
  * Lists → bullet/number prefixed Column
  * Tables → Table widget with decoration
  * Images → extracted from docx archive, displayed as Image.memory
- ContentEditable simulation: Flutter TextField for each paragraph
- Formatting toolbar (positioned above keyboard when editing):
  Row of ToggleButtons: Bold, Italic, Underline, Strikethrough
  DropdownButton: Heading level
  IconButtons: Align Left/Center/Right, Lists, Indent/Outdent
  ColorPicker: text color + highlight
  IconButton: Insert Image, Find & Replace
- Auto-save: Timer.periodic(30s) → serializeDOCX → cacheService.cacheFile
- Word count: shown in bottom status bar

FILE 3: lib/widgets/editors/pdf_viewer_widget.dart
Using pdfrx + syncfusion_flutter_pdfviewer:
- PdfViewerWidget with PdfViewerController
- Toolbar: page navigation (< X/Y >), zoom (- +), rotation
- Annotation toolbar: Highlight (color picker), Sticky Note, Freehand, Underline, Strikethrough, Rectangle, Stamp
- Annotation storage: serialize to JSON → cache alongside file
- Form field detection and filling (SfPdfViewer supports this)
- Text search: PdfTextSearchResult with match navigation
- Signature panel: ModalBottomSheet with SignaturePad widget (custom canvas)
- Page thumbnail strip: horizontal PageView of miniature page previews

FILE 4: lib/widgets/editors/excel_viewer_widget.dart
Using excel package:
- Parse .xlsx with Excel.decodeBytes(content)
- Tab bar for multiple sheets
- InteractiveViewer wrapping a scrollable table
- DataTable or custom grid widget (for performance: use ListView.builder for rows)
- Tappable cells → show formula bar at top, inline TextField
- Toolbar: Bold, Italic, text alignment, cell color, number format
- Re-serialize and save via CacheService

FILE 5: lib/widgets/editors/ppt_viewer_widget.dart
- Parse PPTX archive: extract slide XML files
- Render each slide as a Container (16:9 ratio, 960×540 logical px, scaled to screen)
  * Background color from slide XML
  * Text boxes positioned absolutely (Transform.translate) using EMU coordinates
  * Title text in larger font
- Slide thumbnail strip: horizontal ListView on left side (or bottom)
- Presentation mode: full-screen via SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky)

FILE 6: lib/widgets/editors/txt_editor_widget.dart
- Single TextField (maxLines: null, expands: true)
- Monospace font (JetBrains Mono)
- Line number overlay (Stack with synchronized scroll)
- Toolbar: font size, word wrap, find & replace
- Character/word/line count in status bar

FILE 7: lib/screens/scanner_screen.dart
Using google_mlkit_document_scanner:
- DocumentScanner with full pipeline:
  DocumentScannerOptions(pageLimit: 10, galleryImportAllowed: true, mode: ScannerMode.full)
- Launch scanner: DocumentScanner().startDocumentScanning(context)
- Result: DocumentScanningResult with list of image URIs
- After scan: show ScanResultScreen with pages
- Per-page editing: rotate, crop (using image_cropper package or custom gesture), filter (grayscale, B&W, enhanced)
- OCR: TextRecognizer from google_mlkit_text_recognition
- PDF export: use syncfusion_flutter_pdf to add images to PDF document
- Upload to Drive: DriveService.uploadFile → navigate to file viewer

FILE 8: lib/screens/email_compose_screen.dart
- Recipient field: chip-style tags (using flutter_chips_input pattern with custom implementation)
- Contact autocomplete: People API search on 400ms debounce
- Subject field: standard TextField
- Attachment chip: file icon + name + size + remove button
- Attach mode toggle: "As File" / "As Drive Link"
- If "As Drive Link": permission selector chips (View / Comment / Edit)
- Body: multiline TextField
- Send button: calls GmailService.sendEmail
- Loading overlay during send
- Success: SnackBar + pop screen

FILE 9: lib/screens/drive_manager_screen.dart
- AppBar with breadcrumb navigation (horizontal ListView of TextButton chips)
- Body: GridView / ListView toggle of folders and files
  Folders: large folder cards (yellow icon, name, item count)
  Files: smaller file cards
- FAB: "New Folder" button
- Long-press context menu: same as home screen
- Drag-and-drop (on tablets): LongPressDraggable → DragTarget (folder cards)
- DriveStorageIndicator widget: CircularProgressIndicator (custom) + usage text

FILE 10: lib/screens/profile_screen.dart
- User avatar (CircleAvatar, network image with initials fallback)
- User name + email
- DriveStorageWidget: custom CircularProgressIndicator with segments
- Settings sections (ListTile groups with section headers):
  * Appearance: Dark Mode toggle, Text Size slider (1.0/1.2/1.4/1.6×)
  * Security: App Lock toggle, Biometrics toggle, Lock Timeout, Change PIN, Screenshot Prevention toggle
  * Privacy: File Access Log, Delete All Local Data, CCPA toggle
  * Monetization: "Remove Ads — $1.99" ListTile (or "Ad-Free Unlocked ✓")
  * About: Version, Rate Folio, Send Feedback, Open Source Licenses
- Sign Out ListTile (red text, confirmation AlertDialog)

FILE 11: lib/screens/ai_summary_screen.dart
- File name header + ✨ sparkle animation (Lottie or custom AnimatedBuilder)
- Language selector dropdown (10 languages)
- "Summarize selection only" checkbox
- Privacy note chip: "📤 Sent to Gemini"
- AsyncValue state:
  * Loading: shimmer bullets
  * Success: bullet list + topic chips + sentiment badge + reading time
  * Error: error message + retry button
- "Copy Summary" FAB
- Rate limit countdown timer (if limited)

FILE 12: lib/screens/security_settings_screen.dart
- App Lock toggle (biometric setup flow on enable)
- local_auth: canCheckBiometrics, getAvailableBiometrics
- Biometrics toggle (Face ID / Fingerprint)
- Lock timeout selector: immediately, 1 min, 5 min, 15 min, 30 min
- Set/Change PIN: bottom sheet with 6-dot PIN entry
- Screenshot prevention toggle (FLAG_SECURE on Android, not possible on iOS web layer)
- Clipboard auto-clear toggle

Output all files completely. Full Dart/Flutter code. No stubs.
```

---

## ▌PHASE 10 — Flutter Services (Gmail, AI, TTS, Ads)

### Prompt 10 — Remaining Flutter Services

```
You are building the Flutter version of "Folio." All screens and core services are complete.

Generate the remaining Flutter service and utility files.

FILE 1: lib/services/gmail_service.dart
Using googleapis gmail/v1:

class GmailService {
  Future<void> sendEmail({
    required List<String> to,
    required String subject,
    required String body,
    List<EmailAttachment>? attachments,
  }):
  - Construct MIME message manually in Dart
  - For attachments: multipart/mixed content type
  - Encode as base64url
  - POST to users.messages.send
  - Handle 403: fallback to share_plus (system share sheet)

  Future<List<Contact>> searchContacts(String query):
  - People API: people.googleapis.com/v1/people:searchContacts
  - Return name, email, photoUrl

  String _buildMimeMessage({...}): complete MIME builder
  String _base64UrlEncode(String input): RFC 4648 base64url
}

@freezed class EmailAttachment: name, mimeType, data (List<int>)
@freezed class Contact: name, email, photoUrl

FILE 2: lib/services/ai_service.dart
Gemini REST API integration:

class AIService {
  static const _geminiBaseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  Future<AISummary> summarizeDocument({
    required String text,
    String language = 'English',
    bool selectionOnly = false,
  }):
  - Rate limiting: RateLimiter class (15 RPM = 1 req per 4s)
  - Cache: SHA-256 hash of fileId + first 500 chars → return cached result
  - Build prompt (as in web version)
  - POST to Gemini endpoint with apiKey query param
  - Parse response: extract text → parse bullets, topics, sentiment
  - Return AISummary

  // On-device full-text search index (SQLite FTS5 via sqflite)
  Future<void> buildSearchIndex(List<{String fileId, String content}> files)
  Future<List<SearchResult>> searchContent(String query)
}

class RateLimiter {
  final int requestsPerMinute;
  Future<void> acquire(): // waits if rate limit hit, updates UI via Stream
  Stream<int> get secondsUntilAvailable;
}

FILE 3: lib/services/tts_service.dart
Using flutter_tts:

class TTSService extends ChangeNotifier {
  List<String> _sentences = [];
  int _currentSentenceIndex = 0;
  bool isPlaying = false;
  double rate = 1.0;
  double pitch = 1.0;
  String? selectedVoice;

  Future<void> loadText(String text)
  Future<void> play()
  Future<void> pause()
  Future<void> resume()
  Future<void> stop()
  Future<void> skipForward()
  Future<void> skipBackward()
  Future<void> setRate(double rate)
  Future<List<Map>> getAvailableVoices()
  Future<void> setVoice(String voice)

  // Current sentence tracking for highlighting
  Stream<int> get currentSentenceStream;
}

Sentence splitting: RegExp on [.!?] + space or newline.
TTSBar widget (BottomSheet-style persistent bar):
Play/Pause, ← →, speed selector, voice dropdown, progress text, close button.

FILE 4: lib/services/security_service.dart
Using local_auth + flutter_secure_storage:

class SecurityService {
  Future<bool> authenticateWithBiometric({String reason = 'Authenticate to access Folio'})
  Future<bool> isBiometricAvailable()
  Future<List<BiometricType>> availableBiometrics()

  // PIN management
  Future<void> setPIN(String pin)  // hash + salt, store in flutter_secure_storage
  Future<bool> verifyPIN(String input)
  Future<void> clearPIN()

  // App lock
  void startAutoLockTimer(int timeoutMinutes)
  void resetAutoLockTimer()
  void cancelAutoLockTimer()

  // Android FLAG_SECURE (screenshot prevention)
  Future<void> enableScreenshotPrevention()
  Future<void> disableScreenshotPrevention()

  // Device integrity
  Future<bool> isDeviceRooted()  // using device_info_plus heuristics
}

BiometricLockOverlay widget (wraps entire app in a Stack):
- When locked: shows lock screen with Folio logo + biometric button + PIN fallback
- Animate in/out with fade + scale

FILE 5: lib/services/ads_service.dart
Using google_mobile_ads:

class AdsService {
  // Test ad unit IDs (replace with real IDs for production)
  static const _bannerAdUnitId = Platform.isAndroid
      ? 'ca-app-pub-3940256099942544/6300978111'  // test
      : 'ca-app-pub-3940256099942544/2934735716'; // test
  static const _interstitialAdUnitId = ...;
  static const _rewardedAdUnitId = ...;

  Future<void> initialize()
  Future<void> showConsentDialog()  // UMP SDK

  // Banner
  BannerAd? createBannerAd()
  Widget buildBannerWidget()  // returns AdWidget or empty if ad-free

  // Interstitial
  Future<void> loadInterstitial()
  Future<void> showInterstitial({required VoidCallback onClose})
  bool _canShowInterstitial()  // frequency cap: 1 per 5 minutes

  // Rewarded
  Future<void> loadRewarded()
  Future<void> showRewarded({
    required String feature,
    required VoidCallback onRewarded,
    required VoidCallback onCancelled,
  })

  // Ad-free status
  bool get isAdFree
  Future<void> purchaseAdFree()
  Future<void> restorePurchase()
}

FILE 6: lib/services/iap_service.dart
Using in_app_purchase:

class IAPService {
  static const _adFreeProductId = 'com.folio.adfree';

  Stream<List<PurchaseDetails>> get purchaseStream
  Future<bool> isAdFree() async  // check purchase history
  Future<void> purchase()  // initiate ad-free purchase
  Future<void> restore()   // restore previous purchases
  Future<void> handlePurchaseUpdate(PurchaseDetails details)
  Future<void> completePurchase(PurchaseDetails details)
}

FILE 7: lib/services/conversion_service.dart
On-device file conversion:

class ConversionService {
  Future<List<int>> convertDocxToPdf(List<int> docxBytes):
  - Extract text from DOCX XML
  - Use syncfusion_flutter_pdf to build PDF with extracted text
  - Warn user: "Complex formatting may not be preserved"

  Future<List<int>> convertPdfToDocx(List<int> pdfBytes):
  - Extract text layer from PDF using syncfusion_flutter_pdf
  - Wrap in minimal DOCX XML structure
  - Warn: "Layout approximated"

  Future<List<int>> convertImagesToPdf(List<List<int>> imageBytesList):
  - Use syncfusion_flutter_pdf: add each image as full-page
  - Return PDF bytes

  Future<String> extractTextFromFile(List<int> fileBytes, String mimeType):
  - DOCX: parse XML, collect w:t text
  - PDF: syncfusion text extraction
  - TXT: UTF-8 decode

  void Function(double progress) onProgress;  // 0.0 to 1.0
}

FILE 8: lib/utils/file_utils.dart

class FileUtils {
  static String getMimeType(String filename): extension → MIME type map
  static String getFileExtension(String filename)
  static String formatFileSize(int bytes)
  static String formatDate(DateTime date)  // relative format
  static String getEditorType(String mimeType)
  static bool isEditable(String mimeType)
  static bool isViewable(String mimeType)
  static Color getFileTypeColor(String mimeType)
  static String getFileTypeIcon(String mimeType)  // asset path
  static Future<String> saveFileLocally(List<int> bytes, String filename): saves to temp dir
  static Future<void> openFileExternally(String path)  // open_filex
  static Future<void> shareFile(List<int> bytes, String filename, String mimeType): share_plus
}

Output all files completely. Full Dart code. No stubs or TODOs.
```

---

## ▌PHASE 11 — Background Services, Notifications & Deep Links

### Prompt 11 — Background Sync, Notifications, Deep Links & App Widgets

```
You are building the Flutter version of "Folio." All screens and services are complete.

Generate the background and platform integration files.

FILE 1: lib/services/sync_service.dart — Background sync using WorkManager (Android) / BGTaskScheduler (iOS)

Using workmanager package (add to pubspec: workmanager: ^0.5.7):

class SyncService {
  static const _syncTaskName = 'folioBackgroundSync';
  static const _periodicSyncTask = 'folioPeriodicSync';

  Future<void> initialize():
  - Register WorkManager callbackDispatcher
  - Schedule periodic sync: every 15 minutes (minimum interval)
  - Use Workmanager().registerPeriodicTask with BackoffPolicy.exponential

  Future<void> triggerImmediateSync():
  - Register one-time task: Workmanager().registerOneOffTask

  static Future<void> backgroundSyncHandler():
  - Called by WorkManager on background thread
  - Initialize minimal: FlutterSecureStorage, HiveCache, DriveService
  - Get pending uploads from CacheService.getPendingUploads()
  - For each pending: DriveService.uploadFile → CacheService.clearPendingUpload
  - Show local notification on completion

  Future<void> resolveConflict(String fileId):
  - Compare local modifiedTime vs Drive modifiedTime
  - Show conflict resolution notification: "Conflict in [filename] — keep local or keep Drive version?"
}

FILE 2: lib/services/notification_service.dart
Using flutter_local_notifications:

class NotificationService {
  Future<void> initialize()
  Future<void> requestPermission()

  Future<void> showSyncComplete(String filename)
  Future<void> showSyncError(String filename, String error)
  Future<void> showConversionComplete(String filename, String fileId)
  Future<void> showConflict(String filename, String fileId)
  Future<void> showUploadProgress(String filename, int percent)
  Future<void> cancelNotification(int id)
  Future<void> cancelAll()

  // Notification channels (Android):
  // - folio_sync: Sync notifications (importance: low)
  // - folio_conversion: Conversion complete (importance: high)
  // - folio_conflict: Conflicts (importance: max)
}

FILE 3: lib/services/deep_link_service.dart
Using app_links:

class DeepLinkService {
  Future<void> initialize():
  - AppLinks().allUriLinkStream.listen(handleDeepLink)
  - Handle initial link on cold start

  Future<void> handleDeepLink(Uri uri):
  Supported schemes:
  - folio://open?fileId=XXX → navigate to file viewer
  - folio://folder?folderId=XXX → navigate to drive manager at folder
  - folio://scanner → navigate to scanner
  - https://folio.app/share?fileId=XXX → same as folio://open
}

FILE 4: android/app/src/main/res/xml/shortcuts.xml
Android app shortcuts (requires Android 7.1+):
- Recent Files shortcut → folio://home?tab=recent
- New Document shortcut → folio://new-doc
- Scan Document shortcut → folio://scanner
All with proper icons referencing drawable resources.

FILE 5: lib/widgets/home_widget_data_provider.dart
Using home_widget package (add to pubspec: home_widget: ^0.4.1):

class HomeWidgetDataProvider {
  Future<void> updateWidget():
  - Get recent 4 files from cache
  - Serialize to JSON
  - homeWidget.saveWidgetData('recent_files', jsonEncode(files))
  - homeWidget.updateWidget(name: 'FolioWidgetProvider', iOSName: 'FolioWidget')

Android widget receiver:
- FolioWidgetProvider.kt (in android/app/src/main/kotlin)
- RemoteViews with 2×2 grid of recent file items
- Each item: file icon + name (truncated) + tap PendingIntent → deep link

iOS widget (SwiftUI):
- FolioWidget.swift: TimelineProvider + FolioWidgetEntryView
- Shows 4 recent files in a 2×2 grid
- Timeline refresh: every 15 minutes

FILE 6: lib/widgets/global_overlays.dart — App-wide overlay widgets

class FolioApp (wraps MaterialApp):
Stack children:
1. MaterialApp.router (the actual app)
2. BiometricLockOverlay (conditionally shown)
3. GlobalSnackbarListener (listens to snackbar events from providers)
4. NetworkStatusBanner (AnimatedContainer, shows offline banner at top)
5. SyncProgressOverlay (transparent overlay showing active sync dot)

GlobalSnackbarListener:
- Listen to snackbarProvider stream
- Show ScaffoldMessenger.of(context).showSnackBar

NetworkStatusBanner:
- Listen to connectivityProvider
- Animate in amber banner "Working offline" when disconnected
- Animate out when reconnected

FILE 7: lib/screens/audit_log_screen.dart
- List of AuditEntry objects from CacheService.getAuditLog()
- Each entry: icon (opened/edited/deleted/shared) + file name + timestamp + action label
- Grouped by date
- Pull-to-refresh
- "Clear Log" button (confirmation dialog)
- Search/filter

FILE 8: lib/screens/version_history_screen.dart (P2)
- List of last 3 local snapshots before each Drive sync
- Each: timestamp + file size + "Restore" button
- Restore: replace current cache entry, mark as pending upload

Output all files completely. Full Dart code. Production quality.
```

---

## ▌PHASE 12 — Testing, Optimization & Release Configuration

### Prompt 12 — Tests, Performance & Release Config

```
You are finalizing the Flutter "Folio" app. All features are implemented.

Generate the final testing, optimization, and release configuration files.

FILE 1: test/unit/drive_service_test.dart
Complete unit tests for DriveService using mockito:
- Test listFiles with various filters (by type, by folder, recent)
- Test downloadFile with progress events
- Test uploadFile (small file multipart, large file resumable)
- Test rename, move, delete, createFolder
- Test error handling: 401 (token refresh), 429 (exponential backoff), 404
- Test getDriveStorageQuota parsing
- Mock: AuthService (returns test headers), http.Client

FILE 2: test/unit/cache_service_test.dart
- Test cacheFile + getCachedFile (encrypt/decrypt round-trip)
- Test LRU eviction at maxFiles=20
- Test clearAll wipes all data
- Test audit log: logAccess, getAuditLog, clearAuditLog
- Test pending upload queue
- All tests use in-memory Hive (HiveLocalStorage.init with temp directory)

FILE 3: test/widget/home_screen_test.dart
Widget tests using flutter_test + riverpod_test:
- Test file list renders correct number of FileListItem widgets
- Test filter chip selection triggers correct provider method
- Test search debounce
- Test pull-to-refresh triggers loadRecent()
- Test empty state shows when files list is empty
- Test shimmer shows during loading state
- Test FAB expansion and sub-item tap navigation
- Override providers with mock data via ProviderScope(overrides: [...])

FILE 4: test/integration/auth_flow_test.dart
Integration test (integration_test package):
- Full sign-in flow simulation (mock Google Sign-In)
- Verify navigation: auth → home
- Verify file list loads after auth
- Sign-out: verify cache cleared, navigate to auth

FILE 5: lib/core/performance.dart — Performance optimizations

1. IMAGE CACHING: Configure CachedNetworkImage max cache: 50MB, stale: 7 days
2. LIST PERFORMANCE:
   - FileListItem uses const constructors everywhere possible
   - RepaintBoundary wrapper on FileListItem
   - AutomaticKeepAliveClientMixin on tab content to prevent re-renders
3. LAZY LOADING:
   - Editor modules (WordEditorWidget, ExcelViewerWidget etc.) loaded via lazy provider
   - Heavy dependencies (syncfusion, pako) imported lazily
4. COMPUTE ISOLATION:
   All heavy parsing in isolates:
   export Future<DocxDocument> parseDocxInIsolate(List<int> bytes)
   export Future<List<int>> serializeDocxInIsolate(DocxDocument doc)
   export Future<AISummary> parseGeminiResponseInIsolate(String json)
5. MEMORY:
   - Dispose controllers on screen exit (TextEditingController, ScrollController, AnimationController)
   - Clear PDF page cache on low memory (WidgetsBindingObserver.didHaveMemoryPressure)

FILE 6: android/app/build.gradle (complete, release-ready)
- compileSdk: 34, minSdk: 23, targetSdk: 34
- Release signing config (placeholder keystore)
- ProGuard rules for: googleapis, admob, google_sign_in, flutter_secure_storage
- R8 enabled
- ABI splits: armeabi-v7a, arm64-v8a (no x86 for release, reduces APK size)
- Enable shrinkResources + minifyEnabled for release

FILE 7: ios/Podfile (complete)
- platform :ios, '14.0'
- use_frameworks! :linkage => :static (required for Firebase)
- pod configurations for all dependencies
- Post-install hook for deployment target override

FILE 8: android/app/proguard-rules.pro (complete)
ProGuard rules for:
- Google Sign-In, Drive API, Gmail API
- AdMob (keep ad classes)
- Firebase (keep crashlytics, analytics)
- Flutter Secure Storage
- Hive
- WorkManager callback dispatcher (MUST keep)
- Syncfusion (PDF classes)

FILE 9: lib/core/error_handler.dart
Global error handling:
class FolioErrorHandler {
  static void initialize():
  - FlutterError.onError → FirebaseCrashlytics.instance.recordFlutterFatalError
  - PlatformDispatcher.instance.onError → record non-fatal
  - WidgetsFlutterBinding.ensureInitialized().addObserver for memory warnings

  static String getUserFriendlyMessage(Object error):
  - DriveAPIError 401 → "Please sign in again"
  - DriveAPIError 403 → "You don't have permission to access this file"
  - DriveAPIError 404 → "This file no longer exists in your Drive"
  - DriveAPIError 429 → "Too many requests — please wait a moment"
  - SocketException → "No internet connection"
  - TimeoutException → "Request timed out — please try again"
  - Default → "Something went wrong. Please try again."
}

FILE 10: RELEASE_CHECKLIST.md
Complete pre-release checklist:
[ ] Replace all test AdMob ad unit IDs with production IDs
[ ] Set real Gemini API key (or prompt user to enter in Settings)
[ ] Set real Google OAuth Client ID
[ ] Set real Firebase project config (google-services.json, GoogleService-Info.plist)
[ ] Enable ProGuard/R8 in release build
[ ] Generate release keystore and configure signing
[ ] Set FLAG_SECURE for Android (enable screenshot prevention)
[ ] Verify UMP consent dialog shows on first launch
[ ] Test biometric lock on real device (doesn't work on emulator)
[ ] Verify Drive API quota (1M queries/day — apply for increase at 5k+ DAU)
[ ] Apple App Review notes: prepare Drive access justification
[ ] Submit privacy policy URL to app stores
[ ] Configure Firebase Crashlytics alerting
[ ] Test offline mode: airplane mode + open cached file + edit + reconnect + verify sync
[ ] Test conversion flow: DOCX→PDF + interstitial ad + file download
[ ] Test IAP: ad-free purchase + restore purchase
[ ] Verify all deep links (folio://open, folio://scanner)
[ ] Verify home screen widget on Android + iOS
[ ] Run flutter analyze (zero warnings)
[ ] Run flutter test (100% pass rate)
[ ] Build APK: flutter build apk --release --obfuscate --split-debug-info=build/debug-info
[ ] Build AAB: flutter build appbundle --release
[ ] Build IPA: flutter build ipa --release
[ ] Upload to Google Play Internal Testing track
[ ] Upload to TestFlight
[ ] Verify crash reports reach Firebase Crashlytics
[ ] Verify analytics events in Firebase DebugView

Output all files completely. No stubs.
```

---

# ══════════════════════════════════════════
# FINAL MASTER PROMPT — COMPLETE APP REVIEW
# ══════════════════════════════════════════

### FINAL PROMPT — Integration & Consistency Check

```
You are the senior engineer for "Folio" — a Google Drive-native office suite.
The web app (Phases 1–6) and Flutter mobile app (Phases 7–12) are now complete.

Perform a final integration review and generate missing connective tissue.

1. GENERATE: lib/services/file_manager_service.dart
   High-level coordinator that other screens call (facades DriveService + CacheService):

   class FileManagerService {
     Future<void> openFile(String fileId, BuildContext context): full open flow
     Future<void> saveFile(String fileId, List<int> content, String mimeType)
     Future<void> syncFile(String fileId): upload pending changes
     Future<void> syncAllPending(): sync all pending uploads
     Future<void> deleteFile(String fileId, String fileName)
     Future<void> renameFile(String fileId, String newName)
     Future<void> moveFile(String fileId, String newParentId, String oldParentId)
     Future<DriveFile> createNewDocument(String name, String parentId)
     Future<DriveFile> createNewSpreadsheet(String name, String parentId)
     Future<void> shareViaEmail(DriveFile file, BuildContext context)
     Future<void> shareViaLink(DriveFile file, BuildContext context)
     Future<void> makeAvailableOffline(String fileId)
     Future<void> convertFile(String fileId, String sourceMime, String targetMime, BuildContext context)
     Future<void> printFile(String fileId, BuildContext context)
   }

2. GENERATE: Full README.md for the project
   Include: Project overview, Architecture diagram (ASCII), Setup instructions (web + Flutter),
   API configuration (Google Cloud Console steps: enable Drive API, Gmail API, OAuth setup),
   AdMob setup, Firebase setup, Gemini API key setup, Build & Run commands,
   Contributing guidelines, MIT License header.

3. VERIFY & LIST: Any cross-module dependencies that need attention:
   - All import paths consistent
   - All provider dependencies correct
   - No circular imports
   - All GoRouter route names match navigator calls
   - All Hive type IDs unique (no collisions between models)

4. GENERATE: lib/l10n/ — Internationalization setup (English launch + Spanish/French stubs)
   - lib/l10n/app_en.arb: all UI strings (200+ keys)
   - lib/l10n/app_es.arb: Spanish translations
   - lib/l10n/app_fr.arb: French translations
   - lib/l10n/l10n.dart: AppLocalizations setup
   - pubspec.yaml addition: flutter_localizations, intl

5. GENERATE: .github/workflows/ci.yml — GitHub Actions CI pipeline
   - Trigger: push to main, PRs
   - Jobs: flutter analyze, flutter test, build APK (release), build IPA (release)
   - Matrix: ubuntu-latest (Android), macos-latest (iOS)
   - Cache: pub packages, Gradle, CocoaPods
   - Artifacts: upload APK + IPA as workflow artifacts

Output all files completely. This is the final deliverable. Folio is ready for production.
```

---

## 📋 QUICK REFERENCE — Phase Summary

| Phase | Output | Est. Tokens |
|-------|--------|-------------|
| 1A | design-system.css (complete design tokens + components) | ~4,000 |
| 1B | index.html (full app shell, all screens) | ~6,000 |
| 2A | auth.js (Google OAuth + Drive API v3) | ~5,000 |
| 2B | cache.js + files-ui.js | ~6,000 |
| 3A | word-editor.js (DOCX parse/edit/save) | ~6,000 |
| 3B | pdf-viewer.js (PDF.js + annotations) | ~5,000 |
| 3C | excel-viewer.js + ppt-viewer.js + txt-editor.js | ~5,000 |
| 4A | scanner.js (camera + edge detection + OCR + PDF export) | ~5,000 |
| 4B | gmail.js + drive-manager.js | ~5,000 |
| 4C | ai.js + tts.js + security.js + notifications.js | ~6,000 |
| 5A | ads.js (AdSense/AdMob + IAP + consent) | ~4,000 |
| 5B | router.js + app.js + manifest.json + service-worker.js | ~7,000 |
| 6A | animations.css + accessibility.js + analytics.js | ~4,000 |
| 7 | pubspec.yaml + main.dart + router.dart + theme + constants + extensions + AndroidManifest + Info.plist | ~7,000 |
| 8 | auth_service + drive_service + cache_service + models + providers | ~8,000 |
| 9A | splash + onboarding + consent + auth + home + file widgets | ~8,000 |
| 9B | file_viewer + all editors + scanner + email + drive_manager + profile + AI + security screens | ~10,000 |
| 10 | gmail + ai + tts + security + ads + iap + conversion + file_utils services | ~8,000 |
| 11 | sync + notifications + deep_links + home_widget + overlays + audit_log | ~6,000 |
| 12 | tests + performance + build configs + proguard + error handler + release checklist | ~6,000 |
| Final | file_manager_service + README + i18n + CI/CD | ~5,000 |




*Folio Build Prompts v1.0 | Based on Folio PRD v1.0 | MIT License*
*Your Drive. Your Docs. Limitless.*
