//UCP Only
if($('body#UserCP').length > 0) {
    document.querySelector('#ucpmenu').innerHTML = `<div class="sticky"><b>Account</b>
    <div class="menu-section">
    <a href="user-edit.html">Edit Profile</a>
    <a href="user-avatar.html">Update Avatar</a>
    <a href="user-accounts.html">Sub-accounts</a>
    <a href="user-name.html">Edit Username</a>
    <a href="user-pass.html">Change Password</a>
    <a href="user-email.html">Update Email</a>
    </div>
    <b class="is-closed">Tracking</b>
    <div class="menu-section">
    <a href="user-alerts.html">Alerts</a>
    <a href="user-forums.html">Forums</a>
    <a href="user-topics.html">Topics</a>
    </div>
    <b class="is-closed">Settings</b>
    <div class="menu-section">
    <a href="user-boardset.html">Board</a>
    <a href="user-alertset.html">Alerts</a>
    <a href="user-emailset.html">Emails</a></div></div>`;
}


//Store Only
if($('body#store').length > 0) {
    document.querySelector('#ucpmenu').innerHTML = `<b>Personal</b>
    <a href="store-inventory.html">Inventory</a>
    <a href="store-sendmoney.html">Send Money</a>
    <a href="store-senditem.html">Send Item</a>
    <b>Shop</b>
    <a href="store-category.html">Category Name</a>
    <b class="staffOnly">Staff</b>
    <a href="store-fine.html" class="staffOnly">Fine</a>
    <a href="store-editpoints.html" class="staffOnly">Edit Points</a>
    <a href="store-edititems.html" class="staffOnly">Edit Inventory</a>`;
}


//Store Only
if($('body#modcp').length > 0) {
    document.querySelector('#modcp main > table:first-child > tbody > tr > td:first-child').innerHTML = `<b>Forums & Posts</b>
    <a href="mod-queue.html">Queue</a>
    <a href="mod-reported.html">Reported</a>
    <a href="mod-postlogs.html">Logs</a>
    <a href="mod-prune.html">Prune</a>
    <b>Users</b>
    <a href="mod-edit.html">Edit</a>
    <a href="mod-warn.html">Warn</a>
    <a href="mod-userlogs.html">Logs</a>
    <a href="mod-ip.html">IP Tools</a>
    <a href="mod-validate.html">Validaion</a>`;
}