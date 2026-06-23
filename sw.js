/**
 * Csy-OS Service Worker
 * 支持：PWA 离线缓存 + Web Push 通知
 */

const CACHE_NAME = 'csy-os-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/icons/icon-96.webp',
  '/icons/icon-192.webp',
  '/icons/icon-256.webp',
  '/icons/icon-512.webp',
];

// ============================================
// 1. 安装事件：缓存静态资源
// ============================================
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // 尝试缓存静态资源，失败也不影响安装
      return cache.addAll(STATIC_ASSETS).catch(function(err) {
        console.warn('Some assets failed to cache:', err);
      });
    }).then(function() {
      // 激活新的 Service Worker
      return self.skipWaiting();
    })
  );
});

// ============================================
// 2. 激活事件：清理旧缓存
// ============================================
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      // 立即控制所有页面
      return self.clients.claim();
    })
  );
});

// ============================================
// 3. Fetch 事件：缓存优先策略（PWA 安装必需）
// ============================================
self.addEventListener('fetch', function(event) {
  // 只处理 GET 请求
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);

  // 跳过非本域请求（如 CDN、外部 API）
  if (url.origin !== self.location.origin) {
    return;
  }

  // 跳过非静态资源请求（如 API 接口）
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
      // 如果有缓存，直接返回
      if (cachedResponse) {
        return cachedResponse;
      }

      // 否则发起网络请求
      return fetch(event.request).then(function(response) {
        // 只缓存成功的响应
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // 克隆响应以便缓存
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(function() {
        // 如果网络请求失败，返回离线页面（可选）
        // 这里简单返回一个空响应
        return new Response('Offline', { status: 503 });
      });
    })
  );
});

