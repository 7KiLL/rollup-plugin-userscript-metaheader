export type UserScriptHeaderOptions = {
    /**
     * The name of the script.
     *
     * @example
     * Internationalization is done by adding an appendix naming the locale.
     * ```
     * // @name    A test
     * // @name:de Ein Test
     * ```
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:name Docs}
     */
    name: string;
    /**
     * The namespace of the script.
     *
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:namespace Docs}     */
    namespace: string;
    /**
     * A copyright statement shown at the header of the script's editor right below the script name.
     *
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:copyright Docs}
     */
    copyright?: string;
    /**
     * The script version. This is used for the update check and needs to be increased at every update.
     *
     * In this list the next entry is considered to be a higher version number,
     * eg: `Alpha-v1` < `Alpha-v10` and `16.4` == `16.04`
     *
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:version Docs}
     */

    version: string | number;
    /**
     * A short significant description.
     * @example
     * Internationalization is done by adding an appendix naming the locale.
     * ```
     * // @description    This userscript does wonderful things
     * // @description:de Dieses Userscript tut wundervolle Dinge
     * ```
     *
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:description Docs}
     */
    description: string;
    /**
     * The script icon in low res.
     */
    icon?: string;
    /**
     * @borrows icon
     * @see icon
     */
    iconURL?: string;
    /**
     * @borrows icon
     * @see icon
     */
    defaulticon?: string;
    /**
     * This scripts icon in 64x64 pixels. If this tag,
     * but `@icon` is given the `@icon` image will be scaled at some places at the options page.
     */
    icon64?: string;
    /**
     * @borrows icon64
     * @see icon64
     */
    icon64URL?: string;
    /**
     * @grant is used to whitelist `GM_*` and `GM.*` functions,
     * the `unsafeWindow` object and some powerful `window` functions.
     * @example
     * ```text
     * // @grant GM_setValue
     * // @grant GM_getValue
     * // @grant GM.setValue
     * // @grant GM.getValue
     * // @grant GM_setClipboard
     * // @grant unsafeWindow
     * // @grant window.close
     * // @grant window.focus
     * // @grant window.onurlchange
     * ```
     * Since closing and focusing tabs is a powerful feature this needs to be added to
     * the `@grant` statements as well. In case `@grant` is followed by none the sandbox is disabled.
     * In this mode no `GM_*` function but the `GM_info` property will be available.
     * ```
     * // @grant none
     * ```
     * If no `@grant` tag is given an empty list is assumed. However, this different from using none.
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:grant Docs}
     */
    grant?: string;
    /**
     * The scripts author.
     */
    author?: string;
    /**
     * The authors homepage that is used at the options page to link from the scripts name to the given page.
     * Please note that if the `@namespace` tag starts with `http://` its content will be used for this too.
     */
    homepage?: string;
    /**
     * @borrows homepage
     * @see homepage
     */
    homepageURL?: string;
    /**
     * @borrows homepage
     * @see homepage
     */
    website?: string;
    /**
     * @borrows homepage
     * @see homepage
     */
    source?: string;
    /**
     * This tag allows script developers to disclose whether they monetize their scripts.
     * It is for example required by {@link https://greasyfork.org/ GreasyFor}k.
     *
     * Syntax: <tag> <type> <description>
     *
     * <type> can have the following values:
     * * ads
     * * tracking
     * * miner
     *
     * @example
     * Internationalization is done by adding an appendix naming the locale.
     * ```
     * // @antifeature       ads         We show you ads
     * // @antifeature:fr    ads         Nous vous montrons des publicités
     * // @antifeature       tracking    We have some sort of analytics included
     * // @antifeature       miner       We use your computer's resources to mine a crypto currency
     * ```
     */
    antifeature?: { [key: string]: string };
    /**
     * Points to a JavaScript file that is loaded and executed before the script itself starts running.
     * Note: the scripts loaded via `@require` and their "use strict" statements might influence the userscript's strict mode!
     *
     * ```
     * // @require https://code.jquery.com/jquery-2.1.4.min.js
     * // @require https://code.jquery.com/jquery-2.1.3.min.js#sha256=23456...
     * // @require https://code.jquery.com/jquery-2.1.2.min.js#md5=34567...,sha256=6789...
     * // @require tampermonkey://vendor/jquery.js
     * // @require tampermonkey://vendor/jszip/jszip.js
     * ```
     * Multiple tag instances are allowed.
     *
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:require Docs}
     */
    require?: string[];
    /**
     * Preloads resources that can by accessed via `GM_getResourceURL` and `GM_getResourceText` by the script.
     * ```
     * // @resource icon1       http://www.tampermonkey.net/favicon.ico
     * // @resource icon2       /images/icon.png
     * // @resource html        http://www.tampermonkey.net/index.html
     * // @resource xml         http://www.tampermonkey.net/crx/tampermonkey.xml
     * // @resource SRIsecured1 http://www.tampermonkey.net/favicon.ico#md5=123434...
     * // @resource SRIsecured2 http://www.tampermonkey.net/favicon.ico#md5=123434...;sha256=234234...
     * ```
     * Please check the {@link https://www.tampermonkey.net/documentation.php?locale=en#api:Subresource_Integrity sub-resource integrity} section for more information how to ensure integrity.
     *
     * Multiple tag instances are allowed.
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:resource Docs}
     */
    resource?: { [key: string]: string };
    /**
     * The pages on that a script should run. Multiple tag instances are allowed.
     * @include doesn't support the URL hash parameter. You have to match the path without the hash parameter
     * and make use of {@link https://www.tampermonkey.net/documentation.php?locale=en#api:window.onurlchange window.onurlchange}
     * ```
     * // @include http://www.tampermonkey.net/*
     * // @include http://*
     * // @include https://*
     * // @include /^https:\/\/www\.tampermonkey\.net\/.*$/
     * // @include *
     * ```
     * Note: When writing something like `*://tmnk.net/* `many script developers expect the script to run at `tmnk.net` only,
     * but this is not the case. It also runs at `https://example.com/?http://tmnk.net/` as well.
     *
     * Therefore, Tampermonkey interprets `@includes` that contain a `://` a little bit like `@match`. Every `*` before `://`
     * only matches everything except `:` characters to makes sure only the URL scheme is matched. Also, if such an
     * `@include` contains a `/` after `://`, then everything between those strings is treat as host, matching everything
     * except `/` characters. The same applies to `*` directly following `://`.
     *
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:include Docs}
     */
    include?: string[];
    /**
     * In Tampermonkey, the `@match` directive is used to specify the web pages that your script should run on. The value
     * of `@match` should be a URL pattern that matches the pages you want your script to run on. Here are the parts of
     * the URL pattern that you'll need to set:
     * ```
     * // @match <protocol>://<domain><path>
     * ```
     * * protocol - This is the first part of the URL, before the colon. It specifies the protocol that the page uses,
     * such as `http` or `https`. `*` matches both.
     * * domain - This is the second part of the URL, after the protocol and two slashes. It specifies the domain name
     * of the website, such as `tmnk.com`. You can use the wildcard character this way `*.tmnk.net` to match` tmnk.net` and
     * any subdomain of it like `www.tmnk.net`.
     * * path - This is the part of the URL that comes after the domain name, and may include additional subdirectories
     * or filenames. You can use the wildcard character `*` to match any part of the path.
     *
     * Please check {@link https://developer.chrome.com/docs/extensions/mv2/match_patterns/ this documentation} to get
     * more information about match pattern. Note: the `<all_urls>` statement is
     * not yet supported and the scheme part also accepts `http*://`.
     * Multiple tag instances are allowed.
     *
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:match Docs}
     */
    match?: string[];
    /**
     * Exclude URLs even it they are included by `@include` or `@match`.
     *
     * Multiple tag instances are allowed.
     *
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:exclude Docs}
     */
    exclude?: string[];
    /**
     * Defines the moment the script is injected. In opposition to other script handlers, `@run-at` defines the first
     * possible moment a script wants to run. This means it may happen, that a script that uses the `@require` tag may be
     * executed after the document is already loaded, cause fetching the required script took that long. Anyhow,
     * all DOMNodeInserted and DOMContentLoaded events that happended after the given injection moment are cached and
     * delivered to the script when it is injected.
     *
     * ```
     * // @run-at document-start
     * ```
     * The script will be injected as fast as possible.
     * ```
     * // @run-at document-body
     * ```
     * The script will be injected if the body element exists.
     * ```
     * // @run-at document-end
     * ```
     * The script will be injected when or after the DOMContentLoaded event was dispatched.
     * ```
     * // @run-at document-idle
     * ```
     * The script will be injected after the DOMContentLoaded event was dispatched. This is the default value if no `@run-at` tag is given.
     * ```
     * // @run-at context-menu
     * ```
     * The script will be injected if it is clicked at the browser context menu (desktop Chrome-based browsers only).
     * Note: all `@include` and `@exclude` statements will be ignored if this value is used, but this may change in the future.
     *
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:run_at Docs}
     */
    'run-at'?: 'document-start' | 'document-body' | 'document-end' | 'document-idle' | 'context-menu';
    /**
     * `@sandbox` allows Tampermonkey to decide where the userscript is injected:
     * * MAIN_WORLD - the page
     * * ISOLATED_WORLD - the extension's content script
     * * USERSCRIPT_WORLD - a special context created for userscripts
     * But instead of specifying an environment, the userscript can express what exactly it needs access to. `@sandbox`
     * supports three possible arguments:
     *
     * * `raw` "Raw" access means that a script for compatibility reasons always needs to run in page context,
     * the MAIN_WORLD. At the moment this mode is the default if `@sandbox` is omitted.
     * * `JavaScript` "JavaScript" access mode means that this script needs access to `unsafeWindow`.
     * At Firefox a special context, the USERSCRIPT_WORLD, is created which should also bypass all remaining CSP issues.
     * It however, might create new issues since now {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Sharing_objects_with_page_scripts cloneInto and exportFunction}
     * are necessary to share objects with the page. `raw` mode is used as fallback at other browsers.
     * * `DOM` Use this access mode if the script only needs DOM and no direct `unsafeWindow` access.
     * If {@link https://www.tampermonkey.net/faq#Q404 enabled} these scripts are executed inside the extension context, the ISOLATED_WORLD, or at any other enabled
     * context otherwise, because they all grant DOM access.
     *
     * @example
     * ```
     * // @sandbox JavaScript
     * ```
     *
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:sandbox Docs}
     */
    sandbox?: string;
    /**
     * This tag defines the domains (no top-level domains) including subdomains which
     * are allowed to be retrieved by {@link https://www.tampermonkey.net/documentation.php?locale=en#api:GM_xmlhttpRequest GM_xmlhttpRequest}
     *
     * ```
     * // @connect <value>
     * ```
     * `<value>` can be:
     *
     * * a domain name like `example.com` (this will also allow all subdomains).
     * * a subdomain name like `subdomain.example.com`.
     * * `self` to whitelist the domain the script is currently running at.
     * * `localhost` to access the localhost.
     * * an IP address like `1.2.3.4`.
     * * `*`.
     *
     * If it's not possible to declare all domains a userscript might connect to then it's a good practice to do the following:
     *
     * 1. Declare <u>all known</u> or at least <u>all common</u> domains that might be connected by the script to avoid the confirmation dialog for most users.
     * 2. Additionally add `@connect *` to the script to allow Tampermonkey to offer an "Always allow all domains" button.
     *
     * Users can also whitelist all requests by adding * to the user domain whitelist at the script settings tab.
     *
     * Notes:
     * * Both, the initial and the final URL will be checked!
     * * For backward compatibility to Scriptish `@domain` tags are interpreted as well.
     * * Multiple tag instances are allowed.
     *
     * More examples:
     * @example
     * ```
     * // @connect tmnk.net
     * // @connect www.tampermonkey.net
     * // @connect self
     * // @connect localhost
     * // @connect 8.8.8.8
     * // @connect *
     * ```
     *
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:connect Docs}
     */
    connect?: string[];
    /**
     * This tag makes the script running on the main pages, but not at iframes.
     *
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:noframes Docs}
     */
    noframes?: boolean;
    /**
     * An update URL for the userscript. Note: a `@version` tag is required to make update checks work.
     *
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:updateURL Docs}
     */
    updateURL?: string;
    /**
     * Defines the URL where the script will be downloaded from when an update was detected. If the value none is used,
     * then no update check will be done.
     *
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:downloadURL Docs}
     */
    downloadURL?: string;
    /**
     * Defines the URL where the user can report issues and get personal support.
     *
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:supportURL Docs}
     */
    supportURL?: string;
    /**
     * `@webRequest` takes a JSON document that matches {@link https://www.tampermonkey.net/documentation.php?locale=en#api:GM_webRequest GM_webRequest}'s `rule` parameter.
     * It allows the rules to apply even before the userscript is loaded.
     *
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:webRequest Docs}
     */
    webRequest?: string;
    /**
     * Injects the userscript without any wrapper and sandbox into the page, which might be useful for Scriptlets.
     *
     * @see {@link https://www.tampermonkey.net/documentation.php?locale=en#meta:unwrap}
     */
    unwrap?: string;
}
