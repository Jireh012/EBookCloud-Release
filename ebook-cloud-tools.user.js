// ==UserScript==
// @name         EBookCloudTools
// @namespace    https://github.com/Jireh012/EBookCloud
// @version      1.0.67
// @description  EBookCloud 平台工具：书库查重、账户导入、Cookie 更新
// @homepageURL  https://github.com/Jireh012/EBookCloud
// @supportURL   https://github.com/Jireh012/EBookCloud/issues
// @downloadURL  https://github.com/Jireh012/EBookCloud-Release/raw/main/ebook-cloud-tools.user.js
// @updateURL    https://github.com/Jireh012/EBookCloud-Release/raw/main/ebook-cloud-tools.user.js
// @match        *://endao.co/*
// @match        *://*.endao.co/*
// @match        *://endaoinhim.shop/*
// @match        *://*.endaoinhim.shop/*
// @match        *://edread.cc/*
// @match        *://*.edread.cc/*
// @match        *://wdbook.com/*
// @match        *://*.wdbook.com/*
// @match        *://readmoo.com/*
// @match        *://*.readmoo.com/*
// @match        *://pubu.com.tw/*
// @match        *://*.pubu.com.tw/*
// @match        *://kobo.com/*
// @match        *://*.kobo.com/*
// @match        *://books.com.tw/*
// @match        *://*.books.com.tw/*
// @match        *://kingstone.com.tw/*
// @match        *://*.kingstone.com.tw/*
// @match        *://play.google.com/books*
// @match        *://play.google.com/store/books*
// @match        *://*.play.google.com/books*
// @match        *://*.play.google.com/store/books*
// @match        *://books.google.com/*
// @match        *://*.books.google.com/*
// @match        *://amazon.com/*
// @match        *://*.amazon.com/*
// @match        *://amazon.cn/*
// @match        *://*.amazon.cn/*
// @match        *://amazon.co.jp/*
// @match        *://*.amazon.co.jp/*
// @match        *://amazon.com.tw/*
// @match        *://*.amazon.com.tw/*
// @match        *://amazon.co.uk/*
// @match        *://*.amazon.co.uk/*
// @match        *://amazon.de/*
// @match        *://*.amazon.de/*
// @match        *://amazon.fr/*
// @match        *://*.amazon.fr/*
// @match        *://amazon.es/*
// @match        *://*.amazon.es/*
// @match        *://amazon.it/*
// @match        *://*.amazon.it/*
// @match        *://amazon.ca/*
// @match        *://*.amazon.ca/*
// @match        *://amazon.com.au/*
// @match        *://*.amazon.com.au/*
// @match        *://amazon.nl/*
// @match        *://*.amazon.nl/*
// @match        *://amazon.se/*
// @match        *://*.amazon.se/*
// @match        *://amazon.pl/*
// @match        *://*.amazon.pl/*
// @match        *://amazon.in/*
// @match        *://*.amazon.in/*
// @match        *://amazon.sg/*
// @match        *://*.amazon.sg/*
// @match        *://amazon.com.mx/*
// @match        *://*.amazon.com.mx/*
// @match        *://amazon.com.be/*
// @match        *://*.amazon.com.be/*
// @include      /^https?:\/\/([^/?#]*\.)*(endao[a-z0-9-]*|edread)(\.[a-z0-9.-]+)+(:\d+)?([/?#]|$)/i
// @exclude      *://read.amazon.com/*
// @exclude      *://read.amazon.cn/*
// @exclude      *://read.amazon.co.jp/*
// @connect      *
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_cookie
// @grant        GM_registerMenuCommand
// @grant        GM_addElement
// @run-at       document-idle
// ==/UserScript==

