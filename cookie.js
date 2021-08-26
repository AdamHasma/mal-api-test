/**
* Functions for Google Analytics Opt-IN
* with Osano Cookie Consent (https://www.osano.com/cookieconsent/download/)
* v2.1 – 30.01.2021
* vektorkneter.de
*
*
* Changelog:
* v2.1 – 30.01.2021
* – some changes in clearCookie() wich might improve the reliability of
* cookie clearing in Google Chrome (based on a single issue report)
*
* v2.0 – 16.01.2021
* – added support for new tracking IDs with format G-XXXXXXXXXX
*/

// Google Analytics tracking ID
// You may use the old format UA-XXXXXXXX-X or the newer one G-XXXXXXXXXX
var $tracking_id = "G-64DX90H1SD";

// OPTIONAL (set if you have trouble deleting cookies):
// Set Google Analytics Cookie domain & path (needed for clearing cookies – have look in the inspector to get the values needed)
// If set to false, values from window.location.hostname and window.location.pathname will be used
var $tracking_cookie_domain = false; // eg. ".example.com"
var $tracking_cookie_path = false;   // eg. "/"


/* –  – NO FUTHER SETTINGS NEEDED BELOW THIS LINE –  – */

function embedTrackingCode(){
    // add <script> to head
    var gascript = document.createElement("script");
    gascript.async = true;
    gascript.src = "https://www.googletagmanager.com/gtag/js?id="+$tracking_id;
    document.getElementsByTagName("head")[0].appendChild(gascript, document.getElementsByTagName("head")[0]);

    // track pageview
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', $tracking_id, { 'anonymize_ip': true });

    //console.log('Google Analytics Tracking enabled')
}


function deleteGACookies(){
    // build cookie name from $tracking_id
    // taking into account legacy format (UA-XXXXXXXX-X) and newer format (G-XXXXXXXXXX)
    var $gtag_cookie;
    if ($tracking_id.substring(0, 2) == "G-") {
        // new format: Remove "G-", prefix with "_ga_"
        //console.log('new tracking id');
        $gtag_cookie = "_ga_"+$tracking_id.replace(/G-/g, "");
    } else if ($tracking_id.substring(0, 3) == "UA-") {
        // old format: Replace "-" with "_", prefix "_gat_gtag_"
        //console.log('legacy tracking id');
        $gtag_cookie = "_gat_gtag_"+$tracking_id.replace(/-/g, "_");
    } else {
        // none of the booth formats detected
        console.warn('No valid tracking ID (UA-XXXXXXXX-X or G-XXXXXXXXXX) detected. Cookie deletion will not work!')
    }

    // clear cookies
    clearCookie('_ga',$tracking_cookie_domain,$tracking_cookie_path);
    clearCookie('_gid',$tracking_cookie_domain,$tracking_cookie_path);
    clearCookie('_gat',$tracking_cookie_domain,$tracking_cookie_path);
    clearCookie($gtag_cookie,$tracking_cookie_domain,$tracking_cookie_path);

    //console.log('Google Analytics Tracking disabled')
}




// function for deleting Cookies (such as that ones from Google Analytics)
function clearCookie(name,domain,path){
    if(!domain || domain==""){
        domain = "." + window.location.hostname;
    }
    if(!path || path==""){
        path = "/";
    }
    document.cookie = name + '=; domain=' + domain +'; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=' + path;
}


// function for triggering a click on the cc-revoke button
// wich will show the consent banner again.
// You may use it in a link, such as this example:
// <a href="#" onclick="openCCbanner(); return false;">Cookie Consent</a>
function openCCbanner(){
    var el = document.querySelector('.cc-revoke');
    el.click();
}


// –  – OPTIONAL – -----------------
// Google Analytics Opt-Out Cookie
var $tracking_disable_cookie = 'ga-disable-' + $tracking_id;
if (document.cookie.indexOf($tracking_disable_cookie + '=true') > -1) {
window[$tracking_disable_cookie] = true;
}
function gaOptout() {
    document.cookie = $tracking_disable_cookie + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
    window[$tracking_disable_cookie] = true;
    document.querySelector(".cookie").display
}
