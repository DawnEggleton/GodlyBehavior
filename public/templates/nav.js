/*
Put your nav HTML between the backticks below and it will auto-populate on all pages of this local copy. It has been pre-populated with the HTML of the Jcink nav strip.
*/

const navHTML = `<nav class="nav nav--main" data-open="none">
<button onclick="toggleNav(this)" class="btn--menu">
    <i class="fa-light fa-bars"></i>
    <i class="fa-light fa-xmark"></i>
</button>
<a href="./index.html"><i class="fa-light fa-home"></i></a>
<a href="./webpage.html"><i class="fa-light fa-books"></i></a>
<a href="javascript:void(0)" class="guestOnly popup" data-modal="login"><i class="fa-light fa-sign-in"></i></a>
<a href="./defaults/register.html" class="guestOnly"><i class="fa-light fa-user-plus"></i></a>
<a href="./profile.html" class="memOnly"><i class="fa-light fa-user"></i></a>
<a href="./usercp/user-edit.html" class="memOnly"><i class="fa-light fa-cog"></i></a>
<button class="popup memOnly" data-modal="switch">
    <i class="fa-light fa-arrow-right-arrow-left"></i>
</button>
<a href="./defaults/login.html" class="memOnly"><i class="fa-light fa-power-off"></i></a>
<a href="DISCORDURL"><i class="fa-light fa-message-lines"></i></a>
<a href="/admin.php" class="staffOnly" target="_blank"><i class="fa-light fa-screwdriver-wrench"></i></a>
<div class="nav--toggles">
    <button onclick="toggleTheme(this)" class="toggle btn--theme">
        <span>
            <i class="fa-light fa-sun"></i>
            <i class="fa-solid fa-moon"></i>
        </span>
    </button>
    <button onclick="toggleSize(this)" class="toggle btn--size">
        <span>
            <i class="fa-light fa-magnifying-glass-plus"></i>
            <i class="fa-solid fa-magnifying-glass-minus"></i>
        </span>
    </button>
</div>
</nav>
<nav class="nav nav--breadcrumb">
<div id="navstrip" align="left">&nbsp;<a href="./index.html">Godly Behaviour</a></div>
</nav>
<nav class="nav nav--menu">
<div class="scroll">
    <a href="/">Test Link</a>
    <a href="/">Test Link</a>
    <tag-code>
        <button onclick="highlightCode()" class="copyQuick">copy</button>
        <pre><textarea class="scroll">[dohtml]&lt;span class=""&gt;&lt;div class="sslp-wrap quote"&gt; 

        Quote
        &lt;tag&gt;— Source&lt;/tag&gt;
        
        &lt;/div&gt;&lt;/span&gt;[/dohtml]</textarea></pre>
    </tag-code>
</div>
</nav>
<div data-modal-box="switch" class="modal">
<div class="modal--close"><span>close</span><span>[<i class="fa-light fa-xmark"></i>]</span></div>
<div id="account-switch">
    <span id="subaccounts_menu">
        <form action="https://playedgod.jcink.net/index.php?&amp;act=Login&amp;CODE=01&amp;CookieDate=1" name="subswitch" method="POST">
            <input type="hidden" name="auth_key" value="67b665903a8fc5105c6bbb3892012108">
            <input type="hidden" name="UserName" value="subacct">
            <input type="hidden" name="PassWord" value="subacct">
            <input type="hidden" name="referer" value="">
            <select class="forminput" name="sub_id" onchange="this.form.submit()">
                <option value="------------" selected="selected">Switch Account</option>
                <option value="4">&nbsp;&nbsp;» Brennan Cormac </option><option value="43">&nbsp;&nbsp;» Cynbel Edevane </option><option value="2">&nbsp;&nbsp;» Hayden Donovan </option><option value="50">&nbsp;&nbsp;» Jesse Dunn </option><option value="45">&nbsp;&nbsp;» Madison Mckinley </option><option value="3">&nbsp;&nbsp;» Malcolm Murdock </option><option value="35">&nbsp;&nbsp;» Nikolas Kovac </option><option value="15">&nbsp;&nbsp;» Satiah El Masry </option><option value="36">&nbsp;&nbsp;» Sterling Di Mitri </option>
            </select>
        </form>
    </span>
</div>
</div>
<div id="quick-login-clip" data-modal-box="login" class="modal">
<div class="modal--close"><span>close</span><span>[<i class="fa-light fa-xmark"></i>]</span></div>
</div>`;

