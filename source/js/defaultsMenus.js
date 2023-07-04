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
    document.querySelector('#ucpmenu').innerHTML = `<div class="sticky"><b>Shop</b>
    <div class="menu-section">
    <a href="store-category.html">Category Name</a>
    </div>
    <b>Personal</b>
    <div class="menu-section">
    <a href="store-inventory.html">Inventory</a>
    <a href="store-sendmoney.html">Send Money</a>
    <a href="store-senditem.html">Send Item</a>
    </div>
    <b class="is-closed staffOnly">Staff</b>
    <div class="menu-section">
    <a href="store-fine.html" class="staffOnly">Fine</a>
    <a href="store-editpoints.html" class="staffOnly">Edit Points</a>
    <a href="store-edititems.html" class="staffOnly">Edit Inventory</a></div></div>`;
}