var EL_BTN_NAME = 'TogglePassword--toggleBtn';
var EXT_ATTRIBUTE_CONSTANT = 'TogglePassword-Extension-Setup-';

function SetupInput(element, id='0') {
    element.setAttribute(EXT_ATTRIBUTE_CONSTANT+'-PasswordField--id-'+String(id), 'ok');
}

function AddScript(src, add_to_header=true, extra=null) {
    var script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    if(extra !== null) {
        extra(script);
    }
    if(add_to_header) document.getElementsByTagName('body')[0].appendChild(script);
    return script;
}

function TogglePassword(el, flag=false, index=0) {
    let type = (el.type === 'password' ? 'text' : 'password');
    el.setAttribute('type', type);
    if(flag) {
        let dummy = 'far fa-';
        let faclass = '';
        if(type === 'password') {
            faclass = 'eye';
        } else {
            faclass = 'eye-slash';
        }
        jQuery('#'+EL_BTN_NAME+String(index)).html('<i class="'+dummy+faclass+'"></i>');
    }
}

var password_fields = document.querySelectorAll('input[type=password]');
var extension_btn_els = document.querySelectorAll(EL_BTN_NAME);

if(password_fields.length > 0) {
    if(!jQuery('['+EXT_ATTRIBUTE_CONSTANT+'-faIconsLib=ok]').length) {
        jQuery('body').prepend('<link '+EXT_ATTRIBUTE_CONSTANT+'-faIconsLib="ok" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css">');
    }
    password_fields.forEach((element, index) => {
        SetupInput(element, index);
        let generated_id = EL_BTN_NAME+String(index);
        if(!jQuery('#'+EL_BTN_NAME+String(index)).length) {
            jQuery('['+EXT_ATTRIBUTE_CONSTANT+'-PasswordField--id-'+index+'=ok]').after('<button id="'+generated_id+'" class="'+EL_BTN_NAME+'" type="button" role="button"><i class="far fa-eye"></i></button>');
            jQuery(document).on('click', '#'+generated_id, () => {
                TogglePassword(element, true, index);
            });
        }
    });
}