const navHTMLalt = `<nav class="nav nav--main" data-open="none">
<button onclick="toggleNav(this)" class="btn--menu">
    <i class="fa-light fa-bars"></i>
    <i class="fa-light fa-xmark"></i>
</button>
<a href="./../index.html"><i class="fa-light fa-home"></i></a>
<a href="./../webpage.html"><i class="fa-light fa-books"></i></a>
<a href="javascript:void(0)" class="guestOnly popup" data-modal="login"><i class="fa-light fa-sign-in"></i></a>
<a href="./../defaults/register.html" class="guestOnly"><i class="fa-light fa-user-plus"></i></a>
<a href="./../profile.html" class="memOnly"><i class="fa-light fa-user"></i></a>
<a href="./../usercp/user-edit.html" class="memOnly"><i class="fa-light fa-cog"></i></a>
<button class="popup memOnly" data-modal="switch">
    <i class="fa-light fa-arrow-right-arrow-left"></i>
</button>
<a href="./../defaults/login.html" class="memOnly"><i class="fa-light fa-power-off"></i></a>
<a href="DISCORDURL"><i class="fa-light fa-message-lines"></i></a>
<a href="/admin.php" class="staffOnly" target="_blank"><i class="fa-light fa-screwdriver-wrench"></i></a>
<div class="nav--toggles">
    <button onclick="toggleTheme(this)" class="toggle btn--theme">
        <span>
            <i class="fa-light fa-sun"></i>
            <i class="fa-solid fa-moon"></i>
        </span>
    </button>
    <button onclick="toggleSize(this)" class="toggle btn--size">
        <span>
            <i class="fa-light fa-magnifying-glass-plus"></i>
            <i class="fa-solid fa-magnifying-glass-minus"></i>
        </span>
    </button>
</div>
</nav>
<nav class="nav nav--breadcrumb">
<div id="navstrip" align="left">&nbsp;<a href="./index.html">Godly Behaviour</a></div>
</nav>
<nav class="nav nav--menu">
<div class="scroll">
    <a href="/">Test Link</a>
    <a href="/">Test Link</a>
    <tag-code>
        <button onclick="highlightCode()" class="copyQuick">copy</button>
        <pre><textarea class="scroll">[dohtml]&lt;span class=""&gt;&lt;div class="sslp-wrap quote"&gt; 

        Quote
        &lt;tag&gt;— Source&lt;/tag&gt;
        
        &lt;/div&gt;&lt;/span&gt;[/dohtml]</textarea></pre>
    </tag-code>
</div>
</nav>
<div data-modal-box="switch" class="modal">
<div class="modal--close"><span>close</span><span>[<i class="fa-light fa-xmark"></i>]</span></div>
<div id="account-switch">
    <span id="subaccounts_menu">
        <form action="https://playedgod.jcink.net/index.php?&amp;act=Login&amp;CODE=01&amp;CookieDate=1" name="subswitch" method="POST">
            <input type="hidden" name="auth_key" value="67b665903a8fc5105c6bbb3892012108">
            <input type="hidden" name="UserName" value="subacct">
            <input type="hidden" name="PassWord" value="subacct">
            <input type="hidden" name="referer" value="">
            <select class="forminput" name="sub_id" onchange="this.form.submit()">
                <option value="------------" selected="selected">Switch Account</option>
                <option value="4">&nbsp;&nbsp;» Brennan Cormac </option><option value="43">&nbsp;&nbsp;» Cynbel Edevane </option><option value="2">&nbsp;&nbsp;» Hayden Donovan </option><option value="50">&nbsp;&nbsp;» Jesse Dunn </option><option value="45">&nbsp;&nbsp;» Madison Mckinley </option><option value="3">&nbsp;&nbsp;» Malcolm Murdock </option><option value="35">&nbsp;&nbsp;» Nikolas Kovac </option><option value="15">&nbsp;&nbsp;» Satiah El Masry </option><option value="36">&nbsp;&nbsp;» Sterling Di Mitri </option>
            </select>
        </form>
    </span>
</div>
</div>
<div id="quick-login-clip" data-modal-box="login" class="modal">
<div class="modal--close"><span>close</span><span>[<i class="fa-light fa-xmark"></i>]</span></div>
</div>`;

if(document.querySelector('body').id === 'UserCP' || document.querySelector('body').id === 'store' || document.querySelector('body').id === 'Msg') {
    document.querySelector('#nav-clip').innerHTML = navHTMLalt;
} else {
    document.querySelector('#nav-clip').innerHTML = navHTML;
}
