/********** Global **********/
let pageType = document.querySelector('body').id;
initStickyMenu();
setTheme();
setSize();
initModals();
initTabs();

//click to change subaccounts
document.querySelectorAll('#post_as_menu option').forEach(account => {
    account.innerHTML = account.innerHTML.replace(/&nbsp;&nbsp;»/g,'');
});
let switcher = document.querySelector('#account-switch #subaccounts_menu select');
if(switcher !== null) {
    document.querySelectorAll('select[name="sub_id"] option').forEach(account => {
        account.innerHTML = account.innerHTML.replace(/&nbsp;&nbsp;»/g,'');
    });
    initSwitcher();
}

//quick login
if(document.querySelector('body').classList.contains('g-2')) {
    initQuickLogin();
} else {
    if($('#quick-login').length) {
        $('#quick-login').remove();
    }
    $('#quick-login-clip').remove();
}

/********** Index & Category **********/
if(pageType === 'idx' || pageType === 'SC') {
    initForumLinks();
    initIndex();
}

/********** Topic List **********/
if(pageType === 'SF') {
    if(document.querySelectorAll('.subforums').length > 0) {
        initForumLinks();
    }
    initTopicsWrap();
    initTopicDescription('.topic--description');
}

/********** Topic View **********/
if(pageType === 'ST') {
    let descript = $('.topic-desc').html();
    if (descript != undefined) {
        var newDescript = descript.replace(", ", "");
        $('.topic-desc').html(newDescript);
    }
    initTopicDescription('.topic-desc');
}

/********** UCP & Messages **********/
if(pageType === 'UserCP' || pageType === 'Msg') {
    document.querySelector('#ucpmenu').innerHTML = `<div class="sticky"><b>Account</b>
    <div class="menu-section">
    <a href="?act=UserCP&CODE=01">Edit Profile</a>
    <a href="?act=UserCP&CODE=24">Update Avatar</a>
    <a href="?act=UserCP&CODE=54">Sub-accounts</a>
    <a href="?act=UserCP&CODE=52">Edit Username</a>
    <a href="?act=UserCP&CODE=28">Change Password</a>
    <a href="?act=UserCP&CODE=08">Update Email</a>
    </div>
    <b class="is-closed">Messages</b>
    <div class="menu-section">
    <a href="?act=Msg&CODE=01">Inbox</a>
    <a href="?act=Msg&CODE=04">Send Message</a>
    </div>
    <b class="is-closed">Tracking</b>
    <div class="menu-section">
    <a href="?act=UserCP&CODE=alerts">Alerts</a>
    <a href="?act=UserCP&CODE=50">Forums</a>
    <a href="?act=UserCP&CODE=26">Topics</a>
    </div>
    <b class="is-closed">Settings</b>
    <div class="menu-section">
    <a href="?act=UserCP&CODE=04">Board</a>
    <a href="?act=UserCP&CODE=alerts_settings">Alerts</a>
    <a href="?act=UserCP&CODE=02">Emails</a></div></div>`;

    initMenuToggles();

	//Edit Profile Edits
	if($('body.code-01').length > 0) {
        cpShift();

        //UCP Sliders
        var sliders = [
            $('#field_49_input'),
            $('#field_51_input'),
            $('#field_53_input'),
            $('#field_55_input')
        ];
        var vals = sliders.map(item => item.val());

        for (var i = 0; i < sliders.length; i++) {
            sliders[i].prop('type','range').attr({min:0,max:100,step:1});
            sliders[i].next().attr('id',sliders[i].attr('id')).text(vals[i]);
            if(vals[i] == '') {
                sliders[i].next().text('n/a');
            }

            $(sliders[i]).on('change', function(){
                this.setAttribute('value',this.value);
                vals[i] = this.value;
                this.nextSibling.innerHTML = vals[i];
            });
            
        }
        
        toggleFields.forEach(toggle => {
            document.querySelector(toggle).addEventListener('change', () => {
                cpShift();
            });
        });
    }
}