"use strict";
(() => {
  // public/content.css
  var content_default = '.ebook-cloud-badge {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  z-index: 2147483646;\n  padding: 2px 8px;\n  border-radius: 999px;\n  font: 12px/1.4 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\n  color: #fff;\n  pointer-events: none;\n}\n\n.ebook-cloud-badge.ebook-cloud-badge--inline {\n  position: static !important;\n  display: inline-flex;\n  align-items: center;\n  width: max-content;\n  max-width: max-content;\n  flex: 0 0 auto;\n  align-self: flex-start;\n  white-space: nowrap;\n  box-sizing: border-box;\n  margin: 0 0 0 6px;\n  padding: 1px 6px;\n  font-size: 11px;\n  line-height: 1.3;\n  vertical-align: middle;\n  top: auto;\n  right: auto;\n}\n\n.ebook-cloud-badge.ebook-cloud-badge--detail {\n  align-self: center;\n  margin: 0 0 0 10px;\n  padding: 3px 10px;\n  font-size: 14px;\n  font-weight: 600;\n}\n\n.ebook-cloud-title-host {\n  display: block !important;\n  height: auto !important;\n  max-height: none !important;\n  min-height: 0 !important;\n  overflow: visible !important;\n  text-overflow: unset !important;\n  -webkit-line-clamp: unset !important;\n  -webkit-box-orient: unset !important;\n}\n\n.ebook-cloud-badge--high,\n.ebook-cloud-banner--high,\n.ebook-cloud-cart-hint--high {\n  background: #0f766e;\n}\n\n.ebook-cloud-badge--possible,\n.ebook-cloud-banner--possible,\n.ebook-cloud-cart-hint--possible {\n  background: #b45309;\n}\n\n.ebook-cloud-banner,\n.ebook-cloud-toast {\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  z-index: 2147483647;\n  padding: 10px 16px;\n  font: 14px/1.4 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\n  color: #fff;\n}\n\n.ebook-cloud-toast {\n  background: #b45309;\n}\n\n.ebook-cloud-cart-hint {\n  display: none;\n}\n\n.ebook-cloud-cart-drawer {\n  position: fixed;\n  top: 96px;\n  right: 0;\n  z-index: 2147483645;\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  font: 13px/1.45 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\n  color: #fff;\n  pointer-events: none;\n}\n\n.ebook-cloud-cart-drawer__tab,\n.ebook-cloud-cart-drawer__panel,\n.ebook-cloud-cart-drawer__close {\n  pointer-events: auto;\n}\n\n.ebook-cloud-cart-drawer__tab {\n  writing-mode: vertical-rl;\n  letter-spacing: 0.12em;\n  border: 0;\n  border-radius: 8px 0 0 8px;\n  padding: 12px 8px;\n  background: #0f766e;\n  color: #fff;\n  font: inherit;\n  cursor: pointer;\n}\n\n.ebook-cloud-cart-drawer__panel {\n  width: 260px;\n  max-height: calc(100vh - 120px);\n  overflow: auto;\n  background: #0f766e;\n  border-radius: 8px 0 0 8px;\n  padding: 12px 14px 14px;\n  box-shadow: -6px 4px 20px rgba(0, 0, 0, 0.18);\n}\n\n.ebook-cloud-cart-drawer.is-collapsed .ebook-cloud-cart-drawer__panel {\n  display: none;\n}\n\n.ebook-cloud-cart-drawer:not(.is-collapsed) .ebook-cloud-cart-drawer__tab {\n  display: none;\n}\n\n.ebook-cloud-cart-drawer__head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 8px;\n  font-weight: 600;\n}\n\n.ebook-cloud-cart-drawer__close {\n  border: 0;\n  background: transparent;\n  color: #fff;\n  font-size: 18px;\n  line-height: 1;\n  cursor: pointer;\n  padding: 0 2px;\n}\n\n.ebook-cloud-cart-drawer__list {\n  margin: 0;\n  padding-left: 18px;\n}\n\n.ebook-cloud-cart-drawer__list li + li {\n  margin-top: 6px;\n}\n';

  // src/shared/client.ts
  var sendImpl = null;
  var runtimeKind = "extension";
  function isUserscriptRuntime() {
    return runtimeKind === "userscript";
  }
  function installChromeClient() {
    runtimeKind = "extension";
    sendImpl = (message) => new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, (response) => {
        const lastError = chrome.runtime.lastError;
        if (lastError) reject(new Error(lastError.message));
        else resolve(response);
      });
    });
  }
  function installLocalClient(dispatch) {
    runtimeKind = "userscript";
    sendImpl = dispatch;
  }
  async function send(message) {
    if (!sendImpl) installChromeClient();
    return sendImpl(message);
  }

  // src/shared/hosts.ts
  var AMAZON_HOST_SUFFIXES = [
    "amazon.com",
    "amazon.cn",
    "amazon.co.jp",
    "amazon.com.tw",
    "amazon.co.uk",
    "amazon.de",
    "amazon.fr",
    "amazon.es",
    "amazon.it",
    "amazon.ca",
    "amazon.com.au",
    "amazon.nl",
    "amazon.se",
    "amazon.pl",
    "amazon.in",
    "amazon.sg",
    "amazon.com.mx",
    "amazon.com.be"
  ];
  var ENDAO_HOST_SUFFIXES = ["endao.co", "endaoinhim.shop", "edread.cc"];
  function hostEndsWith(host, suffix) {
    return host === suffix || host.endsWith(`.${suffix}`);
  }
  function looksLikeEndaoHost(host) {
    const hostname = host.toLowerCase();
    if (ENDAO_HOST_SUFFIXES.some((suffix) => hostEndsWith(hostname, suffix))) return true;
    return hostname.split(".").some((label) => label.startsWith("endao") || label === "edread");
  }
  function isEndaoShopPath(pathname) {
    return /\/(?:[a-z]{2}(?:-[A-Z]{2})?\/)?(?:book\/\d+|all-books|free-books|my-cart|my-wishes|my-orders|my-center|cart)(?:\/|$)/i.test(
      pathname
    );
  }
  function looksLikeEndaoSiteName(text) {
    const value = text.replace(/\s+/g, " ").trim();
    if (!value) return false;
    if (/恩道/.test(value)) return true;
    return /inspirata/i.test(value) && /ebook/i.test(value);
  }
  function elementInnerText(node) {
    if (!node || !("innerText" in node)) return "";
    const text = node.innerText;
    return typeof text === "string" ? text.slice(0, 400) : "";
  }
  function collectPageSiteName(doc) {
    return [
      doc.title,
      doc.querySelector('meta[property="og:site_name"]')?.getAttribute("content"),
      doc.querySelector('meta[name="application-name"]')?.getAttribute("content"),
      doc.querySelector('meta[name="apple-mobile-web-app-title"]')?.getAttribute("content"),
      elementInnerText(doc.querySelector("header, [class*='header' i], #header, nav"))
    ].filter(Boolean).join(" ");
  }
  function looksLikeEndaoShopPage(url, doc) {
    if (looksLikeEndaoHost(url.hostname)) return true;
    if (!looksLikeEndaoSiteName(collectPageSiteName(doc))) return false;
    return isEndaoShopPath(url.pathname) || Boolean(doc.querySelector('a[href*="/book/"]'));
  }
  function detectPlatform(url, doc) {
    const host = url.hostname.toLowerCase();
    if (host.startsWith("read.amazon.")) return null;
    if (looksLikeEndaoHost(host) || doc && looksLikeEndaoShopPage(url, doc)) return "ENDAO";
    if (hostEndsWith(host, "wdbook.com")) return "WDBOOK";
    if (hostEndsWith(host, "readmoo.com")) return "READMOO";
    if (hostEndsWith(host, "pubu.com.tw")) return "PUBU";
    if (hostEndsWith(host, "kobo.com")) return "KOBO";
    if (hostEndsWith(host, "books.com.tw")) return "BOOKSTW";
    if (hostEndsWith(host, "kingstone.com.tw")) return "KINGSTONE";
    if (hostEndsWith(host, "play.google.com") || hostEndsWith(host, "books.google.com")) return "GOOGLEBOOKS";
    if (AMAZON_HOST_SUFFIXES.some((suffix) => hostEndsWith(host, suffix))) return "AMAZON";
    return null;
  }
  function isCartPath(pathname) {
    return /\/((?:my-)?cart|shopping[-_]?cart|shoppingcart|checkout|basket|bag)(\/|$)/i.test(pathname);
  }
  function readmooCheckoutTab(hash) {
    const value = hash.replace(/^#/, "").toLowerCase();
    if (value === "wishlist" || value === "wish") return "wishlist";
    if (value === "recent" || value === "recently" || value === "history") return "recent";
    return "cart";
  }
  function isReadmooCheckoutHref(url) {
    return hostEndsWith(url.hostname.toLowerCase(), "readmoo.com") && isCartPath(url.pathname);
  }
  function isPubuCartHref(url) {
    return hostEndsWith(url.hostname.toLowerCase(), "pubu.com.tw") && isCartPath(url.pathname);
  }
  function isKoboCartHref(url) {
    return hostEndsWith(url.hostname.toLowerCase(), "kobo.com") && isCartPath(url.pathname);
  }
  function isBookstwCartPath(pathname) {
    if (isCartPath(pathname)) return true;
    return /\/(?:shopping\/)?cart_list(?:\.php)?(?:\/|$)/i.test(pathname) || /\/(?:shopping\/)?next_?buy/i.test(pathname);
  }
  function isBookstwCartHref(url) {
    const host = url.hostname.toLowerCase();
    if (!hostEndsWith(host, "books.com.tw")) return false;
    if (host === "cart.books.com.tw" || host.endsWith(".cart.books.com.tw")) return true;
    return isBookstwCartPath(url.pathname);
  }
  function isKingstoneCartPath(pathname) {
    if (isCartPath(pathname)) return true;
    return /\/(?:shopping\/)?cart(?:\.php)?(?:\/|$)/i.test(pathname) || /\/my\/cart/i.test(pathname) || /\/checkout/i.test(pathname);
  }
  function isKingstoneCartHref(url) {
    const host = url.hostname.toLowerCase();
    if (!hostEndsWith(host, "kingstone.com.tw")) return false;
    if (host === "cart.kingstone.com.tw" || host.endsWith(".cart.kingstone.com.tw")) return true;
    return isKingstoneCartPath(url.pathname);
  }
  function isGooglebooksCartHref(_url) {
    return false;
  }
  function isUnstableCartHref(url) {
    return isReadmooCheckoutHref(url) || isPubuCartHref(url) || isKoboCartHref(url);
  }
  function readmooCheckoutOwnedLabel(tab, count) {
    if (tab === "wishlist") return `\u5F85\u8D2D\u4E2D ${count} \u672C\u5DF2\u5728\u4E66\u5E93`;
    if (tab === "recent") return `\u6700\u8FD1\u6D4F\u89C8\u4E2D ${count} \u672C\u5DF2\u5728\u4E66\u5E93`;
    return `\u8D2D\u7269\u8F66\u4E2D ${count} \u672C\u5DF2\u5728\u4E66\u5E93`;
  }
  function isPubuHost(hostname) {
    return hostEndsWith(hostname.toLowerCase(), "pubu.com.tw");
  }
  function isKoboHost(hostname) {
    return hostEndsWith(hostname.toLowerCase(), "kobo.com");
  }
  function isBookstwHost(hostname) {
    return hostEndsWith(hostname.toLowerCase(), "books.com.tw");
  }
  function isKingstoneHost(hostname) {
    return hostEndsWith(hostname.toLowerCase(), "kingstone.com.tw");
  }
  function defaultCartDrawerMount(hostname) {
    const host = hostname.toLowerCase();
    return isPubuHost(host) || isKoboHost(host) || isBookstwHost(host) || isKingstoneHost(host) ? "body" : "html";
  }
  function otherCartDrawerMount(mount) {
    return mount === "html" ? "body" : "html";
  }
  function nextCartDrawerMount(hostname, current) {
    const next = otherCartDrawerMount(current);
    if (isPubuHost(hostname) && next === "html") return null;
    if (isBookstwHost(hostname) && next === "html") return null;
    if (isKingstoneHost(hostname) && next === "html") return null;
    return next;
  }

  // src/shared/io.ts
  function defaultApiBaseUrl() {
    return "http://localhost:3000";
  }
  function normalizeApiBaseUrl(value) {
    return value.trim().replace(/\/+$/, "");
  }
  function headersToRecord(headers) {
    if (!headers) return {};
    if (headers instanceof Headers) {
      const out = {};
      headers.forEach((value, key) => {
        out[key] = value;
      });
      return out;
    }
    if (Array.isArray(headers)) return Object.fromEntries(headers);
    return { ...headers };
  }
  function asAuthUser(value) {
    if (!value || typeof value !== "object") return null;
    const user = value;
    if (typeof user.id !== "number" || typeof user.email !== "string") return null;
    return {
      id: user.id,
      username: typeof user.username === "string" ? user.username : "",
      email: user.email,
      role: typeof user.role === "string" ? user.role : ""
    };
  }

  // src/shared/types.ts
  var ACCOUNT_IMPORT_PLATFORMS = /* @__PURE__ */ new Set([
    "WDBOOK",
    "READMOO",
    "PUBU",
    "BOOKSTW",
    "KINGSTONE",
    "GOOGLEBOOKS"
  ]);
  function isAccountImportPlatform(platform) {
    return platform !== null && ACCOUNT_IMPORT_PLATFORMS.has(platform);
  }
  function accountImportPath(platform) {
    if (platform === "WDBOOK") return "/api/wdbook/accounts/import";
    return `/api/${platform.toLowerCase()}/accounts/import-cookies`;
  }
  function accountListPath(platform) {
    return `/api/${platform.toLowerCase()}/accounts`;
  }
  var PLATFORM_LABELS = {
    ENDAO: "\u6069\u9053",
    WDBOOK: "\u5FAE\u8BFB",
    READMOO: "\u8BFB\u58A8",
    PUBU: "Pubu",
    KOBO: "Kobo",
    AMAZON: "Amazon",
    BOOKSTW: "\u535A\u5BA2\u6765",
    KINGSTONE: "\u91D1\u77F3\u5802",
    GOOGLEBOOKS: "\u8C37\u6B4C\u56FE\u4E66",
    OTHER: "\u5176\u4ED6"
  };
  var LOOKUP_BATCH_SIZE = 50;
  var LOOKUP_CACHE_TTL_MS = 8 * 60 * 1e3;
  var LOOKUP_FIELD_LIMITS = {
    clientKey: 256,
    platformBookId: 128,
    platformVersion: 128,
    isbn: 32,
    eisbn: 32,
    title: 512,
    author: 512
  };

  // src/shared/session.ts
  var LOOKUP_PERMISSION_CACHE_MS = 5 * 60 * 1e3;
  var LOOKUP_UNAUTH_EXTENSION = "\u8BF7\u5148\u5728\u63D2\u4EF6\u4E2D\u767B\u5F55 EBookCloud";
  var LOOKUP_UNAUTH_USERSCRIPT = "\u8BF7\u5148\u5728 EBookCloudTools \u9762\u677F\u767B\u5F55";
  var BOOKSTW_COOKIE_ORIGINS = [
    "https://appapi-ebook.books.com.tw/",
    "https://viewer-ebook.books.com.tw/",
    "https://www.books.com.tw/",
    "https://cart.books.com.tw/"
  ];
  function isBookstwHostUrl(url) {
    try {
      return /(^|\.)books\.com\.tw$/i.test(new URL(url).hostname);
    } catch {
      return false;
    }
  }
  function isGuestCmsValue(value) {
    let decoded = value.trim();
    try {
      decoded = decodeURIComponent(decoded);
    } catch {
    }
    return /guest|anonymous|訪客|游客/i.test(decoded);
  }
  function cmsTokenRank(cookie) {
    if (cookie.name.toLowerCase() !== "cmstoken") return 0;
    return isGuestCmsValue(cookie.value) ? 0 : 1;
  }
  function dedupeCookiesByName(cookies) {
    const best = /* @__PURE__ */ new Map();
    const order = [];
    for (const cookie of cookies) {
      const key = cookie.name.toLowerCase();
      if (!cookie.name) continue;
      const prev = best.get(key);
      if (!prev) {
        best.set(key, cookie);
        order.push(key);
        continue;
      }
      if (cmsTokenRank(cookie) > cmsTokenRank(prev)) best.set(key, cookie);
    }
    return order.map((key) => best.get(key));
  }
  function mergeCookiePairs(primary, extra) {
    const merged = [...primary];
    const index = new Map(merged.map((cookie, i) => [cookie.name.toLowerCase(), i]));
    for (const cookie of extra) {
      const key = cookie.name.toLowerCase();
      if (!cookie.name) continue;
      const at = index.get(key);
      if (at === void 0) {
        index.set(key, merged.length);
        merged.push(cookie);
        continue;
      }
      if (cmsTokenRank(cookie) > cmsTokenRank(merged[at])) merged[at] = cookie;
    }
    return merged;
  }
  function activeTabFromUrl(href, doc) {
    try {
      const url = new URL(href);
      const platform = detectPlatform(url, doc);
      return { ok: true, url: href, tabId: null, platform };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
  function createSession(options) {
    const { io, runtimeKind: runtimeKind2 } = options;
    const lookupCache = /* @__PURE__ */ new Map();
    let lookupPermissionCache = null;
    async function readSession() {
      const stored = await io.get(["apiBaseUrl", "token", "user"]);
      return {
        apiBaseUrl: normalizeApiBaseUrl(String(stored.apiBaseUrl || defaultApiBaseUrl())),
        token: String(stored.token || ""),
        user: asAuthUser(stored.user)
      };
    }
    async function clearAuth() {
      await io.remove(["token", "user"]);
    }
    function readError(res) {
      const body = res.json;
      if (body && typeof body.error === "string" && body.error) {
        return { error: body.error, code: body.code };
      }
      return { error: `\u8BF7\u6C42\u5931\u8D25 (${res.status})`, code: body?.code };
    }
    async function apiFetchJson(path, init = {}) {
      const session = await readSession();
      const headers = new Headers(init.headers);
      headers.set("Content-Type", "application/json");
      if (session.token) headers.set("Authorization", `Bearer ${session.token}`);
      return io.fetchJson(`${session.apiBaseUrl}${path}`, { ...init, headers });
    }
    async function fetchFeatures() {
      const res = await apiFetchJson("/api/system/features");
      if (res.status === 401) {
        await clearAuth();
        return { platformToolsAccess: null, bookLookupAllowed: null, error: "\u767B\u5F55\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55" };
      }
      if (!res.ok) {
        const err = readError(res);
        return { platformToolsAccess: null, bookLookupAllowed: null, error: err.error };
      }
      const body = res.json;
      return {
        platformToolsAccess: Boolean(body?.features?.platformToolsAccess),
        bookLookupAllowed: body?.features?.bookLookupAllowed == null ? null : Boolean(body.features?.bookLookupAllowed),
        error: null
      };
    }
    async function checkBookLookupAllowed() {
      const now = Date.now();
      if (lookupPermissionCache && now - lookupPermissionCache.fetchedAt < LOOKUP_PERMISSION_CACHE_MS) {
        return lookupPermissionCache.allowed;
      }
      const features = await fetchFeatures();
      if (features.error) {
        return true;
      }
      const allowed = features.bookLookupAllowed !== false;
      lookupPermissionCache = { allowed, fetchedAt: now };
      return allowed;
    }
    async function handleStatus() {
      const session = await readSession();
      if (!session.token) {
        return {
          ok: true,
          apiBaseUrl: session.apiBaseUrl,
          signedIn: false,
          user: null,
          platformToolsAccess: null,
          bookLookupAllowed: null,
          error: null
        };
      }
      const features = await fetchFeatures();
      return {
        ok: true,
        apiBaseUrl: session.apiBaseUrl,
        signedIn: !features.error,
        user: features.error ? null : session.user,
        platformToolsAccess: features.platformToolsAccess,
        bookLookupAllowed: features.bookLookupAllowed,
        error: features.error
      };
    }
    async function handleLogin(apiBaseUrl, email, password) {
      const base = normalizeApiBaseUrl(apiBaseUrl || defaultApiBaseUrl());
      await io.set({ apiBaseUrl: base });
      const res = await io.fetchJson(`${base}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const err = readError(res);
        return { ok: false, error: err.error };
      }
      const body = res.json;
      if (!body?.token || !body.user) {
        return { ok: false, error: "\u767B\u5F55\u54CD\u5E94\u65E0\u6548" };
      }
      await io.set({ token: body.token, user: body.user });
      const features = await fetchFeatures();
      if (features.error) return { ok: false, error: features.error };
      const bookLookupAllowed = features.bookLookupAllowed !== false;
      lookupPermissionCache = { allowed: bookLookupAllowed, fetchedAt: Date.now() };
      if (!features.platformToolsAccess && !bookLookupAllowed) {
        return {
          ok: false,
          error: "\u5C1A\u672A\u5F00\u901A\u7535\u5B50\u4E66\u5E73\u53F0\u5DE5\u5177\uFF0C\u4E66\u5E93\u67E5\u91CD\u4E5F\u65E0\u6743\u9650\uFF0C\u8BF7\u5148\u7533\u8BF7\u6743\u9650",
          code: "PLATFORM_TOOLS_ACCESS_DENIED"
        };
      }
      return { ok: true, user: body.user, platformToolsAccess: true, bookLookupAllowed };
    }
    async function handleLogout() {
      lookupPermissionCache = null;
      await clearAuth();
      return { ok: true };
    }
    function clipField(value, max) {
      const text = value?.trim();
      if (!text) return void 0;
      return text.length <= max ? text : text.slice(0, max);
    }
    function sanitizeLookupItem(item) {
      const clientKey = clipField(item.clientKey, LOOKUP_FIELD_LIMITS.clientKey);
      if (!clientKey) return null;
      const platformBookId = clipField(item.platformBookId, LOOKUP_FIELD_LIMITS.platformBookId);
      const isbn = clipField(item.isbn, LOOKUP_FIELD_LIMITS.isbn);
      const eisbn = clipField(item.eisbn, LOOKUP_FIELD_LIMITS.eisbn);
      const title = clipField(item.title, LOOKUP_FIELD_LIMITS.title);
      if (!platformBookId && !isbn && !eisbn && !title) return null;
      return {
        clientKey,
        platform: item.platform,
        platformBookId,
        platformVersion: clipField(item.platformVersion, LOOKUP_FIELD_LIMITS.platformVersion),
        isbn,
        eisbn,
        title,
        author: clipField(item.author, LOOKUP_FIELD_LIMITS.author)
      };
    }
    function cacheKey(item) {
      return JSON.stringify({
        platform: item.platform,
        platformBookId: item.platformBookId ?? "",
        platformVersion: item.platformVersion ?? "",
        isbn: item.isbn ?? "",
        eisbn: item.eisbn ?? "",
        title: item.title ?? "",
        author: item.author ?? ""
      });
    }
    async function lookupBatch(items) {
      const res = await apiFetchJson("/api/book-library/lookup", {
        method: "POST",
        body: JSON.stringify({ items })
      });
      if (res.status === 401) {
        await clearAuth();
        throw Object.assign(new Error("\u767B\u5F55\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55"), { code: "UNAUTHENTICATED" });
      }
      if (res.status === 403) {
        const err = readError(res);
        if (err.code === "LOOKUP_PERMISSION_DENIED") lookupPermissionCache = null;
        throw Object.assign(new Error(err.error), { code: err.code || "PLATFORM_TOOLS_ACCESS_DENIED" });
      }
      if (!res.ok) {
        const err = readError(res);
        throw new Error(err.error);
      }
      const body = res.json;
      return body?.results ?? [];
    }
    async function handleLookup(items) {
      const session = await readSession();
      if (!session.token) {
        return {
          ok: false,
          error: runtimeKind2 === "userscript" ? LOOKUP_UNAUTH_USERSCRIPT : LOOKUP_UNAUTH_EXTENSION,
          code: "UNAUTHENTICATED"
        };
      }
      const allowed = await checkBookLookupAllowed();
      if (!allowed) {
        return {
          ok: false,
          error: "\u5F53\u524D\u8D26\u53F7\u65E0\u4E66\u5E93\u67E5\u91CD\u6743\u9650\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458\u5F00\u901A",
          code: "LOOKUP_PERMISSION_DENIED"
        };
      }
      const sanitized = items.map(sanitizeLookupItem).filter((item) => Boolean(item));
      if (!sanitized.length) {
        return { ok: true, results: [] };
      }
      const now = Date.now();
      const pending = [];
      const cached2 = /* @__PURE__ */ new Map();
      for (const item of sanitized) {
        const key = cacheKey(item);
        const hit = lookupCache.get(key);
        if (hit && hit.expires > now) {
          cached2.set(item.clientKey, { ...hit.result, clientKey: item.clientKey });
        } else {
          pending.push(item);
        }
      }
      try {
        for (let i = 0; i < pending.length; i += LOOKUP_BATCH_SIZE) {
          const batch = pending.slice(i, i + LOOKUP_BATCH_SIZE);
          const results = await lookupBatch(batch);
          for (const result of results) {
            const source = batch.find((item) => item.clientKey === result.clientKey);
            if (source) {
              lookupCache.set(cacheKey(source), { expires: now + LOOKUP_CACHE_TTL_MS, result });
            }
            cached2.set(result.clientKey, result);
          }
        }
        return { ok: true, results: sanitized.map((item) => cached2.get(item.clientKey)).filter(Boolean) };
      } catch (error) {
        const err = error;
        return { ok: false, error: err.message, code: err.code };
      }
    }
    function summarizeAccount(raw) {
      const id = Number(raw.id);
      const label = String(raw.nickname || raw.email || raw.wdbookUserId || raw.readmooUserId || raw.pubuUserId || raw.bookstwUserId || "").trim() || `\u8D26\u53F7 #${id}`;
      return { id, label, isDefault: Boolean(raw.isDefault) };
    }
    async function handleReadCookies(url) {
      if (!url || !/^https?:\/\//i.test(url)) {
        return { ok: false, error: "\u5F53\u524D\u6807\u7B7E\u9875\u5730\u5740\u65E0\u6548\uFF0C\u65E0\u6CD5\u8BFB\u53D6 Cookie" };
      }
      try {
        let cookies = await io.readCookies(url);
        if (isBookstwHostUrl(url)) {
          for (const origin of BOOKSTW_COOKIE_ORIGINS) {
            if (url.startsWith(origin)) continue;
            try {
              cookies = mergeCookiePairs(cookies, await io.readCookies(origin));
            } catch {
            }
          }
          if (io.readPageSession) {
            try {
              cookies = mergeCookiePairs(cookies, await io.readPageSession(url));
            } catch {
            }
          }
        }
        cookies = dedupeCookiesByName(cookies);
        if (!cookies.length) {
          return { ok: false, error: "\u672A\u80FD\u8BFB\u53D6\u5230\u8BE5\u7F51\u7AD9\u7684 Cookie\uFF0C\u8BF7\u786E\u8BA4\u5DF2\u767B\u5F55\u8BE5\u5E73\u53F0" };
        }
        const header = cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
        return { ok: true, count: cookies.length, header };
      } catch (error) {
        return { ok: false, error: error.message };
      }
    }
    async function handleListAccounts(platform) {
      if (!isAccountImportPlatform(platform)) {
        return { ok: false, error: "\u8BE5\u5E73\u53F0\u6682\u4E0D\u652F\u6301\u4E00\u952E\u5BFC\u5165\u8D26\u53F7" };
      }
      const res = await apiFetchJson(accountListPath(platform));
      if (res.status === 401) {
        await clearAuth();
        return { ok: false, error: "\u767B\u5F55\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55", code: "UNAUTHENTICATED" };
      }
      if (!res.ok) {
        const err = readError(res);
        return { ok: false, error: err.error };
      }
      const body = res.json;
      return { ok: true, accounts: (body?.accounts ?? []).map(summarizeAccount) };
    }
    async function handleImportAccount(platform, cookies, accountId) {
      if (!isAccountImportPlatform(platform)) {
        return { ok: false, error: "\u8BE5\u5E73\u53F0\u6682\u4E0D\u652F\u6301\u4E00\u952E\u5BFC\u5165\u8D26\u53F7" };
      }
      const res = await apiFetchJson(accountImportPath(platform), {
        method: "POST",
        body: JSON.stringify({ cookies, accountId })
      });
      if (res.status === 401) {
        await clearAuth();
        return { ok: false, error: "\u767B\u5F55\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55", code: "UNAUTHENTICATED" };
      }
      if (!res.ok) {
        const err = readError(res);
        return { ok: false, error: err.error, code: err.code };
      }
      const body = res.json;
      if (!body?.account) {
        return { ok: false, error: "\u540E\u7AEF\u672A\u8FD4\u56DE\u8D26\u53F7\u4FE1\u606F" };
      }
      return {
        ok: true,
        account: body.account,
        success: body.success ?? true,
        cookieCount: typeof body.cookieCount === "number" ? body.cookieCount : void 0
      };
    }
    async function dispatch(message) {
      switch (message.type) {
        case "GET_STATUS":
          return handleStatus();
        case "LOGIN":
          return handleLogin(message.apiBaseUrl, message.email, message.password);
        case "LOGOUT":
          return handleLogout();
        case "LOOKUP":
          return handleLookup(message.items);
        case "READ_COOKIES":
          return handleReadCookies(message.url);
        case "LIST_ACCOUNTS":
          return handleListAccounts(message.platform);
        case "IMPORT_ACCOUNT":
          return handleImportAccount(message.platform, message.cookies, message.accountId);
        case "GET_ACTIVE_TAB":
          if (runtimeKind2 === "userscript" && typeof location !== "undefined") {
            return activeTabFromUrl(location.href, typeof document !== "undefined" ? document : void 0);
          }
          return { ok: false, error: "GET_ACTIVE_TAB \u4EC5\u5728\u6269\u5C55\u540E\u53F0\u53EF\u7528" };
        case "INJECT_ENDAO_CONTENT":
          return { ok: true };
        default:
          return { ok: false, error: "\u672A\u77E5\u8BF7\u6C42" };
      }
    }
    return {
      dispatch,
      handleStatus,
      handleLogin,
      handleLogout,
      handleLookup,
      handleReadCookies,
      handleListAccounts,
      handleImportAccount
    };
  }

  // src/content/targets.ts
  function toLightDomElement(el) {
    let current = el;
    for (let i = 0; i < 12; i += 1) {
      const root = current.getRootNode();
      if (root instanceof ShadowRoot) {
        current = root.host;
        continue;
      }
      break;
    }
    return current;
  }
  var targets = /* @__PURE__ */ new Map();
  function registerLookupTarget(clientKey, el) {
    const host = toLightDomElement(el);
    const list = targets.get(clientKey) ?? [];
    if (!list.includes(host)) list.push(host);
    targets.set(clientKey, list);
    return host;
  }
  function lookupTargets(clientKey) {
    const live = (targets.get(clientKey) ?? []).filter((el) => el.isConnected);
    targets.set(clientKey, live);
    return live;
  }
  function clearLookupTargets() {
    targets.clear();
  }

  // src/content/extract.ts
  var ISBN_RE = /(?:97[89][-\s]?)?(?:\d[-\s]?){9}[\dXx]/g;
  var COMPACT_TITLE_MAX = 180;
  function shopProductIdFromHref(href) {
    const path = href.split(/[?#]/)[0];
    const match = path.match(/\/(?:dp|book|ebook|products|item|basic)\/([^/]+)/i);
    if (!match) return null;
    const id = decodeURIComponent(match[1]);
    if (["category", "search", "list"].includes(id.toLowerCase())) return null;
    return id;
  }
  function koboEbookSlug(href) {
    const path = href.split(/[?#]/)[0];
    const match = path.match(/\/ebook\/([^/]+)/i);
    if (!match) return void 0;
    const slug = decodeURIComponent(match[1]);
    if (["category", "search", "list"].includes(slug.toLowerCase())) return void 0;
    return slug;
  }
  function clipLookupText(value, max) {
    const text = value?.trim();
    if (!text) return void 0;
    return text.length <= max ? text : text.slice(0, max);
  }
  var WEAK_SHOP_TITLE_RE = /^(book\s*cover|cover|image|photo|图片|封面|\d+\s*折|(?:hk\$|¥|￥)?\s*[\d.,]+)$/i;
  var CARD_HOST_SELECTOR = "li, article, tr, .product, .item, .cart-item, .sliderItem, .table-td";
  var TITLE_SELECTORS = [".title", "h2", "h3", "h4", ".book-title", ".product-title"];
  var WDBOOK_SHOP_CARD_SELECTOR = "wd-card, wd-list-card";
  function isWdbookShopCard(el) {
    const tag = el?.tagName;
    return tag === "WD-CARD" || tag === "WD-LIST-CARD";
  }
  function isWeakShopTitle(text) {
    const value = text.replace(/\s+/g, " ").trim();
    if (!value) return true;
    return WEAK_SHOP_TITLE_RE.test(value);
  }
  function preferCompactTitle(current, incoming) {
    const left = current?.trim() || "";
    const right = incoming?.trim() || "";
    if (isWeakShopTitle(left)) return right || void 0;
    if (isWeakShopTitle(right)) return left || void 0;
    if (!left) return right || void 0;
    if (!right) return left;
    const compact = (value) => value.length > 0 && value.length <= COMPACT_TITLE_MAX;
    if (compact(left) && !compact(right)) return left;
    if (compact(right) && !compact(left)) return right;
    if (compact(left) && compact(right)) {
      const core = (value) => value.replace(/[（(\[【［]\s*(?:简体版|繁體版|繁体版|简体|繁體|繁体|简|簡|繁)\s*[）)\]】］]/g, "").replace(/\s+/g, "");
      const a = core(left);
      const b = core(right);
      if (b.startsWith(a) && b.length > a.length) return right;
      if (a.startsWith(b) && a.length > b.length) return left;
    }
    return left.length <= right.length ? left : right;
  }
  function firstStrongTitle(...candidates) {
    for (const value of candidates) {
      const text = (value || "").replace(/\s+/g, " ").trim();
      if (text && !isWeakShopTitle(text)) return text;
    }
    return "";
  }
  function cardHostForLink(anchor) {
    const explicit = anchor.closest(CARD_HOST_SELECTOR);
    if (explicit) return explicit;
    let best = anchor;
    let node = anchor.parentElement;
    for (let depth = 0; depth < 10 && node && node !== document.body && node !== document.documentElement; depth += 1) {
      const ids = /* @__PURE__ */ new Set();
      const consider = (el) => {
        const id = shopProductIdFromHref(el.getAttribute("href") || "");
        if (id) ids.add(id);
      };
      if (node.matches("a[href]")) consider(node);
      for (const link of node.querySelectorAll("a[href]")) consider(link);
      if (ids.size === 1) best = node;
      if (ids.size > 1) break;
      node = node.parentElement;
    }
    return best;
  }
  function linkBookMeta(anchor) {
    const card = anchor.querySelector(WDBOOK_SHOP_CARD_SELECTOR);
    const host = cardHostForLink(anchor);
    const heading = host.querySelector("h4, h3, h2, .title, .book-title, .product-title");
    const title = firstStrongTitle(
      attr(card, "title"),
      attr(card, "originaltitle"),
      attr(heading, "title"),
      firstText(TITLE_SELECTORS, host),
      attr(anchor, "aria-label"),
      attr(anchor.querySelector("img"), "alt"),
      compactLinkText(textOf(anchor))
    );
    const author = attr(card, "author") || textOf(host.querySelector("[slot='author-area'], .author-name, .author, .book-author")) || // 博客来列表/搜索页：作者链接形如 //search.books.com.tw/search/query/key/{名}/adv_author/1/，
    // 无 .author 类名；出版社链接是 sys_puballb，不能用 .info 里第一个 <a> 充当作者。
    textOf(host.querySelector("a[href*='adv_author']")) || textOf(host.querySelector("p a[href*='searchText']")) || void 0;
    return {
      title: title || void 0,
      author: author || void 0
    };
  }
  function compactLinkText(text) {
    const value = text.replace(/\s+/g, " ").trim();
    return value.length > 0 && value.length <= COMPACT_TITLE_MAX ? value : "";
  }
  function textOf(el) {
    return (el?.textContent || "").replace(/\s+/g, " ").trim();
  }
  function attr(el, name) {
    return (el?.getAttribute(name) || "").trim();
  }
  function firstText(selectors, root = document) {
    for (const selector of selectors) {
      const value = textOf(root.querySelector(selector));
      if (value) return value;
    }
    return "";
  }
  function extractIsbns(text) {
    const found = /* @__PURE__ */ new Set();
    for (const match of text.matchAll(ISBN_RE)) {
      const compact = match[0].replace(/[^0-9Xx]/g, "").toUpperCase();
      if (compact.length === 10 || compact.length === 13) found.add(compact);
    }
    return [...found];
  }
  function isbnFromDocument(doc) {
    const values = [];
    for (const meta of doc.querySelectorAll(
      'meta[property="book:isbn"], meta[name="citation_isbn"], meta[itemprop="isbn"]'
    )) {
      const content = attr(meta, "content");
      if (content) values.push(...extractIsbns(content));
    }
    for (const script of doc.querySelectorAll('script[type="application/ld+json"]')) {
      try {
        const data = JSON.parse(script.textContent || "");
        const nodes = Array.isArray(data) ? data : [data];
        for (const node of nodes) {
          if (node && typeof node === "object" && "isbn" in node) {
            values.push(...extractIsbns(String(node.isbn ?? "")));
          }
        }
      } catch {
      }
    }
    if (!values.length) {
      for (const el of doc.querySelectorAll("li, td, th")) {
        const text = textOf(el);
        if (text.length > 48 || text.length < 8) continue;
        if (!/^(E-?ISBN|ISBN)\s*[：:]/i.test(text)) continue;
        values.push(...extractIsbns(text));
        if (values.length >= 8) break;
      }
    }
    if (!values.length) {
      const chunks = [];
      for (const el of doc.querySelectorAll("main, article, [itemprop='isbn'], [class*='isbn' i]")) {
        chunks.push(el.textContent || "");
        if (chunks.join("").length >= 2e4) break;
      }
      values.push(...extractIsbns(chunks.join("\n").slice(0, 2e4)));
    }
    const unique = [...new Set(values)];
    if (!unique.length) return {};
    const isbn13 = unique.find((value) => value.length === 13);
    return { isbn: isbn13 || unique[0], eisbn: unique.find((value) => value !== (isbn13 || unique[0])) };
  }
  var DETAIL_TITLE_SELECTORS = [
    "h1.book-detail-title",
    "h1[data-testid='title']",
    "[data-testid='product-title']",
    "[data-testid='product-header-title']",
    "[data-testid='cart-item-title']",
    "[data-testid='title'] .link--label",
    "[data-testid='title']",
    "#productTitle",
    ".product-title-word-break",
    "[data-automation-id='title']",
    "h1.title",
    "h2.title",
    "h1[itemprop='name']",
    "h2[itemprop='name']",
    "h1",
    ".book-title",
    ".product-title"
  ];
  var DETAIL_TITLE_CHROME_RE = /^(kobo|rakuten(\s+kobo)?|電子書|电子书|ebooks?|有聲書|有声书|首頁|首页|搜尋|搜索)$/i;
  function isBreadcrumbish(el) {
    return Boolean(
      el.closest("nav, [aria-label*='breadcrumb' i], [class*='breadcrumb' i], [id*='breadcrumb' i], [class*='crumbs' i]")
    );
  }
  function compactTitleText(value) {
    return value.replace(/\s+/g, "");
  }
  function docHostname(doc) {
    try {
      return (doc.defaultView?.location?.hostname || (typeof location !== "undefined" ? location.hostname : "")).toLowerCase();
    } catch {
      return "";
    }
  }
  function isKoboDocument(doc) {
    const host = docHostname(doc);
    return host === "kobo.com" || host.endsWith(".kobo.com");
  }
  function queryAllDeep(root, selector, limit = 200) {
    const found = [];
    const seen = /* @__PURE__ */ new Set();
    const visit = (node) => {
      if (found.length >= limit || typeof node.querySelectorAll !== "function") return;
      for (const el of node.querySelectorAll(selector)) {
        if (seen.has(el)) continue;
        seen.add(el);
        found.push(el);
        if (found.length >= limit) return;
      }
      for (const el of node.querySelectorAll("*")) {
        if (el.shadowRoot) visit(el.shadowRoot);
        if (found.length >= limit) return;
      }
    };
    visit(root);
    return found;
  }
  function selectDetailTitleNodes(doc, selector, deep) {
    const light = typeof doc.querySelectorAll === "function" ? [...doc.querySelectorAll(selector)] : [];
    if (!deep || light.length) return light;
    return queryAllDeep(doc, selector);
  }
  function isOnScreen(el) {
    if (isDisplayHidden(el)) return false;
    if (typeof el.getBoundingClientRect !== "function") return true;
    try {
      const box = el.getBoundingClientRect();
      if (box.width < 2 || box.height < 2) return false;
      const viewH = typeof window !== "undefined" ? window.innerHeight : 4e3;
      const viewW = typeof window !== "undefined" ? window.innerWidth : 4e3;
      return box.bottom > 0 && box.top < viewH && box.right > 0 && box.left < viewW;
    } catch {
      return true;
    }
  }
  function considerDetailTitle(el, fallback) {
    if (!isOnScreen(el)) return { hit: null, fallback };
    const text = (el.textContent || "").replace(/\s+/g, " ").trim();
    if (text.length < 4 || DETAIL_TITLE_CHROME_RE.test(text)) return { hit: null, fallback };
    if (isBreadcrumbish(el)) {
      const prev = (fallback?.textContent || "").replace(/\s+/g, " ").trim();
      return { hit: null, fallback: !fallback || text.length > prev.length ? el : fallback };
    }
    return { hit: el, fallback };
  }
  function shopOgTitle(doc) {
    const el = typeof doc.querySelector === "function" ? doc.querySelector('meta[property="og:title"]') : null;
    if (!el || typeof el.getAttribute !== "function") return cleanShopOgTitle(doc.title || "");
    return cleanShopOgTitle(el.getAttribute("content") || "") || cleanShopOgTitle(doc.title || "");
  }
  function drillToTitle(root, needle) {
    const want = compactTitleText(needle);
    if (!root || want.length < 8) return null;
    const compactOf = (el) => compactTitleText(el.textContent || "");
    if (!compactOf(root).includes(want)) return null;
    let node = root;
    for (let i = 0; i < 40; i += 1) {
      const kids = typeof node.children !== "undefined" ? [...node.children] : [];
      const matches = kids.filter((child) => compactOf(child).includes(want));
      if (!matches.length) break;
      if (matches.length === 1) {
        node = matches[0];
        continue;
      }
      node = matches.find((child) => !isBreadcrumbish(child) && /H[1-3]/.test(child.tagName)) || matches.find((child) => !isBreadcrumbish(child)) || matches[0];
    }
    const text = (node.textContent || "").replace(/\s+/g, " ").trim();
    if (text.length < 4 || DETAIL_TITLE_CHROME_RE.test(text)) return null;
    return node;
  }
  function firstVisibleDetailTitle(doc) {
    let fallback = null;
    const scan = (deep) => {
      for (const selector of DETAIL_TITLE_SELECTORS) {
        for (const el of selectDetailTitleNodes(doc, selector, deep)) {
          const next = considerDetailTitle(el, fallback);
          fallback = next.fallback;
          if (next.hit) return next.hit;
        }
      }
      return null;
    };
    const light = scan(false);
    if (light) return light;
    if (isKoboDocument(doc)) {
      const deep = scan(true);
      if (deep) return deep;
    }
    const needle = jsonLdBookName(doc) || shopOgTitle(doc);
    const drilled = drillToTitle(doc.body, needle);
    if (drilled && !isBreadcrumbish(drilled)) return drilled;
    return fallback || drilled;
  }
  var READMOO_CART_RAIL_RE = /加價購|加价购|推薦商品|推荐商品|猜你喜歡|你可能會喜歡|熱門推薦/;
  function classNameOf(el) {
    const value = el.className;
    if (typeof value === "string") return value;
    if (value && typeof value === "object" && "baseVal" in value) return String(value.baseVal || "");
    return "";
  }
  function isReadmooCheckoutRail(el) {
    let node = el;
    for (let i = 0; i < 10 && node; i++) {
      const labeled = `${attr(node, "aria-label")} ${classNameOf(node)}`;
      if (/\b(addon|upsell|recommend|related|add-on)\b/i.test(labeled)) return true;
      if (READMOO_CART_RAIL_RE.test(labeled)) return true;
      if (READMOO_CART_RAIL_RE.test(textOf(node.querySelector("h2, h3")))) return true;
      const prev = node.previousElementSibling;
      if (prev && READMOO_CART_RAIL_RE.test((prev.textContent || "").replace(/\s+/g, " ").trim().slice(0, 24))) return true;
      node = node.parentElement;
    }
    return false;
  }
  function isReadmooCheckoutLine(el) {
    if (isReadmooCheckoutRail(el)) return false;
    if (el.closest("nav, header, footer")) return false;
    if (el.getAttribute("data-readmoo-id") || el.getAttribute("data-readmoo_id")) return true;
    const title = (el.getAttribute("title") || el.textContent || "").replace(/\s+/g, " ").trim();
    return title.length >= 2 && !/^(購物車|待購|結帳|登录|登入|最近)/.test(title);
  }
  function readmooTabFromExactId(id) {
    const value = id.replace(/^#/, "").trim();
    if (value === "recent" || value === "recently" || value === "history") return "recent";
    if (value === "wishlist" || value === "wish") return "wishlist";
    if (value === "cart" || value === "cart-panel") return "cart";
    return "unknown";
  }
  function readmooTabFromNode(node) {
    for (const value of [node.id, attr(node, "id"), attr(node, "data-tab"), attr(node, "data-panel"), attr(node, "data-hash")]) {
      const found = readmooTabFromExactId(String(value || "").toLowerCase());
      if (found !== "unknown") return found;
    }
    return "unknown";
  }
  function readmooTabFromHeading(text) {
    const compact = text.replace(/\s+/g, " ").trim();
    if (!compact || compact.length > 12) return "unknown";
    if (/最近瀏覽|最近浏览/.test(compact) && !/待購|待购|購物|购物/.test(compact)) return "recent";
    if (/待購|待购|願望|愿望/.test(compact) && !/最近|購物|购物/.test(compact)) return "wishlist";
    if (/購物車|购物车/.test(compact) && !/待購|待购|最近/.test(compact)) return "cart";
    return "unknown";
  }
  function readmooCheckoutPanel(el) {
    let node = el;
    for (let i = 0; i < 12 && node; i++) {
      const id = (node.id || attr(node, "id")).toLowerCase();
      const labeled = `${id} ${classNameOf(node)} ${attr(node, "aria-label")} ${attr(node, "data-tab")} ${attr(node, "data-panel")} ${attr(node, "data-hash")}`;
      const fromId = readmooTabFromNode(node);
      if (fromId !== "unknown") return fromId;
      if (/(^|[^a-z])recent(ly|s)?([^a-z]|$)/i.test(labeled) || /最近瀏覽|最近浏览/.test(labeled)) return "recent";
      if (/(wish|wishlist)/i.test(labeled) || /待購|待购/.test(labeled)) return "wishlist";
      if (/\b(tab-cart|tabpanel-cart|panel-cart)\b/i.test(labeled)) return "cart";
      const prev = (node.previousElementSibling?.textContent || "").replace(/\s+/g, " ").trim();
      const fromPrev = readmooTabFromHeading(prev.slice(0, 16));
      if (fromPrev !== "unknown") return fromPrev;
      if (node.getAttribute("role") === "tabpanel") {
        const labelledBy = attr(node, "aria-labelledby");
        const labelEl = labelledBy ? node.ownerDocument?.getElementById(labelledBy) : null;
        const fromPanel = readmooTabFromHeading(textOf(labelEl) || labeled);
        if (fromPanel !== "unknown") return fromPanel;
      }
      node = node.parentElement;
    }
    return "unknown";
  }
  function computedDisplayHidden(el) {
    if (typeof getComputedStyle !== "function") return false;
    try {
      const css = getComputedStyle(el);
      return css.display === "none" || css.visibility === "hidden";
    } catch {
      return false;
    }
  }
  function isCollapsedCheckoutBox(el) {
    if (typeof el.getBoundingClientRect !== "function") return false;
    try {
      const box = el.getBoundingClientRect();
      return box.width < 2 || box.height < 2;
    } catch {
      return false;
    }
  }
  function isReadmooInactiveCheckoutPanel(el) {
    let node = el;
    for (let i = 0; i < 12 && node; i++) {
      if (typeof node.hasAttribute === "function" && node.hasAttribute("hidden") || attr(node, "aria-hidden") === "true") {
        if (typeof node.matches === "function" && node.matches("h1, h2, h3, h4, h5, h6, .title, img")) {
          node = node.parentElement;
          continue;
        }
        return true;
      }
      if (attr(node, "data-state") === "inactive") return true;
      if (computedDisplayHidden(node)) return true;
      node = node.parentElement;
    }
    return false;
  }
  function isCollapsedAncestorPanel(el) {
    let node = el.parentElement;
    for (let i = 0; i < 12 && node; i++) {
      const role = typeof node.getAttribute === "function" ? node.getAttribute("role") : "";
      if (role === "tabpanel" || readmooTabFromNode(node) !== "unknown") {
        if (isCollapsedCheckoutBox(node)) return true;
      }
      node = node.parentElement;
    }
    return false;
  }
  function isReadmooCheckoutBadgeHost(el, tab) {
    if (isReadmooCheckoutRail(el) || isReadmooInactiveCheckoutPanel(el) || isCollapsedAncestorPanel(el)) return false;
    const panel = readmooCheckoutPanel(el);
    if (panel !== "unknown") return panel === tab;
    return true;
  }
  function readmooCheckoutTitleFace(el) {
    const host = typeof el.closest === "function" && el.closest("li, article, tr, [class*='item' i], [class*='card' i]") || el.parentElement || el;
    if (!host || typeof host.querySelectorAll !== "function") return el;
    for (const title of host.querySelectorAll("h3, h4, h5, .title, .book-title, a[href*='/book/']")) {
      if (textOf(title).length >= 2 && !isCollapsedCheckoutBox(title)) return title;
    }
    return el;
  }
  function shouldExtractReadmooCheckoutNode(el, tab) {
    if (!isReadmooCheckoutBadgeHost(el, tab)) return false;
    if (isHiddenOrCloneLink(el) || !isReadmooCheckoutLine(el)) return false;
    return true;
  }
  function readmooCheckoutTitleAnchors(doc, tab) {
    return [...doc.querySelectorAll("a[href*='/book/'], [data-readmoo-id], [data-readmoo_id]")].filter(
      (node) => shouldExtractReadmooCheckoutNode(node, tab)
    );
  }
  function firstReadmooCheckoutBook(doc, tab = "cart") {
    for (const node of doc.querySelectorAll("a[href*='/book/'], [data-readmoo-id], [data-readmoo_id]")) {
      if (shouldExtractReadmooCheckoutNode(node, tab)) return node;
    }
    return null;
  }
  function isPubuCartLine(el) {
    if (el.closest("nav, header, footer")) return false;
    const href = el.getAttribute("href") || "";
    if (!/\/ebook\/[^/?#]+/.test(href)) return false;
    const title = (el.getAttribute("title") || el.textContent || "").replace(/\s+/g, " ").trim();
    return title.length >= 2;
  }
  function pubuCartTitleAnchors(doc) {
    return [...doc.querySelectorAll("a[href*='/ebook/']")].filter(
      (node) => !isHiddenOrCloneLink(node) && isPubuCartLine(node)
    );
  }
  var BOOKSTW_PRODUCT_LINK_SELECTOR = 'a[href*="/products/"], a[href*="/item/"], a[href*="item="]';
  var BOOKSTW_CART_RAIL_RE = /(?:加價購|加价购|推薦|推荐|猜你喜歡|你可能會喜歡|熱門推薦|推廣|促銷)/;
  function isBookstwCartRail(el) {
    let node = el;
    for (let i = 0; i < 10 && node; i++) {
      const labeled = `${attr(node, "aria-label")} ${classNameOf(node)}`;
      if (/\b(recommend|related|upsell|addon)\b/i.test(labeled)) return true;
      if (BOOKSTW_CART_RAIL_RE.test(labeled)) return true;
      if (BOOKSTW_CART_RAIL_RE.test(textOf(node.querySelector("h2, h3")))) return true;
      node = node.parentElement;
    }
    return false;
  }
  function isBookstwSearchChrome(el) {
    const href = el.getAttribute("href") || "";
    if (/recommender|adv_author/i.test(href)) return true;
    return (el.getAttribute("rel") || "").includes("go_author");
  }
  function isBookstwCartLine(el) {
    if (el.closest("nav, header, footer")) return false;
    if (isBookstwCartRail(el)) return false;
    const href = el.getAttribute("href") || "";
    if (!/\/products\/[^/?#]+/.test(href) && !/\/item\/[A-Z0-9_-]+/i.test(href) && !/[?&]item=/.test(href) && !/item=/.test(href)) {
      return false;
    }
    const title = (el.getAttribute("title") || el.textContent || "").replace(/\s+/g, " ").trim();
    return title.length >= 2;
  }
  function bookstwCartTitleAnchors(doc) {
    return [...doc.querySelectorAll(BOOKSTW_PRODUCT_LINK_SELECTOR)].filter(
      (node) => !isHiddenOrCloneLink(node) && isBookstwCartLine(node)
    );
  }
  var KOBO_CART_RAIL_RE = /Recommended For You|為你推薦|为你推荐|你可能會喜歡|猜你喜歡|熱門推薦|推荐商品/;
  var KOBO_CART_CHROME_RE = /^(購物車|购物车|商品(\s*\([^)]*\))?|訂單摘要|订单摘要|結帳|结帐|繼續選購|继续选购|checkout|shopping\s*cart)$/i;
  var KOBO_BOOK_ID_RE = /(?:書籍ID|书籍ID|Book ID)\s*[:：]?\s*(97[89]\d{10})/i;
  function isKoboCartRail(el) {
    let node = el;
    for (let i = 0; i < 10 && node; i++) {
      const labeled = `${attr(node, "aria-label")} ${classNameOf(node)} ${attr(node, "data-testid")}`;
      if (/\b(recommend|related|upsell|addon)\b/i.test(labeled)) return true;
      if (KOBO_CART_RAIL_RE.test(labeled)) return true;
      if (KOBO_CART_RAIL_RE.test(textOf(node.querySelector("h2, h3")))) return true;
      node = node.parentElement;
    }
    return false;
  }
  function isKoboCartHost(el) {
    if (el.closest("nav, header, footer")) return false;
    return !isKoboCartRail(el);
  }
  function koboLineTitle(el) {
    const img = el.tagName === "IMG" ? el : typeof el.querySelector === "function" ? el.querySelector("img") : null;
    return firstStrongTitle(
      attr(el, "title"),
      attr(el, "aria-label"),
      attr(img, "alt"),
      textOf(el)
    );
  }
  function isKoboCartLine(el) {
    if (!isKoboCartHost(el)) return false;
    const href = el.getAttribute("href") || "";
    if (!koboEbookSlug(href)) return false;
    return koboLineTitle(el).length >= 2;
  }
  function koboLooksLikeAuthorDump(text) {
    return /主編|主编/.test(text) && (text.match(/[,，、]/g) || []).length >= 2;
  }
  function koboLooksLikeBookTitle(text) {
    const value = text.replace(/\s+/g, " ").trim();
    if (value.length < 8 || value.length > 160) return false;
    if (KOBO_CART_CHROME_RE.test(value) || /^\$/.test(value) || koboLooksLikeAuthorDump(value)) return false;
    if (/瀏覽所有|類別|暢銷|部落格|前往美國|選擇另一家|繼續購物|您的購物車/.test(value)) return false;
    return /[：:]/.test(value) || /[（(]/.test(value) || /[\u4e00-\u9fff]/.test(value) && value.length >= 12;
  }
  function koboCartPlainTitles(doc) {
    const seen = /* @__PURE__ */ new Set();
    const out = [];
    for (const el of queryAllDeep(doc, "h1, h2, h3, h4, p, a, span, div, img, [class*='title' i]")) {
      if (!isKoboCartHost(el) || isHiddenOrCloneLink(el) || !isOnScreen(el)) continue;
      const kids = typeof el.children !== "undefined" ? el.children.length : 0;
      if (el.tagName === "DIV" && kids > 0) continue;
      if (kids > 2) continue;
      const text = koboLineTitle(el);
      if (!koboLooksLikeBookTitle(text)) continue;
      const compact = compactTitleText(text);
      if (seen.has(compact)) continue;
      seen.add(compact);
      out.push(el);
    }
    return out;
  }
  function koboCartTitleAnchors(doc) {
    const links = queryAllDeep(doc, "a[href*='/ebook/']").filter(
      (node) => !isHiddenOrCloneLink(node) && isKoboCartLine(node) && isOnScreen(node)
    );
    if (links.length) return links;
    const labeled = queryAllDeep(
      doc,
      "[data-testid='title'], [data-testid='product-title'], [data-testid='cart-item-title'], [data-testid='product-header-title']"
    ).filter((el) => {
      if (isHiddenOrCloneLink(el) || !isKoboCartHost(el) || !isOnScreen(el)) return false;
      return koboLineTitle(el).length >= 4;
    });
    if (labeled.length) return labeled;
    return koboCartPlainTitles(doc);
  }
  function koboCartUiOpen(doc) {
    let heading = false;
    let summary = false;
    let checkout = false;
    for (const el of queryAllDeep(doc, "h1, h2, h3, button, a, [role='button']")) {
      if (!isOnScreen(el) || isHiddenOrCloneLink(el)) continue;
      const text = textOf(el).replace(/\s+/g, "");
      if (/^(購物車|购物车|ShoppingCart)$/i.test(text)) heading = true;
      if (/^(訂單摘要|订单摘要|OrderSummary)$/i.test(text)) summary = true;
      if (/^(結帳|结帐|Checkout)$/i.test(text)) checkout = true;
    }
    return heading && (summary || checkout) || summary && checkout;
  }
  function isbnFromKoboBookId(doc) {
    for (const el of queryAllDeep(doc, "dt, dd, li, span, p, [data-testid]", 80)) {
      const match = `${textOf(el)} ${textOf(el.parentElement)}`.match(KOBO_BOOK_ID_RE);
      if (match?.[1]) return { isbn: match[1] };
    }
    return {};
  }
  function isPubuCartIdText(text) {
    const compact = text.replace(/\s+/g, " ").trim();
    if (!compact || compact.length > 20) return false;
    if (/^(?:ID|id|#|＃|編號|编号)\s*[:：]?\s*\(?\d+\)?$/.test(compact)) return true;
    return /^\(\d+\)$/.test(compact) || /^\d+\)$/.test(compact);
  }
  function pageLooksReadyForBadges(doc, pageKind, platform, url) {
    if (pageKind === "detail" && platform === "KOBO") {
      if (firstVisibleDetailTitle(doc)) return true;
      if (url && koboEbookSlug(url.pathname)) return true;
      return Boolean(jsonLdBookName(doc) || shopOgTitle(doc));
    }
    if (pageKind === "detail") {
      if (firstVisibleDetailTitle(doc)) return true;
      if (platform === "AMAZON" && url && /\/(?:dp|gp\/product|gp\/aw\/d)\/[A-Z0-9]{8,10}/i.test(url.pathname)) {
        return Boolean(
          doc.querySelector(
            "#productTitle, .product-title-word-break, [data-automation-id='title'], h1"
          )
        );
      }
      return false;
    }
    if (pageKind === "cart" && platform === "READMOO") {
      const tab = readmooCheckoutTab(url?.hash || doc.defaultView?.location?.hash || "");
      return Boolean(firstReadmooCheckoutBook(doc, tab));
    }
    if (pageKind === "cart" && platform === "KOBO") {
      if (koboCartTitleAnchors(doc).length > 0) return true;
      return Boolean(url && koboEbookSlug(url.pathname) && koboCartUiOpen(doc));
    }
    if (pageKind === "list" && platform === "ENDAO") {
      const card = doc.querySelector(
        ".sliderItem h3 a[href*='/book/'], .sliderItem h4 a[href*='/book/'], h3 a[href*='/book/'], h4 a[href*='/book/']"
      );
      const text = attr(card, "title") || (card?.textContent || "").replace(/\s+/g, " ").trim();
      return text.length >= 2;
    }
    if (pageKind === "cart" && platform === "BOOKSTW") {
      return bookstwCartTitleAnchors(doc).length > 0;
    }
    if (pageKind === "list" && platform === "BOOKSTW") {
      const link = doc.querySelector(BOOKSTW_PRODUCT_LINK_SELECTOR);
      return Boolean(link && (attr(link, "title") || textOf(link)).length >= 2);
    }
    return true;
  }
  var CAROUSEL_CLONE_SELECTOR = ".swiper-slide-duplicate, .slick-cloned";
  var ARIA_HIDDEN_TITLEISH_SELECTOR = "h1, h2, h3, h4, h5, h6, .title, .book-title, .product-title, .rendition, img";
  function isHiddenOrCloneLink(el) {
    if (el.closest(CAROUSEL_CLONE_SELECTOR)) return true;
    const hidden = el.closest("[aria-hidden='true']");
    if (!hidden) return false;
    if (typeof hidden.matches === "function" && hidden.matches(ARIA_HIDDEN_TITLEISH_SELECTOR)) return false;
    return true;
  }
  function listProductIdSignal(doc) {
    const ids = /* @__PURE__ */ new Set();
    for (const anchor of doc.querySelectorAll('a[href*="/book/"], a[href*="/dp/"], a[href*="/ebook/"], a[href*="/products/"], a[href*="/item/"]')) {
      if (isHiddenOrCloneLink(anchor)) continue;
      const id = shopProductIdFromHref(anchor.getAttribute("href") || "");
      if (id) ids.add(id);
    }
    return [...ids].sort().join(",");
  }
  function isDisplayHidden(el) {
    let node = el;
    for (let depth = 0; depth < 8 && node; depth += 1) {
      const root = typeof document !== "undefined" ? document : null;
      if (root && (node === root.documentElement || node === root.body)) break;
      const html = node;
      if (html.hidden) return true;
      if (typeof html.hasAttribute === "function" && html.hasAttribute("hidden")) return true;
      const inline = typeof html.getAttribute === "function" ? html.getAttribute("style") || "" : "";
      if (/display\s*:\s*none/i.test(inline) || /visibility\s*:\s*hidden/i.test(inline)) return true;
      try {
        const style = getComputedStyle(html);
        if (style.display === "none" || style.visibility === "hidden") return true;
      } catch {
      }
      node = html.parentElement ?? null;
    }
    return false;
  }
  function listLayoutSignal(doc) {
    const cardArea = typeof doc.getElementById === "function" ? doc.getElementById("cardArea") : null;
    const listArea = typeof doc.getElementById === "function" ? doc.getElementById("ListArea") : null;
    if (cardArea || listArea) {
      const cardOn = Boolean(cardArea && !isDisplayHidden(cardArea));
      const listOn = Boolean(listArea && !isDisplayHidden(listArea));
      if (listOn && !cardOn) return "row";
      if (cardOn && !listOn) return "card";
      if (listOn && cardOn) return "mixed";
    }
    let cards = 0;
    let rows = 0;
    for (const card of doc.querySelectorAll(WDBOOK_SHOP_CARD_SELECTOR)) {
      if (isHiddenOrCloneLink(card) || isDisplayHidden(card)) continue;
      if (card.tagName === "WD-LIST-CARD") rows += 1;
      else cards += 1;
    }
    for (const anchor of doc.querySelectorAll('a[href*="/dp/"], a[href*="/book/"], a[href*="/ebook/"]')) {
      if (isHiddenOrCloneLink(anchor) || isDisplayHidden(anchor)) continue;
      if (anchor.querySelector(WDBOOK_SHOP_CARD_SELECTOR) || anchor.closest(WDBOOK_SHOP_CARD_SELECTOR)) continue;
      const text = (anchor.textContent || "").replace(/\s+/g, " ").trim();
      if (text.length < 4 || isWeakShopTitle(text)) continue;
      rows += 1;
    }
    if (rows && !cards) return "row";
    if (cards && !rows) return "card";
    if (cards && rows) return `mixed:${cards}:${rows}`;
    return cards ? "card" : "row";
  }
  function listPaintSignal(doc) {
    const ids = listProductIdSignal(doc);
    if (!ids) return "";
    return `${listLayoutSignal(doc)}
${ids}`;
  }
  function titleFromDocument(doc) {
    const heading = firstVisibleDetailTitle(doc);
    const title = textOf(heading);
    const subtitleEl = heading?.parentElement?.querySelector("h2.book-detail-subtitle, .book-detail-subtitle") || doc.querySelector("h2.book-detail-subtitle");
    const subtitle = heading && subtitleEl && subtitleEl !== heading ? textOf(subtitleEl) : "";
    const combined = title && subtitle && !title.includes(subtitle) ? `${title}\uFF1A${subtitle}` : title;
    return combined || jsonLdBookName(doc) || shopOgTitle(doc);
  }
  function cleanShopOgTitle(raw) {
    return raw.replace(/\s+eBook\s+by\s+.+$/i, "").replace(/\s+[|\-–—]\s*(Rakuten\s+)?Kobo.*$/i, "").replace(/\s+/g, " ").trim();
  }
  function jsonLdBookName(doc) {
    for (const script of doc.querySelectorAll('script[type="application/ld+json"]')) {
      try {
        const data = JSON.parse(script.textContent || "");
        const extra = data && typeof data === "object" ? data["@graph"] : void 0;
        const nodes = [...Array.isArray(data) ? data : [data], ...Array.isArray(extra) ? extra : []];
        for (const node of nodes) {
          if (!node || typeof node !== "object") continue;
          const type = String(node["@type"] || "");
          if (!/Book|Product/i.test(type)) continue;
          const name = String(node.name || "").replace(/\s+/g, " ").trim();
          if (name.length >= 4 && !DETAIL_TITLE_CHROME_RE.test(name)) return name;
        }
      } catch {
      }
    }
    return "";
  }
  var AUTHOR_FOLLOW_RE = /^(作者|關注|关注)$/;
  var AUTHOR_NAME_SELECTORS = [
    "[itemprop=author] [itemprop=name]",
    "[itemprop=author] a",
    "[data-testid='authors'] a",
    "[data-testid='contributor-name']",
    ".contributor-name"
  ];
  function authorFromDocument(doc) {
    const names = [];
    const seen = /* @__PURE__ */ new Set();
    const add = (raw) => {
      const text = raw.replace(/\s+/g, " ").trim();
      if (!text || AUTHOR_FOLLOW_RE.test(text)) return;
      const key = text.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      names.push(text);
    };
    for (const selector of AUTHOR_NAME_SELECTORS) {
      for (const el of doc.querySelectorAll(selector)) add(textOf(el));
      if (names.length) return names.join("\u3001");
    }
    return firstText(["[itemprop=author]", ".author", ".book-author", ".contributorNameID", "#bylineInfo"], doc) || attr(doc.querySelector('meta[property="book:author"]'), "content");
  }
  function makeBook(platform, pageKind, fields) {
    const platformBookId = clipLookupText(fields.platformBookId, LOOKUP_FIELD_LIMITS.platformBookId);
    const title = clipLookupText(fields.title, LOOKUP_FIELD_LIMITS.title);
    const isbn = clipLookupText(fields.isbn, LOOKUP_FIELD_LIMITS.isbn);
    if (!platformBookId && !title && !isbn) return null;
    const clientKey = clipLookupText(
      fields.clientKey || `${platform}:${pageKind}:${platformBookId || isbn || title}`,
      LOOKUP_FIELD_LIMITS.clientKey
    );
    if (!clientKey) return null;
    return {
      clientKey,
      platform,
      pageKind,
      root: fields.root || "",
      platformBookId,
      platformVersion: clipLookupText(fields.platformVersion, LOOKUP_FIELD_LIMITS.platformVersion),
      isbn,
      eisbn: clipLookupText(fields.eisbn, LOOKUP_FIELD_LIMITS.eisbn),
      title,
      author: clipLookupText(fields.author, LOOKUP_FIELD_LIMITS.author)
    };
  }
  var LOOKUP_KEY_ATTR = "data-ebook-cloud-key";
  function bookIdentity(book) {
    if (book.platform === "WDBOOK" && book.platformVersion) return `${book.platform}:id:${book.platformVersion}`;
    if (book.platformBookId) return `${book.platform}:id:${book.platformBookId}`;
    if (book.isbn) return `${book.platform}:isbn:${book.isbn}`;
    return `${book.platform}:title:${book.title || ""}`;
  }
  function richerBook(current, incoming) {
    return {
      ...current,
      clientKey: current.platformBookId || current.platformVersion ? current.clientKey : incoming.clientKey,
      platformBookId: current.platformBookId || incoming.platformBookId,
      platformVersion: current.platformVersion || incoming.platformVersion,
      title: preferCompactTitle(current.title, incoming.title),
      author: current.author || incoming.author,
      isbn: current.isbn || incoming.isbn,
      eisbn: current.eisbn || incoming.eisbn,
      root: current.root || incoming.root
    };
  }
  function uniqueBooks(books) {
    const byKey = /* @__PURE__ */ new Map();
    for (const book of books) {
      if (!book) continue;
      const key = bookIdentity(book);
      const existing = byKey.get(key);
      byKey.set(key, existing ? richerBook(existing, book) : book);
    }
    const list = [...byKey.values()];
    const withId = list.filter((book) => Boolean(book.platformBookId || book.platformVersion));
    const titleOnly = list.filter((book) => !book.platformBookId && !book.platformVersion);
    const merged = [...withId];
    for (const book of titleOnly) {
      const match = withId.find(
        (row) => row.platform === book.platform && row.title && book.title && row.title.replace(/\s+/g, "") === book.title.replace(/\s+/g, "")
      );
      if (match) {
        match.root = match.root || book.root;
        match.author = match.author || book.author;
        continue;
      }
      merged.push(book);
    }
    return merged;
  }
  function collectLinkBooks(doc, platform, pageKind, matchHref, options) {
    const books = [];
    const markTargets = options?.markTargets !== false;
    const selector = options?.selector || "a[href]";
    const anchors = options?.query ? options.query(selector) : [...doc.querySelectorAll(selector)];
    for (const anchor of anchors) {
      if (isHiddenOrCloneLink(anchor) || options?.skip?.(anchor)) continue;
      let url;
      try {
        url = new URL(anchor.getAttribute("href") || "", doc.baseURI);
      } catch {
        continue;
      }
      const ids = matchHref(url);
      if (!ids?.platformBookId) continue;
      const meta = linkBookMeta(anchor);
      const book = makeBook(platform, pageKind, {
        ...ids,
        title: meta.title,
        author: meta.author,
        root: markTargets ? markRoot(anchor) : ""
      });
      if (book && markTargets) {
        const card = anchor.querySelector(WDBOOK_SHOP_CARD_SELECTOR) || anchor;
        markLookupTarget(card, book.clientKey, { exact: true });
      }
      books.push(book);
    }
    return uniqueBooks(books);
  }
  var rootSeq = 0;
  function markRoot(el) {
    const host = el.closest("li, article, tr, [data-asin], .product, .item, .cart-item, .sliderItem") || el;
    if (host !== el && countProductLinks(host) > 1) {
      const existing2 = el.getAttribute("data-ebook-cloud-root");
      if (existing2) return existing2;
      const id2 = `ecr-${++rootSeq}`;
      el.setAttribute("data-ebook-cloud-root", id2);
      return id2;
    }
    const existing = host.getAttribute("data-ebook-cloud-root");
    if (existing) return existing;
    const id = `ecr-${++rootSeq}`;
    host.setAttribute("data-ebook-cloud-root", id);
    return id;
  }
  function markLookupTarget(el, clientKey, options) {
    let preferred = options?.exact ? el : el.closest("li, article, tr, [data-asin], .product, .item, .cart-item, .sliderItem") || el;
    if (preferred !== el && countProductLinks(preferred) > 1) preferred = el;
    const host = registerLookupTarget(clientKey, preferred);
    const rootId = markRoot(host);
    host.setAttribute(LOOKUP_KEY_ATTR, clientKey);
    return rootId;
  }
  function countProductLinks(host) {
    return host.querySelectorAll('a[href*="/dp/"], a[href*="/book/"], a[href*="/ebook/"], a[href*="/products/"], a[href*="/item/"]').length;
  }
  function markDocumentRoot(doc) {
    const existing = doc.documentElement.getAttribute("data-ebook-cloud-root");
    if (existing) return existing;
    const id = "ecr-detail";
    doc.documentElement.setAttribute("data-ebook-cloud-root", id);
    return id;
  }

  // src/content/titleBadge.ts
  var BADGE_WORDS = /\s*(已在书库|可能已有)\s*/g;
  function isShortPathTrail(containerText, title) {
    const compact = containerText.replace(/\s+/g, " ").trim();
    const name = title.replace(/\s+/g, " ").trim();
    if (!name || compact.length > 180 || compact.length <= name.length + 8) return false;
    return /首页/.test(compact) && /[\/›»]/.test(compact);
  }
  function stripEditionSuffix(title) {
    return title.replace(/\s+/g, " ").trim().replace(/[（(]\s*(简体版|繁體版|繁体版|简体|繁體|繁体|简|簡|繁)\s*[）)]/g, "").replace(/\s+/g, " ").trim();
  }
  function titleEdition(title) {
    const compact = title.replace(/\s+/g, "");
    if (/[（(](简体版|简体|简|簡)[）)]/.test(compact)) return "simplified";
    if (/[（(](繁體版|繁体版|繁體|繁体|繁)[）)]/.test(compact)) return "traditional";
    return "none";
  }
  function titlesExactlyMatch(left, right) {
    const a = left.replace(/\s+/g, " ").trim();
    const b = right.replace(/\s+/g, " ").trim();
    return Boolean(a) && a === b;
  }
  function titlesLooselyMatch(left, right) {
    const a = stripEditionSuffix(left);
    const b = stripEditionSuffix(right);
    return Boolean(a) && a === b;
  }
  function titlesCompatibleForBadge(shopTitle, needle) {
    if (titlesExactlyMatch(shopTitle, needle)) return "exact";
    if (!titlesLooselyMatch(shopTitle, needle)) return false;
    const shopEd = titleEdition(shopTitle);
    const needleEd = titleEdition(needle);
    if (shopEd !== "none" && needleEd !== "none") return shopEd === needleEd ? "same-edition" : false;
    return "loose";
  }
  function badgeNeedles(shopTitle, libraryTitle) {
    const shop = shopTitle?.replace(/\s+/g, " ").trim() || "";
    const library = libraryTitle?.replace(/\s+/g, " ").trim() || "";
    const shopOk = isUsableBadgeTitle(shop);
    const libraryOk = isUsableBadgeTitle(library);
    if (shopOk && libraryOk && titlesCompatibleForBadge(shop, library) === false) return [shop];
    const titles = [];
    if (shopOk) titles.push(shop);
    if (libraryOk && !titles.includes(library)) titles.push(library);
    return titles;
  }
  function isUsableBadgeTitle(text) {
    if (!text || text.length < 4) return false;
    return !/^(book\s*cover|cover|\d+\s*折)$/i.test(text);
  }
  var TITLE_HOST_SELECTOR = "h1, h2, h3, h4, .title, .book-title, .product-title, #productTitle";
  var INNER_TITLE_LINK = 'a[href*="/book/"], a[href*="/ebook/"], a[href*="/products/"], a[href*="/item/"]';
  function hrefOf(el) {
    return el?.getAttribute?.("href") || "";
  }
  function wdbookShopCard(el) {
    if (isWdbookShopCard(el)) return el;
    const root = el.getRootNode();
    if (isWdbookShopCard(root.host ?? null)) return root.host ?? null;
    return typeof el.closest === "function" ? el.closest(WDBOOK_SHOP_CARD_SELECTOR) : null;
  }
  function wdbookCardTitleBox(el) {
    const title = wdbookShopCard(el)?.shadowRoot?.querySelector(".title");
    return typeof HTMLElement === "function" && title instanceof HTMLElement ? title : title;
  }
  function listTitleBadgeHost(el) {
    const cardTitle = wdbookCardTitleBox(el);
    if (cardTitle) return cardTitle;
    const heading = el.closest(TITLE_HOST_SELECTOR);
    if (!heading) return el;
    const innerLinks = heading.querySelectorAll(INNER_TITLE_LINK);
    if (innerLinks.length === 1) return innerLinks[0];
    const onlyChild = heading.children.length === 1 ? heading.firstElementChild : null;
    if (onlyChild?.tagName === "A") {
      const href = hrefOf(onlyChild);
      if (href.includes("/book/") || href.includes("/ebook/") || href.includes("/products/") || href.includes("/item/")) {
        return onlyChild;
      }
    }
    return heading;
  }
  function titleNodeInListRow(row, needle) {
    const cardTitle = wdbookCardTitleBox(row);
    if (cardTitle && !isHiddenOrCloneLink(cardTitle) && !isDisplayHidden(cardTitle) && (!needle || titlesLooselyMatch(titlePlainText(cardTitle), needle))) {
      return cardTitle;
    }
    const query = typeof row.querySelectorAll === "function" ? row.querySelectorAll.bind(row) : null;
    if (!query) {
      const self2 = titlePlainText(row);
      if (isUsableBadgeTitle(self2) && (!needle || titlesLooselyMatch(self2, needle))) return row;
      return null;
    }
    const headings = [];
    for (const el of query(TITLE_HOST_SELECTOR)) {
      const text = titlePlainText(el);
      if (!isUsableBadgeTitle(text)) continue;
      if (needle && !titlesLooselyMatch(text, needle)) continue;
      headings.push(el);
    }
    if (headings.length) return headings[0];
    const links = [];
    for (const el of query('a[href*="/dp/"], a[href*="/book/"], a[href*="/ebook/"]')) {
      if (typeof el.querySelector === "function" && el.querySelector("wd-card")) continue;
      const text = titlePlainText(el);
      if (!isUsableBadgeTitle(text)) continue;
      if (needle && !titlesLooselyMatch(text, needle)) continue;
      links.push(el);
    }
    if (links.length) {
      return links.slice().sort((left, right) => titlePlainText(right).length - titlePlainText(left).length)[0];
    }
    const self = titlePlainText(row);
    if (isUsableBadgeTitle(self) && (!needle || titlesLooselyMatch(self, needle))) return row;
    return null;
  }
  function placeListTitleBadge(titleNode, badge) {
    const cardTitle = wdbookCardTitleBox(titleNode);
    if (cardTitle) {
      cardTitle.after(badge);
      if (badge instanceof HTMLElement) badge.style.setProperty("margin", "4px 0 2px");
      return;
    }
    const host = listTitleBadgeHost(titleNode);
    fitListTitleAroundBadge(titleNode);
    host.appendChild(badge);
  }
  function fitListTitleAroundBadge(el) {
    const apply = (node) => {
      if (!(node instanceof HTMLElement)) return;
      node.classList.add("ebook-cloud-title-host");
      node.style.setProperty("height", "auto", "important");
      node.style.setProperty("max-height", "none", "important");
      node.style.setProperty("min-height", "0", "important");
      node.style.setProperty("overflow", "visible", "important");
      node.style.setProperty("text-overflow", "unset", "important");
      node.style.setProperty("-webkit-line-clamp", "unset", "important");
      node.style.setProperty("-webkit-box-orient", "unset", "important");
      node.style.setProperty("display", "block", "important");
    };
    apply(el);
    const host = listTitleBadgeHost(el);
    if (host !== el) apply(host);
  }
  function classNameOf2(el) {
    return typeof el.className === "string" ? el.className : "";
  }
  function isCartActionText(text) {
    const compact = text.replace(/\s+/g, " ").trim();
    if (!compact) return false;
    if (/^(确定|取消|删除|移入收藏夹|全选)$/.test(compact)) return true;
    return compact.length < 40 && /是否确定删除/.test(compact);
  }
  function isCartUiChrome(el) {
    if (el.matches("button, [role='button'], input, textarea, select, option, [role='tooltip'], [role='dialog'], [role='alertdialog']")) {
      return true;
    }
    if (el.closest("button, [role='button'], [role='tooltip'], [role='dialog'], [role='alertdialog']")) return true;
    const marker = `${el.id} ${classNameOf2(el)}`;
    if (/popconfirm|popover|el-popper|el-popconfirm|el-tooltip|tooltip|popper|dialog/i.test(marker)) return true;
    if (el.closest(
      "[class*='popconfirm' i], [class*='el-popper'], [class*='el-popover'], [class*='el-popconfirm'], [class*='tooltip' i], [class*='popper' i]"
    )) {
      return true;
    }
    return isCartActionText(titlePlainText(el));
  }
  function parentElementOf(el) {
    const parent = el.parentNode;
    return parent instanceof Element ? parent : null;
  }
  function resolveCartTitleNode(from, needle, skip) {
    const ignore = (el) => Boolean(skip?.(el) || isCartUiChrome(el));
    const chain = [];
    let current = from;
    for (let depth = 0; depth < 12 && current; depth += 1) {
      if (current === document.body || current === document.documentElement) break;
      chain.push(current);
      current = parentElementOf(current);
    }
    for (const node of chain) {
      const roots = [node];
      if (node.shadowRoot) roots.push(node.shadowRoot);
      const leaves = preferCartTitleMatches(collectMatchingTitleLeaves(roots, needle || "", ignore), needle || "").filter(
        (el) => !ignore(el)
      );
      if (leaves[0]) return leaves[0];
    }
    return null;
  }
  function preferCartTitleMatches(nodes, needle) {
    const ranked = nodes.map((el) => ({ el, rank: titlesCompatibleForBadge(titlePlainText(el), needle) })).filter((row) => Boolean(row.rank));
    const exact = ranked.filter((row) => row.rank === "exact" || row.rank === "same-edition");
    if (exact.length) return exact.map((row) => row.el);
    return ranked.map((row) => row.el);
  }
  function collectMatchingTitleLeaves(roots, needle, skip) {
    const want = stripEditionSuffix(needle);
    if (!want) return [];
    const matches = [];
    for (const root of roots) {
      for (const el of root.querySelectorAll("*")) {
        if (skip?.(el)) continue;
        if (el.childElementCount > 6) continue;
        const text = titlePlainText(el);
        if (!text || text.length > needle.length + 32) continue;
        if (!titlesLooselyMatch(text, needle)) continue;
        matches.push(el);
      }
    }
    const unique = [...new Set(matches)];
    return unique.filter((el) => !unique.some((other) => other !== el && el.contains(other)));
  }
  function titlePlainText(node) {
    if (!node) return "";
    const raw = (node.textContent || "").replace(/\s+/g, " ").trim();
    return raw.replace(BADGE_WORDS, " ").replace(/\s+/g, " ").trim();
  }
  function isBreadcrumbOrPath(el) {
    const size = parseFloat(getComputedStyle(el).fontSize) || 0;
    if (size >= 18) return false;
    if (el.closest("nav, [aria-label*='breadcrumb' i], [class*='breadcrumb' i], [id*='breadcrumb' i], [class*='crumbs' i]")) {
      return true;
    }
    let node = el.parentElement;
    for (let depth = 0; depth < 3 && node; depth += 1, node = node.parentElement) {
      if (node === document.body || node === document.documentElement) break;
      const marker = `${node.id} ${typeof node.className === "string" ? node.className : ""}`;
      if (/breadcrumb|crumbs|el-breadcrumb|ant-breadcrumb|wd-breadcrumb|nav-path|page-path/i.test(marker)) return true;
      const text = (node.textContent || "").replace(/\s+/g, " ").trim();
      if (isShortPathTrail(text, titlePlainText(el))) return true;
    }
    return false;
  }

  // src/content/wdbookCart.ts
  var cached = [];
  function mergeWdbookCartProducts(list) {
    const byId = /* @__PURE__ */ new Map();
    const titleOnly = [];
    for (const product of list) {
      if (product.productId) {
        const prev = byId.get(product.productId);
        byId.set(product.productId, {
          productId: product.productId,
          title: product.title || prev?.title,
          author: product.author || prev?.author,
          ...product.resourceId || prev?.resourceId ? { resourceId: product.resourceId || prev?.resourceId } : {}
        });
      } else if (product.title) {
        titleOnly.push(product);
      }
    }
    const result = [...byId.values()];
    for (const product of titleOnly) {
      const compact = product.title.replace(/\s+/g, "");
      const match = result.find((row) => row.title && row.title.replace(/\s+/g, "") === compact);
      if (match) {
        match.author = match.author || product.author;
        continue;
      }
      if (!result.some((row) => row.title?.replace(/\s+/g, "") === compact)) result.push(product);
    }
    return result;
  }
  function setWdbookCartProducts(products) {
    cached = mergeWdbookCartProducts([...cached, ...products]);
  }
  function getWdbookCartProducts() {
    return cached;
  }
  function clearWdbookCartProducts() {
    cached = [];
  }
  function isWdbookHeaderCart(el) {
    return Boolean(el.closest("#cart-layer, .header-cart, #header .cart"));
  }
  function readTextField(rec, keys) {
    for (const key of keys) {
      const value = rec[key];
      if (typeof value === "string" && value.trim()) return value.trim();
    }
    return "";
  }
  function looksLikeProduct(rec) {
    const title = readTextField(rec, ["title", "name", "bookName", "productName", "bookTitle", "originalTitle"]);
    const author = readTextField(rec, ["author", "authors", "authorName", "writer"]);
    return Boolean(
      title || author || rec.cover != null || rec.currentPrice != null || rec.originalPrice != null || rec.resourceId != null || rec.resource_id != null
    );
  }
  function readId(value) {
    return value == null ? "" : String(value).trim();
  }
  function flattenWdbookCartProducts(payload) {
    const products = [];
    const seen = /* @__PURE__ */ new Set();
    const visiting = /* @__PURE__ */ new Set();
    const visit = (node, depth) => {
      if (!node || typeof node !== "object" || depth > 8) return;
      if (visiting.has(node)) return;
      visiting.add(node);
      if (Array.isArray(node)) {
        for (const item of node) visit(item, depth + 1);
        return;
      }
      const rec = node;
      const productId = readId(rec.productId ?? rec.product_id ?? rec.goodsId);
      const resourceId = readId(rec.resourceId ?? rec.resource_id);
      const title = readTextField(rec, ["title", "name", "bookName", "productName", "bookTitle", "originalTitle"]);
      const author = readTextField(rec, ["author", "authors", "authorName", "writer"]);
      const key = productId || (title ? `title:${title}` : "");
      if (key && looksLikeProduct(rec) && !seen.has(key)) {
        seen.add(key);
        products.push({
          productId,
          ...resourceId ? { resourceId } : {},
          title: title || void 0,
          author: author || void 0
        });
      }
      for (const value of Object.values(rec)) {
        if (value && typeof value === "object") visit(value, depth + 1);
      }
    };
    visit(payload, 0);
    return products;
  }
  function readStashedWdbookCart() {
    const holder = document.getElementById("ebook-cloud-wdbook-cart-json");
    if (!holder?.textContent) return [];
    try {
      return flattenWdbookCartProducts(JSON.parse(holder.textContent));
    } catch {
      return [];
    }
  }
  function allElements(root) {
    const result = [];
    const stack = [root];
    while (stack.length) {
      const node = stack.pop();
      for (const el of node.querySelectorAll("*")) {
        result.push(el);
        if (el.shadowRoot) stack.push(el.shadowRoot);
      }
    }
    return result;
  }
  function elementMatchesProductId(el, productId) {
    if (!productId) return false;
    if (el.getAttribute("data-product-id") === productId || el.getAttribute("data-readmoo-id") === productId || el.getAttribute("data-readmoo_id") === productId || el.getAttribute("productid") === productId || el.getAttribute("product-id") === productId) {
      return true;
    }
    if (el.getAttribute("value") === productId && el.matches("input[type='checkbox'], input[type='radio'], [role='checkbox']")) {
      return true;
    }
    return shopProductIdFromHref(el.getAttribute("href") || "") === productId;
  }
  function wdbookCartRowRoot(el) {
    if (isCartUiChrome(el)) {
      const row = el.closest("tr, [data-product-id], .cart-item") || (el.getRootNode() instanceof ShadowRoot ? el.getRootNode().host.closest("tr, [data-product-id], .cart-item") : null);
      if (row) return row;
    }
    const root = el.getRootNode();
    const host = root instanceof ShadowRoot ? root.host : el;
    return host.closest("wd-card") || el.closest("wd-card") || host.closest("tr") || el.closest("tr") || host.closest("[data-product-id], [data-readmoo-id], [data-readmoo_id], .cart-item") || el.closest("[data-product-id], [data-readmoo-id], [data-readmoo_id], .cart-item") || host.closest("a[href*='/dp/'], a[href*='/book/']") || el.closest("a[href*='/dp/'], a[href*='/book/']") || el;
  }
  function findSmallestElementWithText(root, title) {
    const needle = title.replace(/\s+/g, " ").trim();
    if (!needle) return null;
    let best = null;
    let bestRank = 0;
    let bestLen = Infinity;
    const rankOf = (rank) => rank === "exact" ? 3 : rank === "same-edition" ? 2 : rank === "loose" ? 1 : 0;
    const consider = (el) => {
      if (isWdbookHeaderCart(el) || isCartUiChrome(el)) return;
      const rank = rankOf(titlesCompatibleForBadge(titlePlainText(el), needle));
      if (!rank) return;
      const len = titlePlainText(el).length;
      if (rank > bestRank || rank === bestRank && len < bestLen) {
        best = el;
        bestRank = rank;
        bestLen = len;
      }
    };
    for (const el of allElements(root)) consider(el);
    return best;
  }
  function findWdbookCartHost(doc, productId, title) {
    if (productId) {
      for (const el of allElements(doc.documentElement)) {
        if (isWdbookHeaderCart(el) || isCartUiChrome(el)) continue;
        if (elementMatchesProductId(el, productId)) return wdbookCartRowRoot(el);
      }
    }
    return title?.trim() ? findSmallestElementWithText(doc, title.trim()) : null;
  }
  function visibleText(el) {
    const html = el;
    const inner = typeof html.innerText === "string" ? html.innerText : "";
    return (inner || el.textContent || "").replace(/\r/g, "");
  }
  function parseWdbookCartRowText(text) {
    const normalized = text.replace(/\s+/g, " ").trim();
    const hasPrice = /\$\s*\d/.test(normalized);
    const hasActions = /删除|移入收藏夹/.test(normalized);
    if (!hasPrice && !hasActions) return null;
    if (normalized.length > 400) return null;
    if (/是否确定删除/.test(normalized) && !hasPrice) return null;
    const lines = text.replace(/移入收藏夹|删除/g, "\n").replace(/\$\s*[0-9.]+/g, "\n").split(/\n+/).map(
      (line) => line.replace(/\s*(已在书库|可能已有)\s*/g, " ").replace(/\s+/g, " ").trim()
    ).filter(Boolean);
    const skip = /^(全选|书籍信息|金额|优惠券|操作|\/|移入收藏夹|删除|已在书库|可能已有|确定|取消|是否确定)$/;
    const useful = lines.filter(
      (line) => !skip.test(line) && !/是否确定删除/.test(line) && !/^\$/.test(line) && !/出版社$/.test(line) && !/^[0-9.]+折$/.test(line) && line.length >= 2 && line.length <= 80
    );
    if (!useful.length) return null;
    return { title: useful[0], author: useful[1] };
  }
  function collectWdbookVisibleCartRows(doc) {
    const candidates = [];
    const consider = (el) => {
      if (isWdbookHeaderCart(el) || isCartUiChrome(el)) return;
      const text = visibleText(el);
      if (text.length > 600) return;
      if (!parseWdbookCartRowText(text)?.title) return;
      candidates.push(el);
    };
    for (const el of allElements(doc.documentElement)) consider(el);
    for (const el of doc.querySelectorAll("*")) consider(el);
    const unique = [...new Set(candidates)];
    const best = /* @__PURE__ */ new Map();
    for (const host of unique) {
      const parsed = parseWdbookCartRowText(visibleText(host));
      if (!parsed?.title) continue;
      const len = visibleText(host).length;
      const prev = best.get(parsed.title);
      if (!prev || len < prev.len) best.set(parsed.title, { ...parsed, title: parsed.title, host, len });
    }
    return [...best.values()].map(({ title, author, host }) => ({ title, author, host }));
  }
  function matchWdbookProductByTitle(products, title) {
    const needle = title.replace(/\s+/g, " ").trim();
    if (!needle) return void 0;
    const ranked = products.map((product) => ({ product, rank: titlesCompatibleForBadge(product.title || "", needle) })).filter((row) => Boolean(row.rank));
    const exact = ranked.find((row) => row.rank === "exact") || ranked.find((row) => row.rank === "same-edition");
    if (exact) return exact.product;
    const loose = ranked.filter((row) => row.rank === "loose");
    return loose.length === 1 ? loose[0].product : void 0;
  }
  function collectWdbookCheckboxProducts(doc) {
    const products = [];
    const seen = /* @__PURE__ */ new Set();
    for (const input of doc.querySelectorAll("input[type=checkbox][value], [role=checkbox][value]")) {
      if (isWdbookHeaderCart(input)) continue;
      const productId = (input.getAttribute("value") || "").trim();
      if (!/^\d{4,}$/.test(productId) || seen.has(productId)) continue;
      seen.add(productId);
      products.push({ productId });
    }
    return products;
  }

  // src/content/adapters.ts
  function endaoBookId(url) {
    const match = url.pathname.match(/\/(?:[a-z]{2}(?:-[A-Z]{2})?\/)?book\/(\d+)/);
    return match?.[1];
  }
  function wdbookProductId(url) {
    const match = url.pathname.match(/\/dp\/([^/?#]+)/);
    return match?.[1];
  }
  function readmooBookId(url) {
    const match = url.pathname.match(/^\/book\/([^/?#]+)/);
    if (!match) return void 0;
    if (["category", "search", "list"].includes(match[1])) return void 0;
    return match[1];
  }
  function pubuProductId(url) {
    return url.pathname.match(/\/ebook\/([^/?#]+)/)?.[1];
  }
  function koboSlug(url) {
    return koboEbookSlug(url.pathname);
  }
  function amazonAsin(url) {
    const match = url.pathname.match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{8,10})/i);
    return match?.[1]?.toUpperCase();
  }
  function bookstwProductId(url) {
    return url.pathname.match(/\/products\/([A-Z0-9_-]+)/i)?.[1] ?? url.pathname.match(/\/item\/([A-Z0-9_-]+)/i)?.[1] ?? url.searchParams.get("item") ?? url.searchParams.get("id") ?? void 0;
  }
  function kingstoneProductId(url) {
    const fromPath = url.pathname.match(/\/basic\/(\d{13})(?:\/|$)/i)?.[1];
    if (fromPath) return fromPath;
    const query = url.searchParams.get("prodno") || url.searchParams.get("prod") || url.searchParams.get("pid");
    return query && /^\d{13}$/.test(query) ? query : void 0;
  }
  function googlebooksProductId(url) {
    const id = url.searchParams.get("id");
    if (id && /^[A-Za-z0-9_-]{6,}$/.test(id)) return id;
    const fromPath = url.pathname.match(/\/(?:books\/)?play\/[^/]+\/(?:read|preview)\/([A-Za-z0-9_-]{6,})/i)?.[1] || url.pathname.match(/\/books\/([A-Za-z0-9_-]{6,})(?:\/|$)/i)?.[1];
    return fromPath || void 0;
  }
  function wdbookBundleCardAnchors(doc, selfId) {
    const anchors = [];
    for (const anchor of doc.querySelectorAll('a[href*="/dp/"]')) {
      if (!anchor.querySelector("wd-list-card")) continue;
      let href;
      try {
        href = new URL(anchor.getAttribute("href") || "", doc.baseURI);
      } catch {
        continue;
      }
      const platformBookId = wdbookProductId(href);
      if (!platformBookId || platformBookId === selfId) continue;
      anchors.push(anchor);
    }
    return anchors;
  }
  function booksFromWdbookCartProducts(doc, products) {
    return products.map((product) => {
      if (!product.productId && !product.title) return null;
      const host = product.productId ? findWdbookCartHost(doc, product.productId, product.title) : product.title ? findWdbookCartHost(doc, "", product.title) : null;
      const book = makeBook("WDBOOK", "cart", {
        clientKey: product.productId ? `WDBOOK:cart:${product.productId}` : void 0,
        platformBookId: product.resourceId || product.productId || void 0,
        platformVersion: product.productId || void 0,
        title: product.title,
        author: product.author
      });
      if (book && host) book.root = markLookupTarget(host, book.clientKey, { exact: true });
      return book;
    });
  }
  var endao = {
    platform: "ENDAO",
    pageKind(url) {
      if (isCartPath(url.pathname)) return "cart";
      return endaoBookId(url) ? "detail" : "list";
    },
    extract(doc, url) {
      const kind = this.pageKind(url);
      if (kind === "detail") {
        const id = endaoBookId(url);
        const isbn = isbnFromDocument(doc);
        return uniqueBooks([
          makeBook("ENDAO", "detail", {
            platformBookId: id,
            title: titleFromDocument(doc),
            author: authorFromDocument(doc),
            root: markDocumentRoot(doc),
            ...isbn
          })
        ]);
      }
      return collectLinkBooks(
        doc,
        "ENDAO",
        kind,
        (href) => {
          const platformBookId = endaoBookId(href);
          return platformBookId ? { platformBookId } : null;
        },
        { selector: 'a[href*="/book/"]' }
      );
    }
  };
  var wdbook = {
    platform: "WDBOOK",
    pageKind(url, doc) {
      if (isCartPath(url.pathname)) return "cart";
      const id = wdbookProductId(url);
      if (!id) return "list";
      if (doc && wdbookBundleCardAnchors(doc, id).length) return "list";
      return "detail";
    },
    extract(doc, url) {
      const kind = this.pageKind(url, doc);
      if (kind === "detail") {
        const id = wdbookProductId(url);
        const isbn = isbnFromDocument(doc);
        return uniqueBooks([
          makeBook("WDBOOK", "detail", {
            platformBookId: id,
            title: titleFromDocument(doc),
            author: authorFromDocument(doc),
            root: markDocumentRoot(doc),
            ...isbn
          })
        ]);
      }
      const selfId = wdbookProductId(url);
      if (selfId) {
        const titleEl = firstVisibleDetailTitle(doc);
        const selfBook = makeBook("WDBOOK", kind, {
          platformBookId: selfId,
          title: titleFromDocument(doc),
          author: authorFromDocument(doc),
          root: titleEl ? void 0 : markDocumentRoot(doc)
        });
        if (selfBook && titleEl) selfBook.root = markLookupTarget(titleEl, selfBook.clientKey, { exact: true });
        const bundleBooks = wdbookBundleCardAnchors(doc, selfId).map((anchor) => {
          const meta = linkBookMeta(anchor);
          let href;
          try {
            href = new URL(anchor.getAttribute("href") || "", doc.baseURI);
          } catch {
            return null;
          }
          const book = makeBook("WDBOOK", kind, {
            platformBookId: wdbookProductId(href),
            title: meta.title,
            author: meta.author
          });
          const card = anchor.querySelector("wd-list-card");
          if (book && card) book.root = markLookupTarget(card, book.clientKey, { exact: true });
          return book;
        });
        return uniqueBooks([selfBook, ...bundleBooks]);
      }
      const fromLinks = collectLinkBooks(
        doc,
        "WDBOOK",
        kind,
        (href) => {
          const platformBookId = wdbookProductId(href);
          return platformBookId ? { platformBookId } : null;
        },
        kind === "cart" ? { skip: isWdbookHeaderCart } : void 0
      );
      if (kind !== "cart") return fromLinks;
      const cartAnchors = [...doc.querySelectorAll("a[href*='/dp/']")].filter((anchor) => !isWdbookHeaderCart(anchor));
      const fromCart = cartAnchors.map((anchor) => {
        let href;
        try {
          href = new URL(anchor.getAttribute("href") || "", doc.baseURI);
        } catch {
          return null;
        }
        const platformBookId = wdbookProductId(href);
        if (!platformBookId) return null;
        const item = anchor.closest("li, tr, article, .item, .product, .cart-item") || anchor;
        const meta = linkBookMeta(anchor);
        const book = makeBook("WDBOOK", "cart", {
          platformBookId,
          platformVersion: platformBookId,
          title: meta.title || textOf(item.querySelector(".title, .product-info .title")),
          author: meta.author || textOf(item.querySelector(".author, .product-info .author")) || void 0
        });
        const host = findWdbookCartHost(doc, platformBookId, book?.title) || item;
        if (book) book.root = markLookupTarget(host, book.clientKey, { exact: true });
        return book;
      });
      const fromPayload = booksFromWdbookCartProducts(doc, getWdbookCartProducts());
      const fromCheckboxes = booksFromWdbookCartProducts(doc, collectWdbookCheckboxProducts(doc));
      const payload = getWdbookCartProducts();
      const fromVisible = collectWdbookVisibleCartRows(doc).map((row) => {
        const matched = matchWdbookProductByTitle(payload, row.title);
        const book = makeBook("WDBOOK", "cart", {
          clientKey: matched ? `WDBOOK:cart:${matched.productId}` : void 0,
          platformBookId: matched?.resourceId || matched?.productId || void 0,
          platformVersion: matched?.productId || void 0,
          title: row.title,
          author: row.author || matched?.author
        });
        if (book) book.root = markLookupTarget(row.host, book.clientKey, { exact: true });
        return book;
      });
      const fromDataAttrs = [...doc.querySelectorAll("[data-product-id]")].map((node) => {
        if (isWdbookHeaderCart(node)) return null;
        const platformBookId = (node.dataset.productId || "").trim();
        if (!platformBookId) return null;
        const host = findWdbookCartHost(doc, platformBookId, textOf(node));
        const book = makeBook("WDBOOK", "cart", {
          clientKey: `WDBOOK:cart:${platformBookId}`,
          platformBookId,
          title: textOf(node.querySelector(".title, .product-info .title")) || void 0,
          author: textOf(node.querySelector(".author, .product-info .author")) || void 0
        });
        if (book && host) book.root = markLookupTarget(host, book.clientKey, { exact: true });
        return book;
      });
      return uniqueBooks([...fromVisible, ...fromPayload, ...fromCheckboxes, ...fromCart, ...fromDataAttrs, ...fromLinks]);
    }
  };
  var readmoo = {
    platform: "READMOO",
    pageKind(url) {
      if (isCartPath(url.pathname)) return "cart";
      return readmooBookId(url) ? "detail" : "list";
    },
    extract(doc, url) {
      const kind = this.pageKind(url);
      if (kind === "detail") {
        const isbn = isbnFromDocument(doc);
        return uniqueBooks([
          makeBook("READMOO", "detail", {
            platformBookId: readmooBookId(url),
            title: titleFromDocument(doc),
            author: authorFromDocument(doc),
            root: markDocumentRoot(doc),
            ...isbn
          })
        ]);
      }
      const tab = kind === "cart" ? readmooCheckoutTab(url.hash) : "cart";
      const fromLinks = collectLinkBooks(
        doc,
        "READMOO",
        kind,
        (href) => {
          const platformBookId = readmooBookId(href);
          return platformBookId ? { platformBookId } : null;
        },
        {
          selector: 'a[href*="/book/"]',
          skip: kind === "cart" ? (el) => !shouldExtractReadmooCheckoutNode(el, tab) : void 0,
          markTargets: kind !== "cart"
        }
      );
      if (kind !== "cart") return fromLinks;
      const fromIds = [...doc.querySelectorAll("[data-readmoo-id], [data-readmoo_id]")].map((node) => {
        if (!shouldExtractReadmooCheckoutNode(node, tab)) return null;
        const platformBookId = (node.getAttribute("data-readmoo-id") || node.getAttribute("data-readmoo_id") || "").trim();
        if (!platformBookId) return null;
        const host = node.closest("li, tr, article, [class*='item' i]") || node;
        return makeBook("READMOO", "cart", {
          platformBookId,
          title: node.getAttribute("data-title") || textOf(host.querySelector("h3, h4, .title, .book-title, a[href*='/book/']")) || node.getAttribute("aria-label") || void 0,
          author: textOf(host.querySelector(".contributor-info, .author, .book-author")) || void 0
        });
      });
      return uniqueBooks([...fromLinks, ...fromIds]);
    }
  };
  var pubu = {
    platform: "PUBU",
    pageKind(url) {
      if (isCartPath(url.pathname)) return "cart";
      return pubuProductId(url) ? "detail" : "list";
    },
    extract(doc, url) {
      const kind = this.pageKind(url);
      if (kind === "detail") {
        const isbn = isbnFromDocument(doc);
        return uniqueBooks([
          makeBook("PUBU", "detail", {
            platformBookId: pubuProductId(url),
            title: titleFromDocument(doc),
            author: authorFromDocument(doc),
            root: markDocumentRoot(doc),
            ...isbn
          })
        ]);
      }
      return collectLinkBooks(
        doc,
        "PUBU",
        kind,
        (href) => {
          const platformBookId = pubuProductId(href);
          return platformBookId ? { platformBookId } : null;
        },
        {
          skip: kind === "cart" ? (el) => !isPubuCartLine(el) : void 0,
          markTargets: kind !== "cart"
        }
      );
    }
  };
  var kobo = {
    platform: "KOBO",
    pageKind(url) {
      if (isCartPath(url.pathname) || /\/cart\//i.test(url.pathname)) return "cart";
      return koboSlug(url) ? "detail" : "list";
    },
    extract(doc, url) {
      const kind = this.pageKind(url) === "cart" || koboCartUiOpen(doc) ? "cart" : this.pageKind(url);
      if (kind === "detail") {
        const slug2 = koboSlug(url);
        const productNode = doc.querySelector(
          "[data-kobo-product-id], [data-track-product-id], [data-product-id]"
        );
        const productId = productNode?.dataset.koboProductId || productNode?.getAttribute("data-track-product-id") || productNode?.dataset.productId;
        const isbn2 = isbnFromDocument(doc);
        const bookId2 = isbnFromKoboBookId(doc);
        return uniqueBooks([
          makeBook("KOBO", "detail", {
            platformBookId: productId || slug2,
            platformVersion: slug2,
            title: titleFromDocument(doc),
            author: authorFromDocument(doc),
            root: markDocumentRoot(doc),
            isbn: isbn2.isbn || bookId2.isbn,
            eisbn: isbn2.eisbn
          })
        ]);
      }
      const fromCart = uniqueBooks([
        ...collectLinkBooks(
          doc,
          "KOBO",
          kind,
          (href) => {
            const slug2 = koboSlug(href);
            return slug2 ? { platformBookId: slug2, platformVersion: slug2 } : null;
          },
          {
            skip: kind === "cart" ? (el) => !isKoboCartLine(el) : void 0,
            selector: 'a[href*="/ebook/"]',
            markTargets: kind !== "cart",
            query: kind === "cart" ? (sel) => queryAllDeep(doc, sel) : void 0
          }
        ),
        ...kind === "cart" ? koboCartTitleOnlyBooks(doc) : []
      ]);
      if (fromCart.length || kind !== "cart") return fromCart;
      const slug = koboSlug(url);
      if (!slug) return fromCart;
      const isbn = isbnFromDocument(doc);
      const bookId = isbnFromKoboBookId(doc);
      return uniqueBooks([
        makeBook("KOBO", "cart", {
          platformBookId: slug,
          platformVersion: slug,
          title: titleFromDocument(doc),
          isbn: isbn.isbn || bookId.isbn,
          eisbn: isbn.eisbn
        })
      ]);
    }
  };
  function koboCartTitleOnlyBooks(doc) {
    return koboCartTitleAnchors(doc).map((el) => {
      const title = koboLineTitle(el);
      const link = (el.tagName === "A" ? el : null) || el.closest("a[href*='/ebook/']") || el.querySelector("a[href*='/ebook/']");
      const slug = koboEbookSlug(link?.getAttribute("href") || "");
      return makeBook("KOBO", "cart", {
        platformBookId: slug,
        platformVersion: slug,
        title
      });
    });
  }
  var amazon = {
    platform: "AMAZON",
    pageKind(url) {
      if (isCartPath(url.pathname) || /\/gp\/cart/i.test(url.pathname)) return "cart";
      return amazonAsin(url) ? "detail" : "list";
    },
    extract(doc, url) {
      const kind = this.pageKind(url);
      if (kind === "detail") {
        const isbn = isbnFromDocument(doc);
        return uniqueBooks([
          makeBook("AMAZON", "detail", {
            platformBookId: amazonAsin(url),
            title: titleFromDocument(doc),
            author: authorFromDocument(doc),
            root: markDocumentRoot(doc),
            ...isbn
          })
        ]);
      }
      const fromAsinNodes = [...doc.querySelectorAll("[data-asin]")].map((node) => {
        const asin = (node.dataset.asin || "").toUpperCase();
        if (!asin || asin.length < 8) return null;
        const book = makeBook("AMAZON", kind, {
          platformBookId: asin,
          title: textOf(node.querySelector("h2, h3, .a-truncate-cut, .sc-product-title")) || textOf(node.querySelector("a"))
        });
        if (book) book.root = markLookupTarget(node, book.clientKey);
        return book;
      });
      return uniqueBooks([
        ...fromAsinNodes,
        ...collectLinkBooks(doc, "AMAZON", kind, (href) => {
          const platformBookId = amazonAsin(href);
          return platformBookId ? { platformBookId } : null;
        })
      ]);
    }
  };
  var bookstw = {
    platform: "BOOKSTW",
    pageKind(url) {
      if (isBookstwCartHref(url)) return "cart";
      return bookstwProductId(url) ? "detail" : "list";
    },
    extract(doc, url) {
      const kind = this.pageKind(url);
      if (kind === "detail") {
        return uniqueBooks([
          makeBook("BOOKSTW", "detail", {
            platformBookId: bookstwProductId(url),
            title: titleFromDocument(doc),
            author: authorFromDocument(doc),
            root: markDocumentRoot(doc),
            ...isbnFromDocument(doc)
          })
        ]);
      }
      if (kind === "cart") {
        const fromLinks = collectLinkBooks(doc, "BOOKSTW", kind, (href) => {
          const platformBookId = bookstwProductId(href);
          return platformBookId ? { platformBookId } : null;
        }, {
          skip: (el) => !isBookstwCartLine(el),
          selector: BOOKSTW_PRODUCT_LINK_SELECTOR
        });
        const fromAnchors = bookstwCartTitleAnchors(doc).map((anchor) => {
          let href;
          try {
            href = new URL(anchor.getAttribute("href") || "", doc.baseURI);
          } catch {
            return null;
          }
          const platformBookId = bookstwProductId(href);
          if (!platformBookId) return null;
          const item = anchor.closest("li, tr, .item, .cart-item, .product, article") || anchor;
          const meta = linkBookMeta(anchor);
          const book = makeBook("BOOKSTW", "cart", {
            platformBookId,
            title: meta.title || textOf(item.querySelector(".title, .product-title, .book-title, h3, h4")),
            author: meta.author || textOf(item.querySelector(".author, .book-author, .contributor"))
          });
          if (book) book.root = markLookupTarget(item, book.clientKey, { exact: true });
          return book;
        });
        return uniqueBooks([...fromLinks, ...fromAnchors]);
      }
      return collectLinkBooks(doc, "BOOKSTW", kind, (href) => {
        const platformBookId = bookstwProductId(href);
        return platformBookId ? { platformBookId } : null;
      }, { selector: BOOKSTW_PRODUCT_LINK_SELECTOR, skip: isBookstwSearchChrome });
    }
  };
  var kingstone = {
    platform: "KINGSTONE",
    pageKind(url) {
      if (isKingstoneCartHref(url)) return "cart";
      return kingstoneProductId(url) ? "detail" : "list";
    },
    extract(doc, url) {
      const kind = this.pageKind(url);
      if (kind === "detail") {
        const id = kingstoneProductId(url);
        const isbn = isbnFromDocument(doc);
        return uniqueBooks([
          makeBook("KINGSTONE", "detail", {
            platformBookId: id,
            title: titleFromDocument(doc),
            author: authorFromDocument(doc),
            root: markDocumentRoot(doc),
            ...isbn
          })
        ]);
      }
      const selector = 'a[href*="/basic/"]';
      return collectLinkBooks(doc, "KINGSTONE", kind, (href) => {
        const platformBookId = kingstoneProductId(href);
        return platformBookId ? { platformBookId } : null;
      }, { selector });
    }
  };
  var googlebooks = {
    platform: "GOOGLEBOOKS",
    pageKind(url) {
      if (isGooglebooksCartHref(url)) return "cart";
      return googlebooksProductId(url) ? "detail" : "list";
    },
    extract(doc, url) {
      const kind = this.pageKind(url);
      if (kind === "detail") {
        const id = googlebooksProductId(url);
        const isbn = isbnFromDocument(doc);
        return uniqueBooks([
          makeBook("GOOGLEBOOKS", "detail", {
            platformBookId: id,
            title: titleFromDocument(doc),
            author: authorFromDocument(doc),
            root: markDocumentRoot(doc),
            ...isbn
          })
        ]);
      }
      const selector = 'a[href*="id="], a[href*="/books/"]';
      return collectLinkBooks(doc, "GOOGLEBOOKS", kind, (href) => {
        const platformBookId = googlebooksProductId(href);
        return platformBookId ? { platformBookId } : null;
      }, { selector });
    }
  };
  var adapters = {
    ENDAO: endao,
    WDBOOK: wdbook,
    READMOO: readmoo,
    PUBU: pubu,
    KOBO: kobo,
    AMAZON: amazon,
    BOOKSTW: bookstw,
    KINGSTONE: kingstone,
    GOOGLEBOOKS: googlebooks
  };
  function getAdapter(platform) {
    return adapters[platform];
  }

  // src/content/overlay.ts
  var BADGE_ATTR = "data-ebook-cloud-badge";
  var BANNER_ID = "ebook-cloud-detail-banner";
  var TOAST_ID = "ebook-cloud-auth-toast";
  var CART_DRAWER_ID = "ebook-cloud-cart-summary";
  var CART_PILL_LAYER_ID = "ebook-cloud-cart-pills";
  var APPLY_EVENT = "ebook-cloud-apply-badges";
  var STYLE_ATTR = "data-ebook-cloud-style";
  var INLINE_BADGE_STYLE = 'position:static!important;display:inline-flex;align-items:center;width:max-content;max-width:max-content;flex:0 0 auto;align-self:flex-start;white-space:nowrap;margin:0 0 0 8px;padding:1px 6px;font:11px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;vertical-align:middle;top:auto;right:auto;border-radius:999px;color:#fff;background:#0f766e';
  var DETAIL_BADGE_STYLE = 'position:static!important;display:inline-flex;align-items:center;width:max-content;max-width:max-content;flex:0 0 auto;align-self:center;white-space:nowrap;margin:0 0 0 10px;padding:3px 10px;font:600 14px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;vertical-align:middle;top:auto;right:auto;border-radius:999px;color:#fff;background:#0f766e';
  var BADGE_CSS = `.ebook-cloud-badge{display:inline-flex;align-items:center;width:max-content;max-width:max-content;flex:0 0 auto;align-self:flex-start;white-space:nowrap;margin:0 0 0 8px;padding:1px 6px;border-radius:999px;font:11px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#fff;vertical-align:middle;position:static!important;top:auto;right:auto}
.ebook-cloud-badge--high{background:#0f766e}
.ebook-cloud-badge--possible{background:#b45309}
.ebook-cloud-badge--detail{margin:0 0 0 10px;padding:3px 10px;font:600 14px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}`;
  var DRAWER_RESTORE_MS = 250;
  var DRAWER_HEARTBEAT_MS = 1500;
  var EVICTION_WINDOW_MS = 2e3;
  var EVICTION_FLIP_AFTER = 2;
  var cartDrawerCollapsed = false;
  var lastCartSummary = null;
  var lastDrawerSignature = "";
  var cartDrawerRoot = null;
  var cartDrawerWatch = 0;
  var cartDrawerRestoreTimer = 0;
  var cartDrawerGuard = null;
  var cartDrawerMount = defaultCartDrawerMount(location.hostname);
  var cartDrawerEvictions = 0;
  var cartDrawerEvictionStarted = 0;
  var overlayHostGuard = null;
  var cartPillLayer = null;
  var cartPillRaf = 0;
  var cartPillTimer = 0;
  var cartPillFollow = false;
  var cartPillJobs = [];
  var CART_DRAWER_HOST_STYLE = "all:initial;position:fixed!important;top:96px!important;right:0!important;z-index:2147483647!important;display:block!important;visibility:visible!important;opacity:1!important;pointer-events:none!important;width:auto!important;height:auto!important;max-width:none!important;max-height:none!important;overflow:visible!important;";
  var CART_DRAWER_SHADOW_CSS = `.ebook-cloud-cart-drawer{position:static;display:flex;flex-direction:row;align-items:flex-start;font:13px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#fff;pointer-events:none}
.ebook-cloud-cart-drawer__tab,.ebook-cloud-cart-drawer__panel,.ebook-cloud-cart-drawer__close{pointer-events:auto}
.ebook-cloud-cart-drawer__tab{writing-mode:vertical-rl;letter-spacing:.12em;border:0;border-radius:8px 0 0 8px;padding:12px 8px;background:#0f766e;color:#fff;font:inherit;cursor:pointer}
.ebook-cloud-cart-drawer__panel{width:260px;max-height:calc(100vh - 120px);overflow:auto;background:#0f766e;border-radius:8px 0 0 8px;padding:12px 14px 14px;box-shadow:-6px 4px 20px rgba(0,0,0,.18)}
.ebook-cloud-cart-drawer.is-collapsed .ebook-cloud-cart-drawer__panel{display:none}
.ebook-cloud-cart-drawer:not(.is-collapsed) .ebook-cloud-cart-drawer__tab{display:none}
.ebook-cloud-cart-drawer__head{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:8px;font-weight:600}
.ebook-cloud-cart-drawer__close{border:0;background:transparent;color:#fff;font-size:18px;line-height:1;cursor:pointer;padding:0 2px}
.ebook-cloud-cart-drawer__list{margin:0;padding-left:18px}
.ebook-cloud-cart-drawer__list li + li{margin-top:6px}`;
  var CART_PILL_LAYER_STYLE = "all:initial;position:fixed!important;inset:0!important;z-index:2147483646!important;pointer-events:none!important;display:block!important;";
  var CART_PILL_SHADOW_CSS = `.ebook-cloud-float-pill{position:fixed;display:inline-flex;align-items:center;padding:1px 6px;border-radius:999px;font:11px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#fff;white-space:nowrap;pointer-events:none}
.ebook-cloud-float-pill--high{background:#0f766e}
.ebook-cloud-float-pill--possible{background:#b45309}
.ebook-cloud-float-pill--detail{padding:3px 10px;font:600 14px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}`;
  function drawerParent() {
    if (cartDrawerMount === "body" && document.body) return document.body;
    return document.documentElement;
  }
  function resetCartDrawerMount() {
    cartDrawerMount = defaultCartDrawerMount(location.hostname);
    cartDrawerEvictions = 0;
    cartDrawerEvictionStarted = 0;
  }
  function mutationRemovedDrawer(mutations) {
    return mutations.some(
      (mutation) => [...mutation.removedNodes].some(
        (node) => node === cartDrawerRoot || node instanceof Element && node.id === CART_DRAWER_ID
      )
    );
  }
  function noteDrawerEvicted() {
    const now = Date.now();
    if (now - cartDrawerEvictionStarted > EVICTION_WINDOW_MS) {
      cartDrawerEvictionStarted = now;
      cartDrawerEvictions = 0;
    }
    cartDrawerEvictions += 1;
    if (cartDrawerEvictions >= EVICTION_FLIP_AFTER) {
      const next = nextCartDrawerMount(location.hostname, cartDrawerMount);
      if (next) {
        cartDrawerMount = next;
        cartDrawerEvictions = 0;
        cartDrawerEvictionStarted = now;
        attachCartDrawerGuard();
      }
    }
  }
  function scheduleDrawerRestore() {
    if (cartDrawerRestoreTimer) return;
    cartDrawerRestoreTimer = window.setTimeout(() => {
      cartDrawerRestoreTimer = 0;
      restoreCartDrawerIfMissing();
    }, DRAWER_RESTORE_MS);
  }
  function attachCartDrawerGuard() {
    cartDrawerGuard?.disconnect();
    cartDrawerGuard = new MutationObserver((mutations) => {
      if (!mutationRemovedDrawer(mutations)) return;
      noteDrawerEvicted();
      if (cartDrawerMount === "body") {
        restoreCartDrawerIfMissing();
        requestAnimationFrame(() => restoreCartDrawerIfMissing());
      } else scheduleDrawerRestore();
    });
    cartDrawerGuard.observe(drawerParent(), { childList: true, subtree: false });
  }
  function stopCartDrawerWatch() {
    if (cartDrawerWatch) {
      window.clearInterval(cartDrawerWatch);
      cartDrawerWatch = 0;
    }
    if (cartDrawerRestoreTimer) {
      window.clearTimeout(cartDrawerRestoreTimer);
      cartDrawerRestoreTimer = 0;
    }
    cartDrawerGuard?.disconnect();
    cartDrawerGuard = null;
  }
  function startCartDrawerWatch() {
    attachCartDrawerGuard();
    if (cartDrawerMount === "html") return;
    if (!cartDrawerWatch) {
      cartDrawerWatch = window.setInterval(() => restoreCartDrawerIfMissing(), DRAWER_HEARTBEAT_MS);
    }
  }
  function ensureCartDrawerHost() {
    const parent = drawerParent();
    if (cartDrawerRoot?.shadowRoot) {
      if (cartDrawerRoot.parentNode !== parent) parent.appendChild(cartDrawerRoot);
      cartDrawerRoot.style.cssText = CART_DRAWER_HOST_STYLE;
      return cartDrawerRoot;
    }
    cartDrawerRoot?.remove();
    const host = document.createElement("div");
    host.id = CART_DRAWER_ID;
    host.setAttribute("data-ebook-cloud-ui", "cart-drawer");
    host.style.cssText = CART_DRAWER_HOST_STYLE;
    const shadow = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = CART_DRAWER_SHADOW_CSS;
    const box = document.createElement("div");
    box.className = "ebook-cloud-cart-drawer";
    shadow.append(style, box);
    parent.appendChild(host);
    cartDrawerRoot = host;
    return host;
  }
  function nodeClientRect(node) {
    try {
      if (node instanceof Element) {
        const box = node.getBoundingClientRect();
        return box.width > 0 && box.height > 0 ? box : null;
      }
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const rects = range.getClientRects();
        const box = rects[rects.length - 1];
        return box && box.width > 0 && box.height > 0 ? box : null;
      }
    } catch {
    }
    return null;
  }
  function followingIdRectInParent(parent, after) {
    const kids = [...parent.childNodes];
    const startIdx = kids.findIndex((n) => n === after || n instanceof Element && n.contains(after));
    if (startIdx < 0) return null;
    let last = null;
    for (let i = startIdx + 1; i < kids.length; i++) {
      const node = kids[i];
      const text = (node.textContent || "").replace(/\s+/g, " ").trim();
      if (!text) continue;
      if (!isPubuCartIdText(text)) break;
      const box = nodeClientRect(node);
      if (box) last = box;
    }
    return last;
  }
  function followingPubuIdRect(el) {
    let scope = el.parentElement;
    for (let depth = 0; depth < 3 && scope; depth += 1) {
      const last = followingIdRectInParent(scope, el);
      if (last) return last;
      scope = scope.parentElement;
    }
    return null;
  }
  function pillAnchorRect(el) {
    const titleBox = lastVisibleTextRect(el);
    if (!titleBox) return null;
    if (overlayCartKind() !== "pubu") return titleBox;
    const idBox = followingPubuIdRect(el);
    if (!idBox) {
      return new DOMRect(titleBox.x, titleBox.y, titleBox.width + 36, titleBox.height);
    }
    const left = Math.min(titleBox.left, idBox.left);
    const top = Math.min(titleBox.top, idBox.top);
    const right = Math.max(titleBox.right, idBox.right);
    const bottom = Math.max(titleBox.bottom, idBox.bottom);
    return new DOMRect(left, top, right - left, bottom - top);
  }
  function lastVisibleTextRect(el) {
    try {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let last = null;
      let node = walker.nextNode();
      while (node) {
        if (node.textContent?.trim()) {
          const range = document.createRange();
          range.selectNodeContents(node);
          const rects = range.getClientRects();
          const box2 = rects[rects.length - 1];
          if (box2 && box2.width > 0 && box2.height > 0) last = box2;
        }
        node = walker.nextNode();
      }
      if (last) return last;
    } catch {
    }
    const box = el.getBoundingClientRect();
    return box.width > 0 && box.height > 0 ? box : null;
  }
  function readmooAnchorMatches(el, result, book) {
    const productId = book?.platformVersion || book?.platformBookId;
    const hrefId = shopProductIdFromHref(el.getAttribute("href") || "");
    const nodeId = el.getAttribute("data-readmoo-id") || el.getAttribute("data-readmoo_id") || "";
    if (productId && (hrefId === productId || nodeId === productId)) return true;
    const text = `${el.getAttribute("title") || ""} ${el.textContent || ""}`.replace(/\s+/g, " ").trim();
    return badgeNeedles(book?.title, result.matches[0]?.bookName).some(
      (needle) => titlesCompatibleForBadge(text, needle) !== false || titlesLooselyMatch(text, needle)
    );
  }
  function usesDetailFloatPill() {
    const platform = detectPlatform(new URL(location.href), document);
    return platform === "READMOO" || platform === "KOBO" || platform === "BOOKSTW" || platform === "KINGSTONE";
  }
  function overlayCartKind() {
    const url = new URL(location.href);
    if (isReadmooCheckoutHref(url)) return "readmoo";
    if (isPubuCartHref(url)) return "pubu";
    if (isKoboCartHref(url) || detectPlatform(url, document) === "KOBO" && koboCartUiOpen(document)) return "kobo";
    if (isBookstwCartHref(url)) return "bookstw";
    return null;
  }
  function pubuAnchorMatches(el, result, book) {
    const productId = book?.platformVersion || book?.platformBookId;
    const hrefId = shopProductIdFromHref(el.getAttribute("href") || "");
    if (productId && hrefId === productId) return true;
    const text = `${el.getAttribute("title") || ""} ${el.textContent || ""}`.replace(/\s+/g, " ").trim();
    return badgeNeedles(book?.title, result.matches[0]?.bookName).some(
      (needle) => titlesCompatibleForBadge(text, needle) !== false || titlesLooselyMatch(text, needle)
    );
  }
  function overlayCartAnchors() {
    const kind = overlayCartKind();
    if (kind === "readmoo") return readmooCheckoutTitleAnchors(document, readmooCheckoutTab(location.hash));
    if (kind === "pubu") return pubuCartTitleAnchors(document);
    if (kind === "kobo") return koboCartTitleAnchors(document);
    if (kind === "bookstw") return bookstwCartTitleAnchors(document);
    return [];
  }
  function overlayCartAnchorMatches(el, result, book) {
    if (overlayCartKind() === "pubu" || overlayCartKind() === "kobo" || overlayCartKind() === "bookstw") return pubuAnchorMatches(el, result, book);
    return readmooAnchorMatches(el, result, book);
  }
  function overlayCartTitleFace(el) {
    if (overlayCartKind() === "readmoo") return readmooCheckoutTitleFace(el);
    return el;
  }
  function overlayWantsBodyHost() {
    if (overlayCartKind() === "pubu" || overlayCartKind() === "bookstw") return true;
    try {
      return detectPlatform(new URL(location.href), document) === "KOBO";
    } catch {
      return false;
    }
  }
  function pillLayerParent() {
    if (overlayWantsBodyHost()) return drawerParent();
    return document.documentElement;
  }
  function attachOverlayHostGuard() {
    overlayHostGuard?.disconnect();
    const parent = pillLayerParent();
    overlayHostGuard = new MutationObserver((mutations) => {
      const lost = mutations.some(
        (mutation) => [...mutation.removedNodes].some(
          (node) => node === cartPillLayer || node instanceof Element && node.id === CART_PILL_LAYER_ID
        )
      );
      if (!lost) return;
      noteDrawerEvicted();
      ensureCartPillLayer();
    });
    overlayHostGuard.observe(parent, { childList: true, subtree: false });
  }
  function ensureCartPillLayer() {
    const parent = pillLayerParent();
    if (cartPillLayer?.shadowRoot) {
      if (cartPillLayer.parentNode !== parent) {
        overlayHostGuard?.disconnect();
        parent.appendChild(cartPillLayer);
      }
      cartPillLayer.style.cssText = CART_PILL_LAYER_STYLE;
      attachOverlayHostGuard();
      return cartPillLayer;
    }
    cartPillLayer?.remove();
    const host = document.createElement("div");
    host.id = CART_PILL_LAYER_ID;
    host.setAttribute("data-ebook-cloud-ui", "cart-pills");
    host.style.cssText = CART_PILL_LAYER_STYLE;
    const shadow = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = CART_PILL_SHADOW_CSS;
    shadow.append(style);
    parent.appendChild(host);
    cartPillLayer = host;
    attachOverlayHostGuard();
    return host;
  }
  function layoutReadmooCheckoutPills() {
    const gap = overlayCartKind() === "pubu" || overlayCartKind() === "bookstw" ? 12 : 8;
    const koboFallback = detectPlatform(new URL(location.href), document) === "KOBO";
    for (const job of cartPillJobs) {
      const box = job.target?.isConnected ? pillAnchorRect(job.target) : null;
      if (!box) {
        if (koboFallback) {
          placeKoboFallbackPill(job.el, overlayCartKind() === "kobo");
          continue;
        }
        job.el.style.visibility = "hidden";
        continue;
      }
      job.el.style.visibility = "visible";
      const pillH = job.el.classList.contains("ebook-cloud-float-pill--detail") ? 22 : 18;
      job.el.style.left = `${Math.round(box.right + gap)}px`;
      job.el.style.top = `${Math.round(box.top + Math.max(0, (box.height - pillH) / 2))}px`;
    }
  }
  function placeKoboFallbackPill(el, cart) {
    el.style.visibility = "visible";
    if (cart) {
      el.style.left = "280px";
      el.style.top = "168px";
      return;
    }
    const left = Math.round(Math.min(Math.max(window.innerWidth * 0.38, 320), 640));
    el.style.left = `${left}px`;
    el.style.top = "168px";
  }
  function scheduleReadmooCheckoutPillLayout() {
    if (cartPillRaf) return;
    cartPillRaf = window.requestAnimationFrame(() => {
      cartPillRaf = 0;
      layoutReadmooCheckoutPills();
    });
  }
  function retargetReadmooCheckoutPills() {
    if (!overlayCartKind()) {
      for (const job of cartPillJobs) {
        const needle = job.book?.title || job.result.matches[0]?.bookName;
        job.target = firstVisibleDetailTitle(document) || findDetailTitleNode(needle);
      }
      return;
    }
    const anchors = overlayCartAnchors();
    for (const job of cartPillJobs) {
      if (job.target?.isConnected && overlayCartAnchorMatches(job.target, job.result, job.book)) continue;
      const next = anchors.find((el) => overlayCartAnchorMatches(el, job.result, job.book)) || null;
      job.target = next ? overlayCartTitleFace(next) : null;
    }
  }
  function stopReadmooCheckoutPills() {
    if (cartPillFollow) {
      window.removeEventListener("scroll", scheduleReadmooCheckoutPillLayout, true);
      window.removeEventListener("resize", scheduleReadmooCheckoutPillLayout);
      cartPillFollow = false;
    }
    if (cartPillRaf) {
      window.cancelAnimationFrame(cartPillRaf);
      cartPillRaf = 0;
    }
    if (cartPillTimer) {
      window.clearInterval(cartPillTimer);
      cartPillTimer = 0;
    }
    cartPillJobs = [];
    cartPillLayer?.remove();
    cartPillLayer = null;
    document.getElementById(CART_PILL_LAYER_ID)?.remove();
    if (!lastCartSummary?.length) {
      overlayHostGuard?.disconnect();
      overlayHostGuard = null;
    }
  }
  function startReadmooCheckoutPillFollow() {
    if (!cartPillFollow) {
      cartPillFollow = true;
      window.addEventListener("scroll", scheduleReadmooCheckoutPillLayout, true);
      window.addEventListener("resize", scheduleReadmooCheckoutPillLayout);
    }
    if (!cartPillTimer) {
      cartPillTimer = window.setInterval(() => {
        if (cartPillLayer && !cartPillLayer.isConnected) noteDrawerEvicted();
        ensureCartPillLayer();
        retargetReadmooCheckoutPills();
        layoutReadmooCheckoutPills();
      }, overlayWantsBodyHost() ? 250 : 1e3);
    }
  }
  function syncReadmooDetailPill(result, book) {
    if (!result) {
      stopReadmooCheckoutPills();
      return;
    }
    const host = ensureCartPillLayer();
    const shadow = host?.shadowRoot;
    if (!shadow) return;
    for (const job of cartPillJobs) job.el.remove();
    cartPillJobs = [];
    const el = document.createElement("span");
    el.className = `ebook-cloud-float-pill ebook-cloud-float-pill--${result.confidence} ebook-cloud-float-pill--detail`;
    el.textContent = badgeLabel(result);
    el.title = matchSummary(result);
    shadow.append(el);
    const target = firstVisibleDetailTitle(document) || findDetailTitleNode(book?.title || result.matches[0]?.bookName);
    cartPillJobs.push({ result, book, target, el });
    startReadmooCheckoutPillFollow();
    layoutReadmooCheckoutPills();
  }
  function syncReadmooCheckoutPills(owned, books) {
    if (!owned.length) {
      stopReadmooCheckoutPills();
      return;
    }
    const byKey = new Map(books.map((book) => [book.clientKey, book]));
    const host = ensureCartPillLayer();
    const shadow = host?.shadowRoot;
    if (!shadow) return;
    for (const job of cartPillJobs) job.el.remove();
    cartPillJobs = [];
    const used = /* @__PURE__ */ new Set();
    const anchors = overlayCartAnchors();
    for (const result of owned) {
      const book = byKey.get(result.clientKey);
      const target = anchors.find((el2) => !used.has(el2) && overlayCartAnchorMatches(el2, result, book));
      if (target) used.add(target);
      const face = target ? overlayCartTitleFace(target) : null;
      const el = document.createElement("span");
      el.className = `ebook-cloud-float-pill ebook-cloud-float-pill--${result.confidence}`;
      el.textContent = badgeLabel(result);
      el.title = matchSummary(result);
      shadow.append(el);
      cartPillJobs.push({ result, book, target: face || target || null, el });
    }
    startReadmooCheckoutPillFollow();
    layoutReadmooCheckoutPills();
  }
  function matchSummary(result) {
    const first = result.matches[0];
    if (!first) return "";
    const extra = result.matches.length > 1 ? ` \u7B49 ${result.matches.length} \u672C` : "";
    return `${PLATFORM_LABELS[first.platform] || first.platform} \xB7 ${first.bookName}${extra}`;
  }
  function badgeLabel(result) {
    return result.confidence === "high" ? "\u5DF2\u5728\u4E66\u5E93" : "\u53EF\u80FD\u5DF2\u6709";
  }
  function cssEscape(value) {
    return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }
  function rememberRoot(clientKey, rootId) {
    const root = document.querySelector(`[data-ebook-cloud-root="${cssEscape(rootId)}"]`);
    if (root) root.setAttribute(LOOKUP_KEY_ATTR, clientKey);
  }
  function clearAuthToast() {
    document.getElementById(TOAST_ID)?.remove();
  }
  function showAuthToast(message) {
    let toast = document.getElementById(TOAST_ID);
    if (!toast) {
      toast = document.createElement("div");
      toast.id = TOAST_ID;
      toast.className = "ebook-cloud-toast";
      (overlayWantsBodyHost() && document.body ? document.body : document.documentElement).appendChild(toast);
    } else if (toast.parentNode && overlayWantsBodyHost() && document.body && toast.parentNode !== document.body) {
      document.body.appendChild(toast);
    }
    toast.textContent = message;
  }
  function clearPageOverlay() {
    lastCartSummary = null;
    lastDrawerSignature = "";
    stopCartDrawerWatch();
    stopReadmooCheckoutPills();
    resetCartDrawerMount();
    cartDrawerRoot?.remove();
    cartDrawerRoot = null;
    overlayHostGuard?.disconnect();
    overlayHostGuard = null;
    document.getElementById(BANNER_ID)?.remove();
    document.getElementById(CART_DRAWER_ID)?.remove();
    for (const root of allDocumentRoots()) {
      for (const badge of [...root.querySelectorAll(`[${BADGE_ATTR}]`)]) badge.remove();
    }
  }
  function restoreCartDrawerIfMissing() {
    if (!lastCartSummary?.length) return false;
    if (cartDrawerRoot?.isConnected && cartDrawerRoot.shadowRoot?.querySelector(".ebook-cloud-cart-drawer__panel, .ebook-cloud-cart-drawer__tab")) {
      return false;
    }
    renderCartSummary(lastCartSummary);
    return true;
  }
  function applyLookupResults(results, pageKind, books = []) {
    clearAuthToast();
    document.getElementById(BANNER_ID)?.remove();
    if (pageKind !== "cart") {
      lastCartSummary = null;
      lastDrawerSignature = "";
      stopCartDrawerWatch();
      stopReadmooCheckoutPills();
      cartDrawerRoot?.remove();
      cartDrawerRoot = null;
      document.getElementById(CART_DRAWER_ID)?.remove();
    }
    const byKey = new Map(books.map((book) => [book.clientKey, book]));
    const scoped = books.length ? results.filter((result) => byKey.has(result.clientKey)) : results;
    const ownedResults = scoped.filter((result) => result.owned);
    if (pageKind === "cart" || pageKind === "list") {
      ownedResults.sort((left, right) => Number(left.confidence === "possible") - Number(right.confidence === "possible"));
    }
    if (pageKind === "cart" && overlayCartKind()) {
      renderCartSummary(scoped);
      syncReadmooCheckoutPills(ownedResults, books);
      return;
    }
    if (pageKind === "detail" && usesDetailFloatPill()) {
      syncReadmooDetailPill(ownedResults[0], ownedResults[0] ? byKey.get(ownedResults[0].clientKey) : void 0);
      return;
    }
    if (pageKind === "list") pruneStaleListBadges(ownedResults);
    document.dispatchEvent(
      new CustomEvent(APPLY_EVENT, {
        detail: ownedResults.map((result) => {
          const book = byKey.get(result.clientKey);
          return {
            clientKey: result.clientKey,
            label: badgeLabel(result),
            confidence: result.confidence,
            title: book?.title || result.matches[0]?.bookName,
            productId: book?.platformVersion || book?.platformBookId
          };
        })
      })
    );
    if (pageKind === "cart") renderCartSummary(scoped);
    if (pageKind === "cart") pruneDuplicateCartBadges();
    for (const result of ownedResults) {
      attachByClientKey(result, pageKind, byKey.get(result.clientKey));
    }
    if (pageKind === "list") pruneDuplicateListBadges();
  }
  function renderCartSummary(results) {
    const owned = uniqueOwnedResults(results);
    lastCartSummary = owned.length ? results : null;
    if (!owned.length) {
      lastDrawerSignature = "";
      stopCartDrawerWatch();
      cartDrawerRoot?.remove();
      cartDrawerRoot = null;
      document.getElementById(CART_DRAWER_ID)?.remove();
      return;
    }
    const names = [...new Set(owned.map((result) => result.matches[0]?.bookName).filter(Boolean))];
    const checkoutTab = isReadmooCheckoutHref(new URL(location.href)) ? readmooCheckoutTab(location.hash) : "cart";
    const signature = `${checkoutTab}	${owned.length}	${names.join("\n")}	${cartDrawerCollapsed ? 1 : 0}`;
    const host = ensureCartDrawerHost();
    const drawer = host.shadowRoot?.querySelector(".ebook-cloud-cart-drawer");
    if (!(drawer instanceof HTMLElement)) return;
    startCartDrawerWatch();
    if (lastDrawerSignature === signature && drawer.querySelector(".ebook-cloud-cart-drawer__panel, .ebook-cloud-cart-drawer__tab")) {
      return;
    }
    lastDrawerSignature = signature;
    drawer.className = `ebook-cloud-cart-drawer${cartDrawerCollapsed ? " is-collapsed" : ""}`;
    const countLabel = isReadmooCheckoutHref(new URL(location.href)) ? readmooCheckoutOwnedLabel(checkoutTab, owned.length) : `\u8D2D\u7269\u8F66\u4E2D ${owned.length} \u672C\u5DF2\u5728\u4E66\u5E93`;
    drawer.replaceChildren();
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "ebook-cloud-cart-drawer__tab";
    tab.textContent = `${owned.length} \u672C\u5DF2\u5728\u4E66\u5E93`;
    tab.addEventListener("click", () => {
      cartDrawerCollapsed = false;
      drawer.classList.remove("is-collapsed");
    });
    const panel = document.createElement("div");
    panel.className = "ebook-cloud-cart-drawer__panel";
    const head = document.createElement("div");
    head.className = "ebook-cloud-cart-drawer__head";
    const title = document.createElement("div");
    title.textContent = countLabel;
    const close = document.createElement("button");
    close.type = "button";
    close.className = "ebook-cloud-cart-drawer__close";
    close.setAttribute("aria-label", "\u6536\u8D77");
    close.textContent = "\xD7";
    close.addEventListener("click", () => {
      cartDrawerCollapsed = true;
      drawer.classList.add("is-collapsed");
    });
    head.append(title, close);
    panel.append(head);
    if (names.length) {
      const list = document.createElement("ul");
      list.className = "ebook-cloud-cart-drawer__list";
      for (const name of names) {
        const item = document.createElement("li");
        item.textContent = name;
        list.append(item);
      }
      panel.append(list);
    }
    drawer.append(tab, panel);
  }
  function uniqueOwnedResults(results) {
    const byKey = /* @__PURE__ */ new Map();
    for (const result of results) {
      if (!result.owned) continue;
      const match = result.matches[0];
      const key = stripEditionSuffix(match?.bookName || "") || match?.platformBookId || result.clientKey;
      const prev = byKey.get(key);
      if (!prev || prev.confidence === "possible" && result.confidence !== "possible") byKey.set(key, result);
    }
    return [...byKey.values()];
  }
  function attachByClientKey(result, pageKind, book) {
    if (pageKind === "detail") {
      attachDetailTitleBadge(result, book?.title);
      return;
    }
    if (pageKind === "list") {
      attachTitleBadge(result, book?.title);
      return;
    }
    if (pageKind === "cart") {
      if (!isReadmooCheckoutHref(new URL(location.href))) attachCartTitleBadge(result, book);
      return;
    }
    const roots = /* @__PURE__ */ new Set([
      ...lookupTargets(result.clientKey),
      ...document.querySelectorAll(`[${LOOKUP_KEY_ATTR}="${cssEscape(result.clientKey)}"]`)
    ]);
    for (const root of roots) {
      if (!root.isConnected) continue;
      attachBadge(toLightDomElement(root), result, pageKind);
    }
  }
  function attachBadge(root, result, pageKind) {
    if (!root.isConnected) return;
    if (root.querySelector(`[${BADGE_ATTR}="${cssEscape(result.clientKey)}"]`)) return;
    if (root.getAttribute(BADGE_ATTR) === result.clientKey) return;
    const parent = root.parentElement;
    if (parent?.querySelector(`[${BADGE_ATTR}="${cssEscape(result.clientKey)}"]`)) return;
    const badge = document.createElement("span");
    badge.setAttribute(BADGE_ATTR, result.clientKey);
    badge.className = `ebook-cloud-badge ebook-cloud-badge--${result.confidence}`;
    badge.textContent = badgeLabel(result);
    badge.title = matchSummary(result);
    if (pageKind === "cart") {
      badge.classList.add("ebook-cloud-badge--inline");
      badge.style.cssText = INLINE_BADGE_STYLE;
      const light = toLightDomElement(root);
      if (light instanceof HTMLElement) light.appendChild(badge);
      else if (light.parentElement) light.parentElement.insertBefore(badge, light.nextSibling);
      else light.appendChild(badge);
      return;
    }
    if (getComputedStyle(root).position === "static") {
      root.style.position = "relative";
    }
    root.appendChild(badge);
  }
  function attachDetailTitleBadge(result, shopTitle) {
    const bookName = shopTitle || result.matches[0]?.bookName;
    let titleNode = findDetailTitleNode(bookName);
    if (!titleNode) {
      titleNode = firstVisibleDetailTitle(document);
    }
    if (!titleNode) return;
    keepOneBadgeOnTitle(titleNode);
    for (const badge of [...titleNode.querySelectorAll(`[${BADGE_ATTR}]`)]) badge.remove();
    if (titleNode.nextElementSibling?.hasAttribute(BADGE_ATTR)) titleNode.nextElementSibling.remove();
    removeStrayBadges(titleNode);
    appendInlineBadge(titleNode, result, "detail");
  }
  function attachCartTitleBadge(result, book) {
    const needles = badgeNeedles(book?.title, result.matches[0]?.bookName);
    const productId = book?.platformVersion || book?.platformBookId;
    const tab = readmooCheckoutTab(location.hash);
    const skip = (el) => isWdbookHeaderCart(el) || isBreadcrumbOrPath(el) || isCartUiChrome(el) || !isReadmooCheckoutBadgeHost(el, tab);
    const seen = /* @__PURE__ */ new Set();
    const keyed = uniqueListTitleHosts(needles.flatMap((bookName) => collectTitleBadgeHosts(result.clientKey, bookName)));
    const nodes = (keyed.length ? keyed : needles.flatMap((needle) => cartTitleNodes(needle, productId, skip))).filter((node) => {
      if (seen.has(node)) return false;
      seen.add(node);
      return true;
    });
    for (const titleNode of nodes) {
      if (isCartUiChrome(titleNode)) continue;
      keepOneBadgeOnTitle(titleNode);
      const existing = existingListBadge(titleNode);
      if (existing) {
        upgradeBadge(existing, result);
        continue;
      }
      appendInlineBadge(titleNode, result, "list");
    }
  }
  function cartTitleNodes(needle, productId, skip) {
    const roots = allDocumentRoots();
    if (productId) {
      const byRow = /* @__PURE__ */ new Map();
      for (const root of roots) {
        for (const el of root.querySelectorAll("*")) {
          if (skip(el) || !elementMatchesProductId(el, productId)) continue;
          const row = wdbookCartRowRoot(el);
          if (byRow.has(row)) continue;
          const title = resolveCartTitleNode(row, needle || "", skip);
          if (title) byRow.set(row, title);
        }
      }
      if (byRow.size) return [...byRow.values()];
    }
    if (!needle) return [];
    return preferCartTitleMatches(collectMatchingTitleLeaves(roots, needle, skip), needle).filter((el) => !skip(el));
  }
  function upgradeBadge(badge, result) {
    if (result.confidence === "possible") return;
    if (!badge.classList.contains("ebook-cloud-badge--possible")) return;
    badge.setAttribute(BADGE_ATTR, result.clientKey);
    badge.classList.remove("ebook-cloud-badge--possible");
    badge.classList.add("ebook-cloud-badge--high");
    badge.textContent = badgeLabel(result);
    badge.title = matchSummary(result);
    badge.style.background = "#0f766e";
  }
  function attachTitleBadge(result, shopTitle) {
    const needles = badgeNeedles(shopTitle, result.matches[0]?.bookName);
    const skip = (el) => isWdbookHeaderCart(el) || isBreadcrumbOrPath(el);
    const keyed = uniqueListTitleHosts(needles.flatMap((bookName) => collectTitleBadgeHosts(result.clientKey, bookName)));
    const nodes = keyed.length ? keyed : uniqueListTitleHosts(
      needles.flatMap(
        (bookName) => preferCartTitleMatches(collectMatchingTitleLeaves(allDocumentRoots(), bookName, skip), bookName)
      )
    );
    for (const titleNode of nodes) {
      keepOneBadgeOnTitle(titleNode);
      const existing = existingListBadge(titleNode);
      if (existing) {
        upgradeBadge(existing, result);
        continue;
      }
      const card = listCardRoot(titleNode);
      if (listCardHasBadge(card)) {
        for (const badge of collectCardBadges(card)) upgradeBadge(badge, result);
        continue;
      }
      appendInlineBadge(titleNode, result, "list");
    }
  }
  function nearbyTitleBadges(titleNode) {
    const found = /* @__PURE__ */ new Set();
    const consider = (el) => {
      if (el?.hasAttribute(BADGE_ATTR)) found.add(el);
    };
    const host = listTitleBadgeHost(titleNode);
    const cardTitle = wdbookCardTitleBox(titleNode);
    consider(titleNode.nextElementSibling);
    consider(host.nextElementSibling);
    consider(cardTitle?.nextElementSibling);
    for (const root of [titleNode, host, cardTitle]) {
      if (!root) continue;
      for (const badge of root.querySelectorAll(`[${BADGE_ATTR}]`)) found.add(badge);
    }
    return [...found];
  }
  function keepOneBadgeOnTitle(titleNode) {
    const badges = nearbyTitleBadges(titleNode);
    if (!badges.length) return;
    placeListTitleBadge(titleNode, badges[0]);
    for (const extra of badges.slice(1)) extra.remove();
  }
  function existingListBadge(titleNode) {
    return nearbyTitleBadges(titleNode)[0] || null;
  }
  function collectTitleBadgeHosts(clientKey, bookName) {
    const hosts = /* @__PURE__ */ new Set();
    const consider = (el) => {
      const titleEl = resolveListTitleHost(el, bookName);
      if (titleEl) hosts.add(titleEl);
    };
    for (const host of lookupTargets(clientKey)) consider(host);
    for (const host of document.querySelectorAll(`[${LOOKUP_KEY_ATTR}="${cssEscape(clientKey)}"]`)) consider(host);
    for (const node of findAllTitleNodes(bookName)) consider(node);
    return [...hosts];
  }
  function resolveListTitleHost(el, bookName) {
    if (!el) return null;
    const inside = isWdbookShopCard(el) ? el : el.closest(WDBOOK_SHOP_CARD_SELECTOR);
    if (inside && !isInactiveListHost(inside)) return titleFromCard(inside);
    if (nestedCardCount(el) > 1) return titleNodeInListRow(listCardRoot(el), bookName);
    const nestedCard = el.querySelector(WDBOOK_SHOP_CARD_SELECTOR);
    if (nestedCard && !isInactiveListHost(nestedCard)) return titleFromCard(nestedCard);
    if (el.shadowRoot) {
      const nested = el.shadowRoot.querySelector(".title, .book-title, h1, h2, h3, h4");
      if (nested && !isInactiveListHost(nested)) return nested;
    }
    if (el.matches(".title, h1, h2, h3, h4, .book-title, .product-title, #productTitle, .book-detail-title")) return el;
    const wrapped = el.closest("h1, h2, h3, h4");
    if (wrapped) return wrapped;
    return titleNodeInListRow(listCardRoot(el), bookName);
  }
  function titleFromCard(card) {
    const root = card.shadowRoot;
    if (!root) return null;
    return root.querySelector(".title, .book-title") || root.querySelector("h1, h2, h3");
  }
  function nestedCardCount(el) {
    return el.querySelectorAll(WDBOOK_SHOP_CARD_SELECTOR).length;
  }
  var PRODUCT_LINK_SELECTOR = 'a[href*="/dp/"], a[href*="/book/"], a[href*="/ebook/"], a[href*="/products/"], a[href*="/item/"]';
  function productIdsIn(el) {
    const ids = /* @__PURE__ */ new Set();
    const consider = (node) => {
      if (isWdbookHeaderCart(node)) return;
      const id = shopProductIdFromHref(node.getAttribute("href") || "");
      if (id) ids.add(id);
    };
    if (el.matches(PRODUCT_LINK_SELECTOR)) consider(el);
    for (const a of el.querySelectorAll(PRODUCT_LINK_SELECTOR)) consider(a);
    return ids;
  }
  function listCardRoot(el) {
    const root = el.getRootNode();
    const host = root instanceof ShadowRoot ? root.host : el;
    if (isWdbookShopCard(host)) return host;
    const card = host.closest(WDBOOK_SHOP_CARD_SELECTOR) || el.closest(WDBOOK_SHOP_CARD_SELECTOR);
    if (card) return card;
    let best = null;
    let node = host;
    for (let depth = 0; depth < 12 && node && node !== document.body && node !== document.documentElement; depth += 1) {
      const ids = productIdsIn(node);
      if (ids.size === 1) best = node;
      if (ids.size > 1) break;
      node = node.parentElement;
    }
    return best || host;
  }
  function isInactiveListHost(el) {
    return isHiddenOrCloneLink(el) || isDisplayHidden(el) || isHiddenOrCloneCard(el);
  }
  function uniqueListTitleHosts(nodes) {
    const byCard = /* @__PURE__ */ new Map();
    for (const node of nodes) {
      if (!node || isWdbookHeaderCart(node) || isInactiveListHost(node) || isBreadcrumbOrPath(node)) continue;
      const card = listCardRoot(node);
      if (isInactiveListHost(card)) continue;
      const existing = byCard.get(card);
      byCard.set(card, existing ? preferTitleNode(existing, node) : node);
    }
    return [...byCard.values()];
  }
  function preferTitleNode(current, incoming) {
    const currentHidden = isInactiveListHost(current);
    const incomingHidden = isInactiveListHost(incoming);
    if (incomingHidden && !currentHidden) return current;
    if (currentHidden && !incomingHidden) return incoming;
    const currentCard = wdbookCardTitleBox(current);
    const incomingCard = wdbookCardTitleBox(incoming);
    if (currentCard && !incomingCard && isInactiveListHost(currentCard)) return incoming;
    if (incomingCard && !currentCard && isInactiveListHost(incomingCard)) return current;
    if (currentCard && !incomingCard && isDisplayHidden(current)) return incoming;
    if (incomingCard && !currentCard && isDisplayHidden(incoming)) return current;
    const currentShadow = current.getRootNode() instanceof ShadowRoot;
    const incomingShadow = incoming.getRootNode() instanceof ShadowRoot;
    if (incomingShadow && !currentShadow) return incoming;
    if (currentShadow && !incomingShadow) return current;
    const currentScore = titleHostScore(current);
    const incomingScore = titleHostScore(incoming);
    if (incomingScore !== currentScore) return incomingScore > currentScore ? incoming : current;
    if (current.contains(incoming)) return currentScore >= 3 ? current : incoming;
    if (incoming.contains(current)) return incomingScore >= 3 ? incoming : current;
    return current;
  }
  function titleHostScore(el) {
    if (el.matches("h1, h2, h3, h4, .title, .book-title, .product-title, #productTitle")) return 3;
    try {
      const style = getComputedStyle(el);
      if (style.webkitLineClamp && style.webkitLineClamp !== "none" || style.display.includes("box")) return 2;
    } catch {
    }
    return 0;
  }
  function isHiddenOrCloneCard(el) {
    return isHiddenOrCloneLink(listCardRoot(el)) || isHiddenOrCloneLink(el);
  }
  function listCardHasBadge(card) {
    return collectCardBadges(card).length > 0;
  }
  function collectCardBadges(card) {
    const found = /* @__PURE__ */ new Set();
    const addFrom = (root) => {
      if (!root) return;
      for (const badge of root.querySelectorAll(`[${BADGE_ATTR}]`)) {
        if (isInactiveListHost(badge)) continue;
        found.add(badge);
      }
    };
    addFrom(card.shadowRoot);
    addFrom(card);
    if (isWdbookShopCard(card)) {
      const link = card.closest("a");
      if (link && link !== card) {
        for (const badge of link.querySelectorAll(`[${BADGE_ATTR}]`)) {
          const other = badge.closest(WDBOOK_SHOP_CARD_SELECTOR);
          if (other && other !== card) continue;
          found.add(badge);
        }
      }
    }
    return [...found];
  }
  function pruneStaleListBadges(ownedResults) {
    const keys = new Set(ownedResults.map((result) => result.clientKey));
    for (const root of allDocumentRoots()) {
      for (const badge of [...root.querySelectorAll(`[${BADGE_ATTR}]`)]) {
        if (!keys.has(badge.getAttribute(BADGE_ATTR) || "")) badge.remove();
      }
    }
  }
  function pruneDuplicateListBadges() {
    for (const card of document.querySelectorAll(WDBOOK_SHOP_CARD_SELECTOR)) {
      const badges = collectCardBadges(card);
      if (badges.length < 2) continue;
      const title = titleFromCard(card);
      const preferred = badges.find((badge) => title?.contains(badge) || title?.nextElementSibling === badge) || badges[0];
      for (const badge of badges) {
        if (badge !== preferred) badge.remove();
      }
    }
    const all = [];
    for (const root of allDocumentRoots()) {
      all.push(...root.querySelectorAll(`[${BADGE_ATTR}]`));
    }
    const byRow = /* @__PURE__ */ new Map();
    for (const badge of all) {
      const row = listCardRoot(badge);
      const list = byRow.get(row) ?? [];
      list.push(badge);
      byRow.set(row, list);
    }
    for (const group of byRow.values()) {
      if (group.length < 2) continue;
      const preferred = group.find(
        (badge) => badge.previousElementSibling?.matches(".title, .book-title") || badge.parentElement?.matches("h1, h2, h3, h4, .title, .book-title, .product-title, #productTitle") || badge.parentElement?.matches(PRODUCT_LINK_SELECTOR)
      ) || group[0];
      for (const extra of group) {
        if (extra !== preferred) extra.remove();
      }
    }
  }
  function pruneDuplicateCartBadges() {
    const parents = /* @__PURE__ */ new Set();
    const badges = [...document.querySelectorAll(`[${BADGE_ATTR}]`)];
    for (const root of allDocumentRoots()) {
      if (root instanceof ShadowRoot) badges.push(...root.querySelectorAll(`[${BADGE_ATTR}]`));
    }
    for (const badge of new Set(badges)) {
      if (badge.parentElement) parents.add(badge.parentElement);
    }
    for (const parent of parents) {
      const kids = [...parent.children].filter((el) => el.hasAttribute(BADGE_ATTR));
      for (const extra of kids.slice(1)) extra.remove();
    }
  }
  function appendInlineBadge(titleNode, result, kind) {
    if (isCartUiChrome(titleNode)) return;
    const host = kind === "list" ? listTitleBadgeHost(titleNode) : titleNode;
    const badge = document.createElement("span");
    badge.setAttribute(BADGE_ATTR, result.clientKey);
    badge.className = `ebook-cloud-badge ebook-cloud-badge--inline ebook-cloud-badge--${result.confidence}${kind === "detail" ? " ebook-cloud-badge--detail" : ""}`;
    badge.textContent = badgeLabel(result);
    badge.title = matchSummary(result);
    badge.style.cssText = kind === "detail" ? DETAIL_BADGE_STYLE : INLINE_BADGE_STYLE;
    if (result.confidence === "possible") badge.style.background = "#b45309";
    injectBadgeStyle(host);
    if (kind === "list") placeListTitleBadge(titleNode, badge);
    else host.appendChild(badge);
  }
  function injectBadgeStyle(node) {
    const root = node.getRootNode();
    const searchRoot = root instanceof ShadowRoot ? root : root instanceof Document ? root.head || root.documentElement : document.documentElement;
    if (searchRoot.querySelector(`style[${STYLE_ATTR}]`)) return;
    const style = document.createElement("style");
    style.setAttribute(STYLE_ATTR, "1");
    style.textContent = BADGE_CSS;
    searchRoot.appendChild(style);
  }
  function shouldWalkOpenShadow() {
    if (document.querySelector(WDBOOK_SHOP_CARD_SELECTOR)) return true;
    if (/\/mine\/cart(?:\/|$)/i.test(location.pathname)) return true;
    try {
      const url = new URL(location.href);
      return detectPlatform(url, document) === "KOBO" && Boolean(koboEbookSlug(url.pathname) || isKoboCartHref(url) || koboCartUiOpen(document));
    } catch {
      return false;
    }
  }
  function allDocumentRoots() {
    const roots = [document];
    if (!shouldWalkOpenShadow()) return roots;
    const seen = /* @__PURE__ */ new Set();
    const visit = (node) => {
      for (const el of node.querySelectorAll("*")) {
        const sr = el.shadowRoot;
        if (sr && !seen.has(sr)) {
          seen.add(sr);
          roots.push(sr);
          visit(sr);
        }
      }
    };
    visit(document);
    return roots;
  }
  function findAllTitleNodes(bookName) {
    const needle = bookName?.replace(/\s+/g, " ").trim();
    if (!needle) return [];
    const matches = [];
    for (const root of allDocumentRoots()) {
      for (const card of root.querySelectorAll(WDBOOK_SHOP_CARD_SELECTOR)) {
        const title = (card.getAttribute("title") || card.getAttribute("originaltitle") || "").replace(/\s+/g, " ").trim();
        if (titlesLooselyMatch(title, needle)) {
          const titleEl = card.shadowRoot?.querySelector(".title, .book-title");
          if (titleEl) matches.push(titleEl);
        }
      }
      for (const el of root.querySelectorAll(".title, h1, h2, h3, h4, .book-title, .product-title, #productTitle, .book-detail-title, [data-testid='title'], [data-testid='product-title']")) {
        if (isWdbookHeaderCart(el) || isBreadcrumbOrPath(el) || isInactiveListHost(el)) continue;
        if (titlesLooselyMatch(titlePlainText(el), needle)) matches.push(el);
      }
      for (const el of root.querySelectorAll('a[href*="/dp/"], a[href*="/book/"], a[href*="/ebook/"]')) {
        if (isWdbookHeaderCart(el) || isBreadcrumbOrPath(el) || isInactiveListHost(el)) continue;
        if (typeof el.querySelector === "function" && el.querySelector(WDBOOK_SHOP_CARD_SELECTOR)) continue;
        const text = titlePlainText(el);
        if (isWeakShopTitle(text) || !titlesLooselyMatch(text, needle)) continue;
        matches.push(el);
      }
    }
    return [...new Set(matches)];
  }
  function findDetailTitleNode(bookName) {
    const needle = bookName?.replace(/\s+/g, " ").trim();
    const visible = firstVisibleDetailTitle(document);
    if (visible) {
      const text = titlePlainText(visible);
      if (!needle || titlesLooselyMatch(text, needle) || text.includes(needle) || needle.includes(text)) {
        return visible;
      }
    }
    if (!needle) return visible;
    const candidates = [...findAllTitleNodes(needle)];
    for (const root of allDocumentRoots()) {
      for (const el of root.querySelectorAll("h1, h2, h3, h4, #productTitle, [itemprop=name], .book-title, .product-title, .title, [data-testid='title'], [data-testid='product-title']")) {
        if (titlePlainText(el) === needle) candidates.push(el);
      }
    }
    const unique = [...new Set(candidates)];
    const preferred = unique.filter((el) => !isBreadcrumbOrPath(el));
    return pickPrimaryTitle(preferred.length ? preferred : unique);
  }
  function pickPrimaryTitle(candidates) {
    const unique = [...new Set(candidates)];
    if (!unique.length) return null;
    unique.sort((left, right) => {
      const leftSize = parseFloat(getComputedStyle(left).fontSize) || 0;
      const rightSize = parseFloat(getComputedStyle(right).fontSize) || 0;
      if (Math.abs(leftSize - rightSize) >= 1) return rightSize - leftSize;
      const rank = (el) => {
        if (el.matches("h1, #productTitle")) return 0;
        if (el.matches(".book-title, .product-title, [itemprop=name]")) return 1;
        return 2;
      };
      return rank(left) - rank(right);
    });
    return unique[0];
  }
  function removeStrayBadges(keepHost) {
    for (const root of allDocumentRoots()) {
      for (const badge of [...root.querySelectorAll(`[${BADGE_ATTR}]`)]) {
        if (!keepHost.contains(badge)) badge.remove();
      }
    }
  }

  // src/content/runtime.ts
  var EXTENSION_RELOAD_HINT = "\u63D2\u4EF6\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u5237\u65B0\u672C\u9875\u540E\u518D\u67E5\u91CD";
  function isExtensionContextError(message) {
    return /extension context invalidated|context invalidated/i.test(message);
  }
  function isChromeExtensionMessagingPath() {
    try {
      if (typeof chrome?.runtime?.sendMessage !== "function") return false;
      if (typeof chrome.runtime.id === "string" && chrome.runtime.id.length > 0) return true;
      return typeof chrome.runtime.getManifest === "function";
    } catch {
      return false;
    }
  }
  function isExtensionContextLost(error) {
    if (error !== void 0 && isExtensionContextError(error instanceof Error ? error.message : String(error))) {
      return true;
    }
    if (isUserscriptRuntime()) return false;
    if (!isChromeExtensionMessagingPath()) return false;
    try {
      return !chrome?.runtime?.id;
    } catch {
      return true;
    }
  }
  function isStaleHref(started, current) {
    try {
      const from = new URL(started);
      const to = new URL(current);
      if (from.origin !== to.origin || from.pathname !== to.pathname) return true;
      if (isCartPath(from.pathname) && readmooCheckoutTab(from.hash) !== readmooCheckoutTab(to.hash)) return true;
      return false;
    } catch {
      return started !== current;
    }
  }

  // src/content/extensionUi.ts
  var EXTENSION_UI_SELECTOR = [
    ".ebook-cloud-badge",
    ".ebook-cloud-banner",
    ".ebook-cloud-toast",
    ".ebook-cloud-cart-hint",
    ".ebook-cloud-cart-drawer",
    "#ebook-cloud-cart-summary",
    "#ebook-cloud-cart-pills",
    "#ebook-cloud-wdbook-cart-json",
    "#ebook-cloud-tools-host",
    "[data-ebook-cloud-tools]",
    "[data-ebook-cloud-badge]",
    "[data-ebook-cloud-style]"
  ].join(", ");
  function isExtensionUiNode(node) {
    if (node instanceof Text) return Boolean(node.parentElement?.closest(EXTENSION_UI_SELECTOR));
    if (!(node instanceof Element)) return true;
    return Boolean(node.closest(EXTENSION_UI_SELECTOR));
  }
  function isIgnorableHydrationNode(node) {
    if (!(node instanceof Element)) return node.nodeType === Node.COMMENT_NODE;
    const tag = node.tagName;
    return tag === "SCRIPT" || tag === "STYLE" || tag === "LINK" || tag === "META" || tag === "NOSCRIPT" || tag === "TEMPLATE";
  }
  function isTransientShopUi(node) {
    if (!(node instanceof Element)) return false;
    return isCartUiChrome(node);
  }
  function mutationChangesPageContent(mutations) {
    return mutations.some((mutation) => {
      if (mutation.type !== "childList") return false;
      return [...mutation.addedNodes, ...mutation.removedNodes].some(
        (node) => !isExtensionUiNode(node) && !isTransientShopUi(node) && !isIgnorableHydrationNode(node)
      );
    });
  }

  // src/content/index.ts
  var EXT_VERSION = "1.0.67";
  var EXT_ATTR = "data-ebook-cloud-ext";
  var WDBOOK_CART_EVENT = "ebook-cloud-wdbook-cart";
  var SCAN_DEBOUNCE_MS = 750;
  var READMOO_CART_DEBOUNCE_MS = 1600;
  var READMOO_CART_HEARTBEAT_MS = 1500;
  var CHECKOUT_LINE_ACTION_RE = /刪除|删除|移除|加入購物車|加入购物车|加入待購|加入待购|移到購物|移到待購/;
  var OBSERVE_OPTIONS = { childList: true, subtree: true };
  var bootFlag = window;
  function bootContentLookup() {
    if (bootFlag.__ebookCloudLookup) return;
    bootFlag.__ebookCloudLookup = true;
    document.documentElement.setAttribute(EXT_ATTR, EXT_VERSION);
    bootLookup();
  }
  function currentUrl() {
    return new URL(location.href);
  }
  function pageKeyOf(url) {
    return `${url.pathname}${url.search}`;
  }
  function searchChangedBetween(a, b) {
    try {
      return new URL(a).search !== new URL(b).search;
    } catch {
      return false;
    }
  }
  function currentPlatform() {
    return detectPlatform(currentUrl(), document);
  }
  function koboOverlayCart() {
    return currentPlatform() === "KOBO" && koboCartUiOpen(document);
  }
  function unstableCartNow(url = currentUrl()) {
    return isUnstableCartHref(url) || koboOverlayCart();
  }
  function booksFingerprint(books) {
    return books.map((book) => `${book.clientKey}	${book.platformBookId || ""}	${book.title || ""}	${book.isbn || ""}`).join("\n");
  }
  function runWhenIdle(fn) {
    const ric = window.requestIdleCallback;
    if (typeof ric === "function") ric(fn, { timeout: 1500 });
    else fn();
  }
  function bootLookup() {
    let lastUrl = location.href;
    let scanTimer = 0;
    let scanning = false;
    let scanQueued = false;
    let stopped = false;
    let lastResults = [];
    let lastScanPath = "";
    let lastFingerprint = "";
    let lastPaintedSignal = "";
    let pageWaitStarted = 0;
    let navTimer = 0;
    let checkoutWatch = 0;
    let wdbookViewWatch = null;
    let wdbookViewWatchKey = "";
    const pendingTimers = [];
    const observer = new MutationObserver((mutations) => {
      if (mutationChangesPageContent(mutations)) scheduleScan();
    });
    function toLookupItems(books) {
      return books.map((book) => {
        if (book.root) rememberRoot(book.clientKey, book.root);
        return {
          clientKey: book.clientKey,
          platform: book.platform,
          platformBookId: book.platformBookId,
          platformVersion: book.platformVersion,
          isbn: book.isbn,
          eisbn: book.eisbn,
          title: book.title,
          author: book.author
        };
      });
    }
    function stopLookup() {
      if (stopped) return;
      stopped = true;
      scanQueued = false;
      window.clearTimeout(scanTimer);
      window.clearInterval(navTimer);
      stopUnstableCartWatch();
      for (const id of pendingTimers) window.clearTimeout(id);
      pendingTimers.length = 0;
      observer.disconnect();
      wdbookViewWatch?.disconnect();
      wdbookViewWatch = null;
      document.removeEventListener("click", onUnstableCartClick, true);
      document.removeEventListener("click", onWdbookViewClick, true);
    }
    function noteContextLost() {
      stopLookup();
      showAuthToast(EXTENSION_RELOAD_HINT);
    }
    function startObserver() {
      if (stopped || unstableCartNow()) return;
      observer.disconnect();
      observer.observe(document.documentElement, OBSERVE_OPTIONS);
    }
    async function scan() {
      if (stopped) return;
      if (scanning) {
        scanQueued = true;
        return;
      }
      const url = currentUrl();
      const platform = currentPlatform();
      if (!platform) return;
      if (isExtensionContextLost()) {
        noteContextLost();
        return;
      }
      scanning = true;
      observer.disconnect();
      const scanHref = url.href;
      try {
        const adapter = getAdapter(platform);
        const pageKind = adapter.pageKind(url, document) !== "cart" && koboOverlayCart() ? "cart" : adapter.pageKind(url, document);
        if (lastScanPath && lastScanPath !== pageKeyOf(url)) {
          lastResults = [];
          lastFingerprint = "";
          lastPaintedSignal = "";
          clearPageOverlay();
        }
        lastScanPath = pageKeyOf(url);
        const ready = pageLooksReadyForBadges(document, pageKind, platform, url);
        if (!pageWaitStarted) pageWaitStarted = Date.now();
        const canPaint = ready || Date.now() - pageWaitStarted > 8e3;
        if (!canPaint) {
          scheduleScan();
          return;
        }
        if (pageKind === "list") {
          const signal = listPaintSignal(document);
          if (signal && signal === lastPaintedSignal && lastResults.length) return;
        }
        const books = adapter.extract(document, url);
        if (!isReadmooCheckoutHref(url)) document.documentElement.setAttribute("data-ebook-cloud-books", String(books.length));
        const fingerprint = `${pageKind}
${platform === "READMOO" ? readmooCheckoutTab(url.hash) : ""}
${booksFingerprint(books)}`;
        if (!books.length) {
          const waitingFirstPaint = unstableCartNow(url) && !lastFingerprint && Date.now() - pageWaitStarted < 8e3;
          if (waitingFirstPaint) {
            scheduleScan();
            return;
          }
          if ((isPubuCartHref(url) || isKoboCartHref(url) || koboOverlayCart()) && lastResults.length) {
            restoreCartDrawerIfMissing();
            return;
          }
          lastFingerprint = fingerprint;
          lastResults = [];
          if (pageKind === "cart" || pageKind === "list") applyLookupResults([], pageKind, []);
          return;
        }
        if (fingerprint === lastFingerprint && lastResults.length) {
          if (pageKind === "detail" && document.querySelector("[data-ebook-cloud-badge]")) return;
          if (pageKind === "cart") {
            if (unstableCartNow(url)) applyLookupResults(lastResults, pageKind, books);
            else restoreCartDrawerIfMissing();
            return;
          }
          applyLookupResults(lastResults, pageKind, books);
          if (pageKind === "list") lastPaintedSignal = listPaintSignal(document);
          return;
        }
        const response = await send({
          type: "LOOKUP",
          items: toLookupItems(books)
        });
        if (stopped || pageKeyOf(new URL(scanHref)) !== pageKeyOf(currentUrl())) return;
        if (!response?.ok) {
          const fallback = isUserscriptRuntime() ? "\u8BF7\u6253\u5F00 EBookCloudTools \u9762\u677F\u767B\u5F55" : "\u4E66\u5E93\u67E5\u91CD\u5931\u8D25\uFF0C\u8BF7\u6253\u5F00\u63D2\u4EF6\u767B\u5F55";
          showAuthToast(response?.error || fallback);
          return;
        }
        lastFingerprint = fingerprint;
        lastResults = response.results;
        applyLookupResults(response.results, pageKind, books);
        if (pageKind === "list") lastPaintedSignal = listPaintSignal(document);
      } catch (error) {
        if (isExtensionContextLost(error)) {
          noteContextLost();
          return;
        }
        showAuthToast(error.message || "\u4E66\u5E93\u67E5\u91CD\u5931\u8D25");
      } finally {
        scanning = false;
        if (!unstableCartNow()) restoreCartDrawerIfMissing();
        if (!stopped) startObserver();
        if (!stopped) syncWdbookViewWatch();
        if (!stopped) syncUnstableCartWatch();
        if (!stopped && scanQueued) {
          scanQueued = false;
          scheduleScan();
        }
      }
    }
    function scanDebounceMs() {
      const platform = currentPlatform();
      if (unstableCartNow()) return READMOO_CART_DEBOUNCE_MS;
      return SCAN_DEBOUNCE_MS;
    }
    function scheduleScan() {
      if (stopped) return;
      window.clearTimeout(scanTimer);
      scanTimer = window.setTimeout(() => {
        runWhenIdle(() => {
          if (!stopped) void scan();
        });
      }, scanDebounceMs());
    }
    function watchNavigation() {
      if (stopped) return;
      if (location.href === lastUrl) return;
      const pathChanged = isStaleHref(lastUrl, location.href);
      const pageChanged = pathChanged || searchChangedBetween(lastUrl, location.href);
      lastUrl = location.href;
      if (pageChanged) {
        lastResults = [];
        lastScanPath = "";
        lastFingerprint = "";
        lastPaintedSignal = "";
        pageWaitStarted = 0;
        for (const id of pendingTimers) window.clearTimeout(id);
        pendingTimers.length = 0;
        clearWdbookCartProducts();
        clearLookupTargets();
        clearPageOverlay();
      }
      scheduleScan();
      scheduleCartRescans();
      syncWdbookViewWatch();
      syncUnstableCartWatch();
    }
    function later(fn, ms) {
      pendingTimers.push(window.setTimeout(fn, ms));
    }
    function startUnstableCartWatch() {
      if (stopped || checkoutWatch) return;
      checkoutWatch = window.setInterval(() => {
        if (stopped || !unstableCartNow()) return;
        void scan();
      }, READMOO_CART_HEARTBEAT_MS);
    }
    function stopUnstableCartWatch() {
      if (!checkoutWatch) return;
      window.clearInterval(checkoutWatch);
      checkoutWatch = 0;
    }
    function syncUnstableCartWatch() {
      if (unstableCartNow()) startUnstableCartWatch();
      else stopUnstableCartWatch();
    }
    function forceListRepaint() {
      lastPaintedSignal = "";
      later(() => void scan(), 80);
      later(() => void scan(), 450);
    }
    function syncWdbookViewWatch() {
      if (currentPlatform() !== "WDBOOK") {
        wdbookViewWatch?.disconnect();
        wdbookViewWatch = null;
        wdbookViewWatchKey = "";
        return;
      }
      const areas = [document.getElementById("cardArea"), document.getElementById("ListArea")].filter(
        (el) => Boolean(el)
      );
      const key = areas.map((el) => el.id).join(",");
      if (!areas.length) return;
      if (wdbookViewWatch && wdbookViewWatchKey === key) return;
      wdbookViewWatch?.disconnect();
      wdbookViewWatch = new MutationObserver(() => forceListRepaint());
      wdbookViewWatchKey = key;
      for (const el of areas) wdbookViewWatch.observe(el, { attributes: true, attributeFilter: ["style", "class", "hidden"] });
    }
    function onWdbookViewClick(event) {
      if (currentPlatform() !== "WDBOOK") return;
      const path = typeof event.composedPath === "function" ? event.composedPath() : [event.target];
      const hit = path.some((node) => {
        if (!(node instanceof Element)) return false;
        return node.id === "show-List" || node.id === "show-card" || node.classList.contains("showStyle-area");
      });
      if (!hit) return;
      forceListRepaint();
    }
    function onUnstableCartClick(event) {
      if (!unstableCartNow() && currentPlatform() !== "KOBO") return;
      const raw = event.target;
      if (!(raw instanceof Element)) return;
      const host = raw.closest("button, a, [role='button']");
      const text = `${host?.textContent || ""} ${host?.getAttribute("aria-label") || ""}`.replace(/\s+/g, "");
      if (currentPlatform() === "KOBO" && /購物車|购物车|cart/i.test(text)) {
        later(() => void scan(), 400);
        later(() => void scan(), 1400);
        return;
      }
      if (!unstableCartNow()) return;
      if (!CHECKOUT_LINE_ACTION_RE.test(text)) return;
      later(() => void scan(), 350);
      later(() => void scan(), 1200);
    }
    function scheduleCartRescans() {
      const url = currentUrl();
      const platform = currentPlatform();
      if (!platform) return;
      if (getAdapter(platform).pageKind(url, document) !== "cart" && !koboOverlayCart()) return;
      later(() => void scan(), 800);
      later(() => void scan(), 2500);
      if (unstableCartNow(url)) later(() => void scan(), 4e3);
    }
    function ingestWdbookCart(payload) {
      setWdbookCartProducts(flattenWdbookCartProducts(payload));
      scheduleScan();
    }
    setWdbookCartProducts(readStashedWdbookCart());
    document.addEventListener(WDBOOK_CART_EVENT, (event) => {
      ingestWdbookCart(event.detail);
    });
    const endao2 = currentPlatform() === "ENDAO";
    const kobo2 = currentPlatform() === "KOBO";
    const unstableCart = unstableCartNow();
    document.addEventListener("click", onUnstableCartClick, true);
    document.addEventListener("click", onWdbookViewClick, true);
    if (unstableCart) {
      later(() => void scan(), 2500);
      scheduleCartRescans();
      startUnstableCartWatch();
    } else {
      later(() => void scan(), endao2 ? 800 : 200);
      later(() => void scan(), endao2 ? 2200 : 1200);
      if (kobo2) {
        later(() => void scan(), 3e3);
        later(() => void scan(), 5500);
      }
      later(startObserver, endao2 ? 600 : 0);
      later(syncWdbookViewWatch, 0);
      scheduleCartRescans();
    }
    window.addEventListener("hashchange", () => {
      pageWaitStarted = 0;
      scheduleScan();
      scheduleCartRescans();
    });
    navTimer = window.setInterval(watchNavigation, 800);
  }

  // src/shared/bookstwPageSession.ts
  var DEVICE_REG_FALLBACK = "https://appapi-ebook.books.com.tw/V1.7/CMSAPIApp/";
  function isGuestProfile(token, profileName) {
    if (/^guest_/i.test(profileName.trim())) return true;
    let decoded = token.trim();
    try {
      decoded = decodeURIComponent(decoded);
    } catch {
    }
    return /guest|anonymous|訪客|游客/i.test(decoded);
  }
  function deviceRegUrl(page, deviceId) {
    const raw = (page.apiPath || DEVICE_REG_FALLBACK).trim();
    const absolute = raw.startsWith("//") ? `https:${raw}` : raw;
    const root = absolute.replace(/\/+$/, "");
    const params = new URLSearchParams({
      device_id: deviceId,
      language: page.userLanguage?.() || "zh-TW",
      os_type: "WEB",
      os_version: page.appVersion || "WEB",
      screen_resolution: `${page.screenWidth || 0}X${page.screenHeight || 0}`,
      screen_dpi: String(page.screenDpi ?? "96"),
      device_vendor: page.vendor || "web",
      device_model: page.vendorSub || "web"
    });
    return `${root}/DeviceReg?${params.toString()}`;
  }
  async function readBookstwMemberTokenFromPage(page) {
    if (!/(^|\.)books\.com\.tw$/i.test(page.hostname)) return [];
    const deviceId = page.deviceId?.trim() || "";
    if (!deviceId || typeof page.askCms !== "function") return [];
    let data;
    try {
      data = await page.askCms({ url: deviceRegUrl(page, deviceId), type: "GET" });
    } catch {
      return [];
    }
    const token = String(data?.CmsToken || data?.cmsToken || "").trim();
    const profileName = String(data?.name || "");
    if (!token || isGuestProfile(token, profileName)) return [];
    return [{ name: "CmsToken", value: token }];
  }

  // src/userscript/gm-io.ts
  function gmFetchJson(url, init = {}) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: (init.method || "GET").toUpperCase(),
        url,
        headers: headersToRecord(init.headers),
        data: typeof init.body === "string" ? init.body : void 0,
        onload(res) {
          let json = null;
          try {
            json = JSON.parse(res.responseText);
          } catch {
            json = null;
          }
          resolve({
            ok: res.status >= 200 && res.status < 300,
            status: res.status,
            json
          });
        },
        onerror() {
          reject(new Error("\u7F51\u7EDC\u8BF7\u6C42\u5931\u8D25"));
        },
        ontimeout() {
          reject(new Error("\u7F51\u7EDC\u8BF7\u6C42\u8D85\u65F6"));
        }
      });
    });
  }
  function gmListCookies(url) {
    return new Promise((resolve, reject) => {
      if (typeof GM_cookie?.list !== "function") {
        reject(new Error("\u65E0\u6CD5\u8BFB\u53D6 Cookie\uFF0C\u8BF7\u4F7F\u7528 Tampermonkey \u5E76\u6388\u6743 Cookie \u6743\u9650"));
        return;
      }
      let settled = false;
      const finish = (fn) => {
        if (settled) return;
        settled = true;
        fn();
      };
      try {
        const maybe = GM_cookie.list({ url }, (cookies, error) => {
          finish(() => {
            if (error) {
              reject(new Error(typeof error === "string" ? error : "\u8BFB\u53D6 Cookie \u5931\u8D25"));
              return;
            }
            resolve((cookies || []).map((cookie) => ({ name: cookie.name, value: cookie.value })));
          });
        });
        if (maybe && typeof maybe.then === "function") {
          void maybe.then(
            (cookies) => finish(() => resolve(cookies.map((cookie) => ({ name: cookie.name, value: cookie.value })))),
            (error) => finish(() => reject(error instanceof Error ? error : new Error("\u8BFB\u53D6 Cookie \u5931\u8D25")))
          );
        }
      } catch (error) {
        finish(() => reject(error instanceof Error ? error : new Error("\u8BFB\u53D6 Cookie \u5931\u8D25")));
      }
    });
  }
  function pageWindow() {
    const candidate = globalThis.unsafeWindow;
    return candidate || globalThis;
  }
  function withTimeout(promise, ms, fallback) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => resolve(fallback), ms);
      promise.then(
        (value) => {
          clearTimeout(timer);
          resolve(value);
        },
        () => {
          clearTimeout(timer);
          resolve(fallback);
        }
      );
    });
  }
  function readBookstwPageSession() {
    let hostname = "";
    try {
      hostname = location.hostname;
    } catch {
      return Promise.resolve([]);
    }
    const page = pageWindow();
    const screen = page.screen;
    let screenDpi;
    try {
      screenDpi = page.$?.getDPI?.();
    } catch {
      screenDpi = void 0;
    }
    return withTimeout(
      readBookstwMemberTokenFromPage({
        hostname,
        deviceId: page.localStorage?.getItem("device_id"),
        apiPath: page.api_path,
        askCms: page.$?.askCms?.bind(page.$),
        userLanguage: page.$?.userLanguage?.bind(page.$),
        screenDpi,
        appVersion: page.navigator?.appVersion,
        vendor: page.navigator?.vendor,
        vendorSub: page.navigator?.vendorSub || page.user_device,
        screenWidth: screen?.width,
        screenHeight: screen?.height
      }),
      8e3,
      []
    );
  }
  function createGmIo() {
    return {
      async get(keys) {
        const result = {};
        for (const key of keys) {
          result[key] = GM_getValue(key, void 0);
        }
        return result;
      },
      async set(values) {
        for (const [key, value] of Object.entries(values)) {
          if (value !== void 0) GM_setValue(key, value);
        }
      },
      async remove(keys) {
        for (const key of keys) GM_deleteValue(key);
      },
      fetchJson(url, init) {
        return gmFetchJson(url, init);
      },
      readCookies(url) {
        return gmListCookies(url);
      },
      readPageSession(url) {
        try {
          if (!/(^|\.)books\.com\.tw$/i.test(new URL(url).hostname)) return Promise.resolve([]);
        } catch {
          return Promise.resolve([]);
        }
        return readBookstwPageSession();
      }
    };
  }

  // public/popup.css
  var popup_default = '* {\n  box-sizing: border-box;\n}\n\nbody {\n  font: 13px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  margin: 0;\n  padding: 16px;\n  width: 320px;\n  color: #1f2937;\n  background: #f9fafb;\n}\n\n.app-header {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n\n.app-logo {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);\n}\n\n.app-header h1 {\n  font-size: 16px;\n  font-weight: 700;\n  margin: 0;\n  color: #111827;\n}\n\n.app-subtitle {\n  font-size: 11px;\n  color: #6b7280;\n  margin: 2px 0 0;\n}\n\n.card {\n  background: #fff;\n  border-radius: 12px;\n  padding: 14px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n  margin-bottom: 12px;\n}\n\n.card h2 {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 12px;\n  color: #111827;\n}\n\n.status-pill {\n  margin: 0 0 12px;\n  padding: 8px 10px;\n  border-radius: 8px;\n  font-size: 12px;\n  background: #f3f4f6;\n  color: #4b5563;\n}\n\n.status-pill[data-kind="error"] {\n  background: #fff7ed;\n  color: #b45309;\n}\n\n.status-pill[data-kind="ok"] {\n  background: #ecfdf5;\n  color: #047857;\n}\n\n.field {\n  display: block;\n  margin-bottom: 12px;\n}\n\n.field > span {\n  display: block;\n  font-size: 12px;\n  font-weight: 500;\n  color: #374151;\n  margin-bottom: 4px;\n}\n\ninput,\nselect {\n  width: 100%;\n  padding: 8px 10px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  font-size: 13px;\n  background: #fff;\n  color: #1f2937;\n  outline: none;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n\ninput:focus,\nselect:focus {\n  border-color: #0f766e;\n  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);\n}\n\n.btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  width: 100%;\n  padding: 9px 12px;\n  border: 0;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: transform 0.05s, filter 0.15s, background 0.15s;\n}\n\n.btn:active {\n  transform: translateY(1px);\n}\n\n.btn-primary {\n  background: #0f766e;\n  color: #fff;\n}\n\n.btn-primary:hover {\n  background: #115e59;\n}\n\n.btn-secondary {\n  background: #e5e7eb;\n  color: #374151;\n}\n\n.btn-secondary:hover {\n  background: #d1d5db;\n}\n\n.btn-ghost {\n  background: transparent;\n  color: #4b5563;\n  border: 1px solid #d1d5db;\n}\n\n.btn-ghost:hover {\n  background: #f3f4f6;\n}\n\n.btn-icon {\n  font-size: 14px;\n  line-height: 1;\n}\n\n.ai-actions {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.ai-hint {\n  margin: 0 0 12px;\n  font-size: 12px;\n  color: #4b5563;\n  line-height: 1.5;\n}\n\n.radio-group {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n\n.radio-card {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  cursor: pointer;\n  background: #fff;\n  transition: border-color 0.15s, background 0.15s;\n}\n\n.radio-card:hover {\n  border-color: #0f766e;\n  background: #f0fdfa;\n}\n\n.radio-card input[type="radio"] {\n  width: auto;\n  margin: 0;\n  accent-color: #0f766e;\n}\n\n.radio-label {\n  font-size: 13px;\n  color: #374151;\n}\n\n.ai-buttons {\n  display: flex;\n  gap: 8px;\n  margin-top: 14px;\n}\n\n.ai-buttons .btn {\n  flex: 1;\n}\n';

  // src/shared/popupApp.ts
  function requireEl(root, selector) {
    const el = root.querySelector(selector);
    if (!el) throw new Error(`\u7F3A\u5C11\u754C\u9762\u5143\u7D20\uFF1A${selector}`);
    return el;
  }
  function mountPopupApp(root) {
    const apiBaseUrlInput = requireEl(root, "#apiBaseUrl");
    const emailInput = requireEl(root, "#email");
    const passwordInput = requireEl(root, "#password");
    const loginForm = requireEl(root, "#loginForm");
    const logoutButton = requireEl(root, "#logout");
    const statusEl = requireEl(root, "#status");
    const signedInEl = requireEl(root, "#signedIn");
    const accountImportEl = requireEl(root, "#accountImport");
    const aiStatusEl = requireEl(root, "#aiStatus");
    const aiActionsEl = requireEl(root, "#aiActions");
    const aiImportButton = requireEl(root, "#aiImport");
    const aiUpdateButton = requireEl(root, "#aiUpdate");
    const aiChoiceEl = requireEl(root, "#aiChoice");
    const aiChoiceHintEl = requireEl(root, "#aiChoiceHint");
    const aiUpdateRowEl = requireEl(root, "#aiUpdateRow");
    const aiAccountField = requireEl(root, "#aiAccountField");
    const aiAccountSelect = requireEl(root, "#aiAccountSelect");
    const aiConfirmButton = requireEl(root, "#aiConfirm");
    const aiCancelButton = requireEl(root, "#aiCancel");
    let aiContext = null;
    function setStatus(text, kind = "info") {
      statusEl.textContent = text;
      statusEl.dataset.kind = kind;
    }
    function setAiStatus(text, kind = "info") {
      aiStatusEl.textContent = text;
      aiStatusEl.dataset.kind = kind;
    }
    async function refresh() {
      const status = await send({ type: "GET_STATUS" });
      apiBaseUrlInput.value = status.apiBaseUrl;
      if (status.signedIn && status.user) {
        loginForm.hidden = true;
        signedInEl.hidden = false;
        const lookup = status.bookLookupAllowed === null ? "" : status.bookLookupAllowed ? "\u67E5\u91CD\u6743\u9650\u5DF2\u5F00\u901A" : "\u65E0\u67E5\u91CD\u6743\u9650";
        const access = status.platformToolsAccess ? `\u5E73\u53F0\u5DE5\u5177\u5DF2\u5F00\u901A${lookup ? "\uFF0C" + lookup : ""}` : status.bookLookupAllowed ? lookup : "\u5C1A\u672A\u5F00\u901A\u5E73\u53F0\u5DE5\u5177";
        setStatus(`\u5DF2\u767B\u5F55\uFF1A${status.user.username}\uFF08${status.user.email}\uFF09\u3002${access}`, status.platformToolsAccess || status.bookLookupAllowed ? "ok" : "error");
        void renderAccountImport();
        return;
      }
      loginForm.hidden = false;
      signedInEl.hidden = true;
      accountImportEl.hidden = true;
      setStatus(status.error || "\u767B\u5F55\u540E\u5373\u53EF\u5728\u5546\u5E97\u9875\u5BF9\u7167\u4E66\u5E93\u67E5\u91CD\u3002", status.error ? "error" : "info");
    }
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      setStatus("\u6B63\u5728\u767B\u5F55\u2026");
      const result = await send({
        type: "LOGIN",
        apiBaseUrl: apiBaseUrlInput.value,
        email: emailInput.value,
        password: passwordInput.value
      });
      if (!result.ok) {
        setStatus(result.error, "error");
        return;
      }
      passwordInput.value = "";
      await refresh();
    });
    logoutButton.addEventListener("click", async () => {
      await send({ type: "LOGOUT" });
      await refresh();
    });
    function showChoice(opts) {
      aiContext.accounts = opts.accounts;
      aiAccountSelect.innerHTML = "";
      for (const acc of opts.accounts) {
        const option = document.createElement("option");
        option.value = String(acc.id);
        option.textContent = acc.label + (acc.isDefault ? "\uFF08\u9ED8\u8BA4\uFF09" : "");
        aiAccountSelect.appendChild(option);
      }
      aiChoiceHintEl.textContent = opts.hint;
      const hasAccounts = opts.accounts.length > 0;
      aiUpdateRowEl.hidden = !hasAccounts;
      aiAccountField.hidden = !hasAccounts;
      const addRadio = aiChoiceEl.querySelector('input[value="add"]');
      const updateRadio = aiChoiceEl.querySelector('input[value="update"]');
      addRadio.checked = opts.defaultMode === "add";
      updateRadio.checked = opts.defaultMode === "update";
      aiActionsEl.hidden = true;
      aiChoiceEl.hidden = false;
    }
    function hideChoice() {
      aiChoiceEl.hidden = true;
      aiActionsEl.hidden = false;
    }
    async function prepareCookiesAndAccounts(platform, url) {
      setAiStatus("\u6B63\u5728\u8BFB\u53D6\u5F53\u524D\u9875\u9762\u7684 Cookie\u2026");
      const cookiesRes = await send({ type: "READ_COOKIES", url });
      if (!cookiesRes.ok) {
        setAiStatus(cookiesRes.error, "error");
        return null;
      }
      setAiStatus(`\u5DF2\u6293\u53D6 ${cookiesRes.count} \u6761 Cookie\uFF0C\u6B63\u5728\u83B7\u53D6\u5DF2\u5BFC\u5165\u8D26\u53F7\u2026`);
      const listRes = await send({ type: "LIST_ACCOUNTS", platform });
      if (!listRes.ok) {
        setAiStatus(listRes.error, "error");
        return null;
      }
      return { cookies: cookiesRes.header, accounts: listRes.accounts };
    }
    async function doImport(mode) {
      if (!aiContext) return;
      let accountId;
      if (mode === "update") {
        if (aiContext.accounts.length === 1) {
          accountId = aiContext.accounts[0].id;
        } else {
          const selected = Number(aiAccountSelect.value);
          if (!Number.isFinite(selected) || selected <= 0) {
            setAiStatus("\u8BF7\u9009\u62E9\u8981\u66F4\u65B0\u7684\u8D26\u53F7", "error");
            return;
          }
          accountId = selected;
        }
      }
      setAiStatus("\u6B63\u5728\u63D0\u4EA4\u5230 EBookCloud\u2026");
      const res = await send({
        type: "IMPORT_ACCOUNT",
        platform: aiContext.platform,
        cookies: aiContext.cookies,
        accountId
      });
      if (!res.ok) {
        setAiStatus(res.error, "error");
        return;
      }
      const isUpdate = aiContext.accounts.some((a) => a.id === res.account.id);
      const label = res.account.nickname || res.account.email || res.account.wdbookUserId || `#${res.account.id}`;
      setAiStatus(isUpdate ? `\u5DF2\u66F4\u65B0\u8D26\u53F7\uFF1A${label}` : `\u5DF2\u6DFB\u52A0\u65B0\u8D26\u53F7\uFF1A${label}`, "ok");
      hideChoice();
      aiContext = null;
    }
    aiImportButton.addEventListener("click", async () => {
      if (!aiContext) return;
      const data = await prepareCookiesAndAccounts(aiContext.platform, aiContext.url);
      if (!data) return;
      aiContext.cookies = data.cookies;
      const hint = data.accounts.length > 1 ? "\u68C0\u6D4B\u5230\u591A\u4E2A\u8D26\u53F7\uFF1A\u5982\u9700\u66F4\u65B0\u8BF7\u9009\u62E9\u76EE\u6807\u8D26\u53F7\uFF0C\u5426\u5219\u5C06\u6DFB\u52A0\u4E3A\u65B0\u8D26\u6237\u3002" : data.accounts.length === 1 ? "\u8BE5\u5E73\u53F0\u5DF2\u6709 1 \u4E2A\u8D26\u53F7\uFF0C\u53EF\u9009\u62E9\u66F4\u65B0\u6216\u6DFB\u52A0\u4E3A\u65B0\u8D26\u6237\u3002" : "\u5C06\u628A\u5F53\u524D\u767B\u5F55\u7684\u8D26\u53F7\u6DFB\u52A0\u4E3A\u65B0\u8D26\u6237\u3002";
      showChoice({ defaultMode: "add", hint, accounts: data.accounts });
    });
    aiUpdateButton.addEventListener("click", async () => {
      if (!aiContext) return;
      const data = await prepareCookiesAndAccounts(aiContext.platform, aiContext.url);
      if (!data) return;
      aiContext.cookies = data.cookies;
      if (data.accounts.length === 0) {
        setAiStatus("\u8BE5\u5E73\u53F0\u8FD8\u6CA1\u6709\u5DF2\u5BFC\u5165\u7684\u8D26\u53F7\uFF0C\u65E0\u6CD5\u66F4\u65B0\uFF0C\u8BF7\u5148\u300C\u4E00\u952E\u5BFC\u5165\u8D26\u6237\u300D\u3002", "error");
        return;
      }
      if (data.accounts.length === 1) {
        aiContext.accounts = data.accounts;
        await doImport("update");
        return;
      }
      showChoice({
        defaultMode: "update",
        hint: "\u68C0\u6D4B\u5230\u591A\u4E2A\u8D26\u53F7\uFF0C\u8BF7\u9009\u62E9\u8981\u66F4\u65B0 Cookie \u7684\u8D26\u53F7\u3002",
        accounts: data.accounts
      });
    });
    function updateAccountFieldVisibility() {
      const mode = aiChoiceEl.querySelector('input[name="aiMode"]:checked')?.value;
      aiAccountField.hidden = mode !== "update";
    }
    for (const radio of aiChoiceEl.querySelectorAll('input[name="aiMode"]')) {
      radio.addEventListener("change", updateAccountFieldVisibility);
    }
    aiConfirmButton.addEventListener("click", async () => {
      const mode = aiChoiceEl.querySelector('input[name="aiMode"]:checked')?.value;
      await doImport(mode);
    });
    aiCancelButton.addEventListener("click", () => {
      hideChoice();
      aiContext = null;
      setAiStatus("\u5DF2\u53D6\u6D88\u3002");
    });
    async function renderAccountImport() {
      const tab = await send({ type: "GET_ACTIVE_TAB" });
      if (!tab.ok || !tab.platform) {
        accountImportEl.hidden = true;
        return;
      }
      accountImportEl.hidden = false;
      const host = tab.url ? new URL(tab.url).hostname : "";
      aiContext = { platform: tab.platform, url: tab.url ?? "", cookies: "", accounts: [] };
      aiChoiceEl.hidden = true;
      aiActionsEl.hidden = false;
      setAiStatus(`\u68C0\u6D4B\u5230\u9875\u9762\uFF1A${host}\uFF08${tab.platform}\uFF09\u3002\u767B\u5F55\u540E\u53EF\u4E00\u952E\u5BFC\u5165\u6216\u66F4\u65B0\u8D26\u53F7\u3002`);
    }
    void refresh();
  }

  // src/userscript/panel.ts
  var TOOLS_HOST_ID = "ebook-cloud-tools-host";
  var PANEL_CHROME_CSS = `
:host {
  all: initial;
}
.ebook-cloud-tools-shell {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 2147483647;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  pointer-events: none;
}
.ebook-cloud-tools-toggle {
  pointer-events: auto;
  width: 48px;
  height: 48px;
  border: 0;
  border-radius: 50%;
  background: #0f766e;
  color: #fff;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(15, 118, 110, 0.35);
}
.ebook-cloud-tools-toggle:hover {
  background: #115e59;
}
.ebook-cloud-tools-app {
  pointer-events: auto;
  font: 13px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  margin: 0;
  padding: 16px;
  width: 320px;
  max-height: calc(100vh - 100px);
  overflow: auto;
  color: #1f2937;
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.18);
}
`;
  var PANEL_HTML = `
<div class="ebook-cloud-tools-shell">
  <div id="ebookCloudToolsApp" class="ebook-cloud-tools-app" hidden>
    <header class="app-header">
      <div class="app-logo">\u{1F4DA}</div>
      <div>
        <h1>EBookCloudTools</h1>
        <p class="app-subtitle">\u4E66\u5E93\u67E5\u91CD \xB7 \u8D26\u6237\u5BFC\u5165 \xB7 Cookie \u66F4\u65B0</p>
      </div>
    </header>

    <p id="status" class="status-pill" data-kind="info">\u6B63\u5728\u8BFB\u53D6\u767B\u5F55\u72B6\u6001\u2026</p>

    <form id="loginForm" class="card">
      <label class="field">
        <span>API \u5730\u5740</span>
        <input id="apiBaseUrl" type="url" required placeholder="http://localhost:3000" />
      </label>
      <label class="field">
        <span>\u90AE\u7BB1</span>
        <input id="email" type="email" required autocomplete="username" />
      </label>
      <label class="field">
        <span>\u5BC6\u7801</span>
        <input id="password" type="password" required autocomplete="current-password" />
      </label>
      <button type="submit" class="btn btn-primary">\u767B\u5F55</button>
    </form>

    <div id="signedIn" class="card" hidden>
      <button id="logout" type="button" class="btn btn-secondary">\u9000\u51FA\u767B\u5F55</button>
    </div>

    <section id="accountImport" class="card" hidden>
      <h2>\u8D26\u6237\u5BFC\u5165</h2>
      <p id="aiStatus" class="status-pill" data-kind="info">\u68C0\u6D4B\u5F53\u524D\u9875\u9762\u2026</p>

      <div id="aiActions" class="ai-actions" hidden>
        <button id="aiImport" type="button" class="btn btn-primary">
          <span class="btn-icon">\u2795</span>
          <span>\u4E00\u952E\u5BFC\u5165\u8D26\u6237</span>
        </button>
        <button id="aiUpdate" type="button" class="btn btn-secondary">
          <span class="btn-icon">\u{1F36A}</span>
          <span>\u4E00\u952E\u66F4\u65B0 Cookie</span>
        </button>
      </div>

      <div id="aiChoice" class="ai-choice" hidden>
        <p id="aiChoiceHint" class="ai-hint"></p>

        <div class="radio-group">
          <label class="radio-card">
            <input type="radio" name="aiMode" value="add" checked />
            <span class="radio-label">\u6DFB\u52A0\u4E3A\u65B0\u8D26\u6237</span>
          </label>
          <label class="radio-card" id="aiUpdateRow" hidden>
            <input type="radio" name="aiMode" value="update" />
            <span class="radio-label">\u66F4\u65B0\u5DF2\u6709\u8D26\u6237</span>
          </label>
        </div>

        <div class="field" id="aiAccountField" hidden>
          <span>\u9009\u62E9\u8D26\u53F7</span>
          <select id="aiAccountSelect"></select>
        </div>

        <div class="ai-buttons">
          <button id="aiConfirm" type="button" class="btn btn-primary">\u786E\u8BA4</button>
          <button id="aiCancel" type="button" class="btn btn-ghost">\u53D6\u6D88</button>
        </div>
      </div>
    </section>
  </div>
  <button type="button" class="ebook-cloud-tools-toggle" aria-label="\u6253\u5F00 EBookCloudTools">\u{1F4DA}</button>
</div>
`;
  function mountToolsPanel() {
    const existing = document.getElementById(TOOLS_HOST_ID);
    existing?.remove();
    const host = document.createElement("div");
    host.id = TOOLS_HOST_ID;
    host.setAttribute("data-ebook-cloud-tools", "1");
    const shadow = host.attachShadow({ mode: "closed" });
    const style = document.createElement("style");
    style.textContent = `${popup_default}
${PANEL_CHROME_CSS}`;
    shadow.appendChild(style);
    const wrap = document.createElement("div");
    wrap.innerHTML = PANEL_HTML;
    shadow.appendChild(wrap);
    const app = shadow.querySelector("#ebookCloudToolsApp");
    const toggleButton = shadow.querySelector(".ebook-cloud-tools-toggle");
    (document.body || document.documentElement).appendChild(host);
    mountPopupApp(shadow);
    function setOpen(open) {
      app.hidden = !open;
      toggleButton.setAttribute("aria-label", open ? "\u5173\u95ED EBookCloudTools" : "\u6253\u5F00 EBookCloudTools");
    }
    function toggle() {
      setOpen(app.hidden);
    }
    toggleButton.addEventListener("click", toggle);
    return {
      toggle,
      show() {
        setOpen(true);
      },
      hide() {
        setOpen(false);
      }
    };
  }

  // src/userscript/entry.ts
  function currentUrl2() {
    return new URL(location.href);
  }
  function shouldBootLookup(url) {
    return Boolean(detectPlatform(url, document) || looksLikeEndaoShopPage(url, document));
  }
  function injectStyle(css, attr3) {
    if (document.querySelector(`style[${attr3}]`)) return;
    const style = document.createElement("style");
    style.setAttribute(attr3, "1");
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }
  function injectPageBridge() {
    if (document.documentElement.hasAttribute("data-ebook-cloud-page-bridge")) return;
    const source = true ? `"use strict";
(() => {
  // src/shared/types.ts
  var LOOKUP_CACHE_TTL_MS = 8 * 60 * 1e3;

  // src/content/extract.ts
  function shopProductIdFromHref(href) {
    const path = href.split(/[?#]/)[0];
    const match = path.match(/\\/(?:dp|book|ebook|products|item|basic)\\/([^/]+)/i);
    if (!match) return null;
    const id = decodeURIComponent(match[1]);
    if (["category", "search", "list"].includes(id.toLowerCase())) return null;
    return id;
  }

  // src/content/titleBadge.ts
  var BADGE_WORDS = /\\s*(\u5DF2\u5728\u4E66\u5E93|\u53EF\u80FD\u5DF2\u6709)\\s*/g;
  function isShortPathTrail(containerText, title) {
    const compact = containerText.replace(/\\s+/g, " ").trim();
    const name = title.replace(/\\s+/g, " ").trim();
    if (!name || compact.length > 180 || compact.length <= name.length + 8) return false;
    return /\u9996\u9875/.test(compact) && /[\\/\u203A\xBB]/.test(compact);
  }
  function stripEditionSuffix(title) {
    return title.replace(/\\s+/g, " ").trim().replace(/[\uFF08(]\\s*(\u7B80\u4F53\u7248|\u7E41\u9AD4\u7248|\u7E41\u4F53\u7248|\u7B80\u4F53|\u7E41\u9AD4|\u7E41\u4F53|\u7B80|\u7C21|\u7E41)\\s*[\uFF09)]/g, "").replace(/\\s+/g, " ").trim();
  }
  function titleEdition(title) {
    const compact = title.replace(/\\s+/g, "");
    if (/[\uFF08(](\u7B80\u4F53\u7248|\u7B80\u4F53|\u7B80|\u7C21)[\uFF09)]/.test(compact)) return "simplified";
    if (/[\uFF08(](\u7E41\u9AD4\u7248|\u7E41\u4F53\u7248|\u7E41\u9AD4|\u7E41\u4F53|\u7E41)[\uFF09)]/.test(compact)) return "traditional";
    return "none";
  }
  function titlesExactlyMatch(left, right) {
    const a = left.replace(/\\s+/g, " ").trim();
    const b = right.replace(/\\s+/g, " ").trim();
    return Boolean(a) && a === b;
  }
  function titlesLooselyMatch(left, right) {
    const a = stripEditionSuffix(left);
    const b = stripEditionSuffix(right);
    return Boolean(a) && a === b;
  }
  function titlesCompatibleForBadge(shopTitle, needle) {
    if (titlesExactlyMatch(shopTitle, needle)) return "exact";
    if (!titlesLooselyMatch(shopTitle, needle)) return false;
    const shopEd = titleEdition(shopTitle);
    const needleEd = titleEdition(needle);
    if (shopEd !== "none" && needleEd !== "none") return shopEd === needleEd ? "same-edition" : false;
    return "loose";
  }
  function classNameOf(el) {
    return typeof el.className === "string" ? el.className : "";
  }
  function isCartActionText(text) {
    const compact = text.replace(/\\s+/g, " ").trim();
    if (!compact) return false;
    if (/^(\u786E\u5B9A|\u53D6\u6D88|\u5220\u9664|\u79FB\u5165\u6536\u85CF\u5939|\u5168\u9009)$/.test(compact)) return true;
    return compact.length < 40 && /\u662F\u5426\u786E\u5B9A\u5220\u9664/.test(compact);
  }
  function isCartUiChrome(el) {
    if (el.matches("button, [role='button'], input, textarea, select, option, [role='tooltip'], [role='dialog'], [role='alertdialog']")) {
      return true;
    }
    if (el.closest("button, [role='button'], [role='tooltip'], [role='dialog'], [role='alertdialog']")) return true;
    const marker = \`\${el.id} \${classNameOf(el)}\`;
    if (/popconfirm|popover|el-popper|el-popconfirm|el-tooltip|tooltip|popper|dialog/i.test(marker)) return true;
    if (el.closest(
      "[class*='popconfirm' i], [class*='el-popper'], [class*='el-popover'], [class*='el-popconfirm'], [class*='tooltip' i], [class*='popper' i]"
    )) {
      return true;
    }
    return isCartActionText(titlePlainText(el));
  }
  function parentElementOf(el) {
    const parent = el.parentNode;
    return parent instanceof Element ? parent : null;
  }
  function resolveCartTitleNode(from, needle, skip) {
    const ignore = (el) => Boolean(skip?.(el) || isCartUiChrome(el));
    const chain = [];
    let current = from;
    for (let depth = 0; depth < 12 && current; depth += 1) {
      if (current === document.body || current === document.documentElement) break;
      chain.push(current);
      current = parentElementOf(current);
    }
    for (const node of chain) {
      const roots = [node];
      if (node.shadowRoot) roots.push(node.shadowRoot);
      const leaves = preferCartTitleMatches(collectMatchingTitleLeaves(roots, needle || "", ignore), needle || "").filter(
        (el) => !ignore(el)
      );
      if (leaves[0]) return leaves[0];
    }
    return null;
  }
  function preferCartTitleMatches(nodes, needle) {
    const ranked = nodes.map((el) => ({ el, rank: titlesCompatibleForBadge(titlePlainText(el), needle) })).filter((row) => Boolean(row.rank));
    const exact = ranked.filter((row) => row.rank === "exact" || row.rank === "same-edition");
    if (exact.length) return exact.map((row) => row.el);
    return ranked.map((row) => row.el);
  }
  function collectMatchingTitleLeaves(roots, needle, skip) {
    const want = stripEditionSuffix(needle);
    if (!want) return [];
    const matches = [];
    for (const root of roots) {
      for (const el of root.querySelectorAll("*")) {
        if (skip?.(el)) continue;
        if (el.childElementCount > 6) continue;
        const text = titlePlainText(el);
        if (!text || text.length > needle.length + 32) continue;
        if (!titlesLooselyMatch(text, needle)) continue;
        matches.push(el);
      }
    }
    const unique = [...new Set(matches)];
    return unique.filter((el) => !unique.some((other) => other !== el && el.contains(other)));
  }
  function titlePlainText(node) {
    if (!node) return "";
    const raw = (node.textContent || "").replace(/\\s+/g, " ").trim();
    return raw.replace(BADGE_WORDS, " ").replace(/\\s+/g, " ").trim();
  }
  function isBreadcrumbOrPath(el) {
    const size = parseFloat(getComputedStyle(el).fontSize) || 0;
    if (size >= 18) return false;
    if (el.closest("nav, [aria-label*='breadcrumb' i], [class*='breadcrumb' i], [id*='breadcrumb' i], [class*='crumbs' i]")) {
      return true;
    }
    let node = el.parentElement;
    for (let depth = 0; depth < 3 && node; depth += 1, node = node.parentElement) {
      if (node === document.body || node === document.documentElement) break;
      const marker = \`\${node.id} \${typeof node.className === "string" ? node.className : ""}\`;
      if (/breadcrumb|crumbs|el-breadcrumb|ant-breadcrumb|wd-breadcrumb|nav-path|page-path/i.test(marker)) return true;
      const text = (node.textContent || "").replace(/\\s+/g, " ").trim();
      if (isShortPathTrail(text, titlePlainText(el))) return true;
    }
    return false;
  }

  // src/content/wdbookCart.ts
  function mergeWdbookCartProducts(list) {
    const byId = /* @__PURE__ */ new Map();
    const titleOnly = [];
    for (const product of list) {
      if (product.productId) {
        const prev = byId.get(product.productId);
        byId.set(product.productId, {
          productId: product.productId,
          title: product.title || prev?.title,
          author: product.author || prev?.author,
          ...product.resourceId || prev?.resourceId ? { resourceId: product.resourceId || prev?.resourceId } : {}
        });
      } else if (product.title) {
        titleOnly.push(product);
      }
    }
    const result = [...byId.values()];
    for (const product of titleOnly) {
      const compact = product.title.replace(/\\s+/g, "");
      const match = result.find((row) => row.title && row.title.replace(/\\s+/g, "") === compact);
      if (match) {
        match.author = match.author || product.author;
        continue;
      }
      if (!result.some((row) => row.title?.replace(/\\s+/g, "") === compact)) result.push(product);
    }
    return result;
  }
  function isWdbookHeaderCart(el) {
    return Boolean(el.closest("#cart-layer, .header-cart, #header .cart"));
  }
  function readTextField(rec, keys) {
    for (const key of keys) {
      const value = rec[key];
      if (typeof value === "string" && value.trim()) return value.trim();
    }
    return "";
  }
  function looksLikeProduct(rec) {
    const title = readTextField(rec, ["title", "name", "bookName", "productName", "bookTitle", "originalTitle"]);
    const author = readTextField(rec, ["author", "authors", "authorName", "writer"]);
    return Boolean(
      title || author || rec.cover != null || rec.currentPrice != null || rec.originalPrice != null || rec.resourceId != null || rec.resource_id != null
    );
  }
  function readId(value) {
    return value == null ? "" : String(value).trim();
  }
  function flattenWdbookCartProducts(payload) {
    const products = [];
    const seen = /* @__PURE__ */ new Set();
    const visiting = /* @__PURE__ */ new Set();
    const visit = (node, depth) => {
      if (!node || typeof node !== "object" || depth > 8) return;
      if (visiting.has(node)) return;
      visiting.add(node);
      if (Array.isArray(node)) {
        for (const item of node) visit(item, depth + 1);
        return;
      }
      const rec = node;
      const productId = readId(rec.productId ?? rec.product_id ?? rec.goodsId);
      const resourceId = readId(rec.resourceId ?? rec.resource_id);
      const title = readTextField(rec, ["title", "name", "bookName", "productName", "bookTitle", "originalTitle"]);
      const author = readTextField(rec, ["author", "authors", "authorName", "writer"]);
      const key = productId || (title ? \`title:\${title}\` : "");
      if (key && looksLikeProduct(rec) && !seen.has(key)) {
        seen.add(key);
        products.push({
          productId,
          ...resourceId ? { resourceId } : {},
          title: title || void 0,
          author: author || void 0
        });
      }
      for (const value of Object.values(rec)) {
        if (value && typeof value === "object") visit(value, depth + 1);
      }
    };
    visit(payload, 0);
    return products;
  }
  function elementMatchesProductId(el, productId) {
    if (!productId) return false;
    if (el.getAttribute("data-product-id") === productId || el.getAttribute("data-readmoo-id") === productId || el.getAttribute("data-readmoo_id") === productId || el.getAttribute("productid") === productId || el.getAttribute("product-id") === productId) {
      return true;
    }
    if (el.getAttribute("value") === productId && el.matches("input[type='checkbox'], input[type='radio'], [role='checkbox']")) {
      return true;
    }
    return shopProductIdFromHref(el.getAttribute("href") || "") === productId;
  }
  function wdbookCartRowRoot(el) {
    if (isCartUiChrome(el)) {
      const row = el.closest("tr, [data-product-id], .cart-item") || (el.getRootNode() instanceof ShadowRoot ? el.getRootNode().host.closest("tr, [data-product-id], .cart-item") : null);
      if (row) return row;
    }
    const root = el.getRootNode();
    const host = root instanceof ShadowRoot ? root.host : el;
    return host.closest("wd-card") || el.closest("wd-card") || host.closest("tr") || el.closest("tr") || host.closest("[data-product-id], [data-readmoo-id], [data-readmoo_id], .cart-item") || el.closest("[data-product-id], [data-readmoo-id], [data-readmoo_id], .cart-item") || host.closest("a[href*='/dp/'], a[href*='/book/']") || el.closest("a[href*='/dp/'], a[href*='/book/']") || el;
  }
  function parseWdbookCartRowText(text) {
    const normalized = text.replace(/\\s+/g, " ").trim();
    const hasPrice = /\\$\\s*\\d/.test(normalized);
    const hasActions = /\u5220\u9664|\u79FB\u5165\u6536\u85CF\u5939/.test(normalized);
    if (!hasPrice && !hasActions) return null;
    if (normalized.length > 400) return null;
    if (/\u662F\u5426\u786E\u5B9A\u5220\u9664/.test(normalized) && !hasPrice) return null;
    const lines = text.replace(/\u79FB\u5165\u6536\u85CF\u5939|\u5220\u9664/g, "\\n").replace(/\\$\\s*[0-9.]+/g, "\\n").split(/\\n+/).map(
      (line) => line.replace(/\\s*(\u5DF2\u5728\u4E66\u5E93|\u53EF\u80FD\u5DF2\u6709)\\s*/g, " ").replace(/\\s+/g, " ").trim()
    ).filter(Boolean);
    const skip = /^(\u5168\u9009|\u4E66\u7C4D\u4FE1\u606F|\u91D1\u989D|\u4F18\u60E0\u5238|\u64CD\u4F5C|\\/|\u79FB\u5165\u6536\u85CF\u5939|\u5220\u9664|\u5DF2\u5728\u4E66\u5E93|\u53EF\u80FD\u5DF2\u6709|\u786E\u5B9A|\u53D6\u6D88|\u662F\u5426\u786E\u5B9A)$/;
    const useful = lines.filter(
      (line) => !skip.test(line) && !/\u662F\u5426\u786E\u5B9A\u5220\u9664/.test(line) && !/^\\$/.test(line) && !/\u51FA\u7248\u793E$/.test(line) && !/^[0-9.]+\u6298$/.test(line) && line.length >= 2 && line.length <= 80
    );
    if (!useful.length) return null;
    return { title: useful[0], author: useful[1] };
  }

  // src/content/extensionUi.ts
  var EXTENSION_UI_SELECTOR = [
    ".ebook-cloud-badge",
    ".ebook-cloud-banner",
    ".ebook-cloud-toast",
    ".ebook-cloud-cart-hint",
    ".ebook-cloud-cart-drawer",
    "#ebook-cloud-cart-summary",
    "#ebook-cloud-cart-pills",
    "#ebook-cloud-wdbook-cart-json",
    "#ebook-cloud-tools-host",
    "[data-ebook-cloud-tools]",
    "[data-ebook-cloud-badge]",
    "[data-ebook-cloud-style]"
  ].join(", ");
  function isExtensionUiNode(node) {
    if (node instanceof Text) return Boolean(node.parentElement?.closest(EXTENSION_UI_SELECTOR));
    if (!(node instanceof Element)) return true;
    return Boolean(node.closest(EXTENSION_UI_SELECTOR));
  }
  function isIgnorableHydrationNode(node) {
    if (!(node instanceof Element)) return node.nodeType === Node.COMMENT_NODE;
    const tag = node.tagName;
    return tag === "SCRIPT" || tag === "STYLE" || tag === "LINK" || tag === "META" || tag === "NOSCRIPT" || tag === "TEMPLATE";
  }
  function isTransientShopUi(node) {
    if (!(node instanceof Element)) return false;
    return isCartUiChrome(node);
  }
  function mutationChangesPageContent(mutations) {
    return mutations.some((mutation) => {
      if (mutation.type !== "childList") return false;
      return [...mutation.addedNodes, ...mutation.removedNodes].some(
        (node) => !isExtensionUiNode(node) && !isTransientShopUi(node) && !isIgnorableHydrationNode(node)
      );
    });
  }

  // src/content/page-bridge.ts
  var EVENT = "ebook-cloud-wdbook-cart";
  var APPLY_EVENT = "ebook-cloud-apply-badges";
  var HOLDER_ID = "ebook-cloud-wdbook-cart-json";
  var STYLE_ATTR = "data-ebook-cloud-style";
  var BADGE_ATTR = "data-ebook-cloud-badge";
  var BADGE_CSS = \`.ebook-cloud-badge{display:inline-flex;align-items:center;width:max-content;max-width:max-content;flex:0 0 auto;align-self:flex-start;white-space:nowrap;margin:2px 0 0 6px;padding:1px 6px;border-radius:999px;font:11px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#fff;vertical-align:middle;position:static!important;top:auto;right:auto}
.ebook-cloud-badge--high{background:#0f766e}
.ebook-cloud-badge--possible{background:#b45309}\`;
  var capturedShadows = /* @__PURE__ */ new Set();
  var lastApply = [];
  var applyTimer = 0;
  var scanTimer = 0;
  function isCartPage() {
    return /\\/(mine\\/)?cart(\\/|$)/i.test(location.pathname);
  }
  function shouldPlaceInlineBadges() {
    return isCartPage();
  }
  function shouldInspect(url, method) {
    if (/cart/i.test(url) || /\\/mine\\//i.test(url) || /graphql/i.test(url)) return true;
    return Boolean(method && method.toUpperCase() === "POST");
  }
  function requestUrl(input) {
    if (typeof input === "string") return input;
    if (input instanceof URL) return input.href;
    if (typeof Request !== "undefined" && input instanceof Request) return input.url;
    return "";
  }
  function visibleText(el) {
    const html = el;
    const inner = typeof html.innerText === "string" ? html.innerText : "";
    return (inner || el.textContent || "").replace(/\\r/g, "");
  }
  function patchAttachShadow() {
    const orig = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function(init) {
      const root = orig.call(this, init);
      capturedShadows.add(root);
      return root;
    };
  }
  function everyRoot() {
    const roots = [document];
    const seen = /* @__PURE__ */ new Set();
    const visit = (node) => {
      for (const el of node.querySelectorAll("*")) {
        const sr = el.shadowRoot;
        if (sr && !seen.has(sr)) {
          seen.add(sr);
          capturedShadows.add(sr);
          roots.push(sr);
          visit(sr);
        }
      }
    };
    visit(document);
    for (const sr of capturedShadows) {
      if (!seen.has(sr)) {
        seen.add(sr);
        roots.push(sr);
        visit(sr);
      }
    }
    return roots;
  }
  function scanDomProducts() {
    const products = [];
    const seen = /* @__PURE__ */ new Set();
    const consider = (el) => {
      if (isWdbookHeaderCart(el)) return;
      const parsed = parseWdbookCartRowText(visibleText(el));
      const productId = (el.getAttribute("data-product-id") || el.getAttribute("productid") || el.getAttribute("product-id") || (el instanceof HTMLInputElement && el.type === "checkbox" ? el.value : "") || "").trim();
      if (productId && /^\\d{4,}$/.test(productId) && !seen.has(\`id:\${productId}\`)) {
        seen.add(\`id:\${productId}\`);
        products.push({
          productId,
          title: parsed?.title,
          author: parsed?.author
        });
      }
      if (parsed?.title && parsed.title !== "\\u5DF2\\u5728\\u4E66\\u5E93" && parsed.title !== "\\u53EF\\u80FD\\u5DF2\\u6709" && !seen.has(\`title:\${parsed.title}\`)) {
        seen.add(\`title:\${parsed.title}\`);
        products.push({
          productId: productId && /^\\d{4,}$/.test(productId) ? productId : "",
          title: parsed.title,
          author: parsed.author
        });
      }
    };
    for (const root of everyRoot()) {
      for (const el of root.querySelectorAll("*")) consider(el);
    }
    return products;
  }
  function publish(data) {
    try {
      const incoming = flattenWdbookCartProducts(data);
      const dom = isCartPage() ? scanDomProducts() : [];
      let previous = [];
      const existing = document.getElementById(HOLDER_ID)?.textContent;
      if (existing) {
        try {
          previous = flattenWdbookCartProducts(JSON.parse(existing));
        } catch {
          previous = [];
        }
      }
      const merged = mergeWdbookCartProducts([...previous, ...incoming, ...dom]);
      if (!merged.length) return;
      const payload = JSON.stringify({ data: [{ products: merged }] });
      if (existing === payload) return;
      let holder = document.getElementById(HOLDER_ID);
      if (!holder) {
        holder = document.createElement("script");
        holder.id = HOLDER_ID;
        holder.setAttribute("type", "application/json");
        document.documentElement.appendChild(holder);
      }
      holder.textContent = payload;
      document.dispatchEvent(new CustomEvent(EVENT, { detail: { data: [{ products: merged }] } }));
    } catch {
    }
  }
  function publishDomCart() {
    if (!isCartPage()) return;
    const products = scanDomProducts();
    if (!products.length) return;
    publish({ data: [{ products }] });
  }
  function hookFetch() {
    const orig = window.fetch;
    if (typeof orig !== "function") return;
    window.fetch = function(input, init) {
      const result = orig.call(this, input, init);
      const method = init?.method || (typeof Request !== "undefined" && input instanceof Request ? input.method : "GET");
      if (shouldInspect(requestUrl(input), method)) {
        void Promise.resolve(result).then((response) => response.clone().json()).then(publish).catch(() => void 0);
      }
      return result;
    };
  }
  function hookXhr() {
    const urls = /* @__PURE__ */ new WeakMap();
    const methods = /* @__PURE__ */ new WeakMap();
    const origOpen = XMLHttpRequest.prototype.open;
    const origSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function(method, url, async, username, password) {
      urls.set(this, String(url));
      methods.set(this, method);
      return origOpen.call(this, method, url, async ?? true, username, password);
    };
    XMLHttpRequest.prototype.send = function(body) {
      this.addEventListener("load", function() {
        if (!shouldInspect(urls.get(this) || "", methods.get(this))) return;
        try {
          publish(JSON.parse(this.responseText));
        } catch {
        }
      });
      return origSend.call(this, body);
    };
  }
  function injectStyle(root) {
    const searchRoot = root instanceof Document ? root.head || root.documentElement : root;
    if (searchRoot.querySelector(\`style[\${STYLE_ATTR}]\`)) return;
    const style = document.createElement("style");
    style.setAttribute(STYLE_ATTR, "1");
    style.textContent = BADGE_CSS;
    searchRoot.appendChild(style);
  }
  function findTitleNodes(title) {
    const needle = title.replace(/\\s+/g, " ").trim();
    if (!needle) return [];
    const matches = [];
    const roots = everyRoot();
    for (const root of roots) {
      for (const card of root.querySelectorAll("wd-card")) {
        if (isWdbookHeaderCart(card)) continue;
        const cardTitle = (card.getAttribute("title") || card.getAttribute("originaltitle") || "").replace(/\\s+/g, " ").trim();
        if (titlesLooselyMatch(cardTitle, needle)) matches.push(card.shadowRoot?.querySelector(".title") || card);
      }
    }
    matches.push(
      ...collectMatchingTitleLeaves(roots, needle, (el) => isWdbookHeaderCart(el) || isBreadcrumbOrPath(el) || isCartUiChrome(el))
    );
    return preferCartTitleMatches([...new Set(matches.filter(Boolean))], needle).filter((el) => !isCartUiChrome(el));
  }
  function findNodesForCartItem(item) {
    const skip = (el) => isWdbookHeaderCart(el) || isBreadcrumbOrPath(el) || isCartUiChrome(el);
    if (item.productId) {
      const byRow = /* @__PURE__ */ new Map();
      for (const root of everyRoot()) {
        for (const el of root.querySelectorAll("*")) {
          if (skip(el) || !elementMatchesProductId(el, item.productId)) continue;
          const row = wdbookCartRowRoot(el);
          if (byRow.has(row)) continue;
          const title = resolveCartTitleNode(row, item.title || "", skip);
          if (title) byRow.set(row, title);
        }
      }
      if (byRow.size) return [...byRow.values()];
    }
    return item.title ? findTitleNodes(item.title) : [];
  }
  function cartRowRoot(el) {
    return wdbookCartRowRoot(el);
  }
  function badgesInTree(el) {
    const found = [...el.querySelectorAll(\`[\${BADGE_ATTR}]\`)];
    if (el.shadowRoot) found.push(...el.shadowRoot.querySelectorAll(\`[\${BADGE_ATTR}]\`));
    const next = el.nextElementSibling;
    if (next?.hasAttribute(BADGE_ATTR)) found.push(next);
    return found;
  }
  function applyBadges(items) {
    lastApply = items;
    if (!shouldPlaceInlineBadges()) return;
    const ordered = [...items].sort(
      (left, right) => Number(left.confidence === "possible") - Number(right.confidence === "possible")
    );
    const placedRows = /* @__PURE__ */ new Set();
    for (const item of ordered) {
      for (const node of findNodesForCartItem(item)) {
        if (isCartUiChrome(node)) continue;
        const row = cartRowRoot(node);
        if (placedRows.has(row) && item.confidence === "possible") continue;
        const existing = [.../* @__PURE__ */ new Set([...badgesInTree(row), ...badgesInTree(node)])];
        if (existing.length) {
          if (item.confidence !== "possible") {
            for (const badge2 of existing) {
              badge2.setAttribute(BADGE_ATTR, item.clientKey);
              badge2.classList.remove("ebook-cloud-badge--possible");
              badge2.classList.add("ebook-cloud-badge--high");
              badge2.textContent = item.label;
              badge2.style.background = "#0f766e";
            }
          }
          for (const extra of existing.slice(1)) extra.remove();
          placedRows.add(row);
          continue;
        }
        placedRows.add(row);
        const badge = document.createElement("span");
        badge.setAttribute(BADGE_ATTR, item.clientKey);
        badge.className = \`ebook-cloud-badge ebook-cloud-badge--inline ebook-cloud-badge--\${item.confidence === "possible" ? "possible" : "high"}\`;
        badge.textContent = item.label;
        badge.style.cssText = 'position:static!important;display:inline-flex;align-items:center;width:max-content;max-width:max-content;flex:0 0 auto;align-self:flex-start;white-space:nowrap;margin:2px 0 0 6px;padding:1px 6px;border-radius:999px;font:11px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#fff;background:#0f766e';
        if (item.confidence === "possible") badge.style.background = "#b45309";
        injectStyle(node.getRootNode());
        node.appendChild(badge);
      }
    }
  }
  function scheduleApply() {
    window.clearTimeout(applyTimer);
    applyTimer = window.setTimeout(() => {
      if (lastApply.length) applyBadges(lastApply);
    }, 200);
  }
  function scheduleDomScan() {
    if (!isCartPage()) return;
    window.clearTimeout(scanTimer);
    scanTimer = window.setTimeout(publishDomCart, 300);
  }
  patchAttachShadow();
  hookFetch();
  hookXhr();
  document.addEventListener(APPLY_EVENT, (event) => {
    applyBadges(event.detail || []);
  });
  var observer = new MutationObserver((mutations) => {
    if (!mutationChangesPageContent(mutations)) return;
    scheduleDomScan();
    scheduleApply();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  scheduleDomScan();
})();
` : "";
    if (!source) return;
    document.documentElement.setAttribute("data-ebook-cloud-page-bridge", "1");
    if (typeof GM_addElement === "function") {
      GM_addElement(document.documentElement, "script", { textContent: source });
      return;
    }
    const script = document.createElement("script");
    script.textContent = source;
    document.documentElement.appendChild(script);
    script.remove();
  }
  function installRuntime() {
    const session = createSession({ io: createGmIo(), runtimeKind: "userscript" });
    installLocalClient((message) => session.dispatch(message));
  }
  function main() {
    const url = currentUrl2();
    if (!shouldBootLookup(url)) return;
    installRuntime();
    if (detectPlatform(url) === "WDBOOK") injectPageBridge();
    let panel = null;
    const ensurePanel = () => {
      if (!panel || !document.getElementById(TOOLS_HOST_ID)) {
        panel = mountToolsPanel();
      }
      return panel;
    };
    injectStyle(content_default, "data-ebook-cloud-content-css");
    ensurePanel();
    bootContentLookup();
    if (typeof GM_registerMenuCommand === "function") {
      GM_registerMenuCommand("\u6253\u5F00 / \u5173\u95ED EBookCloudTools", () => {
        ensurePanel().toggle();
      });
    }
  }
  main();
})();