// ============================================
// 4. Push 事件：消息推送（保留原有功能）
// ============================================
const APP_NOTIFICATION_NAME = 'Csy-OS';
const DEFAULT_NOTIFICATION_BODY = '发来了一条新消息';
const MAX_NOTIFICATION_BODY_LENGTH = 120;
const MAX_NOTIFICATION_TITLE_LENGTH = 24;
const BILINGUAL_MARKER_RE = /%%\s*BILINGUAL\s*%%/gi;
const URL_RE = /\bhttps?:\/\/[^\s"'<>，。；！？、)）\]]+/gi;
const BARE_DOMAIN_RE = /\b(?:[a-z0-9-]+\.)+(?:com|net|org|dev|app|io|cn|xyz|site|top|me|cc|vip|pages)(?:\/[^\s"'<>，。；！？、)）\]]*)?/gi;
const TECHNICAL_DETAIL_LINE_RE = /^\s*(?:URL|Request URL|Final Request URL|finalRequestURL|Final Base URL|finalBaseURL|Base URL|Endpoint|Response|Trace|Stack)\s*[:：].*$/gim;

function truncateNotificationText(value, maxLength) {
  if (value.length <= maxLength) return value;
  return value.slice(0, Math.max(0, maxLength - 1)).trimEnd() + '…';
}

function formatNotificationTitle(title) {
  const normalized = String(title || '')
    .replace(URL_RE, '')
    .replace(BARE_DOMAIN_RE, '')
    .replace(/<[^>\n]{1,80}>/g, '')
    .replace(/[·•|｜]+$/g, '')
    .trim();

  if (!normalized || /^CSY-Sully\s*OS$/i.test(normalized) || /^CSY-SullyOS$/i.test(normalized)) {
    return APP_NOTIFICATION_NAME;
  }

  if (normalized === APP_NOTIFICATION_NAME || /来消息了|发来消息|发来了一条消息/.test(normalized)) {
    return truncateNotificationText(normalized, MAX_NOTIFICATION_TITLE_LENGTH);
  }

  return truncateNotificationText(normalized + ' 来消息了', MAX_NOTIFICATION_TITLE_LENGTH);
}

function normalizeVoicePreview(value) {
  const durationMatch = value.match(/[【\[]语音(?:消息)?[：:]\s*\d+\s*(?:秒|s|sec)?[】\]]\s*["“”「『]?([\s\S]*?)["“”」』]?\s*$/);
  if (durationMatch && durationMatch[1] && durationMatch[1].trim()) {
    return '语音消息：' + durationMatch[1].trim();
  }

  const wrappedMatch = value.match(/^[\s\S]*?[【\[]语音(?:消息)?[：:]\s*([\s\S]+?)\s*[】\]][\s\S]*$/);
  if (wrappedMatch && wrappedMatch[1] && wrappedMatch[1].trim()) {
    return '语音消息：' + wrappedMatch[1].trim();
  }

  const xmlMatch = value.match(/<语音>([\s\S]+?)<\/语音>/i);
  if (xmlMatch && xmlMatch[1] && xmlMatch[1].trim()) {
    return '语音消息：' + xmlMatch[1].trim();
  }

  return value;
}

function normalizeEmojiPreview(value) {
  const sendEmojiMatch = value.match(/\[\[SEND_EMOJI:\s*([^\]]+?)\s*\]\]/i);
  if (sendEmojiMatch && sendEmojiMatch[1] && sendEmojiMatch[1].trim()) {
    return '发来一个表情：' + sendEmojiMatch[1].trim();
  }
  return value;
}

function formatNotificationBody(content) {
  let normalized = String(content || '')
    .replace(BILINGUAL_MARKER_RE, '\n')
    .replace(/\r\n?/g, '\n')
    .trim();

  normalized = normalizeEmojiPreview(normalized);
  normalized = normalizeVoicePreview(normalized);

  normalized = normalized
    .replace(TECHNICAL_DETAIL_LINE_RE, '\n')
    .replace(URL_RE, '')
    .replace(BARE_DOMAIN_RE, '')
    .replace(/<\/?(?:翻译|原文|译文|语音|think|thinking|reasoning)[^>]*>/gi, '\n')
    .replace(/<[^>\n]{1,80}>/g, '\n')
    .replace(/[`*_~#>]+/g, '')
    .split('\n')
    .map(function(line) { return line.trim(); })
    .filter(Boolean)
    .join(' ')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s+([，。；！？、,.!?;:])/g, '$1')
    .trim();

  return truncateNotificationText(normalized || DEFAULT_NOTIFICATION_BODY, MAX_NOTIFICATION_BODY_LENGTH);
}

self.addEventListener('push', function(event) {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const payloadData = data.data && typeof data.data === 'object' ? data.data : {};
    const charId = payloadData.charId || '';
    const bubbleIndex = payloadData.bubbleIndex || 0;

    const options = {
      body: formatNotificationBody(data.body),
      icon: data.icon || '/icons/icon-192.webp',
      badge: data.badge || '/icons/icon-96.webp',
      tag: `msg-${charId}-${Date.now()}-${bubbleIndex}`,
      data: Object.assign({}, payloadData, { charId }),
      vibrate: [200, 100, 200],
      requireInteraction: false,
      renotify: true,
    };

    event.waitUntil(
      self.registration.showNotification(formatNotificationTitle(data.title), options)
    );
  } catch (err) {
    event.waitUntil(
      self.registration.showNotification(APP_NOTIFICATION_NAME, {
        body: formatNotificationBody(event.data.text()),
        icon: '/icons/icon-192.webp',
      })
    );
  }
});

// ============================================
// 5. Notification Click 事件：处理点击通知
// ============================================
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const charId = event.notification.data?.charId || '';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clients) {
      if (clients.length > 0) {
        var target = null;
        for (var i = 0; i < clients.length; i++) {
          if (clients[i].focused) {
            target = clients[i];
            break;
          }
        }
        if (!target) target = clients[0];

        target.postMessage({
          type: 'NOTIFICATION_CLICK',
          charId: charId,
        });
        return target.focus();
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow(
          self.location.origin + '/?notif_charId=' + encodeURIComponent(charId)
        );
      }
    })
  );
});
